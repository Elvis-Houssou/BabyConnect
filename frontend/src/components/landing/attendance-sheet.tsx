"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Guest from "@/api/guest"

type FormState = "idle" | "loading" | "success" | "error"

interface FormErrors {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    attending?: string
    number_of_guests?: string
    error?: string
  }

export function AttendanceSheet() {
    const [formState, setFormState] = useState<FormState>("idle")
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (formData: FormData): FormErrors => {
        const newErrors: FormErrors = {}
        
        const firstName = formData.get("first_name") as string
        const lastName = formData.get("last_name") as string
        const email = formData.get("email") as string
        const numberOfGuests = formData.get("number_of_guests")
    
        if (!firstName || firstName.trim().length < 2) {
          newErrors.first_name = "Le prenom doit contenir au moins 2 caracteres"
        }
    
        if (!lastName || lastName.trim().length < 2) {
          newErrors.last_name = "Le nom doit contenir au moins 2 caracteres"
        }
    
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          newErrors.email = "Veuillez entrer une adresse email valide"
        }
    
       
        if (!numberOfGuests || Number(numberOfGuests) < 1) {
          newErrors.number_of_guests = "Veuillez indiquer le nombre d'invites"
        }
    
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})
        
        const formData = new FormData(e.currentTarget)
        const validationErrors = validateForm(formData)
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          return
        }
    
        setFormState("loading")
    
        try {
          const res = await Guest.create(formData);
          
          if (res.status == 200) {
            setFormState("success")
          } else {
            setErrors({ error: res.data || "Une erreur est survenue" })
            setFormState("error")
          }
        } catch {
          setErrors({ error: "Une erreur inattendue est survenue. Veuillez reessayer." })
          setFormState("error")
        }
    }

    const resetForm = () => {
        setFormState("idle")
        setErrors({})
    }

    return (
        <section id="rsvp" className="py-20 md:py-32 bg-secondary">
            <div className="max-w-2xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <p className="text-muted-foreground uppercase tracking-[0.2em] text-sm mb-4">
                        Confirmez votre presence
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 text-balance">
                        Rejoignez la Celebration
                    </h2>
                    <p className="text-muted-foreground text-lg text-pretty">
                        Nous serions ravis de vous compter parmi nous pour celebrer cette nouvelle vie.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-card rounded-2xl shadow-lg p-6 md:p-10 border border-border"
                >
                    <AnimatePresence mode="wait">
                        {formState === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-8"
                            >
                                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-accent" />
                                <h3 className="font-serif text-2xl text-foreground mb-2">
                                    Merci pour votre reponse !
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Nous avons bien recu votre confirmation et avons hate de vous voir.
                                </p>
                                <Button onClick={resetForm} variant="outline">
                                    Soumettre une autre reponse
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.form
                              key="form"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onSubmit={handleSubmit}
                              className="space-y-6"
                            >
                                {errors.error && (
                                    <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm">{errors.error}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">Prenom *</Label>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            placeholder="Votre prenom"
                                            className={errors.first_name ? "border-destructive" : ""}
                                        />
                                        {errors.first_name && (
                                            <p className="text-sm text-destructive">{errors.first_name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Nom *</Label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Votre nom"
                                            className={errors.last_name ? "border-destructive" : ""}
                                        />
                                        {errors.last_name && (
                                            <p className="text-sm text-destructive">{errors.last_name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        className={errors.email ? "border-destructive" : ""}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telephone (optionnel)</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+33 6 12 34 56 78"
                                    />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <Label htmlFor="number_of_guests">Nombre de personnes *</Label>
                                    <Input
                                        id="number_of_guests"
                                        name="number_of_guests"
                                        type="number"
                                        min="1"
                                        max="10"
                                        defaultValue="1"
                                        className={errors.number_of_guests ? "border-destructive" : ""}
                                    />
                                    {errors.number_of_guests && (
                                        <p className="text-sm text-destructive">{errors.number_of_guests}</p>
                                    )}
                                </motion.div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Un petit mot (optionnel)</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Partagez vos felicitations ou un message..."
                                        rows={4}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    disabled={formState === "loading"}
                                >
                                    {formState === "loading" ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Envoi en cours...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Envoyer ma reponse
                                        </>
                                    )}
                                </Button>
                            </motion.form>

                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}