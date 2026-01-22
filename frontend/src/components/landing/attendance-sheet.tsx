"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function AttendanceSheet() {
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
                        
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}