import React, { useState, useEffect } from 'react';
import NavbarPublica from '../NavbarPublica';
import './MaintenancePage.css';

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Data alvo: 30 de Setembro de 2026 às 00:00:00
    const targetDate = new Date('2026-09-30T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    // Executa imediatamente na montagem
    updateCountdown();

    // Atualiza a cada 1 segundo
    const timer = setInterval(updateCountdown, 1000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
    <NavbarPublica/>
    <div className="min-h-screen bg-slate-900 color-slate-100 flex flex-col items-center justify-center p-5 text-center font-sans">
      <div className="max-w-xl w-full">
        {isFinished ? (
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Estamos de volta!</h1>
            <p className="text-slate-400 text-lg">Atualize a página para acessar o novo site.</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-3">Clube Papaya em Manutenção</h1>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Estamos trabalhando para trazer novidades em breve! Nosso site estará de volta em:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-md">
                <span className="block text-4xl font-bold text-sky-400">{timeLeft.days}</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">Dias</span>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-md">
                <span className="block text-4xl font-bold text-sky-400">{timeLeft.hours}</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">Horas</span>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-md">
                <span className="block text-4xl font-bold text-sky-400">{timeLeft.minutes}</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">Minutos</span>
              </div>
              <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-md">
                <span className="block text-4xl font-bold text-sky-400">{timeLeft.seconds}</span>
                <span className="block text-xs uppercase tracking-wider text-slate-400 mt-1">Segundos</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
}