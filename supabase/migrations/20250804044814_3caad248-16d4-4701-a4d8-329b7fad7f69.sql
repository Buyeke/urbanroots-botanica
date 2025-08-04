
-- Create missing profile for the authenticated user
INSERT INTO public.profiles (id, email, first_name, last_name, role, is_demo_account)
VALUES ('501f65d7-847f-446c-8a9b-5da03c64443f', 'msmasandadinah@gmail.com', NULL, NULL, 'user', false);

-- Add trigger to automatically create profiles for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
