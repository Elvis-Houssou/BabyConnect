"use client"

import { motion } from "framer-motion"
import { Heart, ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToStory = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-200 blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-accent-200 blur-3xl" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-primary-100 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-12 h-12 mx-auto mb-6 text-primary fill-primary-300" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4"
        >
          Une nouvelle aventure commence
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 text-balance leading-tight"
        >
          Bientot
          <span className="block text-primary">Bebe</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-pretty leading-relaxed"
        >
          Une petite etoile va bientot illuminer notre vie.
          Nous avons hate de partager cette joie immense avec vous.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <div className="bg-card px-8 py-4 rounded-lg shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Date prevue</p>
            <p className="font-serif text-2xl text-foreground">Juin 2026</p>
          </div>
        </motion.div>

      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToStory}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <span className="text-sm">Decouvrir notre histoire</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  )
}
