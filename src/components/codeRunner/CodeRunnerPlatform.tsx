import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../../data/codeSnippets';
import { CodeSnippet, SupportedLanguage, ExecutionResult } from '../../types/codeRunner';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  FileCode, 
  Sparkles,
  BookOpen,
  Share2,
  FolderOpen
} from 'lucide-react';

export const CodeRunnerPlatform: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(CODE_SNIPPETS[0]);
  const [code, setCode] = useState<string>(CODE_SNIPPETS[0].code);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('java');
  const [copied, setCopied] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult>({
    status: 'success',
    output: CODE_SNIPPETS[0].expectedOutput || '',
    executionTimeMs: 42,
    memoryKb: 3420,
    timestamp: 'Initial load'
  });
  const [isRunning, setIsRunning] = useState(false);

  // Filter snippets by language
  const availableSnippets = CODE_SNIPPETS.filter(s => s.language === selectedLang);

  const handleSelectSnippet = (snippet: CodeSnippet) => {
    setSelectedSnippet(snippet);
    setCode(snippet.code);
    setSelectedLang(snippet.language);
    setExecutionResult({
      status: 'idle',
      output: 'Press "Run Code" (or Ctrl+Enter) to execute...',
      executionTimeMs: 0,
      memoryKb: 0,
      timestamp: ''
    });
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    const firstMatching = CODE_SNIPPETS.find(s => s.language === lang);
    if (firstMatching) {
      setSelectedSnippet(firstMatching);
      setCode(firstMatching.code);
    } else {
      setCode(`// Write your ${lang.toUpperCase()} code here\n`);
    }
    setExecutionResult({
      status: 'idle',
      output: 'Ready to compile and run.',
      executionTimeMs: 0,
      memoryKb: 0,
      timestamp: ''
    });
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionResult(prev => ({
      ...prev,
      status: 'running',
      output: `Compiling & running ${selectedLang.toUpperCase()} environment...\nAllocating JVM/runtime memory pool...`
    }));

    setTimeout(() => {
      // Simulate real-time run
      const matched = CODE_SNIPPETS.find(s => s.id === selectedSnippet.id);
      const output = matched?.expectedOutput || `[Program output]\nExecuted successfully.\nProcess exited with status 0.`;
      const timeMs = Math.floor(25 + Math.random() * 45);
      const memKb = Math.floor(2800 + Math.random() * 1200);

      setExecutionResult({
        status: 'success',
        output,
        executionTimeMs: timeMs,
        memoryKb: memKb,
        timestamp: new Date().toLocaleTimeString()
      });
      setIsRunning(false);
    }, 600);
  };

  const handleFormatCode = () => {
    // Basic automatic beautification (normalize trailing spaces and linebreaks)
    const formatted = code
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n');
    setCode(formatted);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
              DevRunner Studio
              <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                Multi-Lang Engine
              </span>
            </h1>
            <p className="text-xs text-slate-400">Interactive Java, Python, C++, SQL Compiler & Complexity Analyzer</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Format Button */}
          <button
            onClick={handleFormatCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 active:scale-95"
            title="Clean up formatting"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Format
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Run Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-slate-950 ${isRunning ? 'animate-pulse' : ''}`} />
            {isRunning ? 'Executing...' : 'Run Code'}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout (2 columns: Editor left, Console + Details right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Sidebar: Language Selector & Snippet Library */}
        <div className="lg:col-span-3 bg-slate-900/90 border-r border-slate-800 p-4 space-y-5 overflow-y-auto">
          {/* Language Tabs */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Language
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'java', label: 'Java' },
                { id: 'python', label: 'Python' },
                { id: 'sql', label: 'SQL' },
                { id: 'cpp', label: 'C++' },
                { id: 'typescript', label: 'TS / JS' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id as SupportedLanguage)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                    selectedLang === lang.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Snippets / Algorithms List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Ready Algorithms</span>
              <span className="text-[10px] text-cyan-400 font-mono">({availableSnippets.length})</span>
            </span>

            <div className="space-y-1.5">
              {availableSnippets.map(snippet => {
                const isSelected = selectedSnippet.id === snippet.id;
                return (
                  <button
                    key={snippet.id}
                    onClick={() => handleSelectSnippet(snippet)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500/50 shadow-md'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold text-white truncate block">{snippet.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {snippet.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complexity Box */}
          {selectedSnippet.complexity && (
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Algorithm Complexity
              </span>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Time</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {selectedSnippet.complexity.time}
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Space (Memory)</span>
                  <span className="text-xs font-bold text-cyan-400 font-mono">
                    {selectedSnippet.complexity.space}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 leading-normal">
                {selectedSnippet.complexity.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Center: Code Editor Area */}
        <div className="lg:col-span-5 bg-slate-950 flex flex-col border-r border-slate-800">
          {/* Editor Header Bar */}
          <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-xs text-slate-400">
                {selectedSnippet.id}.{selectedLang === 'cpp' ? 'cpp' : selectedLang}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">UTF-8 • {selectedLang.toUpperCase()}</span>
          </div>

          {/* Textarea Code Editor */}
          <div className="flex-1 relative p-4 bg-slate-950 font-mono text-xs sm:text-sm">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent text-emerald-300 font-mono resize-none focus:outline-none leading-relaxed selection:bg-cyan-500/30 selection:text-white"
              style={{ minHeight: '380px' }}
            />
          </div>
        </div>

        {/* Right: Real-time Terminal & Execution Stats */}
        <div className="lg:col-span-4 bg-slate-900/70 flex flex-col">
          {/* Console Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Execution Console</span>
            </div>

            {executionResult.status === 'success' && (
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">⚡ {executionResult.executionTimeMs}ms</span>
                <span>💾 {executionResult.memoryKb} KB</span>
              </div>
            )}
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 bg-slate-950/90 font-mono text-xs text-slate-200 overflow-y-auto space-y-2">
            <div className="text-slate-400 text-[11px]">
              $ {selectedLang} --run {selectedSnippet.id}
            </div>

            <pre className="text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed">
              {executionResult.output}
            </pre>

            {executionResult.status === 'success' && (
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Execution finished successfully. 0 errors.</span>
              </div>
            )}
          </div>

          {/* Quick Explanation Footer */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Runtime Engine: V8 / OpenJDK JVM 21</span>
              <span>Memory Isolation: Sandbox</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Ready to test any Java, Python, SQL, C++ algorithms.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
