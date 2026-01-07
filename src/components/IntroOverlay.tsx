import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroProps {
    onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroProps) {
    const [showText, setShowText] = useState(false)

    useEffect(() => {
        // Sequence: Cursor (start) -> Text (1s) -> Complete (3.5s)
        const timer1 = setTimeout(() => setShowText(true), 1200)
        const timer2 = setTimeout(onComplete, 3500)

        const handleSkip = () => onComplete()
        window.addEventListener('click', handleSkip)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            window.removeEventListener('click', handleSkip)
        }
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f4f5] text-[#1a1a1a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#e0e0e0]">
                <motion.div
                    className="h-full bg-[#1a1a1a]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "circOut" }}
                ></motion.div>
            </div>
            <div className="h-6 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode='wait'>
                    {!showText ? (
                        <motion.span
                            key="cursor"
                            className="text-[#1a1a1a] text-xl font-mono"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        >
                            _
                        </motion.span>
                    ) : (
                        <motion.h2
                            key="text"
                            className="text-[#666] text-[10px] md:text-xs tracking-[1em] uppercase font-mono"
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            A N O N Y M A
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
