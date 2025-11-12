import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Annoyed, Laugh, Pencil, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import RecentReflections from '@/components/wellness/RecentReflections';
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

const moods = [
    { level: 1, label: 'Very Bad', icon: Frown, color: 'text-red-600', bg: 'bg-red-100', ring: 'ring-red-500' },
    { level: 2, label: 'Bad', icon: Annoyed, color: 'text-orange-500', bg: 'bg-orange-100', ring: 'ring-orange-500' },
    { level: 3, label: 'Neutral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100', ring: 'ring-yellow-500' },
    { level: 4, label: 'Good', icon: Smile, color: 'text-green-500', bg: 'bg-green-100', ring: 'ring-green-500' },
    { level: 5, label: 'Very Good', icon: Laugh, color: 'text-sky-500', bg: 'bg-sky-100', ring: 'ring-sky-500' },
];

const generateChartData = (days) => {
    const labels = Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = Array.from({ length: days }, () => Math.floor(Math.random() * 5) + 1);
    return { labels, data };
};


const MoodTracker = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [text, setText] = useState('');
    const [chartPeriod, setChartPeriod] = useState(7);
    const { toast } = useToast();

    const handleActionClick = (action) => {
        toast({
            title: `🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
        });
    };
    
    const { labels, data } = generateChartData(chartPeriod);

    const chartData = {
      labels,
      datasets: [{
          label: 'Mood Level',
          data,
          borderColor: '#243D75',
          backgroundColor: 'rgba(36, 61, 117, 0.1)',
          pointBackgroundColor: '#243D75',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#243D75',
          tension: 0.4,
          fill: true,
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
          y: { beginAtZero: true, min: 0, max: 5.5, grid: { drawBorder: false }, ticks: { stepSize: 1, callback: (val) => ['','Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'][val] || '' } },
          x: { grid: { display: false } }
      },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
                className="lg:col-span-2 space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="rounded-2xl soft-shadow border-0">
                    <CardHeader>
                        <CardTitle className="text-brand-deep-indigo">How are you feeling today?</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center justify-around gap-4 p-6">
                        {moods.map((mood) => {
                            const Icon = mood.icon;
                            return (
                                <button
                                    key={mood.level}
                                    aria-label={mood.label}
                                    onClick={() => setSelectedMood(mood.level)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 w-24 h-24 justify-center
                                        ${selectedMood === mood.level ? `${mood.bg} ring-2 ${mood.ring}` : 'hover:bg-gray-100'}
                                    `}
                                >
                                    <Icon className={`w-8 h-8 ${mood.color}`} />
                                    <span className="text-xs font-medium text-brand-charcoal">{mood.label}</span>
                                </button>
                            )
                        })}
                    </CardContent>
                </Card>

                <Card className="rounded-2xl soft-shadow border-0">
                    <CardHeader>
                        <CardTitle className="text-brand-deep-indigo">What's on your mind today?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Share your thoughts, feelings, or events of the day..."
                            maxLength="500"
                            className="min-h-[120px] rounded-lg"
                        />
                         <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-brand-charcoal">{text.length}/500</p>
                            <div className="flex justify-end items-center mt-2 gap-2">
                               <Button variant="outline" size="sm" onClick={() => handleActionClick('Edit')}>
                                    <Pencil className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleActionClick('Save')}>
                                    <Save className="h-4 w-4 mr-2" /> Save
                                </Button>
                                <Button size="sm" onClick={() => handleActionClick('Submit')}>
                                    <Send className="h-4 w-4 mr-2" /> Submit
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="rounded-2xl soft-shadow border-0 h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-brand-deep-indigo">Mood Trends</CardTitle>
                        <div className="flex gap-2 pt-2">
                            <Button size="sm" variant={chartPeriod === 7 ? 'default' : 'outline'} onClick={() => setChartPeriod(7)}>7 days</Button>
                            <Button size="sm" variant={chartPeriod === 14 ? 'default' : 'outline'} onClick={() => setChartPeriod(14)}>14 days</Button>
                            <Button size="sm" variant={chartPeriod === 30 ? 'default' : 'outline'} onClick={() => setChartPeriod(30)}>30 days</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="h-64 relative">
                            <Line data={chartData} options={chartOptions} />
                            <p className="sr-only">A line chart showing mood trends over the selected period.</p>
                        </div>
                    </CardContent>
                </Card>

            </motion.div>

            <motion.div
                className="lg:col-span-1 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <RecentReflections />
            </motion.div>
        </div>
    );
};

export default MoodTracker;