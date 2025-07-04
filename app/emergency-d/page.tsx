"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Camera, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

  // Load Kiwify script
  useEffect(() => {
    // Set global variables for Kiwify
    if (typeof window !== "undefined") {
      window.nextUpsellURL = "https://tindercheck.site/emergency2"
      window.nextDownsellURL = "https://tindercheck.site/emergency2"
    }

    // Load Kiwify upsell script
    const script = document.createElement('script')
    script.src = 'https://snippets.kiwify.com/upsell/upsell.min.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Kiwify Button Component
  const KiwifyButton = () => (
    <div style={{ textAlign: "center", width: "100%" }}>
      <button
        id="kiwify-upsell-trigger-tgJtMrc"
        style={{
          backgroundColor: "#27AF60",
          padding: "12px 16px",
          cursor: "pointer",
          color: "#FFFFFF",
          fontWeight: "600",
          borderRadius: "4px",
          border: "1px solid #27AF60",
          fontSize: "20px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#229954"
          e.target.style.transform = "translateY(-2px)"
          e.target.style.boxShadow = "0 4px 12px rgba(39, 175, 96, 0.3)"
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#27AF60"
          e.target.style.transform = "translateY(0)"
          e.target.style.boxShadow = "none"
        }}
      >
        ✅ JE VEUX ACCÉDER AU CONTENU SUSPECT MAINTENANT
      </button>
      <div
        id="kiwify-upsell-cancel-trigger"
        style={{
          marginTop: "1rem",
          cursor: "pointer",
          fontSize: "16px",
          textDecoration: "underline",
          fontFamily: "sans-serif",
          color: "#004faa",
          transition: "color 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.color = "#374151"
        }}
        onMouseOut={(e) => {
          e.target.style.color = "#004faa"
        }}
      >
        Je ne veux pas accéder au contenu suspect maintenant
      </div>
    </div>
  )

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

              {/* Kiwify Button */}
              <KiwifyButton />
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

            {/* Kiwify Button */}
            <KiwifyButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
