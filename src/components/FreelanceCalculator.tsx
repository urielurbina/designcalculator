import React, { useState } from 'react';
import { Clock, Plus, Trash2, Edit2, Check, X, DollarSign } from 'lucide-react';
import { useFreelanceCalculator } from '../hooks/useFreelanceCalculator';

const formatMoney = (amount: number) => amount.toLocaleString('es-MX');

export default function FreelanceCalculator() {
  const {
    desiredIncome,
    workHoursPerDay,
    workDaysPerWeek,
    vacationDays,
    sickDays,
    nonBillablePercent,
    profitMargin,
    expenses,
    setDesiredIncome,
    setWorkHoursPerDay,
    setWorkDaysPerWeek,
    setVacationDays,
    setSickDays,
    setNonBillablePercent,
    setProfitMargin,
    addExpense,
    updateExpense,
    removeExpense,
    calculateRates
  } = useFreelanceCalculator();

  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({ name: '', amount: '' });

  const rates = calculateRates();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.name && newExpense.amount) {
      addExpense({
        name: newExpense.name,
        amount: Number(newExpense.amount)
      });
      setNewExpense({ name: '', amount: '' });
    }
  };

  const startEditing = (expense: { id: string; name: string; amount: number }) => {
    setEditingId(expense.id);
    setEditValue({ name: expense.name, amount: expense.amount.toString() });
  };

  const saveEdit = (id: string) => {
    if (editValue.name && editValue.amount) {
      updateExpense(id, {
        name: editValue.name,
        amount: Number(editValue.amount)
      });
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Calculadora de Tarifa Freelance
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Ingresos y Tiempo */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Ingresos y Tiempo
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ingreso Mensual Deseado ($)
                    </label>
                    <input
                      type="text"
                      value={formatMoney(desiredIncome)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setDesiredIncome(Number(value) || 0);
                      }}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horas de Trabajo por Día
                    </label>
                    <input
                      type="number"
                      value={workHoursPerDay}
                      onChange={(e) => setWorkHoursPerDay(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="1"
                      max="24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Días de Trabajo por Semana
                    </label>
                    <input
                      type="number"
                      value={workDaysPerWeek}
                      onChange={(e) => setWorkDaysPerWeek(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="1"
                      max="7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Días de Vacaciones al Año
                    </label>
                    <input
                      type="number"
                      value={vacationDays}
                      onChange={(e) => setVacationDays(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="0"
                      max="365"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Días por Enfermedad al Año
                    </label>
                    <input
                      type="number"
                      value={sickDays}
                      onChange={(e) => setSickDays(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="0"
                      max="365"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo No Facturable (%)
                      <span className="text-xs text-gray-500 ml-1">
                        (reuniones, presupuestos, etc.)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={nonBillablePercent}
                      onChange={(e) => setNonBillablePercent(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Margen de Beneficio (%)
                      <span className="text-xs text-gray-500 ml-1">
                        (emergencias, jubilación, etc.)
                      </span>
                    </label>
                    <input
                      type="number"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>

              {/* Gastos Mensuales */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Gastos Mensuales Fijos
                </h2>
                
                <form onSubmit={handleAddExpense} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Concepto"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Monto"
                    value={newExpense.amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setNewExpense(prev => ({ ...prev, amount: value }));
                    }}
                    className="w-32 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </form>

                <div className="space-y-2">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg p-2"
                    >
                      {editingId === expense.id ? (
                        <>
                          <input
                            type="text"
                            value={editValue.name}
                            onChange={(e) => setEditValue(prev => ({ ...prev, name: e.target.value }))}
                            className="flex-1 rounded border-gray-300 text-sm"
                          />
                          <input
                            type="text"
                            value={formatMoney(Number(editValue.amount))}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              setEditValue(prev => ({ ...prev, amount: value }));
                            }}
                            className="w-32 rounded border-gray-300 text-sm"
                          />
                          <button
                            onClick={() => saveEdit(expense.id)}
                            className="text-green-600 p-1 hover:bg-green-50 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 p-1 hover:bg-gray-100 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-sm">{expense.name}</span>
                          <span className="text-sm font-medium">${formatMoney(expense.amount)}</span>
                          <button
                            onClick={() => startEditing(expense)}
                            className="text-gray-600 p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="text-red-600 p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Tarifas Recomendadas
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="text-4xl font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-8 h-8" />
                      {formatMoney(rates.hourly)}/hr
                    </div>
                    <p className="text-indigo-100 mt-2">Tarifa por Hora</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-indigo-100">
                      <span>Tarifa Diaria ({workHoursPerDay}hrs)</span>
                      <span>${formatMoney(rates.daily)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-indigo-100">
                      <span>Tarifa Semanal</span>
                      <span>${formatMoney(rates.weekly)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-indigo-100">
                      <span>Tarifa Mensual</span>
                      <span>${formatMoney(rates.monthly)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <div className="text-xs text-indigo-100 space-y-2">
                      <p>• Basado en {workDaysPerWeek} días por semana</p>
                      <p>• {vacationDays} días de vacaciones al año</p>
                      <p>• {sickDays} días por enfermedad</p>
                      <p>• {nonBillablePercent}% de tiempo no facturable</p>
                      <p>• {profitMargin}% de margen de beneficio</p>
                      <p>• ${formatMoney(expenses.reduce((sum, exp) => sum + exp.amount, 0))} en gastos mensuales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}