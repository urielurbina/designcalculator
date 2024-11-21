import React, { useState, useEffect } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import { hexToRgb, rgbToHsl, rgbToHsv, rgbToCmyk, isValidHex } from '../utils/colorConversions';

interface ColorValue {
  label: string;
  value: string;
  copyValue: string; // Valor limpio para copiar
}

export default function ColorConverter() {
  const [hexInput, setHexInput] = useState('#6366F1');
  const [isValidInput, setIsValidInput] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [colorValues, setColorValues] = useState<ColorValue[]>([]);

  useEffect(() => {
    if (isValidHex(hexInput)) {
      setIsValidInput(true);
      const [r, g, b] = hexToRgb(hexInput);
      const [h, s, l] = rgbToHsl(r, g, b);
      const [hv, sv, v] = rgbToHsv(r, g, b);
      const [c, m, y, k] = rgbToCmyk(r, g, b);

      setColorValues([
        { 
          label: 'HEX', 
          value: hexInput.toUpperCase(),
          copyValue: hexInput.toUpperCase()
        },
        { 
          label: 'RGB', 
          value: `rgb(${r}, ${g}, ${b})`,
          copyValue: `${r}, ${g}, ${b}`
        },
        { 
          label: 'HSL', 
          value: `hsl(${h}, ${s}%, ${l}%)`,
          copyValue: `${h}, ${s}, ${l}`
        },
        { 
          label: 'HSV', 
          value: `hsv(${hv}, ${sv}%, ${v}%)`,
          copyValue: `${hv}, ${sv}, ${v}`
        },
        { 
          label: 'CMYK', 
          value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
          copyValue: `${c}, ${m}, ${y}, ${k}`
        }
      ]);
    } else {
      setIsValidInput(false);
    }
  }, [hexInput]);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleHexChange = (value: string) => {
    const hex = value.startsWith('#') ? value : `#${value}`;
    setHexInput(hex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Palette className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Convertidor de Colores
            </h1>
          </div>

          {/* Color Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color HEX
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#000000"
                className={`flex-1 rounded-lg border shadow-sm focus:ring-2 focus:ring-offset-2 
                  ${isValidInput 
                    ? 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500' 
                    : 'border-red-300 focus:border-red-500 focus:ring-red-500'}`}
              />
              <div 
                className="w-16 h-10 rounded-lg shadow-inner"
                style={{ backgroundColor: isValidInput ? hexInput : '#ffffff' }}
              />
            </div>
            {!isValidInput && (
              <p className="mt-2 text-sm text-red-600">
                Por favor ingresa un código HEX válido (ej: #FF0000)
              </p>
            )}
          </div>

          {/* Color Preview */}
          <div className="mb-8">
            <div 
              className="w-full h-32 rounded-xl shadow-inner transition-colors duration-200"
              style={{ backgroundColor: isValidInput ? hexInput : '#ffffff' }}
            />
          </div>

          {/* Color Values */}
          <div className="grid gap-4">
            {colorValues.map((color, index) => (
              <div 
                key={color.label}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    {color.label}
                  </span>
                  <p className="text-gray-900 font-mono mt-1">
                    {color.value}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(color.copyValue, index)}
                  className={`p-2 rounded-lg transition-colors ${
                    copiedIndex === index
                      ? 'bg-green-100 text-green-600'
                      : 'hover:bg-gray-200 text-gray-600'
                  }`}
                  title={`Copiar valores: ${color.copyValue}`}
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}