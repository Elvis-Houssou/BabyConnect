"use client"

import { useState } from "react"
import { Search, Check, X, MessageSquare, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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

interface GuestsListProps {
  guests: Guest[]
}

export function GuestsList({ guests }: GuestsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "attending" | "not_attending">("all")

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "attending" && guest.attending) ||
      (filter === "not_attending" && !guest.attending)

    return matchesSearch && matchesFilter
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="w-5 h-5 text-primary" />
          Liste des Invites
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un invite..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Tous ({guests.length})
            </Button>
            <Button
              variant={filter === "attending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("attending")}
            >
              Presents ({guests.filter((g) => g.attending).length})
            </Button>
            <Button
              variant={filter === "not_attending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("not_attending")}
            >
              Absents ({guests.filter((g) => !g.attending).length})
            </Button>
          </div>
        </div>

        {/* Table */}
        {filteredGuests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucun invite trouve
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden sm:table-cell">Personnes</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium text-foreground">
                      {guest.first_name} {guest.last_name}
                      <span className="block md:hidden text-xs text-muted-foreground">
                        {guest.email}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {guest.email}
                    </TableCell>
                    <TableCell>
                      {guest.attending ? (
                        <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                          <Check className="w-3 h-3 mr-1" />
                          Present
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <X className="w-3 h-3 mr-1" />
                          Absent
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {guest.attending ? guest.number_of_guests : "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {new Date(guest.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {guest.message ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-foreground">
                                Message de {guest.first_name} {guest.last_name}
                              </DialogTitle>
                            </DialogHeader>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                              {guest.message}
                            </p>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-muted-foreground/50">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
