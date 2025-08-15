
-- Create missing newsletter_subscribers table with proper security
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid()
);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own subscriptions" 
  ON public.newsletter_subscribers 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.newsletter_subscribers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Fix database function security vulnerabilities
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role, is_demo_account)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    CASE 
      WHEN new.email = 'admin@test.com' THEN 'demo_investor' 
      ELSE 'user' 
    END,
    CASE 
      WHEN new.email = 'admin@test.com' THEN true 
      ELSE false 
    END
  );
  RETURN new;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_profile_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
  -- Log changes for each field that was modified
  IF OLD.first_name IS DISTINCT FROM NEW.first_name THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'first_name', OLD.first_name, NEW.first_name, auth.uid());
  END IF;
  
  IF OLD.last_name IS DISTINCT FROM NEW.last_name THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'last_name', OLD.last_name, NEW.last_name, auth.uid());
  END IF;
  
  IF OLD.email IS DISTINCT FROM NEW.email THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'email', OLD.email, NEW.email, auth.uid());
  END IF;
  
  IF OLD.location IS DISTINCT FROM NEW.location THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'location', OLD.location, NEW.location, auth.uid());
  END IF;
  
  IF OLD.phone IS DISTINCT FROM NEW.phone THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'phone', OLD.phone, NEW.phone, auth.uid());
  END IF;
  
  IF OLD.company IS DISTINCT FROM NEW.company THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'company', OLD.company, NEW.company, auth.uid());
  END IF;
  
  IF OLD.bio IS DISTINCT FROM NEW.bio THEN
    INSERT INTO public.profile_history (profile_id, field_name, old_value, new_value, changed_by)
    VALUES (NEW.id, 'bio', OLD.bio, NEW.bio, auth.uid());
  END IF;
  
  -- Update the updated_at timestamp
  NEW.updated_at = now();
  
  RETURN NEW;
END;
$function$;

-- Create validation trigger for role changes to prevent unauthorized modifications
CREATE OR REPLACE FUNCTION public.validate_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
  -- Prevent users from changing their own role unless they're already an admin
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    -- Only allow role changes if the user changing it has admin privileges
    IF NOT EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'demo_investor')
    ) AND auth.uid() = NEW.id THEN
      RAISE EXCEPTION 'Insufficient privileges to change user role';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Create trigger for role validation
CREATE TRIGGER validate_role_changes_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_role_changes();

-- Add email validation constraint
ALTER TABLE public.newsletter_subscribers 
ADD CONSTRAINT valid_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
