import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';

export default function DiagnosticNavbar() {
  return (
    <nav className="bg-[#0C0C0C] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/diagnostic" className="flex items-center gap-2 font-semibold text-lg sm:text-xl text-white">
            <span className="hidden sm:inline">Diagnóstico de Marca</span>
            <span className="sm:hidden">Diagnóstico</span>
          </Link>
          
          <a
            href="https://www.urielurbina.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
          >
            Por Uriel Urbina
          </a>
        </div>
      </div>
    </nav>
  );
}