"use client"

import { motion } from "framer-motion"
import { Heart, Star, Baby } from "lucide-react"
import Image from "next/image"

const storyItems = [
  {
    icon: Heart,
    title: "Notre Amour",
    description: "Tout a commence par un regard, une complicite unique qui ne nous a jamais quittes. Ensemble, nous avons construit notre nid douillet, rempli de rires et de tendresse.",
    image: "/images/couple.jpg"
  },
  {
    icon: Star,
    title: "Le Plus Beau Secret",
    description: "Un matin de decembre, deux petites lignes ont change nos vies a jamais. Le plus beau des secrets grandissait deja, promesse d'un bonheur infini.",
    image: "/images/announcement.jpg"
  },
  {
    icon: Baby,
    title: "Bientot Trois",
    description: "Chaque jour qui passe nous rapproche de cette rencontre tant attendue. Nous preparons avec amour l'arrivee de ce petit etre qui fait deja battre nos coeurs.",
    image: "/images/nursery.jpg"
  }
]

export function StorySection() {
  return (
    <section id="story" className="py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4">
            Notre parcours
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            Une Histoire d&apos;Amour
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {storyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-16 items-center`}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                  {item.description}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
