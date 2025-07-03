import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage"; // Placeholder
import BlogPage from "./pages/BlogPage"; // Placeholder
import CareersPage from "./pages/CareersPage"; // Placeholder
import ContactPage from "./pages/ContactPage"; // Placeholder
import LoginPage from "./pages/LoginPage"; // Placeholder
import SignupPage from "./pages/SignupPage"; // Placeholder
import JoinWaitlistPage from "./pages/JoinWaitlistPage"; // Placeholder
import DashboardPage from "./pages/DashboardPage"; // Placeholder
import TermsPage from "./pages/TermsPage"; // Placeholder
import PrivacyPage from "./pages/PrivacyPage"; // Placeholder
import AboutPage from "./pages/AboutPage"; // Placeholder for footer link
import ShopPage from "./pages/ShopPage"; // Add this import
import FarmDashboard from "./pages/FarmDashboard";

import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

import { CartProvider } from "@/context/CartContext";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/join-waitlist" element={<JoinWaitlistPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/farm" element={
                  <ProtectedRoute>
                    <FarmDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
