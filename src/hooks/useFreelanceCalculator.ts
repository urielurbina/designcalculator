import { useState } from 'react';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface Rates {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export function useFreelanceCalculator() {
  const [desiredIncome, setDesiredIncome] = useState(30000);
  const [workHoursPerDay, setWorkHoursPerDay] = useState(8);
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState(5);
  const [vacationDays, setVacationDays] = useState(15);
  const [sickDays, setSickDays] = useState(5);
  const [nonBillablePercent, setNonBillablePercent] = useState(20);
  const [profitMargin, setProfitMargin] = useState(30);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Alquiler', amount: 8000 },
    { id: '2', name: 'Cuota de Autónomos', amount: 3000 },
    { id: '3', name: 'Teléfono/Internet', amount: 1000 }
  ]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now().toString() }]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const calculateRates = (): Rates => {
    // Calcular días laborables totales
    const totalWorkDays = 365 - (
      // Fines de semana
      (365 / 7) * (7 - workDaysPerWeek) +
      // Vacaciones y días por enfermedad
      vacationDays + sickDays
    );

    // Calcular horas facturables considerando tiempo no facturable
    const dailyBillableHours = workHoursPerDay * (1 - nonBillablePercent / 100);
    const monthlyBillableHours = (totalWorkDays / 12) * dailyBillableHours;

    // Calcular gastos mensuales totales
    const totalMonthlyExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calcular ingreso objetivo total (incluyendo gastos, ingreso deseado y margen)
    const totalMonthlyTarget = (desiredIncome + totalMonthlyExpenses) * (1 + profitMargin / 100);

    // Calcular tarifa por hora
    const hourlyRate = Math.ceil(totalMonthlyTarget / monthlyBillableHours);
    const dailyRate = hourlyRate * dailyBillableHours;
    const weeklyRate = dailyRate * workDaysPerWeek;
    const monthlyRate = weeklyRate * 4.33; // Promedio de semanas por mes

    return {
      hourly: hourlyRate,
      daily: dailyRate,
      weekly: Math.ceil(weeklyRate),
      monthly: Math.ceil(monthlyRate)
    };
  };

  return {
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
  };
}