import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import Link from "next/link"
import Auth from "@/api/admin"
import { useAuthContext } from "@/context/AuthContext"

const items = [
    {
      title: "Recap",
      url: "/admin/dashboard/home",
      icon: Home,
    },
    {
      title: "Liste des invités",
      url: "/admin/dashboard/guest",
      icon: Inbox,
    },
]
export function DashboardSideBar () {
    const { logout } = useAuthContext()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link  href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                    </Link >
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Deconnexion
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}