
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    farmName: "",
    location: "",
    agreeTerms: false,
    agreeUpdates: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "" });
  const { toast } = useToast();
  const { signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  // Password strength checker
  useEffect(() => {
    if (formData.password) {
      const checkPasswordStrength = (password) => {
        let score = 0;
        let feedback = "";

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        switch (score) {
          case 0:
          case 1:
            feedback = "Very weak password";
            break;
          case 2:
            feedback = "Weak password";
            break;
          case 3:
            feedback = "Fair password";
            break;
          case 4:
            feedback = "Good password";
            break;
          case 5:
            feedback = "Strong password";
            break;
        }

        return { score, feedback };
      };

      setPasswordStrength(checkPasswordStrength(formData.password));
    } else {
      setPasswordStrength({ score: 0, feedback: "" });
    }
  }, [formData.password]);

  // Show loading only during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Don't render if user is authenticated
  if (user) {
    return null;
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your first and last name.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const metadata = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        farm_name: formData.farmName.trim() || null,
        location: formData.location.trim(),
        agree_updates: formData.agreeUpdates
      };

      const result = await signUp(formData.email.trim().toLowerCase(), formData.password, metadata);
      
      if (result?.error) {
        if (result.error.message.includes("already registered") || result.error.message.includes("User already registered")) {
          toast({
            title: "Account exists",
            description: "This email is already registered. Please try logging in instead.",
            variant: "destructive"
          });
        } else if (result.error.message.includes("Invalid email")) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email address.",
            variant: "destructive"
          });
        } else if (result.error.message.includes("Password")) {
          toast({
            title: "Password error",
            description: result.error.message || "Please check your password requirements.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Signup failed",
            description: result.error.message || "Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account created!",
          description: "Welcome to Urban Roots. Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error?.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return "text-red-600";
      case 2:
        return "text-orange-600";
      case 3:
        return "text-yellow-600";
      case 4:
        return "text-blue-600";
      case 5:
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const isFormDisabled = isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-secondary/10">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-4">
            <Leaf className="h-8 w-8" />
            <span>Urban Roots</span>
          </Link>
          <h2 className="text-3xl font-bold">Join Urban Roots</h2>
          <p className="text-muted-foreground mt-2">
            Create your account and start your journey to smarter farming
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Fill in your details to get started with Urban Roots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                    placeholder="Your first name"
                    className="disabled:opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                    placeholder="Your last name"
                    className="disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isFormDisabled}
                  placeholder="your.email@example.com"
                  className="disabled:opacity-50"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                    placeholder="Create a strong password"
                    className="disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent disabled:opacity-50"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isFormDisabled}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {passwordStrength.feedback && (
                  <p className={`text-xs mt-1 ${getPasswordStrengthColor(passwordStrength.score)}`}>
                    {passwordStrength.feedback}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                    placeholder="Confirm your password"
                    className="disabled:opacity-50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent disabled:opacity-50"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isFormDisabled}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs mt-1 text-red-600">
                    Passwords do not match
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="farmName">Farm Name (Optional)</Label>
                  <Input
                    id="farmName"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleChange}
                    disabled={isFormDisabled}
                    placeholder="Your farm name"
                    className="disabled:opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={isFormDisabled}
                    placeholder="City, State"
                    className="disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    disabled={isFormDisabled}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, agreeTerms: Boolean(checked)})
                    }
                  />
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the{" "}
                    <Link 
                      to="/terms" 
                      className="text-primary hover:underline"
                      tabIndex={isFormDisabled ? -1 : 0}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link 
                      to="/privacy" 
                      className="text-primary hover:underline"
                      tabIndex={isFormDisabled ? -1 : 0}
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeUpdates"
                    checked={formData.agreeUpdates}
                    disabled={isFormDisabled}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, agreeUpdates: Boolean(checked)})
                    }
                  />
                  <Label htmlFor="agreeUpdates" className="text-sm">
                    I'd like to receive updates about Urban Roots and farming tips
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isFormDisabled}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:underline"
                    tabIndex={isFormDisabled ? -1 : 0}
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Not ready to commit?{" "}
            <Link 
              to="/join-waitlist" 
              className="text-primary hover:underline"
              tabIndex={isFormDisabled ? -1 : 0}
            >
              Join our waitlist instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
