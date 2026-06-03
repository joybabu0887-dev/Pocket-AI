import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Sparkles, Bot, Cpu, Github, Triangle,
  ChevronLeft, ChevronRight, X, ExternalLink, Settings, 
  Terminal, ShieldCheck, Zap
} from 'lucide-react';
import { AI_TOOLS_LINKS, DEV_TOOLS_LINKS, PROMPT_TOOLS, TRANSLATIONS } from '../data';
import { Language, PromptToolItem } from '../types';

interface SidebarProps {
  language: Language;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activePromptToolId: string | null;
  onSelectPromptTool: (tool: PromptToolItem) => void;
}

// Icon mapper for dynamic links
const getLinkIcon = (iconName?: string) => {
  switch (iconName) {
    case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4" />;
    case 'Bot': return <Bot className="w-4 h-4" />;
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'Github': return <Github className="w-4 h-4" />;
    case 'Triangle': return <Triangle className="w-4 h-4" />;
    default: return <ExternalLink className="w-4 h-4" />;
  }
};

export default function Sidebar({
  language,
  isOpen,
  setIsOpen,
  activePromptToolId,
  onSelectPromptTool,
}: SidebarProps) {
  const t = TRANSLATIONS[language];

  return (
    <>
      {/* Mobile Glass Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        initial={{ width: isOpen ? 280 : 70 }}
        animate={{ width: isOpen ? 280 : 70 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed md:sticky top-0 left-0 z-40 h-screen glass-effect transition-all flex flex-col border-r border-slate-800/80 overflow-hidden ${
          isOpen ? 'w-[280px]' : 'w-[70px]'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Sidebar Header Brand */}
        <div className="p-4 flex items-center justify-between border-b border-slate-500/10 min-h-[70px]">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40">
                <span className="font-extrabold text-blue-400 font-display">P</span>
              </div>
              <span className="font-bold text-lg text-white font-display tracking-wide">
                POCKET <span className="text-blue-400">AI</span>
              </span>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 mx-auto">
              <span className="font-extrabold text-blue-400 font-display">P</span>
            </div>
          )}

          {/* Inline Toggle collapse button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title={t.toggleSidebar}
            id="btn_sidebar_toggle"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden flex items-center justify-center p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories / Link Sections */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {/* Section 1: AI Tools Bookmark Links */}
          <div>
            {isOpen ? (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
                🤖 {t.sidebarAITools}
              </h3>
            ) : (
              <div className="w-full border-t border-slate-500/10 my-4" />
            )}
            <ul className="space-y-1">
              {AI_TOOLS_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-blue-600/5 transition-all text-sm group"
                    title={link.name}
                  >
                    <span className="p-1 rounded bg-slate-800/60 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                      {getLinkIcon(link.icon)}
                    </span>
                    {isOpen && (
                      <span className="flex-1 truncate font-medium">{link.name}</span>
                    )}
                    {isOpen && (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Developer Tools Bookmark Links */}
          <div>
            {isOpen ? (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
                🧑💻 {t.sidebarDevTools}
              </h3>
            ) : (
              <div className="w-full border-t border-slate-500/10 my-4" />
            )}
            <ul className="space-y-1">
              {DEV_TOOLS_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg text-slate-300 hover:text-indigo-400 hover:bg-indigo-600/5 transition-all text-sm group"
                    title={link.name}
                  >
                    <span className="p-1 rounded bg-slate-800/60 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                      {getLinkIcon(link.icon)}
                    </span>
                    {isOpen && (
                      <span className="flex-1 truncate font-medium">{link.name}</span>
                    )}
                    {isOpen && (
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Prompt Specialization Tools */}
          <div>
            {isOpen ? (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">
                ⚡ {t.sidebarPromptTools}
              </h3>
            ) : (
              <div className="w-full border-t border-slate-500/10 my-4" />
            )}
            <ul className="space-y-1">
              {PROMPT_TOOLS.map((tool) => {
                const isActive = activePromptToolId === tool.id;
                return (
                  <li key={tool.id}>
                    <button
                      onClick={() => onSelectPromptTool(tool)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-sm group ${
                        isActive 
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20' 
                        : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/40 border border-transparent'
                      }`}
                      title={language === 'en' ? tool.nameEn : tool.nameBn}
                      id={`btn_tool_${tool.id}`}
                    >
                      <span className={`p-1 rounded transition-colors ${
                        isActive 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-100 group-hover:bg-slate-800'
                      }`}>
                        <Zap className="w-4 h-4" />
                      </span>
                      {isOpen && (
                        <span className="flex-1 truncate font-medium text-xs leading-none">
                          {language === 'en' ? tool.nameEn : tool.nameBn}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Sidebar Footer badge */}
        <div className="p-4 border-t border-slate-500/10 bg-slate-900/40 text-center">
          {isOpen ? (
            <div className="flex items-center gap-2 justify-center text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified AI Integrator</span>
            </div>
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
          )}
        </div>
      </motion.aside>
    </>
  );
}
