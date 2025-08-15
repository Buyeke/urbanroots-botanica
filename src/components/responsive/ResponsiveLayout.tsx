
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  mobileLayout?: React.ReactNode;
  desktopLayout?: React.ReactNode;
}

const ResponsiveLayout = ({ 
  children, 
  mobileLayout, 
  desktopLayout 
}: ResponsiveLayoutProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="animate-pulse bg-muted h-screen" />;
  }

  if (isMobile && mobileLayout) {
    return <>{mobileLayout}</>;
  }

  if (!isMobile && desktopLayout) {
    return <>{desktopLayout}</>;
  }

  return <>{children}</>;
};

export default ResponsiveLayout;
