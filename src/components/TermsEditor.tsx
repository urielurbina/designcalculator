import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface TermsEditorProps {
  terms: string[];
  onChange: (terms: string[]) => void;
}

export default function TermsEditor({ terms, onChange }: TermsEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const addTerm = () => {
    onChange([...terms, '']);
    setEditingIndex(terms.length);
  };

  const removeTerm = (index: number) => {
    onChange(terms.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const startEditing = (index: number) => {
    setEditValue(terms[index]);
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const saveTerm = (index: number) => {
    if (editValue.trim()) {
      const newTerms = [...terms];
      newTerms[index] = editValue.trim();
      onChange(newTerms);
    }
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-700">Términos y Condiciones</h4>
        <button
          onClick={addTerm}
          className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar término
        </button>
      </div>

      <div className="space-y-3">
        {terms.map((term, index) => (
          <div key={index} className="group relative">
            {editingIndex === index ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Ingresa el término o condición"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveTerm(index);
                    if (e.key === 'Escape') cancelEditing();
                  }}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => saveTerm(index)}
                    className="text-green-500 hover:text-green-600 p-2 rounded-md hover:bg-green-50"
                    title="Guardar"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-600 p-2 rounded-md hover:bg-gray-50"
                    title="Cancelar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-gray-50 rounded-md pr-2">
                <div className="flex-1 p-3">
                  {term}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => startEditing(index)}
                    className="p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 
                             transition-colors"
                    title="Editar término"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeTerm(index)}
                    className="p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50
                             transition-colors"
                    title="Eliminar término"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {terms.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No hay términos y condiciones. Agrega algunos usando el botón de arriba.
        </div>
      )}
    </div>
  );
}