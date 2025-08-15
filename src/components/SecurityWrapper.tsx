
import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface SecurityWrapperProps {
  children: ReactNode;
  requiredRole?: string;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

const SecurityWrapper = ({ 
  children, 
  requiredRole, 
  fallback = null, 
  requireAuth = false 
}: SecurityWrapperProps) => {
  const { user, profile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !user) {
    return fallback || (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
        <p className="text-muted-foreground">Please log in to access this content.</p>
      </div>
    );
  }

  // Check role requirement
  if (requiredRole && (!profile?.role || profile.role !== requiredRole)) {
    console.log('Access denied - insufficient role:', { 
      required: requiredRole, 
      current: profile?.role 
    });
    
    return fallback || (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-muted-foreground">
          You don't have permission to access this content.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default SecurityWrapper;
