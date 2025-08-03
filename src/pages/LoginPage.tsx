
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Eye, EyeOff, Loader2, TestTube } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTestLogin, setIsTestLogin] = useState(false);
  const { toast } = useToast();
  const { signIn, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

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

  const handleTestAccount = async () => {
    setIsTestLogin(true);
    setFormData({
      email: "admin@test.com",
      password: "Password7",
      rememberMe: false
    });
    
    try {
      const result = await signIn("admin@test.com", "Password7");
      
      if (result?.error) {
        toast({
          title: "Demo Access Failed",
          description: result.error.message || "Unable to access the demo account.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Demo Access Granted",
          description: "Welcome to Urban Roots AI.",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error?.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsTestLogin(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.error) {
        toast({
          title: "Login failed",
          description: result.error.message || "Please check your credentials.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login successful!",
          description: "Welcome back to Urban Roots.",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error?.message || "An unexpected error occurred.",
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

  const isFormDisabled = isLoading || isTestLogin;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-secondary/10">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-4">
            <Leaf className="h-8 w-8" />
            <span>Urban Roots AI</span>
          </Link>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2">
            Sign in to access your farming intelligence dashboard
          </p>
        </div>

        <Alert className="border-green-200 bg-green-50/50">
          <TestTube className="h-4 w-4 text-green-700" />
          <AlertDescription className="text-green-800">
            <div className="space-y-3">
              <p className="font-medium">Investor Demo Access</p>
              <p className="text-sm">
                Experience our platform instantly with our demo account - no signup required.
              </p>
              <Button 
                onClick={handleTestAccount}
                disabled={isFormDisabled}
                className="w-full bg-green-700 hover:bg-green-800 text-white disabled:opacity-50"
                size="sm"
              >
                {isTestLogin && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isTestLogin ? "Accessing Demo..." : "Access Demo Dashboard"}
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">
              Or sign in with your account
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your farm dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    disabled={isFormDisabled}
                    onCheckedChange={(checked) => 
                      setFormData({...formData, rememberMe: Boolean(checked)})
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                  tabIndex={isFormDisabled ? -1 : 0}
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isFormDisabled}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-primary hover:underline"
                    tabIndex={isFormDisabled ? -1 : 0}
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Interested in our technology?{" "}
            <Link 
              to="/join-waitlist" 
              className="text-primary hover:underline"
              tabIndex={isFormDisabled ? -1 : 0}
            >
              Join our waitlist
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
