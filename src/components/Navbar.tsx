import { motion } from 'framer-motion'
import { audioManager } from '../utils/audio'

import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const navItems = [
        { name: 'MANIFESTO', id: 'manifesto' },
        { name: 'PRISM', id: 'prism' },
        { name: 'GALLERY', id: 'gallery' },
        { name: 'BACKROOMS', id: 'backrooms' }, // Renamed from VOID
    ]

    const handleNav = (id: string) => {
        audioManager.playClick();

        if (id === 'backrooms') {
            navigate('/backrooms')
            return;
        }

        // If not on home page, navigate home first
        if (location.pathname !== '/') {
            navigate('/')
            // Use setTimeout to allow navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const yOffset = -50;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100)
            return
        }

        const element = document.getElementById(id);
        if (element) {
            const yOffset = -50;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return (
        <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 md:gap-2 px-2 py-2 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-full"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {navItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => handleNav(item.id)}
                    onMouseEnter={() => audioManager.playHover()}
                    className="relative px-3 py-1.5 md:px-5 md:py-2 text-[10px] md:text-[11px] font-mono font-medium tracking-widest text-[#666] hover:text-[#000] transition-colors rounded-full group overflow-hidden"
                >
                    <span className="relative z-10">{item.name}</span>

                    {/* Hover Background */}
                    <span className="absolute inset-0 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full -z-0"></span>
                </button>
            ))}
        </motion.nav>
    )
}
