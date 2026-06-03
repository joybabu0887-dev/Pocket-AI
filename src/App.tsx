import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, TrendingUp, Code, Palette, Youtube, PenTool, 
  Compass, DollarSign, Activity, BookOpen, Globe,
  Sparkles, History, Star, AlertCircle, Menu, X,
  Trash2, ArrowRight, Moon, Sun, Languages, Copy, Check, Terminal, Play, BookmarkCheck, Zap
} from 'lucide-react';

import { Language, Category, SavedPrompt, HistoryItem, PromptToolItem } from './types';
import { CATEGORIES, PROMPT_TOOLS, TONES, SUGGESTIVE_TOPICS, TRANSLATIONS, AI_TOOLS_LINKS } from './data';
import LanguageSelector from './components/LanguageSelector';
import Sidebar from './components/Sidebar';
import PromptOutput from './components/PromptOutput';

// Category Icon mapping
const getCategoryIcon = (iconName: string, className: string = "w-5 h-5") => {
  switch (iconName) {
    case 'Briefcase': return <Briefcase className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Youtube': return <Youtube className={className} />;
    case 'PenTool': return <PenTool className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Globe': return <Globe className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export default function App() {
  // 1. Language State
  const [language, setLanguage] = useState<Language | null>(() => {
    const stored = localStorage.getItem('pocket_ai_lang');
    return (stored === 'en' || stored === 'bn') ? (stored as Language) : null;
  });

  // 2. Main Interface States
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('business');
  const [topicText, setTopicText] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<string>('Professional');
  const [activePromptToolId, setActivePromptToolId] = useState<string | null>(null);
  
  // 3. Theme Toggle (Saves "dark" or "light")
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = localStorage.getItem('pocket_ai_theme');
    return storedTheme === 'light' ? 'light' : 'dark';
  });

  // 4. API Response State
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 5. Active workspace tabs: 'generator' | 'favorites' | 'history'
  const [activeTab, setActiveTab] = useState<'generator' | 'favorites' | 'history'>('generator');

  // 6. Favorites State (Saved Prompts)
  const [favorites, setFavorites] = useState<SavedPrompt[]>(() => {
    const stored = localStorage.getItem('pocket_ai_favorites');
    return stored ? JSON.parse(stored) : [];
  });

  // 7. Prompt History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const stored = localStorage.getItem('pocket_ai_history');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync favorites of current user into local storage
  useEffect(() => {
    localStorage.setItem('pocket_ai_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync prompt history list in local storage
  useEffect(() => {
    localStorage.setItem('pocket_ai_history', JSON.stringify(history));
  }, [history]);

  // Apply dark/light class updates on html body
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('pocket_ai_theme', theme);
  }, [theme]);

  // Handle collapsible sidebar defaults depending on device screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // run on load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!language) {
    return (
      <LanguageSelector
        onSelectLanguage={(lang) => {
          setLanguage(lang);
          localStorage.setItem('pocket_ai_lang', lang);
        }}
      />
    );
  }

  const t = TRANSLATIONS[language];

  // Selecting a specialized Prompt Tool from sidebar
  const handleSelectPromptTool = (tool: PromptToolItem) => {
    setActivePromptToolId(tool.id);
    setSelectedCategory(tool.category);
    setTopicText(language === 'en' ? tool.defaultTopicEn : tool.defaultTopicBn);
    setActiveTab('generator');
    
    // Smooth scroll prompt input area into view on mobile devices
    const inputElement = document.getElementById('prompt_input_box');
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Language Selector on visual header bar
  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('pocket_ai_lang', nextLang);
  };

  // API Call to generate optimal prompt using Gemini
  const handleGeneratePrompt = async () => {
    if (!topicText.trim()) return;
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    // Locate active platform tool if selected, otherwise fallback generic text
    const activeToolName = activePromptToolId 
      ? PROMPT_TOOLS.find(pt => pt.id === activePromptToolId)?.[language === 'en' ? 'nameEn' : 'nameBn']
      : (language === 'en' ? 'General Prompt Optimizer' : 'সাধারণ প্রম্পট অপটিমাইজার');

    const activeCatName = CATEGORIES.find(cat => cat.id === selectedCategory)?.[language === 'en' ? 'nameEn' : 'nameBn'] || selectedCategory;

    try {
      const response = await fetch('/api/prompt/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicText.trim(),
          category: activeCatName,
          language: language,
          tool: activeToolName,
          tone: selectedTone
        })
      });

      if (!response.ok) {
        throw new Error(t.emptyHistory);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const generated = data.prompt;
      setGeneratedPrompt(generated);
      
      // Inject generated prompt entry to user session history safely
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(36).substring(7),
        topic: topicText.trim(),
        category: selectedCategory,
        tool: activeToolName || 'General',
        prompt: generated,
        timestamp: Date.now(),
        language: language,
        tone: selectedTone
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 30)); // limit history to last 30 entries
      setActiveTab('generator'); // reveal generator panel tab!
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Server connection failed. Make sure your Gemini Key is active.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Stars toggling (favorite bookmark items)
  const handleToggleFavorite = (customTitle: string = '') => {
    // Check if the current prompt in the output screen is already in favorites
    const isAlreadyFavorited = favorites.some(fav => fav.prompt === generatedPrompt);

    if (isAlreadyFavorited) {
      setFavorites(prev => prev.filter(fav => fav.prompt !== generatedPrompt));
    } else {
      if (!generatedPrompt) return;
      const newFav: SavedPrompt = {
        id: Math.random().toString(36).substring(7),
        title: customTitle || topicText.trim() || 'Custom Prompt',
        prompt: generatedPrompt,
        category: selectedCategory,
        timestamp: Date.now()
      };
      setFavorites(prev => [newFav, ...prev]);
    }
  };

  const handleCopyHistoryPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isCurrentPromptFavorited = favorites.some(fav => fav.prompt === generatedPrompt);

  return (
    <div className={`flex min-h-screen font-sans antialiased text-[#e2e8f0] ${theme === 'dark' ? 'bg-[#070913]' : 'bg-[#f4f7fc] text-slate-800'}`}>
      
      {/* Decorative Blur Spheres (Only in Dark Mode for Premium Cinematic UI Feel) */}
      {theme === 'dark' && (
        <>
          <div className="fixed top-1/10 left-1/3 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none glow-pulse" />
          <div className="fixed bottom-1/10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none glow-pulse" />
        </>
      )}

      {/* Sidebar Interface Component */}
      <Sidebar
        language={language}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activePromptToolId={activePromptToolId}
        onSelectPromptTool={handleSelectPromptTool}
      />

      {/* Primary Dashboard wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Navigation Bar */}
        <header className={`sticky top-0 z-30 flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'glass-effect border-slate-500/10' : 'bg-white/80 border-slate-200/80'
        } backdrop-blur-md`}>
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800/10 hover:bg-slate-800/20 text-slate-400 hover:text-white transition-all"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Micro branding header */}
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400 animate-bounce" />
              <div>
                <h1 className="font-extrabold text-md tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-display">
                  {t.title}
                </h1>
                <p className="text-[10px] text-slate-400 leading-none">{t.tagline}</p>
              </div>
            </div>
          </div>

          {/* Configuration utility selectors: Language, theme, workspace tabs dropdowns */}
          <div className="flex items-center gap-3">
            
            {/* Tab selection links */}
            <div className={`hidden sm:flex items-center p-1 rounded-xl ${
              theme === 'dark' ? 'bg-slate-950/60 border border-slate-800/80' : 'bg-slate-100 border border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeTab === 'generator'
                    ? theme === 'dark' ? 'bg-blue-600/15 text-blue-400' : 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.generatorBtn}
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 ${
                  activeTab === 'favorites'
                    ? theme === 'dark' ? 'bg-blue-600/15 text-blue-400' : 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>{t.favoritesBtn}</span>
                {favorites.length > 0 && (
                  <span className="ml-1 w-4 h-4 text-[9px] font-bold rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1 ${
                  activeTab === 'history'
                    ? theme === 'dark' ? 'bg-blue-600/15 text-blue-400' : 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-3 h-3" />
                <span>{t.historyBtn}</span>
              </button>
            </div>

            {/* Language Instant switcher button */}
            <button
              onClick={toggleLanguage}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-slate-300 hover:text-blue-400 hover:bg-blue-500/15 transition-all"
              title="Change Language"
              id="header_lang_toggle"
            >
              <Languages className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span>{language === 'en' ? '🇧🇩 বাংলা' : '🇺🇸 English'}</span>
            </button>

            {/* Theme Toggle Utility: Dark & Light Mode */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? t.lightMode : t.darkMode}
              id="header_theme_toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Sub-Navigation block */}
        <div className={`sm:hidden flex items-center justify-around p-2.5 border-b ${
          theme === 'dark' ? 'bg-slate-950/20 border-slate-500/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg ${
              activeTab === 'generator' ? 'text-blue-400 bg-blue-500/5 font-bold' : 'text-slate-400'
            }`}
          >
            {t.generatorBtn}
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${
              activeTab === 'favorites' ? 'text-blue-400 bg-blue-500/5 font-bold' : 'text-slate-400'
            }`}
          >
            <Star className="w-3 h-3" />
            <span>{t.favoritesBtn}</span>
            {favorites.length > 0 && <span className="text-[10px] text-blue-400">({favorites.length})</span>}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${
              activeTab === 'history' ? 'text-blue-400 bg-blue-500/5 font-bold' : 'text-slate-400'
            }`}
          >
            <History className="w-3 h-3" />
            <span>{t.historyBtn}</span>
          </button>
        </div>

        {/* Main Interface Box */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          
          <AnimatePresence mode="wait">
            {activeTab === 'generator' && (
              <motion.div
                key="generator-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* 1. Category selectors layout */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-4 rounded bg-blue-500" />
                    <h2 className={`text-md font-extrabold uppercase tracking-wider ${theme==='dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.categoryTitle}
                    </h2>
                  </div>
                  
                  {/* Beautiful Grid Layout for Categories */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setActivePromptToolId(null); // clears specialized prompt tools overlay to avoid custom mismatch
                          }}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                            isSelected
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                              : theme === 'dark' 
                                ? 'bg-slate-900/40 border-slate-500/10 hover:border-blue-500/30 text-slate-300 hover:bg-slate-900/60' 
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                          id={`cat_btn_${cat.id}`}
                        >
                          <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/15' : theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-50 text-slate-600'}`}>
                            {getCategoryIcon(cat.icon)}
                          </span>
                          <span className="text-xs font-semibold leading-tight line-clamp-2">
                            {language === 'en' ? cat.nameEn : cat.nameBn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* 2. Target Topic Input and Prompt Tool status bar */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Inputs Column split */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className={`p-6 rounded-2xl border ${
                      theme === 'dark' ? 'glass-effect border-slate-500/10 bg-slate-950/20' : 'bg-white border-slate-300/60'
                    }`}>
                      
                      {/* Sub specialized notice badge */}
                      {activePromptToolId && (
                        <div className="mb-4 flex items-center justify-between p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <span className="text-xs font-medium text-blue-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>
                              {language==='en' ? 'Active Preset:' : 'সক্রিয় প্রিসেট:'} <strong>{PROMPT_TOOLS.find(pt => pt.id === activePromptToolId)?.[language === 'en' ? 'nameEn' : 'nameBn']}</strong>
                            </span>
                          </span>
                          <button 
                            onClick={() => setActivePromptToolId(null)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            ✖ {language==='en' ? 'Reset' : 'রিসেট'}
                          </button>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5 mb-3">
                        <label className="text-xs font-extrabold uppercase tracking-wide text-slate-400" htmlFor="prompt_input_box">
                          {t.inputLabel}
                        </label>
                        <textarea
                          id="prompt_input_box"
                          value={topicText}
                          onChange={(e) => setTopicText(e.target.value)}
                          placeholder={t.inputPlaceholder}
                          rows={4}
                          className="w-full p-4 rounded-xl border text-sm focus:outline-none transition-all glass-input text-slate-100"
                        />
                      </div>

                      {/* Tone and Submit controller */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        {/* Selector for Tone */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.toneLabel}:</span>
                          <div className="flex gap-1.5">
                            {TONES.map(tOption => {
                              const activeTone = selectedTone === tOption.id;
                              return (
                                <button
                                  key={tOption.id}
                                  onClick={() => setSelectedTone(tOption.id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    activeTone
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-800/20 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                                  }`}
                                  id={`btn_tone_${tOption.id}`}
                                >
                                  {language === 'en' ? tOption.labelEn : tOption.labelBn}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Trigger Generate Button */}
                        <button
                          onClick={handleGeneratePrompt}
                          disabled={isLoading || !topicText.trim()}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                          id="btn_generate_submit"
                        >
                          {isLoading ? t.generating : (
                            <>
                              <span>{t.generateBtn}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* API Connection error handler panel */}
                    {error && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <strong>Generation Error:</strong> {error}
                        </div>
                      </div>
                    )}

                    {/* Beautiful output panel for the prompt */}
                    {generatedPrompt && (
                      <PromptOutput
                        promptText={generatedPrompt}
                        language={language}
                        isLoading={isLoading}
                        isFavorited={isCurrentPromptFavorited}
                        onRegenerate={handleGeneratePrompt}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    )}
                  </div>

                  {/* Right hand side Suggestions split column */}
                  <div className="space-y-6">
                    <div className={`p-6 rounded-2xl border ${
                      theme === 'dark' ? 'glass-effect border-slate-500/10 bg-slate-950/10' : 'bg-white border-slate-300/60'
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-200">
                          {t.quickSuggestions}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">{t.placeholderExplain}</p>

                      <div className="space-y-3">
                        {(SUGGESTIVE_TOPICS[selectedCategory]?.[language] || SUGGESTIVE_TOPICS.business[language]).map((promptItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setTopicText(promptItem);
                              setActivePromptToolId(null); // clears specialized visual items for direct typing
                            }}
                            className="w-full p-3.5 rounded-xl text-xs text-left text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/30 border border-slate-500/5 transition-all flex gap-2.5 items-start group"
                          >
                            <span className="p-1 rounded bg-slate-800 text-slate-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors mt-0.5 font-bold">
                              {idx + 1}
                            </span>
                            <span className="flex-1 leading-normal group-hover:text-slate-200">
                              {promptItem}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* Favorites Tab Content view */}
            {activeTab === 'favorites' && (
              <motion.div
                key="favorites-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded bg-yellow-400" />
                  <h2 className="text-lg font-bold text-white font-display">
                    {t.favoritesTab} ({favorites.length})
                  </h2>
                </div>

                {favorites.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl glass-effect border border-dashed border-slate-500/10 text-slate-400 text-sm max-w-xl mx-auto space-y-3">
                    <Star className="w-10 h-10 text-slate-500 mx-auto opacity-40 animate-pulse" />
                    <p>{t.emptyFavorites}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((fav) => (
                      <div
                        key={fav.id}
                        className="p-5 rounded-2xl h-fit glass-effect border border-slate-500/10 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                              {getCategoryIcon(CATEGORIES.find(c => c.id === fav.category)?.icon || 'Briefcase', "w-3 h-3")}
                              <span>{CATEGORIES.find(c => c.id === fav.category)?.[language === 'en' ? 'nameEn' : 'nameBn'] || fav.category}</span>
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(fav.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-semibold text-white text-md font-display leading-snug line-clamp-1">{fav.title}</h3>
                          <pre className="p-3 bg-slate-950/40 rounded-xl text-xs text-slate-300 max-h-40 overflow-y-auto whitespace-pre-wrap font-mono">
                            {fav.prompt}
                          </pre>
                        </div>

                        {/* Interactive utilities */}
                        <div className="flex items-center gap-2 justify-end pt-2 border-t border-slate-500/5">
                          <button
                            onClick={() => {
                              setGeneratedPrompt(fav.prompt);
                              setSelectedCategory(fav.category);
                              setActiveTab('generator');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/25 transition-all"
                            id={`btn_fav_view_${fav.id}`}
                          >
                            {t.viewPrompt}
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(fav.prompt);
                            }}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                          <button
                            onClick={() => setFavorites(prev => prev.filter(f => f.id !== fav.id))}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/25 transition-all text-right"
                            title={t.deletePrompt}
                            id={`btn_fav_del_${fav.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* History Tab content view */}
            {activeTab === 'history' && (
              <motion.div
                key="history-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded bg-indigo-500" />
                    <h2 className="text-lg font-bold text-white font-display">
                      {t.historyTab} ({history.length})
                    </h2>
                  </div>
                  
                  {history.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Clear entire history?')) {
                          setHistory([]);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all flex items-center gap-1"
                      id="btn_clear_history_all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Clear All' : 'সব মুছুন'}</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl glass-effect border border-dashed border-slate-500/10 text-slate-400 text-sm max-w-xl mx-auto space-y-3">
                    <History className="w-10 h-10 text-slate-500 mx-auto opacity-40 animate-pulse" />
                    <p>{t.emptyHistory}</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {history.map((hist) => (
                      <div
                        key={hist.id}
                        className="p-5 rounded-2xl glass-effect border border-slate-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-900/10"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              {CATEGORIES.find(c => c.id === hist.category)?.[language === 'en' ? 'nameEn' : 'nameBn'] || hist.category}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(hist.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="font-semibold text-white text-sm line-clamp-1">
                            "{hist.topic}"
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1 font-mono">
                            {hist.tool} • Tone: {hist.tone}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <button
                            onClick={() => {
                              setGeneratedPrompt(hist.prompt);
                              setSelectedCategory(hist.category);
                              setTopicText(hist.topic);
                              setSelectedTone(hist.tone);
                              setActiveTab('generator');
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/25 transition-all"
                            id={`btn_hist_view_${hist.id}`}
                          >
                            {language==='en' ? 'Use Now' : 'ব্যবহার করুন'}
                          </button>
                          <button
                            onClick={() => handleCopyHistoryPrompt(hist.prompt)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </button>
                          <button
                            onClick={() => setHistory(prev => prev.filter(h => h.id !== hist.id))}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                            id={`btn_hist_del_${hist.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Hub Footer */}
        <footer className={`mt-auto p-6 text-center text-xs border-t ${
          theme === 'dark' ? 'border-slate-500/10 text-slate-500' : 'border-slate-200 text-slate-400 bg-white'
        }`}>
          <div>{t.credits}</div>
        </footer>
      </div>
    </div>
  );
}
