"use client";

import React from "react";
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSideBar } from "@/components/dashboardSidebar";
import { useAuthContext } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuthContext();
    const router = useRouter()
    
    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (loading) {
        return (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        );
    }

  
    if (!isAuthenticated) {
        router.push("/admin/login");
        return null;
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar fixe à gauche */}
                <DashboardSideBar />
                {/* Contenu des pages enfants */}
                <main className="w-full p-6 bg-background">{children}</main>
            </div>
        </SidebarProvider>
    );
}
