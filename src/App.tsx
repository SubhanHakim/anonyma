import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import IntroOverlay from './components/IntroOverlay'
import Landing from './components/Landing'
import Archive from './components/Archive'
import Hero from './components/Hero'
import Statement from './components/Statement'
import VoidSection from './components/VoidSection'
import Backrooms from './components/Backrooms'
import Navbar from './components/Navbar'

import { audioManager } from './utils/audio'

function App() {
  const [loading, setLoading] = useState(true)
  const [hasEntered, setHasEntered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const location = useLocation()

  // Title Glitch State
  const [titleText, setTitleText] = useState("ANONYMA")
  const originalTitle = "ANONYMA"
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  // Title Effect Logic
  useEffect(() => {
    if (!mounted || hasEntered) return

    let interval: any;
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
          setTitleText(
            originalTitle.split("").map((_, index) => {
              if (index < iteration) return originalTitle[index];
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }).join(" ")
          );
          if (iteration >= originalTitle.length) {
            clearInterval(interval);
            setTitleText(originalTitle.split("").join(" "));
          }
          iteration += 1 / 3;
        }, 30);
      }
    }, 3000);
    setTitleText(originalTitle.split("").join(" "));
    return () => { clearInterval(glitchInterval); clearInterval(interval); }
  }, [mounted, hasEntered]);

  // Scroll Interaction
  useEffect(() => {
    if (!mounted || hasEntered) return;
    const handleScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 20) triggerEnter();
    };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [mounted, hasEntered]);

  const triggerEnter = () => {
    // START AUDIO ENGINE
    audioManager.init();
    audioManager.playEnter(); // Cinematic impact
    audioManager.playClick(); // Tech blip interaction

    setHasEntered(true);
  };

  const toggleMute = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(!!muted);
  }

  const handleIntroComplete = () => {
    setLoading(false)
    setMounted(true)
  }

  return (
    <div className={`
      relative min-h-screen w-full bg-[#f4f4f5] text-[#1a1a1a] font-mono 
      flex flex-col items-center overflow-hidden
      selection:bg-[#1a1a1a] selection:text-white
      [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#f4f4f5] [&::-webkit-scrollbar-thumb]:bg-[#ccc]
    `}>
      {/* GLOBAL FX */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.05)_50%,rgba(0,0,0,0)_50%),linear-gradient(90deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01),rgba(0,0,0,0.03))] bg-[length:100%_4px,3px_100%]"></div>


      {/* Animation Orchestration */}
      <AnimatePresence mode='wait'>
        {/* PHASE 1: ARRIVAL */}
        {loading && (
          <IntroOverlay key="intro" onComplete={handleIntroComplete} />
        )}

        {/* PHASE 2: THRESHOLD */}
        {!hasEntered && !loading && (
          <Landing
            key="landing"
            onEnter={triggerEnter}
            titleText={titleText}
          />
        )}
      </AnimatePresence>

      {/* PHASE 3: MAIN APP ROUTES */}
      {hasEntered && (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              key="archive"
              className="w-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Navbar />
              <Hero />
              <Statement />
              <Archive />
              <VoidSection />
            </motion.div>
          } />
          <Route path="/backrooms" element={<Backrooms />} />
        </Routes>
      )}

      {/* HUD (Persistent but fades in) */}
      {!loading && !hasEntered && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className={`fixed top-6 left-6 md:top-10 md:left-10 text-[10px] tracking-[0.2em] text-[#999] opacity-0 animate-[fadeIn_1s_forwards] delay-500`}>SYS.892 // ONLINE</div>
          <div className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 text-[10px] tracking-[0.2em] text-[#999] opacity-0 animate-[fadeIn_1s_forwards] delay-700`}>V.1.0.4</div>
        </div>
      )}

      {/* PERSISTENT HUD INSIDE */}
      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >

          {/* Mute Button */}
          <div className="fixed bottom-8 left-8 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="flex items-center gap-3 text-[10px] tracking-widest text-[#1a1a1a] opacity-50 hover:opacity-100 transition-opacity uppercase font-bold"
            >
              <div className={`w-2 h-2 ${isMuted ? 'bg-red-400' : 'bg-green-400 animate-pulse'} rounded-full`}></div>
              {isMuted ? 'AUDIO_OFF' : 'AUDIO_ON'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
export default App
