import { useState, useRef, useEffect } from 'react';

export function DigitalTwinTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '> Initializing Digital Twin: Surya AI...',
    '> Hello! I am the AI version of Surya. Type /help to see what I can answer.'
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    let response = '';
    switch(cmd.toLowerCase().trim()) {
      case '/help':
        response = 'Commands: /contact, /stack, /projects, /hire, /coffee';
        break;
      case '/contact':
        response = 'Email: suryabhiguva@gmail.com | LinkedIn: surya-bhiguva';
        break;
      case '/stack':
        response = 'Next.js, FastAPI, Node, WebGL. Always building cool AI subroutines.';
        break;
      case '/projects':
        response = 'FinMindAI, ShipGuard AI, TechFixAI, GreenGPT. Reverse scroll to see them.';
        break;
      case '/hire':
        response = 'Currently open for opportunities! Contact me at suryabhiguva@gmail.com.';
        break;
      case '/coffee':
        response = 'Processing request... ?? Oat Milk Cortado dispatched to your location.';
        break;
      default:
        response = `Error: Unknown command "${cmd}". Type /help.`;
    }
    setHistory(prev => [...prev, `> ${cmd}`, `~ ${response}`]);
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="w-full h-full glass-panel rounded-xl flex flex-col font-mono text-sm overflow-hidden border border-[#00F0FF] shadow-[0_0_40px_rgba(0,240,255,0.2)] bg-[#050505]/90 backdrop-blur-3xl text-left pointer-events-auto">
      <div className="p-3 bg-[#0a0a0a] flex gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs text-gray-500 tracking-widest uppercase">sys.terminal</div>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3 relative scrollbar-none">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('~') ? 'text-[#00F0FF]' : 'text-gray-300'}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-[#0a0a0a]/90 flex items-center border-t border-white/10">
        <span className="text-[#B200FF] mr-3 whitespace-nowrap">root@surya:~#</span>
        <input 
          type="text" 
          className="bg-transparent outline-none border-none flex-1 text-white placeholder-gray-600 focus:ring-0"
          placeholder="Type /help..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) handleCommand(input.trim());
          }}
        />
      </div>
    </div>
  );
}
