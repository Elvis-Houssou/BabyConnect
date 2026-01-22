"use client"

import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary fill-primary/30" />
          <span className="font-serif text-xl text-foreground">Bientot Bebe</span>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Merci de faire partie de notre bonheur
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link 
            href="/admin/login" 
            className="hover:text-foreground transition-colors"
          >
            Espace Admin
          </Link>
        </div>
        <p className="text-muted-foreground/60 text-xs mt-8">
          Fait avec amour - 2026
        </p>
      </div>
    </footer>
  )
}
