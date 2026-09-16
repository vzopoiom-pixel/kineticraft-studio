export type SupportedLanguage = 'java' | 'python' | 'javascript' | 'typescript' | 'sql' | 'cpp';

export interface CodeSnippet {
  id: string;
  title: string;
  language: SupportedLanguage;
  description: string;
  code: string;
  expectedOutput?: string;
  complexity?: {
    time: string;
    space: string;
    explanation: string;
  };
}

export interface ExecutionResult {
  status: 'success' | 'error' | 'idle' | 'running';
  output: string;
  executionTimeMs: number;
  memoryKb: number;
  timestamp: string;
}
