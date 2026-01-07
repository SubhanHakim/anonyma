import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { audioManager } from '../utils/audio'

interface Log {
    id: string;
    title: string;
    description: string;
    content: React.ReactNode;
}

const LOGS: Log[] = [
    {
        id: 'log-001',
        title: 'THE_OBSERVER',
        description: 'First contact with the anomaly.',
        content: (
            <div className="space-y-6 font-mono text-sm">
                <div className="p-4 border border-[#e5e5e5] bg-[#fafafa]">
                    <div className="text-[10px] text-[#999] mb-2 uppercase tracking-widest">System Log // 001</div>
                    <p className="leading-relaxed text-[#333]">
                        [SYSTEM] :: Anomaly detected in Sector 7.<br />
                        [SYSTEM] :: Visual confirmation required.<br />
                        <br />
                        [OBSERVER] :: It's not reflecting light. It's absorbing it.<br />
                        [OBSERVER] :: It looks like... a void in the shape of a person.<br />
                        <br />
                        [SYSTEM] :: Capture failed. Target is non-corporeal.
                    </p>
                </div>
                <div className="text-center text-[10px] text-[#999]">
                    * END OF FRAGMENT *
                </div>
            </div>
        )
    },
    {
        id: 'log-002',
        title: 'ECHO_CHAMBER',
        description: 'Recursive signal analysis.',
        content: (
            <div className="space-y-6 font-mono text-sm">
                <div className="p-4 border border-[#e5e5e5] bg-[#fafafa]">
                    <div className="text-[10px] text-[#999] mb-2 uppercase tracking-widest">System Log // 002</div>
                    <p className="leading-relaxed text-[#333]">
                        [AUDIO_TRANSCRIPT]<br />
                        <br />
                        "Hello?"<br />
                        <span className="text-[#999]">&gt; "Hello?"</span> (delay: 0.0ms)<br />
                        <span className="text-[#999]">&gt; "Hello?"</span> (delay: -0.5ms)<br />
                        <br />
                        [ANALYSIS] :: The echo arrived before the sound was made.<br />
                        [ANALYSIS] :: Causality violation confirmed.<br />
                        [ANALYSIS] :: We are listening to the future.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'log-003',
        title: 'GENESIS_MINT',
        description: 'The birth of the artifact.',
        content: (
            <div className="space-y-6 font-mono text-sm">
                <div className="flex justify-center my-8">
                    <pre className="text-[8px] leading-none text-[#1a1a1a]">
                        {`
    .       .
   / \\     / \\
  | O |   | O |
   \\ /     \\ /
    '       '
`}
                    </pre>
                </div>
                <div className="p-4 border border-[#e5e5e5] bg-[#fafafa]">
                    <div className="text-[10px] text-[#999] mb-2 uppercase tracking-widest">System Log // 003</div>
                    <p className="leading-relaxed text-[#333]">
                        [MINT_EVENT] :: Block #89201<br />
                        [STATUS] :: Success.<br />
                        [METADATA] :: "Only those who are empty can be filled."<br />
                        <br />
                        The artifact has been deployed. It is no longer just code.<br />
                        It is a key to the room that doesn't exist.
                    </p>
                </div>
            </div>
        )
    }
]

import { useNavigate } from 'react-router-dom'

// ... (existing LOGS array)

export default function Backrooms() {
    const navigate = useNavigate()
    const [selectedLogId, setSelectedLogId] = useState<string>(LOGS[0].id)
    const activeLog = LOGS.find(l => l.id === selectedLogId)

    const handleSelect = (id: string) => {
        if (id !== selectedLogId) {
            setSelectedLogId(id)
            audioManager.playClick()
        }
    }

    // Updated Back Handler
    const handleBack = () => {
        audioManager.playClick()
        navigate('/')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#f4f4f5] text-[#1a1a1a] font-mono flex flex-col md:flex-row"
        >
            {/* Sidebar */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#e5e5e5] bg-[#fafafa] flex flex-col h-[40vh] md:h-full flex-shrink-0">
                <div className="p-6 border-b border-[#e5e5e5]">
                    <button
                        onClick={handleBack}
                        onMouseEnter={() => audioManager.playHover()}
                        className="text-[10px] uppercase tracking-widest hover:text-[#000] text-[#666] transition-colors mb-6 flex items-center gap-2"
                    >
                        ← Back to Root
                    </button>
                    <h2 className="text-sm font-bold tracking-widest mb-1">CONVERSATIONS</h2>
                    <p className="text-[10px] text-[#999]">// Accessing archived memories...</p>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {LOGS.map(log => (
                        <button
                            key={log.id}
                            onClick={() => handleSelect(log.id)}
                            onMouseEnter={() => audioManager.playHover()}
                            className={`w-full text-left p-4 mb-1 rounded-sm border transition-all duration-200 ${selectedLogId === log.id
                                ? 'bg-white border-[#ccc] shadow-sm'
                                : 'border-transparent hover:bg-white hover:border-[#e5e5e5]'
                                }`}
                        >
                            <div className={`text-xs font-bold mb-1 ${selectedLogId === log.id ? 'text-black' : 'text-[#666]'}`}>
                                {log.title}
                            </div>
                            <div className="text-[10px] text-[#999] truncate">
                                {log.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-[#f4f4f5] flex flex-col h-[60vh] md:h-full relative overflow-hidden">
                {/* Header */}
                <div className="h-16 border-b border-[#e5e5e5] flex items-center justify-between px-8 bg-[#fafafa]/50 backdrop-blur-sm">
                    <span className="text-xs font-bold tracking-widest">{activeLog?.title}</span>
                    <div className="text-[10px] text-[#999] border border-[#e5e5e5] px-2 py-1 bg-white rounded-sm">READ_ONLY</div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-8 md:p-16">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={selectedLogId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-2xl mx-auto"
                        >
                            {activeLog?.content}

                            <div className="mt-12 pt-8 border-t border-[#e5e5e5] text-center">
                                <span className="text-[10px] text-[#ccc] tracking-[0.2em]">ANONYMA NETWORK // END OF FILE</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}
