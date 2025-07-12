
-- Add location fields to the profiles table
ALTER TABLE public.profiles 
ADD COLUMN location TEXT,
ADD COLUMN phone TEXT,
ADD COLUMN company TEXT,
ADD COLUMN bio TEXT;

-- Create a profile history table to track changes
CREATE TABLE public.profile_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  changed_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS on profile history table
ALTER TABLE public.profile_history ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile history
CREATE POLICY "Users can view their own profile history" 
  ON public.profile_history 
  FOR SELECT 
  USING (changed_by = auth.uid());

-- Allow users to insert their own profile history
CREATE POLICY "Users can create their own profile history" 
  ON public.profile_history 
  FOR INSERT 
  WITH CHECK (changed_by = auth.uid());

-- Create a function to automatically log profile changes
CREATE OR REPLACE FUNCTION public.log_profile_changes()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically log profile changes
CREATE TRIGGER profile_changes_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_profile_changes();
