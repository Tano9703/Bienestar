import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import {
    Users, Settings, Target, BarChart3, Search, SlidersHorizontal, User, Star, MapPin, 
    Book, Send, UserPlus, FileDown, Bell, MessageSquare, Briefcase, CalendarDays, CheckCircle, BrainCircuit,
    ChevronDown, PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const skillsToDevelop = [
  'Project Leadership', 
  'Product Design', 
  'Negotiation', 
  'Data Analysis',
  'Digital Marketing'
];

const mentorsData = [
  { id: 'm1', name: 'Ana García', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', masteredSkills: ['Project Leadership', 'Negotiation'] },
  { id: 'm2', name: 'Luis Martínez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', masteredSkills: ['Data Analysis', 'Finance', 'Startup'] },
  { id: 'm3', name: 'Sofía López', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', masteredSkills: ['Product Design', 'Digital Marketing', 'SEO'] },
  { id: 'm4', name: 'Carlos Rodríguez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', masteredSkills: ['Project Leadership', 'Data Analysis'] },
  { id: 'm5', name: 'Laura Sánchez', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g', masteredSkills: ['Product Design', 'UX Design'] },
];

const SkillMatchingModalContent = () => {
  const { toast } = useToast();
  const [matches, setMatches] = useState({});

  const handleSelectMentor = (skill, mentorId) => {
    setMatches(prev => ({ ...prev, [skill]: mentorId }));
  };
  
  const handleSaveChanges = () => {
    if (Object.keys(matches).length === 0) {
      toast({
        variant: "destructive",
        title: "No changes",
        description: "You haven't selected any matches to save.",
      });
      return;
    }
    console.log("Matches saved:", matches);
    toast({
      title: "Matches Saved!",
      description: "Your mentorship preferences have been updated.",
    });
  };

  return (
    <>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
        {skillsToDevelop.map(skill => {
          const availableMentors = mentorsData.filter(m => m.masteredSkills.includes(skill));
          return (
            <div key={skill} className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={skill} className="text-right col-span-1 truncate">
                {skill}
              </Label>
              <Select onValueChange={(value) => handleSelectMentor(skill, value)} value={matches[skill] || ""}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Select a mentor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {availableMentors.length > 0 ? (
                      availableMentors.map(mentor => (
                        <SelectItem key={mentor.id} value={mentor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={mentor.avatar} />
                              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{mentor.name}</span>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-mentor" disabled>
                        No mentors available
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
      <DialogFooter>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </DialogFooter>
    </>
  );
};

const DashboardTab = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="rounded-2xl soft-shadow border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mentors & Mentees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-deep-indigo">78% Active Matches</div>
          <p className="text-xs text-green-500 font-semibold">+15% from last month</p>
          <Progress value={78} className="mt-4 h-2" indicatorClassName="bg-brand-primary-blue" />
          <div className="flex justify-between mt-4 gap-2">
            <Button size="sm" variant="outline">View Profiles</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Configure Matches</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Configure Matches by Skill</DialogTitle>
                  <DialogDescription>
                    Select a mentor with mastery in each skill you wish to develop.
                  </DialogDescription>
                </DialogHeader>
                <SkillMatchingModalContent />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl soft-shadow border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participation & Feedback</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-deep-indigo">NPS: 4.7/5.0</div>
          <p className="text-xs text-muted-foreground">Participation rate: 92%</p>
          <div className="mt-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">3 Low Engagement Alerts</span>
          </div>
           <div className="flex justify-between mt-4 gap-2">
            <Button size="sm" variant="outline">View Feedback</Button>
            <Button size="sm" variant="destructive">Send Reminder</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-2xl soft-shadow border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SMART Goal Compliance</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-deep-indigo">65% Completed</div>
          <p className="text-xs text-muted-foreground">23 of 36 goals in progress</p>
          <Progress value={65} className="mt-4 h-2" indicatorClassName="bg-brand-green" />
          <div className="flex justify-between mt-4 gap-2">
            <Button size="sm" variant="outline">View Goals</Button>
            <Button size="sm">Update Progress</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const ConfigurationTab = () => {
  const { toast } = useToast();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
       <Card className="rounded-2xl soft-shadow border-0">
        <CardHeader>
            <CardTitle className="text-brand-deep-indigo">Matching Configuration</CardTitle>
            <CardDescription>Select the matching methods for your organization.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="auto-match" className="text-base font-medium text-brand-charcoal">Auto Match</Label>
                    <p className="text-sm text-muted-foreground">AI-based automatic pairing.</p>
                </div>
                <Switch id="auto-match" defaultChecked />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="self-match" className="text-base font-medium text-brand-charcoal">Self Match</Label>
                    <p className="text-sm text-muted-foreground">Users select their own mentors/mentees.</p>
                </div>
                <Switch id="self-match" />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="smart-suggestions" className="text-base font-medium text-brand-charcoal">Smart Suggestions</Label>
                    <p className="text-sm text-muted-foreground">AI recommends best matches to users.</p>
                </div>
                <Switch id="smart-suggestions" defaultChecked />
            </div>
            <Card className="bg-brand-light-gray/50">
                <CardHeader>
                    <CardTitle className="text-base text-brand-deep-indigo">Preview Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>Ana García (Mentee) &rarr; Carlos Rodríguez (Mentor) | Affinity: 95% (Skills, Goals)</p>
                    <p>Luis Martínez (Mentee) &rarr; Sofía López (Mentor) | Affinity: 92% (Industry, Availability)</p>
                </CardContent>
            </Card>
        </CardContent>
       </Card>
       <div className="flex justify-end mt-6">
          <Button onClick={() => toast({ title: "Configuration Saved", description: "Your changes have been applied successfully." })}>
            Save Configuration
          </Button>
       </div>
    </motion.div>
  )
};

const profiles = [
  { name: 'Ana García', role: 'Mentor', skills: ['Leadership', 'UX Design'], exp: '10 years', location: 'Madrid', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
  { name: 'Carlos Rodríguez', role: 'Mentee', skills: ['React', 'Project Management'], exp: '2 years', location: 'Barcelona', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { name: 'Sofía López', role: 'Mentor', skills: ['Digital Marketing', 'SEO'], exp: '8 years', location: 'Valencia', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
  { name: 'Luis Martínez', role: 'Mentor', skills: ['Finance', 'Startup'], exp: '15 years', location: 'Remote', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Laura Sánchez', role: 'Mentee', skills: ['Python', 'Data Science'], exp: '1 year', location: 'Sevilla', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
];

const ProfilesTab = () => {
  const { toast } = useToast();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, skill, etc." className="pl-10 rounded-full" />
        </div>
        <Button variant="outline" className="flex-shrink-0 rounded-full">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Advanced Filters
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map(p => (
          <Card key={p.name} className="rounded-2xl soft-shadow border-0">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={p.avatar} alt={p.name} />
                  <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg text-brand-deep-indigo">{p.name}</CardTitle>
                  <CardDescription className="text-brand-purple">{p.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center"><BrainCircuit className="mr-2 h-4 w-4 text-muted-foreground" /> {p.skills.join(', ')}</div>
              <div className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> {p.exp} of experience</div>
              <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> {p.location}</div>
              <Button className="w-full mt-4 bg-brand-primary-blue hover:bg-brand-primary-blue/90" onClick={() => toast({title: "Match Created!", description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"})}>
                <UserPlus className="mr-2 h-4 w-4" /> Match
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
};

const MetricsTab = () => {
    const participationData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Participation Rate (%)',
            data: [75, 80, 82, 88, 90, 92],
            backgroundColor: 'rgba(91, 170, 211, 0.6)',
            borderColor: '#5BAAD3',
            borderWidth: 1,
            borderRadius: 6,
        }],
    };
    const feedbackData = {
        labels: ['Excellent', 'Good', 'Fair', 'Poor'],
        datasets: [{
            data: [120, 60, 15, 5],
            backgroundColor: ['#6C9F52', '#5BAAD3', '#F59E0B', '#EF4444'],
            hoverOffset: 4,
        }]
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h3 className="text-2xl font-bold text-brand-deep-indigo">Dashboards & Metrics</h3>
                <div className="flex gap-2">
                    <Select defaultValue="quarter">
                        <SelectTrigger className="w-[180px] rounded-full">
                            <SelectValue placeholder="Filter by period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                            <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="rounded-full"><FileDown className="mr-2 h-4 w-4" /> Export</Button>
                </div>
            </div>
            <div className="grid md:grid-cols-5 gap-6">
                <Card className="md:col-span-3 rounded-2xl soft-shadow border-0">
                    <CardHeader><CardTitle className="text-brand-deep-indigo">Monthly Participation</CardTitle></CardHeader>
                    <CardContent className="h-64"><Bar data={participationData} options={{ maintainAspectRatio: false }} /></CardContent>
                </Card>
                 <Card className="md:col-span-2 rounded-2xl soft-shadow border-0">
                    <CardHeader><CardTitle className="text-brand-deep-indigo">General Feedback (NPS)</CardTitle></CardHeader>
                    <CardContent className="h-64 flex justify-center"><Doughnut data={feedbackData} options={{ maintainAspectRatio: false }} /></CardContent>
                </Card>
            </div>
            <Card className="rounded-2xl soft-shadow border-0">
                <CardHeader><CardTitle className="text-brand-deep-indigo">Recent Alerts</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-destructive text-sm flex items-center"><Bell className="mr-2 h-4 w-4" />Low engagement in the Marketing team (last 2 weeks).</div>
                    <div className="text-amber-600 text-sm flex items-center"><Bell className="mr-2 h-4 w-4" />"API Development" goal from Juan P. not updated for 10 days.</div>
                </CardContent>
            </Card>
        </motion.div>
    );
};


const MentorNetworkPage = () => {
  const { toast } = useToast();
  const TABS = [
    { value: 'dashboard', label: 'Dashboard', icon: BarChart3, content: <DashboardTab /> },
    { value: 'configuration', label: 'Configuration', icon: Settings, content: <ConfigurationTab /> },
    { value: 'profiles', label: 'Profiles', icon: Users, content: <ProfilesTab /> },
    { value: 'metrics', label: 'Metrics', icon: BrainCircuit, content: <MetricsTab /> },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-brand-light-gray/50">
        <header className="mb-6">
            <h1 className="text-3xl font-bold text-brand-deep-indigo">Mentor Network</h1>
            <p className="text-muted-foreground mt-1">Platform for mentorship and pairing management.</p>
        </header>

        <Tabs defaultValue="dashboard" className="w-full">
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Menu <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {TABS.map(tab => (
                     <DropdownMenuItem key={tab.value} onSelect={() => document.querySelector(`button[role="tab"][data-state="inactive"][value="${tab.value}"]`)?.click()}>
                       <tab.icon className="mr-2 h-4 w-4" />
                       {tab.label}
                     </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <TabsList className="hidden">
                 {TABS.map(tab => <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>)}
              </TabsList>
            </div>
            
            <TabsList className="hidden md:grid w-full grid-cols-4">
                {TABS.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    <tab.icon className="mr-2 h-4 w-4" /> {tab.label}
                  </TabsTrigger>
                ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {TABS.map(tab => (
                  <TabsContent key={tab.value} value={tab.value} className="mt-6">
                    {tab.content}
                  </TabsContent>
              ))}
            </AnimatePresence>
        </Tabs>
    </div>
  );
};

export default MentorNetworkPage;