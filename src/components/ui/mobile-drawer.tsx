
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const MobileDrawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

const MobileDrawerTrigger = DrawerPrimitive.Trigger;
const MobileDrawerPortal = DrawerPrimitive.Portal;
const MobileDrawerClose = DrawerPrimitive.Close;

const MobileDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/60", className)}
    {...props}
  />
));

const MobileDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <MobileDrawerPortal>
    <MobileDrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[20px] border bg-background shadow-2xl",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[60px] rounded-full bg-muted-foreground/30" />
      {children}
    </DrawerPrimitive.Content>
  </MobileDrawerPortal>
));

const MobileDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-6 text-center", className)}
    {...props}
  />
);

const MobileDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-6", className)}
    {...props}
  />
);

const MobileDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

const MobileDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

export {
  MobileDrawer,
  MobileDrawerPortal,
  MobileDrawerOverlay,
  MobileDrawerTrigger,
  MobileDrawerClose,
  MobileDrawerContent,
  MobileDrawerHeader,
  MobileDrawerFooter,
  MobileDrawerTitle,
  MobileDrawerDescription,
};
