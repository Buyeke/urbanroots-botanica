
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createSecureErrorMessage } from '@/utils/security';

export const useSecureAuth = () => {
  const auth = useAuth();
  const { toast } = useToast();

  // Enhanced sign in with security features
  const secureSignIn = async (email: string, password: string) => {
    try {
      // Basic validation
      if (!email || !password) {
        toast({
          title: "Missing Information",
          description: "Please enter both email and password.",
          variant: "destructive"
        });
        return { error: new Error('Missing credentials') };
      }

      // Attempt sign in
      const result = await auth.signIn(email, password);
      
      if (result.error) {
        const secureMessage = createSecureErrorMessage(result.error);
        toast({
          title: "Sign In Failed",
          description: secureMessage,
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error) {
      const secureMessage = createSecureErrorMessage(error);
      toast({
        title: "Sign In Error",
        description: secureMessage,
        variant: "destructive"
      });
      return { error };
    }
  };

  // Enhanced sign up with security features
  const secureSignUp = async (email: string, password: string, metadata?: any) => {
    try {
      // Enhanced password validation
      if (password.length < 8) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 8 characters long.",
          variant: "destructive"
        });
        return { error: new Error('Password too short') };
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        toast({
          title: "Weak Password",
          description: "Password must contain uppercase, lowercase, and numbers.",
          variant: "destructive"
        });
        return { error: new Error('Password not complex enough') };
      }

      const result = await auth.signUp(email, password, metadata);
      
      if (result.error) {
        const secureMessage = createSecureErrorMessage(result.error);
        toast({
          title: "Sign Up Failed",
          description: secureMessage,
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error) {
      const secureMessage = createSecureErrorMessage(error);
      toast({
        title: "Sign Up Error",
        description: secureMessage,
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    ...auth,
    secureSignIn,
    secureSignUp,
  };
};
