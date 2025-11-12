import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smile } from 'lucide-react';
import { subDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const generateMockData = (days) => {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), i);
    const mood = Math.floor(Math.random() * 5) + 1;
    return {
      date: date.toISOString(),
      mood,
      text: `Reflexión del día ${days - i}.`,
      tags: ['Personal', 'Trabajo'].slice(0, Math.floor(Math.random() * 3)),
    };
  }).reverse();
};

const mockData = {
  '7d': generateMockData(7),
  '14d': generateMockData(14),
  '30d': generateMockData(30),
};

const getMoodColor = (value) => {
  if (value < 3) return "text-destructive";
  if (value < 4) return "text-yellow-500";
  return "text-green-500";
};

export const MoodTrends = ({ trendOptions }) => {
  const [period, setPeriod] = useState('7d');

  const periodMap = {
    'Últimos 7 días': '7d',
    'Últimos 14 días': '14d',
    'Últimos 30 días': '30d',
  };

  const handlePeriodChange = (option) => {
    setPeriod(periodMap[option]);
  };

  const chartData = useMemo(() => {
    const data = mockData[period];
    const labels = data.map(entry => format(new Date(entry.date), 'MMM d', { locale: es }));
    const moodValues = data.map(entry => entry.mood);

    return {
      labels,
      datasets: [
        {
          label: 'Estado de Ánimo',
          data: moodValues,
          borderColor: 'hsl(var(--primary))',
          backgroundColor: 'hsla(var(--primary), 0.1)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: 'hsl(var(--background))',
          pointBorderColor: 'hsl(var(--primary))',
          pointHoverBackgroundColor: 'hsl(var(--primary))',
          pointHoverBorderColor: 'hsl(var(--background))',
        },
      ],
    };
  }, [period]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--background))',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--muted-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5.5,
        ticks: {
          stepSize: 1,
          color: 'hsl(var(--muted-foreground))',
        },
        grid: {
          color: 'hsl(var(--border))',
        },
      },
      x: {
        ticks: {
          color: 'hsl(var(--muted-foreground))',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const entries = mockData[period];

  return (
    <div className="pt-4 border-t border-border">
      <h4 className="font-semibold text-md mb-3 text-primary">Tendencias:</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {trendOptions.map(opt => (
          <Button
            key={opt}
            variant={period === periodMap[opt] ? 'default' : 'ghost'}
            size="sm"
            className="text-sm"
            onClick={() => handlePeriodChange(opt)}
          >
            {opt}
          </Button>
        ))}
      </div>
      
      <div className="h-64 mb-6">
        <Line options={chartOptions} data={chartData} />
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {entries.map((entry, index) => (
          <Card key={index} className="bg-background/50">
            <CardContent className="p-3 flex items-start space-x-3">
              <Smile size={20} className={`${getMoodColor(entry.mood)} mt-1 flex-shrink-0`} />
              <div className="flex-grow">
                <p className="text-xs text-muted-foreground">{format(new Date(entry.date), "eeee, d 'de' MMMM", { locale: es })}</p>
                <p className="text-sm text-foreground">{entry.text}</p>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};