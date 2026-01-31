"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Heart,
  Users,
  UserCheck,
  UserX,
  LogOut,
  MessageSquare,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
// import { AttendanceChart } from "./attendance-chart"
import { GuestsList } from "@/components/dashboard/guests-list"
import { useEffect, useState } from "react"
import Guest from "@/api/guest"
// import { TimelineChart } from "./timeline-chart"

interface Guest {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  attending: boolean
  number_of_guests: number
  message: string | null
  created_at: string
}

interface DashboardContentProps {
  guests: Guest[]
  userEmail: string
}

export default function DashboardContent() {
    const router = useRouter()
    const [guests, setGuests] = useState<Guest>([]);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("houssouelvis@gmail.com");

    const getGuest = async () => {
        try {
            setLoading(true)

            const response = await Guest.get()
            if (response.data.success) {
                setGuests(response.data.guest)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getGuest();
    }, [])


    // Calculate statistics
    const totalGuests = guests?.length
    const attending = guests?.filter((g) => g.attending)
    const notAttending = guests?.filter((g) => !g.attending)
    const totalAttendees = attending.reduce((sum, g) => sum + g.number_of_guests, 0)
    const messagesCount = guests?.filter((g) => g.message).length

    const stats = [
        {
        title: "Total Reponses",
        value: totalGuests,
        icon: Users,
        color: "text-foreground",
        },
        {
        title: "Presents",
        value: attending.length,
        subValue: `${totalAttendees} personnes`,
        icon: UserCheck,
        color: "text-accent",
        },
        {
        title: "Absents",
        value: notAttending.length,
        icon: UserX,
        color: "text-muted-foreground",
        },
        {
        title: "Messages",
        value: messagesCount,
        icon: MessageSquare,
        color: "text-primary",
        },
    ]

    return (
        <div className="min-h-screen w-full bg-background">
            {/* Header */}
            <header className="bg-card border-b border-border sticky top-0 z-50">
            <div className="w-full px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary fill-primary/30" />
                <span className="font-serif text-xl text-foreground">Bientot Bebe</span>
                </Link>
                <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:block">
                    {userEmail}
                </span>
                </div>
            </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8">
                <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                    Tableau de Bord
                </h1>
                <p className="text-muted-foreground">
                    Gerez les reponses de vos invites
                </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        {stat.subValue && (
                            <p className="text-xs text-muted-foreground mt-1">
                            {stat.subValue}
                            </p>
                        )}
                        </CardContent>
                    </Card>
                    </motion.div>
                ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Repartition des Reponses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <AttendanceChart
                            attending={attending.length}
                            notAttending={notAttending.length}
                        /> */}
                    </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                        <Calendar className="w-5 h-5 text-primary" />
                        Inscriptions par Jour
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <TimelineChart guests={guests} /> */}
                    </CardContent>
                    </Card>
                </motion.div>
                </div>

                {/* Guests List */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                >
                <GuestsList guests={guests} />
                </motion.div>
            </motion.div>
            </main>
        </div>
    )
}