"use client"

import { useEffect, useState } from "react"
import { Gift, Heart } from "lucide-react"
import { config } from "../config"

export default function RomanticBouquet() {
  const [boxOpened, setBoxOpened] = useState(false)
  const [showBouquet, setShowBouquet] = useState(false)
  const [bouquetFullScreen, setBouquetFullScreen] = useState(false)
  const [bouquetFading, setBouquetFading] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [clickCount, setClickCount] = useState(0)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [showSystemInfo, setShowSystemInfo] = useState(false)
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    console.log("Developer by Teymensel - https://teymensel.com/")
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'I') {
        setShowInfo(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault()
      setContextMenuPosition({ x: event.clientX, y: event.clientY })
      setShowContextMenu(true)
    }

    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1
        if (newCount === 1) {
          // İlk tıklama, timer başlat
          const timer = setTimeout(() => {
            setClickCount(0)
          }, config.specialMessage.timeWindow)
          setClickTimer(timer)
        } else if (newCount >= config.specialMessage.clickCount) {
          // Belirtilen tıklama sayısı, mesaj göster ve reset
          setShowSpecialMessage(true)
          setClickCount(0)
          if (clickTimer) {
            clearTimeout(clickTimer)
            setClickTimer(null)
          }
          return 0
        }
        return newCount
      })
    }

    const handleGlobalClick = (event: MouseEvent) => {
      // Context menu dışına tıklayınca kapat
      if (showContextMenu && !(event.target as Element).closest('.context-menu')) {
        setShowContextMenu(false)
      }
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleClick)
    window.addEventListener('click', handleGlobalClick)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('click', handleGlobalClick)
      if (clickTimer) {
        clearTimeout(clickTimer)
      }
    }
  }, [showContextMenu, clickTimer])

  useEffect(() => {
    if (showHeart) {
      const script = document.createElement("script")
      script.src = "/heart-animation.js"
      document.body.appendChild(script)

      setTimeout(() => {
        setShowMessage(true)
      }, 5000)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [showHeart])

  const handleBoxClick = () => {
    if (!boxOpened) {
      setBoxOpened(true)
      setTimeout(() => setShowBouquet(true), 800)
      setTimeout(() => setBouquetFullScreen(true), 1300)
      setTimeout(() => setBouquetFading(true), 3500)
      setTimeout(() => setShowHeart(true), 3800)
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
      {showContextMenu && (
        <div
          className="context-menu absolute z-70 bg-rose-900/95 border border-rose-500 rounded-lg shadow-lg py-2 min-w-48"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
        >
          <button
            className="w-full text-left px-4 py-2 text-rose-100 hover:bg-rose-800 transition-colors"
            onClick={() => {
              setShowInfo(true)
              setShowContextMenu(false)
            }}
          >
            Yapımcı
          </button>
          <button
            className="w-full text-left px-4 py-2 text-rose-100 hover:bg-rose-800 transition-colors"
            onClick={() => {
              setShowSystemInfo(true)
              setShowContextMenu(false)
            }}
          >
            Sistem Bilgisi
          </button>
          <button
            className="w-full text-left px-4 py-2 text-rose-100 hover:bg-rose-800 transition-colors"
            onClick={() => {
              window.open('https://teymensel.com', '_blank')
              setShowContextMenu(false)
            }}
          >
            Feedback
          </button>
        </div>
      )}

      {showSpecialMessage && (
        <div className="absolute inset-0 z-80 flex items-center justify-center bg-black/90 animate-fade-in">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-light text-rose-300 mb-2">
              {config.names.first}
            </h1>
            <div className="text-6xl md:text-8xl text-rose-400 font-light mb-4 animate-heartbeat">
              ❤️‍🔥
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-rose-300">
              {config.names.second}
            </h1>
            <button
              onClick={() => setShowSpecialMessage(false)}
              className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {showSystemInfo && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-black/80">
          <div className="bg-rose-900/90 p-8 rounded-lg max-w-md mx-4 text-center animate-fade-in-up">
            <h2 className="text-2xl font-light text-rose-200 mb-4">Sistem Bilgisi</h2>
            <div className="text-rose-100 mb-6 text-left">
              <p><strong>Uygulama:</strong> {config.app.name}</p>
              <p><strong>Sürüm:</strong> {config.app.version}</p>
              <p><strong>Developer:</strong> {config.app.developer}</p>
            </div>
            <button
              onClick={() => setShowSystemInfo(false)}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {showInfo && (
        <div className="absolute inset-0 z-60 flex items-center justify-center bg-black/80">
          <div className="bg-rose-900/90 p-8 rounded-lg max-w-md mx-4 text-center animate-fade-in-up">
            <h2 className="text-2xl font-light text-rose-200 mb-4">Bilgi</h2>
            <p className="text-rose-100 mb-6">
              Bu uygulama{' '}
              <button
                onClick={() => window.open('https://teymensel.com', '_blank')}
                className="text-rose-300 hover:text-rose-200 underline transition-colors"
              >
                Teymensel
              </button>{' '}
              tarafından tasarlanmıştır.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {showHeart && (
        <canvas
          id="heart"
          className={`absolute left-0 top-0 w-full h-full z-40 transition-opacity duration-1000 ${
            showMessage ? "opacity-0" : "animate-fade-in"
          }`}
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        />
      )}

      {showMessage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          {/* Floating hearts in background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-rose-500/20 animate-float-hearts"
                size={Math.random() * 40 + 20}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>

          {/* Message content */}
          <div className="relative z-10 max-w-2xl mx-auto px-8 text-center animate-fade-in-up">
            <div className="mb-8 flex justify-center">
              <Heart className="text-rose-500 animate-heartbeat" size={80} fill="currentColor" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-rose-400 mb-6 leading-relaxed">
              Uzak mesafede olsak da...
            </h1>
            <p className="text-xl md:text-2xl text-rose-300/90 font-light leading-relaxed mb-4">
              Sana bu şekilde çiçek vermek istedim
            </p>
            <p className="text-lg md:text-xl text-rose-300/80 font-light leading-relaxed mb-8">
              Elimden bu kadarı geldi ama
            </p>
            <p className="text-3xl md:text-4xl text-rose-400 font-light leading-relaxed">Seni çok seviyorum sevgilim</p>
            <div className="mt-8 flex justify-center items-center gap-8">
              <img
                src="/buketkedi.png"
                alt="Buket Kedi"
                className="w-32 h-32 object-contain animate-slide-in-left"
                style={{ animationDelay: "1s" }}
              />
              <img
                src="/gultutankedi.png"
                alt="Gül Tutan Kedi"
                className="w-32 h-32 object-contain animate-slide-in-right"
                style={{ animationDelay: "1.5s" }}
              />
            </div>
            <div className="mt-12 flex justify-center gap-4">
              <Heart className="text-rose-500/60 animate-pulse" size={24} fill="currentColor" />
              <Heart
                className="text-rose-500/60 animate-pulse"
                size={24}
                fill="currentColor"
                style={{ animationDelay: "0.2s" }}
              />
              <Heart
                className="text-rose-500/60 animate-pulse"
                size={24}
                fill="currentColor"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      )}

      {!boxOpened && (
        <div onClick={handleBoxClick} className="relative z-20 cursor-pointer group">
          <div className="relative animate-bounce-slow">
            <Gift
              size={120}
              className="text-rose-500 group-hover:text-rose-400 transition-colors drop-shadow-[0_0_30px_rgba(244,63,94,0.5)]"
              strokeWidth={1.5}
            />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-rose-400 text-lg font-light tracking-wide">Tıkla ve aç</p>
            </div>
          </div>
        </div>
      )}

      {boxOpened && !showBouquet && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 animate-fly-up opacity-0">
              <Gift size={80} className="text-rose-500" />
            </div>
            <div className="animate-fade-out">
              <Gift size={120} className="text-rose-600" />
            </div>
          </div>
        </div>
      )}

      {showBouquet && (
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-1000 ${
            bouquetFullScreen ? "scale-100" : "scale-50"
          } ${bouquetFading ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/images/design-mode/pngtree-bouquet-of-white-tulips-png-image_13169783.png"
              alt="Flower Bouquet"
              className={`object-contain drop-shadow-[0_0_80px_rgba(244,63,94,0.6)] transition-all duration-1000 ${
                bouquetFullScreen ? "w-full h-full max-w-4xl" : "w-64 h-64"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
