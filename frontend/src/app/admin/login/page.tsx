"use client"

import React, { useEffect } from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, Loader2, AlertCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Auth from "@/api/admin"
import { useAuthContext } from "@/context/AuthContext";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { isAuthenticated } = useAuthContext();

    // useEffect(() => {
    //     if (!loading && isAuthenticated) {
    //       router.replace("/admin/dashboard");
    //     }
    // }, [isAuthenticated, loading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            setLoading(true)
            setError(null)

            const res = await Auth.login({username: email, password})

            if (res.data.success) {
                router.push("/admin/dashboard")
            } else {
                setError("Email ou mot de passe incorrect")
                setLoading(false)
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-primary fill-primary/30" />
                <span className="font-serif text-xl text-foreground">Bientot Bebe</span>
            </Link>
            <h1 className="font-serif text-3xl text-foreground mb-2">
                Espace Administrateur
            </h1>
            <p className="text-muted-foreground">
                Connectez-vous pour acceder au tableau de bord
            </p>
            </div>

            <div className="bg-card rounded-2xl shadow-lg p-8 border border-border">
            {error && (
                <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
                >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
                </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    />
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                    id="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    />
                </div>
                </div>

                <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
                >
                {loading ? (
                    <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connexion...
                    </>
                ) : (
                    "Se connecter"
                )}
                </Button>
            </form>
            </div>

            <p className="text-center mt-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
                Retour a l&apos;annonce
            </Link>
            </p>
        </motion.div>
        </div>
    )
}
