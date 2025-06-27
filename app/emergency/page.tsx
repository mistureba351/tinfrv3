"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Shield, CheckCircle, Camera, MessageCircle, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useGeolocation } from "@/hooks/useGeolocation"
import Link from "next/link"

export default function EmergencyPage() {
  const [currentDateTime, setCurrentDateTime] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds

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
    const tel = urlParams.get("tel") || sessionStorage.getItem("phoneNumber") || "WhatsApp Research"
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

  // OneClick event handlers
  const handleMainButton = () => {
    try {
      // Verificar se o script OneClick está disponível
      if (typeof window !== 'undefined' && window.fornpay) {
        // Tentar acionar o OneClick com o ID do fornpay
        window.fornpay.trigger('ihkj3cpssf')
      } else {
        console.warn('OneClick script not loaded yet')
        // Fallback: você pode adicionar uma lógica alternativa aqui
        // Por exemplo, mostrar uma mensagem ou tentar novamente após um delay
      }
    } catch (error) {
      console.error('Error triggering OneClick:', error)
    }
  }

  const handleDownsell = () => {
    try {
      // Redirecionar para o downsell
      window.location.href = "https://www.tindercheck.online/emergency-d"
    } catch (error) {
      console.error('Error redirecting to downsell:', error)
    }
  }

  const suspiciousStats = [
    { count: 58, description: "suspicious messages" },
    { count: 13, keyword: "delicious", description: "posts contained the word/similar" },
    { count: 41, keyword: "Love", description: "messages contained the word/similar" },
    { count: 20, description: "photos and 5 videos are hidden by a password on the phone" },
    { count: 8, keyword: "Secret", description: "messages contained the word/similar" },
    { count: 2, description: "archived conversations have been marked as suspicious" },
    { count: 9, description: "recently received single-view images were also identified and restored" },
    { count: 7, description: `suspicious locations have been detected near ${city || "your area"}` },
  ]

  const blockedImages = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  ]

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Emergency Alert Header */}
      <div className="bg-red-600 text-white text-center py-4 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">🚨 EMERGENCY ALERT!</h1>
          <p className="text-lg sm:text-xl">Your relationship could be in danger!</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Algorithm Detection */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Our data-driven algorithm, using words and photos, detected suspicious messages and files…
            </h2>
            <p className="text-lg font-semibold text-green-600">
              Report exported with 98% accuracy on: <span className="text-blue-600">{currentDateTime}</span>
            </p>
          </CardContent>
        </Card>

        {/* Profile Photo and Phone */}
        {(profilePhoto || phoneNumber) && (
          <Card>
            <CardContent className="p-6 text-center">
              {profilePhoto && (
                <img
                  src={profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mx-auto mb-4 border-4 border-green-500"
                />
              )}
              {phoneNumber && <p className="text-xl font-semibold text-green-600">{phoneNumber}</p>}
            </CardContent>
          </Card>
        )}

        {/* Suspicious Content Summary */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              We found <span className="text-red-600 font-bold">58</span> suspicious messages:
            </h3>
            <div className="space-y-3">
              {suspiciousStats.map((stat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">
                    {stat.keyword ? (
                      <>
                        The <span className="text-red-600 font-bold">{stat.count}</span> {stat.description}{" "}
                        <span className="text-red-600 font-bold">"{stat.keyword}"</span>.
                      </>
                    ) : (
                      <>
                        <span className="text-red-600 font-bold">{stat.count}</span> {stat.description}.
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Messages Detection */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                We have detected suspicious messages on WhatsApp.
              </h3>
              <p className="text-red-600 font-semibold">(Get access to the app to view messages.)</p>
            </div>

            {/* Mock WhatsApp Interface */}
            <div className="bg-white rounded-lg p-4 max-w-sm mx-auto border shadow-lg">
              <div className="space-y-3">
                {[
                  { name: "Unknown Contact", time: "15:08", preview: "Hey beautiful..." },
                  { name: "Secret Chat", time: "14:32", preview: "Can't wait to see you..." },
                  { name: "Hidden", time: "13:45", preview: "Delete this message..." },
                ].map((chat, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm">{chat.name}</span>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate" style={{ filter: "blur(2px)" }}>
                        {chat.preview}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nudity Detection */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                We have detected photos and videos containing nudity.
              </h3>
              <p className="text-red-600 font-semibold">(Get access to the app to view photos without censorship.)</p>
            </div>

            {/* Censored Photo Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-w-md mx-auto">
              {blockedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Censored ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ filter: "blur(12px) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Tracking */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              The phone you want to track was recently located here.
            </h3>

            {/* Location Info */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">{city ? `Last seen in ${city}` : "Locating..."}</span>
              </div>
            </div>

            {/* Mock Map */}
            <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-green-200 opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2 animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-700">Approximate Location</p>
                <p className="text-xs text-gray-600">{city || "Loading location..."}</p>
              </div>
              {/* Mock location circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-blue-500 rounded-full opacity-30"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Promotion */}
        <Card className="border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                You have reached the end of your free consultation.
              </h3>
            </div>

            <div className="space-y-4 text-left max-w-2xl mx-auto text-gray-700">
              <p>I know you're tired of guessing and want some real answers.</p>
              <p>
                Our satellite tracking system is the most advanced technology to find out what's going on. But there's a
                catch: keeping the satellites and servers running 24/7 is expensive.
              </p>
              <p>That's why, unfortunately, we can't provide more than 5% of the information we uncover for free.</p>
              <p>The good news? You don't have to spend a fortune to hire a private investigator.</p>
              <p>
                We've developed an app that puts that same technology in your hands and lets you track everything
                discreetly and efficiently on your own.
              </p>
              <p className="font-semibold text-red-600">
                It's time to stop guessing and find out the truth. The answers are waiting for you. Click now and get
                instant access – before it's too late!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time-Sensitive Offer */}
        <Card className="border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">🔥 90% OFF TODAY ONLY!</h3>
              <p className="text-lg font-semibold text-gray-700">
                Offer expires in: <span className="text-red-600 font-mono">{formatTime(timeLeft)}</span>
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-gray-400 line-through mb-2">$299</div>
                <div className="text-5xl font-bold text-red-600 mb-4">$47</div>

                {/* Features */}
                <div className="space-y-2 text-left mb-6">
                  {["30 days warranty", "Access for 1 year", "Tracking up to 3 numbers"].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* OneClick Upsell Buttons - Convertidos para botões */}
                <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                  <button
                    onClick={handleMainButton}
                    data-fornpay="ihkj3cpssf"
                    className="fornpay_btn"
                    style={{
                      background: "#28a745",
                      backgroundImage: "linear-gradient(to bottom, #28a745, #1e7e34)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontFamily: "Arial",
                      fontSize: "18px",
                      fontWeight: "bold",
                      padding: "16px 24px",
                      border: "1px solid #1e7e34",
                      textDecoration: "none",
                      display: "block",
                      cursor: "pointer",
                      textAlign: "center",
                      marginBottom: "10px",
                      width: "100%",
                      boxSizing: "border-box"
                    }}
                  >
                    ✅ I WANT ACCESS TO THE SUSPICIOUS CONTENT NOW
                  </button>
                  <button
                    onClick={handleDownsell}
                    data-downsell="https://www.tindercheck.online/emergency-d"
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
                      width: "100%"
                    }}
                  >
                    I don't want access to suspicious content now
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guarantee */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-4">30-Day Satisfaction or Money Back Guarantee</h3>
            <div className="text-gray-700 space-y-3 max-w-2xl mx-auto">
              <p>
                Under French law, we are required to refund you if you are not satisfied with the app within 14 days.
                However, because we are so confident that our app works perfectly, we have extended this guarantee to 30
                days.
              </p>
              <p>
                This means you have twice as much time to test the app and see the results for yourself – completely
                risk-free. If for any reason you are not satisfied, we will refund you – no questions asked.
              </p>
              <p className="font-semibold">
                If you have any questions regarding refunds, please contact Customer Service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OneClick Script */}
      <script src="https://app.mundpay.com/js/oneclick.js"></script>
    </div>
  )
}
