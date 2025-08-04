import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  location: string | null;
  phone: string | null;
  company: string | null;
  bio: string | null;
  role: string | null;
  is_demo_account: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isDemoAccount: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const createFallbackProfile = (user: User): Profile => ({
    id: user.id,
    email: user.email,
    first_name: user.user_metadata?.first_name || null,
    last_name: user.user_metadata?.last_name || null,
    location: null,
    phone: null,
    company: null,
    bio: null,
    role: 'user',
    is_demo_account: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  const createMissingProfile = async (userId: string, email: string): Promise<Profile | null> => {
    try {
      console.log('Creating missing profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: email,
          role: 'user',
          is_demo_account: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error creating missing profile:', error);
      return null;
    }
  };

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              let profileData = await fetchProfile(session.user.id);
              
              // If profile doesn't exist, try to create it
              if (!profileData) {
                console.log('Profile not found, attempting to create it...');
                profileData = await createMissingProfile(session.user.id, session.user.email!);
              }
              
              if (mounted) {
                // Use fallback profile if database profile is still missing
                const finalProfile = profileData || createFallbackProfile(session.user);
                setProfile(finalProfile);
              }
            } catch (error) {
              console.error('Error handling profile:', error);
              if (mounted) {
                // Use fallback profile on any error
                setProfile(createFallbackProfile(session.user));
              }
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            try {
              let profileData = await fetchProfile(initialSession.user.id);
              
              // If profile doesn't exist, try to create it
              if (!profileData) {
                console.log('Profile not found during initialization, attempting to create it...');
                profileData = await createMissingProfile(initialSession.user.id, initialSession.user.email!);
              }
              
              if (mounted) {
                // Use fallback profile if database profile is still missing
                const finalProfile = profileData || createFallbackProfile(initialSession.user);
                setProfile(finalProfile);
              }
            } catch (error) {
              console.error('Error handling profile during initialization:', error);
              if (mounted) {
                // Use fallback profile on any error
                setProfile(createFallbackProfile(initialSession.user));
              }
            }
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: metadata
        }
      });
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isDemoAccount = profile?.is_demo_account === true;

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isDemoAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
