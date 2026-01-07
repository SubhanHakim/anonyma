import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section id="manifesto" className="relative w-full min-h-screen flex flex-col items-center justify-center border-b border-[#ddd] overflow-hidden bg-[#f9f9f9] pt-24">

            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}>
                </div>
                {/* Glowing Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/[0.02] blur-[120px] rounded-full"></div>
            </div>

            <div className="z-10 text-center flex flex-col items-center px-4 max-w-4xl mx-auto mt-12 md:mt-0">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-12 flex items-center gap-3"
                >
                    <span className="text-[#888] text-[10px] tracking-[0.4em] uppercase font-mono">Presence // Without // Identity</span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl font-thin tracking-widest text-[#1a1a1a] uppercase mb-12 mix-blend-darken font-mono"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    ANONYMA
                </motion.h1>

                <motion.div
                    className="space-y-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <p className="text-gray-600 text-sm md:text-base tracking-[0.1em] leading-loose max-w-3xl mx-auto font-sans font-normal">
                        <span className="text-[#1a1a1a] font-medium">ANONYMA</span> is a digital art project exploring presence without identity.
                        It presents no characters, narrative, or personal representation, but rather an anonymous form serving as a visual entity.
                    </p>

                    <p className="text-gray-500 text-sm md:text-base tracking-[0.1em] leading-loose max-w-3xl mx-auto font-sans font-normal">
                        Using <span className="text-gray-700">ASCII art</span> as the primary medium, we reject polished modern aesthetics.
                        Text, symbols, and empty space are treated as artistic materials—not mere tools for explanation.
                    </p>

                    <div className="pt-12 flex flex-col items-center gap-12">

                        <div className="flex gap-6">
                            {/* X Button */}
                            <a href="#" className="group flex items-center justify-center w-14 h-14 bg-white border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-none">
                                <svg className="w-5 h-5 fill-[#1a1a1a] group-hover:fill-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Pumpfun Button */}
                            <a href="#" className="group relative px-8 h-14 flex items-center gap-3 bg-white border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-none overflow-hidden">
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
                        </div>

                        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase border-t border-b border-[#ddd] py-4 inline-block font-mono opacity-60">
                            No face. No name. Only presence.
                        </p>
                    </div>
                </motion.div>

            </div>

            {/* Decorative Bottom */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end px-6 pb-6 md:px-10 md:pb-10 pointer-events-none">
                <div className="text-[#222] text-[10px] tracking-widest">SCROLL_DOWN</div>
                <motion.div
                    className="w-px h-16 bg-gradient-to-b from-transparent via-[#333] to-transparent"
                    animate={{ height: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                ></motion.div>
                <div className="text-[#222] text-[10px] tracking-widest">INIT_SEQ_COMPLETE</div>
            </div>
        </section >
    )
}
