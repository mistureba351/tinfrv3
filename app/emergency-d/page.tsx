"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Camera, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useGeolocation } from "@/hooks/useGeolocation"

export default function EmergencyDownsellPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60) // 12 hours in seconds

  // Get geolocation
  const { city, loading: geoLoading, error: geoError } = useGeolocation()

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

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // OneClick event handlers para downsell
  const handleDownsellButton = () => {
    try {
      // Verificar se o script OneClick está disponível
      if (typeof window !== 'undefined' && window.fornpay) {
        // Tentar acionar o OneClick com o ID do downsell
        window.fornpay.trigger('ta7acpjusv')
      } else {
        console.warn('OneClick script not loaded yet')
        // Fallback: você pode adicionar uma lógica alternativa aqui
      }
    } catch (error) {
      console.error('Error triggering OneClick downsell:', error)
    }
  }

  const handleDeclineOffer = () => {
    try {
      // Redirecionar para o próximo downsell
      window.location.href = "https://www.tindercheck.online/emergency2"
    } catch (error) {
      console.error('Error redirecting to next downsell:', error)
    }
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">⚠️ LAST CHANCE!</h1>
          <p className="text-lg sm:text-xl">Don't lose access to the complete report</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Special Offer */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">🔥 LAST CHANCE SPECIAL OFFER</h2>
            <p className="text-lg font-semibold text-orange-600 mb-4">You were about to lose permanent access...</p>
            <p className="text-gray-700 mb-6">
              Since you made it this far, we're making a special offer that will never be repeated.
            </p>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="text-2xl font-bold text-gray-400 line-through mb-2">$197</div>
              <div className="text-4xl font-bold text-orange-600 mb-4">$27</div>
              <div className="text-sm text-gray-600 mb-4">86% discount - Today only</div>

              {/* Updated One-Click Downsell - Convertido para botões */}
              <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                <button
                  onClick={handleDownsellButton}
                  data-fornpay="ta7acpjusv"
                  data-downsell="https://www.tindercheck.online/emergency2"
                  className="fornpay_btn"
                  style={{
                    background: "#3d94f6",
                    backgroundImage: "linear-gradient(to bottom, #3d94f6, #1e62d0)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontFamily: "Arial",
                    fontSize: "18px",
                    fontWeight: "bold",
                    padding: "15px 25px",
                    border: "1px solid #337fed",
                    textDecoration: "none",
                    display: "block",
                    cursor: "pointer",
                    textAlign: "center",
                    marginBottom: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#1e62d0"
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 4px 12px rgba(61, 148, 246, 0.3)"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#3d94f6"
                    e.target.style.backgroundImage = "linear-gradient(to bottom, #3d94f6, #1e62d0)"
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "none"
                  }}
                >
                  YES, I ACCEPT THIS OFFER
                </button>
                <button
                  onClick={handleDeclineOffer}
                  data-downsell="https://www.tindercheck.online/emergency2"
                  className="fornpay_downsell"
                  style={{
                    color: "#004faa",
                    fontFamily: "Arial",
                    marginTop: "10px",
                    fontSize: "16px",
                    fontWeight: "100",
                    textDecoration: "none",
                    display: "block",
                    cursor: "pointer",
                    textAlign: "center",
                    background: "none",
                    border: "none",
                    padding: "0",
                    width: "100%",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#374151"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#004faa"
                  }}
                >
                  I will decline this offer
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You're Missing */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">❌ What you're missing by refusing:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Uncensored intimate photos</h4>
                  <p className="text-sm text-gray-600">All the photos he/she is sending to others</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Complete conversations</h4>
                  <p className="text-sm text-gray-600">What's really being said in the messages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Exact location of meetings</h4>
                  <p className="text-sm text-gray-600">Where and when meetings are being arranged</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Pressure */}
        <Card className="border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">⏰ TIME RUNNING OUT!</h3>
              <p className="text-lg font-semibold text-gray-700">
                This offer expires in: <span className="text-red-600 font-mono">{formatTime(timeLeft)}</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                After time runs out, you will never have access to this information again.
              </p>
              <p className="text-red-600 font-semibold">The data will be permanently deleted for privacy reasons.</p>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-green-700 mb-4">✅ Last chance to discover the truth</h3>
            <p className="text-gray-700 mb-6">
              Don't let doubt consume you. For just $27, you'll have complete and definitive access to all the
              information.
            </p>

            {/* Repeat the downsell offer - Convertido para botões */}
            <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
              <button
                onClick={handleDownsellButton}
                data-fornpay="ta7acpjusv"
                data-downsell="https://www.tindercheck.online/emergency2"
                className="fornpay_btn"
                style={{
                  background: "#3d94f6",
                  backgroundImage: "linear-gradient(to bottom, #3d94f6, #1e62d0)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontFamily: "Arial",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "15px 25px",
                  border: "1px solid #337fed",
                  textDecoration: "none",
                  display: "block",
                  cursor: "pointer",
                  textAlign: "center",
                  marginBottom: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#1e62d0"
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 4px 12px rgba(61, 148, 246, 0.3)"
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#3d94f6"
                  e.target.style.backgroundImage = "linear-gradient(to bottom, #3d94f6, #1e62d0)"
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }}
              >
                YES, I ACCEPT THIS OFFER
              </button>
              <button
                onClick={handleDeclineOffer}
                data-downsell="https://www.tindercheck.online/emergency2"
                className="fornpay_downsell"
                style={{
                  color: "#004faa",
                  fontFamily: "Arial",
                  marginTop: "10px",
                  fontSize: "16px",
                  fontWeight: "100",
                  textDecoration: "none",
                  display: "block",
                  cursor: "pointer",
                  textAlign: "center",
                  background: "none",
                  border: "none",
                  padding: "0",
                  width: "100%",
                  transition: "color 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#374151"
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#004faa"
                }}
              >
                I will decline this offer
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* One-click script */}
      <script src="https://app.mundpay.com/js/oneclick.js"></script>
    </div>
  )
}
