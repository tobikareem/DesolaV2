import {
    LayoutDashboard,
    UserPlus,
    CreditCard,
    Plane,
    AlertTriangle,
    Headphones,
    Settings,
    LogOut,
  } from "lucide-react";
  

  export type ViewType =
    | "dashboard"
    | "profile"
    | "subscription"
    | "flight"
    | "tracking"
    | "support"
    | "settings"
    | "logout";
  
  export interface MenuItem {
    label: string;
    icon: any;
    view: ViewType;
    section: "top" | "bottom";
  }
  
  export const sidebarMenu: MenuItem[] = [
    { label: "Dash Board", icon: LayoutDashboard, view: "dashboard", section: "top" },
    { label: "Profile & Authentication", icon: UserPlus, view: "profile", section: "top" },
    { label: "Subscription", icon: CreditCard, view: "subscription", section: "top" },
    { label: "Flight Activity", icon: Plane, view: "flight", section: "top" },
    { label: "Technical & Error Tracking", icon: AlertTriangle, view: "tracking", section: "top" },
    { label: "Chat Support", icon: Headphones, view: "support", section: "top" },
    { label: "Settings", icon: Settings, view: "settings", section: "bottom" },
    { label: "Logout", icon: LogOut, view: "logout", section: "bottom" },
  ];
  