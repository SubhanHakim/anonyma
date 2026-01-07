import { useEffect, useRef } from 'react'
import entityImg from '../assets/entity.png'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface LandingProps {
    onEnter: () => void;
    titleText: string;
}

export default function Landing({ onEnter, titleText }: LandingProps) {
    const entityRef = useRef<HTMLImageElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // GSAP for organic floating movement
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(entityRef.current, {
                y: '+=15',
                rotation: '+=2',
                duration: 4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })
            gsap.to(entityRef.current, {
                filter: 'brightness(1.8) contrast(1.3)',
                duration: 2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1
            })
        })
        return () => ctx.revert()
    }, [])

    // GSAP Hover Effect for Button
    const handleBtnHover = (isHovering: boolean) => {
        if (!buttonRef.current) return;

        if (isHovering) {
            gsap.to(buttonRef.current, {
                scale: 1.05,
                borderColor: '#ffffff',
                duration: 0.4,
                ease: 'power2.out'
            })
        } else {
            gsap.to(buttonRef.current, {
                scale: 1,
                borderColor: '#e0e0e0',
                duration: 0.4,
                ease: 'power2.out'
            })
        }
    }

    return (
        <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center h-screen px-4 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{
                opacity: 0,
                scale: 2,
                filter: 'blur(20px)',
                transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
        >
            {/* Title */}
            <header className="relative w-full flex justify-center mb-6 md:mb-8 shrink-0">
                <div className="relative group">
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-8xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-center text-[#1a1a1a] whitespace-nowrap"
                        style={{ textShadow: "0 0 30px rgba(0, 0, 0, 0.1)" }}
                        layoutId="title"
                    >
                        {titleText}
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent mt-4 opacity-30"
                    ></motion.div>
                </div>
            </header>

            {/* Entity - Constrained Height */}
            <div className="relative group perspective-[1000px] shrink-1 flex justify-center items-center max-h-[45vh]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/10 blur-[90px] rounded-full opacity-30 animate-pulse pointer-events-none"></div>
                <img
                    ref={entityRef}
                    src={entityImg}
                    alt="Entity Artifact"
                    className="relative max-w-full h-auto max-h-[40vh] md:max-h-[50vh] w-auto grayscale mix-blend-screen opacity-90 brightness-125 contrast-125 select-none pointer-events-none object-contain"
                    style={{
                        maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)"
                    }}
                />
            </div>

            {/* Nav / Trigger */}
            <nav className="mt-8 md:mt-12 flex flex-col items-center gap-6 z-50 shrink-0">
                <button
                    ref={buttonRef}
                    onClick={onEnter}
                    onMouseEnter={() => handleBtnHover(true)}
                    onMouseLeave={() => handleBtnHover(false)}
                    className="
              group relative 
              px-12 py-4 md:px-16 md:py-5
              bg-white/50 backdrop-blur-sm
              border-2 border-[#1a1a1a]
              shadow-[0_0_15px_rgba(0,0,0,0.05)]
              cursor-pointer 
              overflow-hidden
            "
                >
                    {/* Background Fill */}
                    <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>

                    <span className="relative z-10 text-[#1a1a1a] group-hover:text-white text-sm md:text-lg tracking-[0.4em] font-bold transition-colors duration-300">
                        [ ENTER ]
                    </span>
                </button>

                <motion.div
                    className="flex flex-col items-center gap-2 opacity-50"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-px h-6 bg-gradient-to-b from-[#1a1a1a] to-transparent"></div>
                    <span className="text-[#666] text-[9px] md:text-[10px] tracking-[0.2em]">
                        SCROLL TO BREACH
                    </span>
                </motion.div>
            </nav>
        </motion.div>
    )
}
