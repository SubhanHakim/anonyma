import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function VoidSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })


    const textY = useTransform(scrollYProgress, [0, 1], [100, -100])

    // Custom cursor for void interaction
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isHovering) return
            setMousePos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isHovering])

    return (
        <section
            id="void"
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full min-h-[100vh] bg-[#f9f9f9] flex flex-col items-center justify-center overflow-hidden border-t border-[#e0e0e0]"
        >
            {/* --- Technical Background --- */}
            {/* Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* Vignette */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f9f9f9_100%)]"></div>

            {/* --- Main Content --- */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Floating Geometric Elements (Decoration) */}
                <motion.div
                    className="absolute -top-32 -left-32 w-64 h-64 border border-[#1a1a1a]/5 rounded-full"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-32 -right-32 w-96 h-96 border border-[#1a1a1a]/5 rounded-full"
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Main Text */}
                <motion.div style={{ y: textY }} className="relative text-center">
                    <h2 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-[#1a1a1a] select-none mix-blend-darken relative">
                        <span className="block">VOID</span>
                    </h2>

                    {/* Echo/Ghost Text for Glitch Effect */}
                    <motion.div
                        className="absolute inset-0 text-[15vw] leading-[0.8] font-bold tracking-tighter text-[#1a1a1a]/10 select-none pointer-events-none"
                        animate={{ x: isHovering ? mousePos.x / 50 : 0, y: isHovering ? mousePos.y / 50 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        VOID
                    </motion.div>
                </motion.div>

                {/* Subtext */}
                <motion.div
                    className="mt-12 text-center space-y-4 max-w-lg px-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-4 text-[10px] font-mono tracking-[0.3em] text-[#1a1a1a]/60 uppercase">
                        <span className="w-8 h-[1px] bg-[#1a1a1a]/30"></span>
                        Null Reference Exception
                        <span className="w-8 h-[1px] bg-[#1a1a1a]/30"></span>
                    </div>
                    <p className="font-serif italic text-xl text-[#333]">
                        "Absence is not nothing;<br />it is the presence of the unknown."
                    </p>
                </motion.div>

                {/* Social Buttons (Void Variant) */}
                <motion.div
                    className="mt-12 flex gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {/* X Button */}
                    <a href="#" className="group flex items-center justify-center w-14 h-14 bg-white border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] transition-all duration-300 shadow-none hover:shadow-lg">
                        <svg className="w-5 h-5 fill-[#1a1a1a] group-hover:fill-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>

                    {/* Pumpfun Button */}
                    <a href="#" className="group relative px-8 h-14 flex items-center gap-3 bg-white border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] transition-all duration-300 shadow-none hover:shadow-lg overflow-hidden">
                        {/* Hover Fill Animation */}
                        <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>

                        {/* Dexscreener Icon */}
                        <svg className="w-6 h-6 fill-[#1a1a1a] group-hover:fill-white transition-colors relative z-10" viewBox="0 0 389 389" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0,389) scale(0.1,-0.1)">
                                <path d="M2539 3840 c-90 -8 -231 -51 -321 -96 -29 -14 -91 -51 -138 -82 -111 -73 -385 -347 -796 -797 -171 -187 -431 -470 -578 -630 -298 -322 -397 -446 -455 -568 -83 -175 -116 -339 -108 -551 5 -163 20 -238 76 -382 106 -275 358 -532 621 -633 266 -103 610 -91 866 28 200 94 310 199 990 948 164 181 380 416 479 523 244 263 360 393 413 465 60 80 137 243 162 341 27 104 41 316 29 447 -38 441 -364 837 -791 961 -96 28 -305 40 -449 26z m349 -175 c230 -55 435 -195 556 -380 111 -169 155 -309 163 -512 7 -156 -7 -263 -48 -388 -47 -142 -92 -206 -287 -413 -137 -146 -466 -500 -558 -601 -15 -17 -78 40 -568 514 -188 182 -435 421 -551 532 -115 110 -221 212 -234 227 l-24 25 99 108 c371 401 586 627 652 686 125 110 298 188 478 217 76 12 241 4 322 -15z m-1609 -1237 c36 -34 280 -267 541 -518 261 -250 492 -471 513 -489 20 -19 37 -37 37 -41 0 -8 -117 -136 -315 -345 -83 -88 -187 -198 -230 -245 -176 -187 -289 -266 -450 -312 -105 -30 -333 -32 -434 -5 -260 71 -486 246 -582 451 -71 153 -50 462 46 665 53 111 114 190 280 361 82 86 233 242 334 348 101 105 186 192 189 192 2 0 34 -28 71 -62z" />
                            </g>
                        </svg>
                        <span className="text-[#1a1a1a] group-hover:text-white text-sm tracking-widest font-mono font-bold transition-colors relative z-10">PUMPFUN</span>
                    </a>
                </motion.div>

                {/* Interactive 'Blink' Pixel */}
                <div className="mt-24 relative group">
                    <div className="absolute -inset-4 bg-gray-200/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                        className="w-1.5 h-1.5 bg-[#1a1a1a]"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[#1a1a1a]/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        SINGULARITY_POINT
                    </div>
                </div>
            </div>

            {/* Footer Tech Data */}
            <div className="absolute bottom-12 w-full px-12 flex justify-between items-end text-[9px] font-mono tracking-widest text-[#1a1a1a]/40 pointer-events-none">
                <div>
                    MEM_USAGE: 0.00%<br />
                    COORDS: NULL
                </div>
                <div className="text-right">
                    NON_EXISTENCE<br />
                    CONFIRMED
                </div>
            </div>

        </section>
    )
}
