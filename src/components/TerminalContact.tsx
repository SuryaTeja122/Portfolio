import React, { useState } from "react";

export default function TerminalContact() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "INITIATING SECURE COMM LINK..." },
    { type: "system", text: "WAITING FOR INPUT..." },
  ]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();
      if (!command) return;

      const newHistory = [...history, { type: "user", text: `$ ${input}` }];

      setTimeout(() => {
        let response = "";
        if (command === "help") {
          response = "Available commands: email, github, linkedin, clear";
        } else if (command === "email") {
          response = "Contacting at suryabhiguva@gmail.com...";
          window.location.href = "mailto:suryabhiguva@gmail.com";
        } else if (command === "github") {
          response = "Opening signal: github.com/SuryaTeja122";
          window.open("https://github.com/SuryaTeja122", "_blank");
        } else if (command === "linkedin") {
          response = "Bypassing firewall: linkedin.com/in/surya-bhiguva";
          window.open("https://www.linkedin.com/in/surya-bhiguva", "_blank");
        } else if (command === "clear") {
          setHistory([]);
          setInput("");
          return;
        } else {
          response = `Command unrecognized: ${command}. Type 'help' for options.`;
        }

        setHistory([...newHistory, { type: "system", text: response }]);
      }, 400);

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-40 relative z-10 w-full flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight text-center mb-8 sm:mb-12 md:mb-16">
          Terminal Access
        </h2>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-2xl overflow-hidden glass-panel">
          <div className="bg-[#111111] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/5 flex items-center space-x-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 shrink-0"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 shrink-0"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 shrink-0"></div>
            <div className="ml-2 sm:ml-4 font-mono text-[10px] sm:text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
              guest@masterpiece:~
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-6 h-70 sm:h-75 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 sm:space-y-3 custom-scrollbar">
            {history.map((line, i) => (
              <div
                key={i}
                className={`${line.type === "system" ? "text-[#00F0FF]" : "text-gray-300"} wrap-break-word`}
              >
                {line.text}
              </div>
            ))}

            <div className="flex items-center space-x-1.5 sm:space-x-2 mt-3 sm:mt-4 text-[#B200FF] min-w-0">
              <span className="shrink-0">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="help"
                className="w-full bg-transparent border-none outline-none text-white focus:ring-0 placeholder-gray-600 font-mono min-w-0 text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            {/* Blinking cursor effect simulated by Framer usually, but simple CSS here is safer to fix disappearance */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
               .custom-scrollbar::-webkit-scrollbar { width: 6px; }
               .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
               .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
               .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
            `,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
