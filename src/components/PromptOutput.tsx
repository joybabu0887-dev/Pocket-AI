import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Star, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface PromptOutputProps {
  promptText: string;
  language: Language;
  onRegenerate: () => void;
  onToggleFavorite: (customTitle: string) => void;
  isFavorited: boolean;
  isLoading: boolean;
}

export default function PromptOutput({
  promptText,
  language,
  onRegenerate,
  onToggleFavorite,
  isFavorited,
  isLoading,
}: PromptOutputProps) {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [favoriteTitle, setFavoriteTitle] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleSaveFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!favoriteTitle.trim()) return;
    onToggleFavorite(favoriteTitle.trim());
    setFavoriteTitle('');
    setShowSaveDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full rounded-2xl glass-effect border border-blue-500/20 overflow-hidden glow-blue"
    >
      {/* Visual neon light strips on top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse" />

      {/* Box Header */}
      <div className="p-5 border-b border-slate-500/10 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Wand2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display uppercase tracking-wider">
            {t.outputTitle}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Favorite button */}
          {!isFavorited ? (
            <button
              onClick={() => setShowSaveDialog(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-yellow-400 transition-colors"
              title={t.favoritePrompt}
              id="btn_favorite_save"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.favoritesTab}</span>
            </button>
          ) : (
            <button
              onClick={() => onToggleFavorite('')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30 transition-colors"
              title={t.favorited}
              id="btn_favorite_remove"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{t.favorited}</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            disabled={copied}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
            }`}
            id="btn_copy_prompt"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? t.copied : t.copyBtn}
          </button>

          {/* Regenerate Button */}
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            title={t.regenerate}
            id="btn_regenerate_prompt"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Save to Favorites Overlay Modal dialog */}
      <AnimatePresence>
        {showSaveDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.form
              onSubmit={handleSaveFavorite}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-sm p-6 rounded-xl bg-slate-900 border border-slate-800 text-left space-y-4"
            >
              <h4 className="font-semibold text-white text-md font-display">
                {t.savedPromptTitle}
              </h4>
              <input
                type="text"
                required
                value={favoriteTitle}
                onChange={(e) => setFavoriteTitle(e.target.value)}
                placeholder="e.g., Cyberpunk Logo Generator"
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                autoFocus
              />
              <div className="flex justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setShowSaveDialog(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {t.saveBtn}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formatted Content block */}
      <div className="p-6 bg-slate-950/40 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
            <span className="text-slate-300 text-sm font-semibold">{t.generating}</span>
          </div>
        )}
        <pre className="text-slate-200 text-sm whitespace-pre-wrap font-mono leading-relaxed select-text overflow-x-auto">
          {promptText}
        </pre>
      </div>

      {/* Quick copy tips */}
      <div className="px-6 py-4 border-t border-slate-500/10 bg-slate-900/20 text-xs text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Copy-paste this directly into your favorite model.</span>
        </div>
      </div>
    </motion.div>
  );
}
