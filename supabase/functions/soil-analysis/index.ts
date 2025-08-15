
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify user authentication
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader);
    if (authError || !user) {
      throw new Error('Authentication failed');
    }

    const { image, question, analysisType = 'soil' } = await req.json();

    if (!image) {
      throw new Error('No image provided');
    }

    console.log(`Analyzing ${analysisType} image for user:`, user.id);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Different prompts based on analysis type
    const prompts = {
      soil: `You are an expert agricultural soil scientist and agronomist. Analyze this soil sample image and provide detailed insights about:

1. **Soil Moisture Content**: Assess moisture levels based on visual cues like soil color, cracking patterns, and texture appearance
2. **Soil Temperature Indicators**: Look for visual signs that might indicate soil temperature conditions
3. **pH/Acidity Estimation**: Analyze soil color variations that might indicate pH levels (darker soils often more acidic, lighter more alkaline)
4. **Soil Composition**: Identify soil type (clay, sand, loam, etc.) based on particle size and aggregation
5. **Organic Matter Content**: Assess the presence of organic matter from color and texture
6. **Soil Health Indicators**: Look for signs of compaction, aeration, root presence, or other health indicators
7. **Agricultural Recommendations**: Provide specific farming recommendations based on your analysis

Please be specific about what you observe in the image and explain your reasoning for each assessment. If certain characteristics cannot be determined from the image alone, mention what additional tests would be recommended.

Format your response in clear sections with practical, actionable advice for farmers.`,

      crop: `You are an expert agricultural crop specialist and plant pathologist. Analyze this crop image and provide detailed insights about:

1. **Plant Health Assessment**: Evaluate overall plant vigor, leaf color, and growth patterns
2. **Disease Detection**: Look for signs of fungal, bacterial, or viral diseases
3. **Pest Damage**: Identify any insect damage, bite marks, or pest-related symptoms
4. **Nutrient Deficiency**: Analyze leaf discoloration that might indicate nutrient deficiencies
5. **Growth Stage**: Determine the current growth stage and development phase
6. **Environmental Stress**: Look for signs of water stress, heat damage, or other environmental factors
7. **Treatment Recommendations**: Provide specific treatment and management recommendations

Be specific about symptoms observed and provide actionable treatment plans.`,

      general: `You are an expert agricultural consultant. Analyze this agricultural image and provide comprehensive insights about what you observe, including plant health, soil conditions, farming practices, and any recommendations for improvement.`
    };

    const selectedPrompt = prompts[analysisType as keyof typeof prompts] || prompts.general;
    const finalPrompt = question ? `${selectedPrompt}\n\nAdditional question from user: ${question}` : selectedPrompt;

    // Call OpenAI Vision API with better error handling
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: finalPrompt
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text();
      console.error('OpenAI API error:', errorData);
      
      // Parse error for better user feedback
      let errorMessage = `OpenAI API failed: ${openaiResponse.status}`;
      try {
        const errorJson = JSON.parse(errorData);
        if (errorJson.error?.code === 'insufficient_quota') {
          errorMessage = 'OpenAI API quota exceeded. Please check your OpenAI account billing and add credits.';
        } else if (errorJson.error?.message) {
          errorMessage = errorJson.error.message;
        }
      } catch (e) {
        // Use default error message if parsing fails
      }
      
      throw new Error(errorMessage);
    }

    const data = await openaiResponse.json();
    const analysis = data.choices[0]?.message?.content;

    if (!analysis) {
      throw new Error('No analysis returned from OpenAI');
    }

    console.log(`${analysisType} analysis completed successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: analysis,
        analysisType: analysisType,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Analysis failed' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
})
