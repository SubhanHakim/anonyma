import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import statementImg from '../assets/statement.png'

export default function Statement() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Parallax effect for the large text
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50])
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

    return (
        <section id="prism" ref={containerRef} className="relative w-full py-32 md:py-48 px-6 flex flex-col items-center justify-center overflow-hidden border-b border-[#e0e0e0] bg-[#fdfdfd]">

            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

                {/* Visual Statement - Image Container */}
                <div className="relative h-[400px] md:h-[550px] w-full hidden md:block select-none overflow-hidden border border-[#1a1a1a] bg-[#f0f0f0] group">

                    {/* --- CHROMATIC LAYERS (Visible on Hover) --- */}
                    {/* Cyan Layer - Shift Left */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-all duration-300 ease-out translate-x-0 group-hover:-translate-x-1.5 mix-blend-multiply"
                    >
                        <img
                            src={statementImg}
                            alt="Ghost Layer"
                            className="w-full h-full object-cover grayscale brightness-110 contrast-125 sepia hue-rotate-[130deg]"
                        />
                    </motion.div>

                    {/* Red Layer - Shift Right */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-all duration-300 ease-out translate-x-0 group-hover:translate-x-1.5 mix-blend-multiply"
                    >
                        <img
                            src={statementImg}
                            alt="Ghost Layer"
                            className="w-full h-full object-cover grayscale brightness-110 contrast-125 sepia hue-rotate-[320deg]"
                        />
                    </motion.div>

                    {/* --- MAIN IMAGE LAYER --- */}
                    <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-10">
                        {/* The Image */}
                        <img
                            src={statementImg}
                            alt="The Silent Rebellion"
                            className="w-full h-full object-cover grayscale brightness-[1.05] contrast-[1.1] transition-all duration-700 ease-out mix-blend-multiply"
                        />

                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>

                        {/* Gradient Fade to White at Bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfdfd] via-transparent to-transparent opacity-80"></div>
                    </motion.div>

                    {/* --- TECH OVERLAYS (Dark for Light Mode) --- */}
                    {/* Top Left Crosshair */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                        <div className="w-4 h-4 border-l border-t border-[#1a1a1a]"></div>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[#1a1a1a] writing-vertical-rl rotate-180 opacity-70">
                            IMG_RF_01
                        </span>
                    </div>

                    {/* Top Right Data */}
                    <div className="absolute top-6 right-6 z-20 text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                            <div className="w-1.5 h-1.5 bg-[#1a1a1a] animate-pulse"></div>
                            <span className="font-mono text-[9px] tracking-widest text-[#1a1a1a]">LIVE_FEED</span>
                        </div>
                        <div className="w-24 h-[1px] bg-[#1a1a1a]/20 ml-auto"></div>
                    </div>

                    {/* Bottom Left: Title */}
                    <div className="absolute bottom-6 left-6 z-20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-[1px] bg-[#1a1a1a]"></div>
                            <p className="text-[#1a1a1a] font-mono text-xs tracking-[0.2em] font-bold">SILENCE // PROTOCOL</p>
                        </div>
                        <p className="text-[#666] font-mono text-[9px] max-w-[150px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            Digital noise reduction active. Target acquired.
                        </p>
                    </div>

                    {/* Bottom Right: Coordinates */}
                    <div className="absolute bottom-6 right-6 z-20">
                        <span className="font-mono text-[10px] text-[#333] tracking-[0.1em]">
                            X: 004.92 / Y: 112.4
                        </span>
                    </div>

                    {/* Center Scanline */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1a1a1a]/10 z-30 animate-[scan_4s_linear_infinite] pointer-events-none"></div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 border-[0.5px] border-transparent group-hover:border-[#1a1a1a]/30 transition-colors duration-500 z-40 pointer-events-none m-2"></div>
                </div>

                {/* Statement Content */}
                <div className="flex flex-col gap-12 z-10">

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-[#333] text-3xl md:text-5xl font-light mb-6 tracking-wide">
                            THE SILENT <br /> <span className="font-bold text-[#1a1a1a]">REBELLION</span>
                        </h3>
                        <div className="w-12 h-1 bg-[#ccc] mb-8"></div>
                        <p className="text-gray-600 text-sm md:text-base leading-loose font-sans">
                            In an era of hyper-connectivity and visual noise, Anonyma stands as a sanctuary of silence.
                            We strip away the colorful distractions of modern web design to reveal the raw, structural beauty of code.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h4 className="text-[#333] text-xl font-mono tracking-widest mb-4 uppercase">
                            ASCII AS PIGMENT
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base leading-loose font-sans">
                            We return to the roots of digital expression. Characters are not just carriers of information; they are the brushstrokes of our identity.
                            By limiting our palette to standard ASCII, we force focus onto form, texture, and presence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="border-l-2 border-[#ddd] pl-6 py-2"
                    >
                        <p className="text-[#666] font-mono italic text-sm">
                            "We do not need faces to be seen.<br />
                            We do not need names to be known."
                        </p>
                    </motion.div>

                </div>
            </div>

        </section>
    )
}
