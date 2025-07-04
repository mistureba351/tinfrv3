"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Camera, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// ---- kiwify-globals.ts ----
declare global {
  interface Window {
    nextUpsellURL?: string
    nextDownsellURL?: string
  }
}

export default function EmergencyDownsellPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60) // 12 hours in seconds

  // Set current date and time
  useEffect(() => {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, "0")
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")

    setCurrentDateTime(`${day}/${month}/${year} ${hours}:${minutes}`)
  }, [])

  // Get phone and photo from URL params or sessionStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tel = urlParams.get("tel") || sessionStorage.getItem("phoneNumber") || "+1 (555) 123-4567"
    const photo = urlParams.get("photo") || sessionStorage.getItem("profilePhoto")

    setPhoneNumber(tel)
    if (photo) {
      setProfilePhoto(photo)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load Kiwify script - FIXED: usando o mesmo padrão da página que funciona
  useEffect(() => {
    // Set global variables for Kiwify
    window.nextUpsellURL = "https://tindercheck.site/emergency2"
    window.nextDownsellURL = "https://tindercheck.site/emergency2"
    
    // Load Kiwify script
    const script = document.createElement('script')
    script.src = 'https://snippets.kiwify.com/upsell/upsell.min.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      document.head.removeChild(script)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Emergency Alert Header */}
      <div className="bg-orange-600 text-white text-center py-4 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">⚠️ DERNIÈRE CHANCE !</h1>
          <p className="text-lg sm:text-xl">Ne perdez pas l'accès au rapport complet</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Special Offer */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🔥 OFFRE SPÉCIALE DERNIÈRE CHANCE</h2>
            <p className="text-lg font-semibold text-orange-600 mb-4">
              Vous étiez sur le point de perdre l'accès permanent...
            </p>
            <p className="text-gray-700 mb-6">
              Puisque vous êtes arrivé jusqu'ici, nous faisons une offre spéciale qui ne sera jamais répétée.
            </p>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="text-2xl font-bold text-gray-400 line-through mb-2">€47</div>
              <div className="text-4xl font-bold text-orange-600 mb-4">€27</div>
              <div className="text-sm text-gray-600 mb-4">42% de réduction - Aujourd'hui seulement</div>

              {/* FIXED: Kiwify OneClick Buttons usando exatamente o mesmo padrão da página que funciona */}
              <div className="text-center">
                <button 
                  id="kiwify-upsell-trigger-tgJtMrc" 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded border border-green-700 cursor-pointer text-lg mb-4 w-full transition-colors"
                >
                  ✅ JE VEUX ACCÉDER AU CONTENU SUSPECT MAINTENANT
                </button>
                
                <div 
                  id="kiwify-upsell-cancel-trigger" 
                  className="mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Je ne veux pas accéder au contenu suspect maintenant
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You're Missing */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">❌ Ce que vous ratez en refusant :</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Photos intimes non censurées</h4>
                  <p className="text-sm text-gray-600">Toutes les photos qu'il/elle envoie aux autres</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Conversations complètes</h4>
                  <p className="text-sm text-gray-600">Ce qui est vraiment dit dans les messages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Localisation exacte des rendez-vous</h4>
                  <p className="text-sm text-gray-600">Où et quand les rendez-vous sont organisés</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Pressure */}
        <Card className="border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">⏰ LE TEMPS S'ÉPUISE !</h3>
              <p className="text-lg font-semibold text-gray-700">
                Cette offre expire dans : <span className="text-red-600 font-mono">{formatTime(timeLeft)}</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Après l'expiration du temps, vous n'aurez plus jamais accès à ces informations.
              </p>
              <p className="text-red-600 font-semibold">
                Les données seront définitivement supprimées pour des raisons de confidentialité.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">✅ Dernière chance de découvrir la vérité</h3>
            <p className="text-gray-700 mb-6">
              Ne laissez pas le doute vous consumer. Pour seulement 27€, vous aurez un accès complet et définitif à
              toutes les informations.
            </p>

            {/* FIXED: Final CTA usando o mesmo padrão da página que funciona */}
            <div className="text-center">
              <button 
                id="kiwify-upsell-trigger-tgJtMrc" 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded border border-green-700 cursor-pointer text-lg mb-4 w-full max-w-md transition-colors"
              >
                ✅ JE VEUX ACCÉDER AU CONTENU SUSPECT MAINTENANT
              </button>
              
              <div 
                id="kiwify-upsell-cancel-trigger" 
                className="mt-4 cursor-pointer text-base underline text-blue-600 hover:text-blue-800 transition-colors"
              >
                Je ne veux pas accéder au contenu suspect maintenant
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
