"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSideBar } from "@/components/dashboardSidebar"
import { useAuthContext } from "@/context/AuthContext";
import { Loader2 } from "lucide-react"

export default function DashboardContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuthContext();
    const router = useRouter()
    
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
        <div>ok</div>
    )
}