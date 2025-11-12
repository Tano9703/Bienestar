import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, UserCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useToast } from "@/components/ui/use-toast";

const orgData = {
  id: 1, name: 'Eleonora', role: 'CEO',
  children: [
    {
      id: 2, name: 'Leonardo', role: 'CTO',
      children: [
        {
          id: 3, name: 'Sofía', role: 'Frontend Lead',
          children: [
            { id: 4, name: 'Mateo', role: 'Frontend Developer' },
            { id: 5, name: 'Isabella', role: 'Frontend Developer' },
          ]
        },
        { id: 6, name: 'Javier', role: 'Backend Lead' }
      ]
    },
    {
      id: 7, name: 'Camila', role: 'COO',
      children: [
        { id: 8, name: 'Daniel', role: 'Operations Manager' }
      ]
    }
  ]
};

const OrgNode = ({ node, onNodeClick, highlightedId, isCollapsed, toggleCollapse }) => {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className="flex flex-col items-center relative">
      <div className={`p-3 bg-white rounded-lg soft-shadow cursor-pointer hover:shadow-xl transition-shadow border-2 ${highlightedId === node.id ? 'border-brand-primary-blue' : 'border-transparent'}`} onClick={() => onNodeClick(node)}>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/40?u=${node.id}`} alt={node.name} />
            <AvatarFallback>{node.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-brand-deep-indigo text-sm">{node.name}</p>
            <p className="text-xs text-brand-charcoal">{node.role}</p>
          </div>
        </div>
      </div>
      {hasChildren && (
        <button onClick={() => toggleCollapse(node.id)} className="absolute -bottom-3 w-6 h-6 bg-brand-primary-blue text-white rounded-full flex items-center justify-center text-lg z-10">
          {isCollapsed ? '+' : '-'}
        </button>
      )}
      {!isCollapsed && hasChildren && (
        <div className="flex pt-12 relative before:content-[''] before:absolute before:left-1/2 before:-top-1 before:w-px before:h-12 before:bg-gray-300">
          {node.children.map((child) => (
            <div key={child.id} className="px-4 relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-gray-300">
              <OrgNode node={child} onNodeClick={onNodeClick} highlightedId={highlightedId} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrganizationalStructure = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedNodes, setCollapsedNodes] = useState({});
  const { toast } = useToast();

  const toggleCollapse = (nodeId) => {
    setCollapsedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleGoToMyPosition = () => {
    toast({
      title: "🚧 Feature in development",
      description: "This will soon highlight your position in the chart!",
    });
  };

  const handleNodeClick = (node) => {
     toast({
      title: `You clicked on ${node.name}`,
      description: `${node.role}`,
    });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-brand-light-gray rounded-2xl soft-shadow overflow-hidden">
      <header className="p-6 border-b bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center">
            <Users className="w-8 h-8 mr-3 text-brand-primary-blue" />
            <div>
              <h1 className="text-2xl font-bold text-brand-deep-indigo">Organizational Structure</h1>
              <p className="text-brand-charcoal text-sm">Explore teams and find colleagues.</p>
            </div>
          </div>
          <Button onClick={handleGoToMyPosition}>
            <UserCheck className="mr-2 h-4 w-4" /> Go to my position
          </Button>
        </div>
        <div className="mt-4 max-w-sm relative">
          <Input 
            placeholder="Search by name or position..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </header>

      <div className="flex-grow relative bg-dots-pattern">
         <TransformWrapper minScale={0.2} initialScale={0.7}>
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
            <div className="w-full h-full flex justify-center items-center p-10">
              <OrgNode node={orgData} onNodeClick={handleNodeClick} highlightedId={4} isCollapsed={false} toggleCollapse={() => {}} />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default OrganizationalStructure;