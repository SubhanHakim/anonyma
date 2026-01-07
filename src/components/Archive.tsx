import { motion, type Variants } from 'framer-motion'
import { audioManager } from '../utils/audio'

import img33 from '../assets/archive/33.png'
import img34 from '../assets/archive/34.png'
import img36 from '../assets/archive/36.png'
import img37 from '../assets/archive/37.png'
import img38 from '../assets/archive/38.png'

export default function Archive() {
    const artifacts = [
        {
            id: '0x01',
            title: 'DIGITAL_ESSENCE',
            type: 'ASCII_RENDER',
            size: '24MB',
            status: 'LIVE',
            desc: 'Raw data visualization of a soul without a container.',
            image: img33
        },
        {
            id: '0x02',
            title: 'SILENT_ECHO',
            type: 'AUDIO_WAVE',
            size: '48MB',
            status: 'ENCRYPTED',
            desc: 'Audio fragments recovered from the deep web void.',
            image: img34
        },
        {
            id: '0x03',
            title: 'GLITCH_PORTRAIT',
            type: 'IMAGE_DATA',
            size: '128MB',
            status: 'CORRUPT',
            desc: 'A face that changes every time it is perceived.',
            image: img36
        },
        {
            id: '0x04',
            title: 'GHOST_PROTOCOL',
            type: 'EXEC_FILE',
            size: '1.2GB',
            status: 'RUNNING',
            desc: 'Autonomous script wandering the network.',
            image: img37
        },
        {
            id: '0x05',
            title: 'MEMORY_LEAK',
            type: 'TEXT_LOG',
            size: '4KB',
            status: 'ARCHIVED',
            desc: 'Conversations between two deleted AI instances.',
            image: img38
        },
        {
            id: '0x06',
            title: 'NULL_ENTITY',
            type: 'UNKNOWN',
            size: '∞',
            status: 'VOID',
            desc: 'The presence of absence.',
            image: img33 // Reusing for now
        },
    ]

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const item: Variants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    }

    return (
        <section id="gallery" className="w-full max-w-7xl mx-auto px-6 py-32 min-h-screen relative z-10 flex flex-col">

            <motion.header
                className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-[#ddd] pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div>
                    <h2 className="text-4xl md:text-5xl text-[#1a1a1a] tracking-[0.1em] mb-4 font-light mix-blend-darken">
                        ARCHIVE_<span className="font-bold">GALLERY</span>
                    </h2>
                    <p className="text-gray-500 font-mono text-xs tracking-widest pl-1">
              /// INDEXING_ARTIFACTS...
                    </p>
                </div>
                <div className="mt-8 md:mt-0 flex gap-8 text-[#666] font-mono text-[10px] tracking-widest">
                    <div>
                        <span>TOTAL_ASSETS:</span> <span className="text-[#1a1a1a]">06</span>
                    </div>
                    <div>
                        <span>SERVER_STATUS:</span> <span className="text-green-600 animate-pulse">ONLINE</span>
                    </div>
                </div>
            </motion.header>

            {/* Artifact Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                {artifacts.map((art, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        onMouseEnter={() => audioManager.playHover()}
                        className="group relative h-[450px] bg-[#f4f4f5] border border-[#e0e0e0] hover:border-[#1a1a1a] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl"
                    >
                        {/* --- FULL BLEED IMAGE BACKGROUND --- */}
                        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
                            <img
                                src={art.image}
                                alt={art.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-0 contrast-105"
                            />
                        </div>

                        {/* Top Meta (Minimal, no blocking background) */}
                        <div className="relative p-6 z-20 flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity">
                            <span className="font-mono text-[10px] text-[#1a1a1a] tracking-widest bg-white/40 px-2 py-1 rounded-sm">
                                {art.id}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-1 border rounded-sm ${art.status === 'LIVE' ? 'border-green-400/30 text-green-800 bg-green-50/50' :
                                art.status === 'CORRUPT' ? 'border-red-400/30 text-red-800 bg-red-50/50' :
                                    art.status === 'VOID' ? 'border-purple-400/30 text-purple-800 bg-purple-50/50' :
                                        'border-gray-300 text-gray-600 bg-gray-50/50'
                                } tracking-widest`}>
                                {art.status}
                            </span>
                        </div>

                        {/* Bottom Info (Gradient fade instead of hard box) */}
                        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white/90 to-transparent pt-12 pb-6 px-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">

                            <h3 className="text-[#1a1a1a] text-xl tracking-[0.2em] font-bold mb-1">
                                {art.title}
                            </h3>
                            <span className="text-[10px] text-[#666] font-mono tracking-widest block mb-3 border-b border-[#1a1a1a]/10 pb-2 w-fit">
                                {art.type} // {art.size}
                            </span>

                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-[#333] text-xs font-light leading-relaxed mb-4">
                                    {art.desc}
                                </p>
                                <span className="flex items-center gap-2 text-[9px] font-bold tracking-widest hover:text-[#000] cursor-pointer">
                                    ACCESS_DATA <span className="text-lg leading-none">→</span>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <footer className="mt-32 pt-8 border-t border-[#ddd] text-center flex flex-col gap-4">
                <p className="text-[#666] text-[10px] tracking-[0.5em] hover:text-[#333] transition-colors uppercase cursor-default">
                    Anonyma // Digital Art Project 2026
                </p>
                <div className="flex justify-center gap-6 text-[10px] text-[#666] tracking-widest">
                    <a href="#" className="hover:text-[#111] transition-colors">TWITTER</a>
                    <a href="#" className="hover:text-[#111] transition-colors">INSTAGRAM</a>
                    <a href="#" className="hover:text-[#111] transition-colors">GITHUB</a>
                </div>
            </footer>
        </section>
    )
}
