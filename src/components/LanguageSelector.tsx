import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
}

export default function LanguageSelector({ onSelectLanguage }: LanguageSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070913]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] glow-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg p-8 rounded-2xl glass-effect glow-blue text-center overflow-hidden"
      >
        {/* Top visual graphic */}
        <div className="flex justify-center mb-6">
          <div className="relative p-4 rounded-full bg-blue-500/10 border border-blue-500/30">
            <Globe className="w-10 h-10 text-blue-400 animate-pulse" />
            <Sparkles className="w-4 h-4 text-indigo-400 absolute top-2 right-2" />
          </div>
        </div>

        {/* Branding header */}
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2 font-display">
          POCKET <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI</span>
        </h1>
        
        {/* Subtitles in both English & Bangla */}
        <div className="space-y-4 my-6">
          <div>
            <h2 className="text-lg font-medium text-slate-200">
              {TRANSLATIONS.en.languageSelectorTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {TRANSLATIONS.en.languageSelectorSubtitle}
            </p>
          </div>
          <div className="border-t border-slate-500/10 pt-4">
            <h2 className="text-lg font-medium text-slate-200 font-sans">
              {TRANSLATIONS.bn.languageSelectorTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              {TRANSLATIONS.bn.languageSelectorSubtitle}
            </p>
          </div>
        </div>

        {/* Big Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => onSelectLanguage('en')}
            className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300"
            id="btn_lang_en"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">🇺🇸</span>
            <span className="text-white font-semibold text-lg">English</span>
            <span className="text-xs text-slate-400 mt-1">Instant Activation</span>
          </button>

          <button
            onClick={() => onSelectLanguage('bn')}
            className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 font-sans"
            id="btn_lang_bn"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">🇧🇩</span>
            <span className="text-white font-semibold text-lg">বাংলা</span>
            <span className="text-xs text-slate-400 mt-1">তাৎক্ষণিক সক্রিয়করণ</span>
          </button>
        </div>
        
        {/* Subtitle footer */}
        <div className="text-xs text-slate-500 mt-8">
          Pocket AI Hub • Powered by Gemini AI
        </div>
      </motion.div>
    </div>
  );
}
