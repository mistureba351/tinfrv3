"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, MessageSquare, ImageIcon, Video, Shield, Clock, CheckCircle } from "lucide-react"

export default function Emergency2Page() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    // Load FornPay script
    const script = document.createElement("script")
    script.src = "https://app.mundpay.com/js/oneclick.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      clearInterval(timer)
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handler para o botão principal do OneClick
  const handleMainButton = () => {
    // Verifica se o script OneClick está disponível
    if (typeof window !== "undefined" && (window as any).fornpay) {
      try {
        // Aciona o OneClick com o data-fornpay
        ;(window as any).fornpay.trigger("vj0t34cecg")
      } catch (error) {
        console.error("Erro ao acionar OneClick:", error)
        // Fallback: redirecionar para uma página de checkout manual se necessário
        // window.location.href = '/checkout'
      }
    } else {
      console.warn("Script OneClick não está disponível ainda")
      // Fallback: redirecionar para uma página de checkout manual se necessário
      // window.location.href = '/checkout'
    }
  }

  // Handler para o downsell
  const handleDownsell = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://www.tindercheck.site/thanks"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Sticky Warning Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 text-center font-bold text-sm md:text-base shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5 animate-pulse" />🚨 NE FERMEZ PAS OU N'ACTUALISEZ PAS CETTE PAGE, SINON VOUS
          POURRIEZ RENCONTRER UNE ERREUR AVEC VOTRE ACHAT.
        </div>
      </div>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">OFFRE EXCLUSIVE - TEMPS LIMITÉ</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Recover <span className="text-red-600">Récupérer les Messages Supprimés</span>
              <br />& Hidden Content
            </h1>

            <div className="bg-white rounded-lg p-6 shadow-xl border-2 border-red-200 mb-8">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                <Clock className="w-6 h-6" />
                <span className="text-xl font-bold">L'offre expire dans : {formatTime(timeLeft)}</span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
          >
            {/* Emotional Text Block */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Découvrez Ce Qu'ils Vous Cachent
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl mb-6">
                  <strong>Félicitations pour votre courage à chercher la vérité sur votre relation.</strong> Il est
                  douloureux d'imaginer votre bien-aimé partageant des moments avec quelqu'un d'autre, mais vous avez
                  l'intelligence et la détermination pour découvrir la vérité.
                </p>

                <p className="text-lg mb-6">
                  Notre application avancée vous permet de{" "}
                  <strong>récupérer tous les messages, photos et vidéos supprimés</strong> sans laisser aucun secret
                  vous être caché.
                </p>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                  <p className="text-lg mb-4">
                    <strong>Cette offre exclusive n'est disponible que sur cette page.</strong> Normalement évaluée à{" "}
                    <span className="line-through text-red-500">100€</span>, vous pouvez l'obtenir maintenant pour
                    seulement <span className="text-green-600 font-bold text-2xl">47€</span> (plus de 50% de réduction).
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Messages Supprimés</h3>
                <p className="text-gray-600">Récupérer toutes les conversations et chats WhatsApp supprimés</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Photos Cachées</h3>
                <p className="text-gray-600">Accéder aux images supprimées et aux échanges de photos privées</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                <Video className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Vidéos Secrètes</h3>
                <p className="text-gray-600">Découvrir le contenu vidéo supprimé et les messages vocaux</p>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Ce Que Vous Obtenez :
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Vous recevrez un guide détaillé pour utiliser l'application efficacement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Garantie de remboursement de 30 jours incluse
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Accès au support client 24h/24 et 7j/7
                </li>
              </ul>
            </div>

            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Agissez maintenant pour éviter la tromperie et assurer l'honnêteté dans votre relation.</strong>{" "}
                Cliquez ci-dessous avant que cette opportunité ne disparaisse.
              </p>
            </div>

            {/* One-Click Purchase Section - CORRIGIDO */}
            <div className="text-center">
              <div style={{ width: "auto", maxWidth: "400px", margin: "0 auto" }}>
                <button onClick={handleMainButton} data-fornpay="vj0t34cecg" className="fornpay_btn" type="button">
                  OUI, JE VEUX VOIR LES MESSAGES SUPPRIMÉS ET CACHÉS
                </button>
                <button
                  onClick={handleDownsell}
                  data-downsell="https://www.tindercheck.site/thanks"
                  className="fornpay_downsell"
                  type="button"
                >
                  Non, je me fiche que mon partenaire ait déjà supprimé des messages, audios ou même des photos pour me
                  les cacher.
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-center text-gray-600"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <span>Paiement Sécurisé</span>
              <span>•</span>
              <span>Crypté SSL</span>
              <span>•</span>
              <span>Garantie de Remboursement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styles for FornPay Integration - CORRIGIDO */}
      <style jsx>{`
        .fornpay_btn {
          background: #3d94f6;
          background-image: -webkit-linear-gradient(top, #3d94f6, #1e62d0);
          background-image: -moz-linear-gradient(top, #3d94f6, #1e62d0);
          background-image: -ms-linear-gradient(top, #3d94f6, #1e62d0);
          background-image: -o-linear-gradient(top, #3d94f6, #1e62d0);
          background-image: -webkit-gradient(to bottom, #3d94f6, #1e62d0);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          color: #fff;
          font-family: Arial;
          font-size: 18px;
          font-weight: bold;
          padding: 15px 25px;
          border: 1px solid #337fed;
          text-decoration: none;
          display: block;
          cursor: pointer;
          text-align: center;
          transition: all 0.3s ease;
          text-transform: uppercase;
          width: 100%;
          /* Estilos adicionais para button */
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .fornpay_btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(61, 148, 246, 0.3);
        }

        .fornpay_btn:focus {
          outline: 2px solid #337fed;
          outline-offset: 2px;
        }

        .fornpay_btn:active {
          transform: translateY(0);
        }

        .fornpay_downsell {
          color: #004faa;
          font-family: Arial;
          margin-top: 15px;
          font-size: 16px !important;
          font-weight: 100;
          text-decoration: none;
          display: block;
          cursor: pointer;
          text-align: center;
          transition: color 0.3s ease;
          background: none;
          border: none;
          width: 100%;
          /* Estilos adicionais para button */
          outline: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .fornpay_downsell:hover {
          color: #0066cc;
          text-decoration: underline;
        }

        .fornpay_downsell:focus {
          outline: 2px solid #004faa;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}
