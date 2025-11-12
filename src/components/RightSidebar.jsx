import React, { useState } from 'react';
    import { Button } from '@/components/ui/button';
    import { ChevronLeft, ChevronRight, Activity, ListChecks, Award, PieChart, Users2 } from 'lucide-react';

    const CalendarWidget = () => {
      const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 30));

      const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const dayNames = ["L", "M", "X", "J", "V", "S", "D"];

      const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = daysInMonth(year, month);
        let firstDay = firstDayOfMonth(year, month);
        firstDay = firstDay === 0 ? 6 : firstDay - 1;

        const blanks = Array(firstDay).fill(null);
        const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);

        const today = new Date();
        const isCurrentMonthAndYear = today.getFullYear() === year && today.getMonth() === month;

        return [...blanks, ...daysArray].map((day, index) => (
          <div
            key={index}
            className={`flex items-center justify-center h-8 text-sm rounded-full transition-colors ${
              day ? 'cursor-pointer hover:bg-gray-200/70' : ''
            } ${day && isCurrentMonthAndYear && day === today.getDate() ? 'bg-brand-primary-blue text-white' : ''}
               ${day && day === 30 && month === 4 && year === 2025 ? 'bg-brand-secondary-sky text-white' : ''}`}
          >
            {day}
          </div>
        ));
      };

      const changeMonth = (offset) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
      };

      return (
        <div className="bg-white p-5 rounded-2xl soft-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-brand-deep-indigo">Mi Calendario</h3>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-mid-gray" onClick={() => changeMonth(-1)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-mid-gray" onClick={() => changeMonth(1)}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-center font-semibold text-brand-charcoal mb-3">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
          <div className="grid grid-cols-7 gap-1 text-xs text-brand-mid-gray mb-2">
            {dayNames.map(day => <div key={day} className="font-medium text-center">{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="rounded-full text-sm">Agenda</Button>
          </div>
        </div>
      );
    };

    const ProgressTracker = () => {
      const progress = 75;
      const legend = [
        { color: 'bg-brand-mid-gray', label: 'Not Started' },
        { color: 'bg-brand-primary-blue', label: 'In Progress' },
        { color: 'bg-brand-orange', label: 'Not Validated' },
        { color: 'bg-brand-accent-green', label: 'Validated' },
      ];

      return (
        <div className="bg-white p-5 rounded-2xl soft-shadow">
          <h3 className="font-bold text-lg text-brand-deep-indigo mb-4">Mi Progreso</h3>
          <div className="flex justify-center items-center my-4">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3.8"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-primary-blue"
                  strokeWidth="3.8"
                  strokeDasharray={`${progress}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-brand-primary-blue">
                {progress}%
              </div>
            </div>
          </div>
          <ul className="text-sm space-y-2 text-brand-charcoal">
            {legend.map(item => (
              <li key={item.label} className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 ${item.color}`}></span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const QuickTools = () => {
      const tools = [
        { icon: Activity },
        { icon: ListChecks },
        { icon: Award },
        { icon: PieChart },
        { icon: Users2 },
      ];
      return (
        <div className="bg-white p-5 rounded-2xl soft-shadow">
          <h3 className="font-bold text-lg text-brand-deep-indigo mb-4">Herramientas Rápidas</h3>
          <div className="grid grid-cols-5 gap-2">
            {tools.map((Tool, index) => (
              <Button key={index} variant="outline" className="h-14 w-full flex items-center justify-center p-1 hover:border-brand-primary-blue hover:bg-gray-200/70">
                <Tool.icon className="h-6 w-6 text-brand-mid-gray group-hover:text-brand-primary-blue" />
              </Button>
            ))}
          </div>
        </div>
      );
    };

    const RightSidebar = () => {
      return (
        <div className="space-y-6">
          <CalendarWidget />
          <ProgressTracker />
          <QuickTools />
        </div>
      );
    };

    export default RightSidebar;