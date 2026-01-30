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
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import Link from "next/link"

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
                deconnecter
            </SidebarFooter>
        </Sidebar>
    )
}