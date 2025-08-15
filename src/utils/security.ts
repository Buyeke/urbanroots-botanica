
// Security utilities for input validation and sanitization
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size too large. Maximum size is 10MB.' };
  }
  
  return { isValid: true };
};

export const createSecureErrorMessage = (error: any): string => {
  // Return generic error messages to users while logging detailed errors
  console.error('Detailed error:', error);
  
  if (error?.message?.includes('email')) {
    return 'Please check your email address and try again.';
  }
  
  if (error?.message?.includes('password')) {
    return 'Please check your password and try again.';
  }
  
  if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
    return 'Connection error. Please check your internet connection and try again.';
  }
  
  return 'An error occurred. Please try again later.';
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  
  return (key: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const keyRequests = requests.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(key, validRequests);
    
    return true;
  };
})();
