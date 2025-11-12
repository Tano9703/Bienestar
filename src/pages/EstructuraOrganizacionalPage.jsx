import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Briefcase, UserCheck, Users2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const orgData = {
  id: 1,
  name: 'Eleonora',
  role: 'CEO',
  avatarUrl: 'https://i.pravatar.cc/150?u=1',
  department: 'Dirección',
  children: [
    {
      id: 2,
      name: 'Leonardo',
      role: 'CTO',
      avatarUrl: 'https://i.pravatar.cc/150?u=2',
      department: 'Tecnología',
      children: [
        {
          id: 3,
          name: 'Sofía',
          role: 'Frontend Lead',
          avatarUrl: 'https://i.pravatar.cc/150?u=3',
          department: 'Tecnología',
          children: [
            { id: 4, name: 'Mateo', role: 'Frontend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=4', department: 'Tecnología', children: [] },
            { id: 5, name: 'Isabella', role: 'Frontend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=5', department: 'Tecnología', children: [] },
          ]
        },
        { id: 6, name: 'Javier', role: 'Backend Lead', avatarUrl: 'https://i.pravatar.cc/150?u=6', department: 'Tecnología', children: [] }
      ]
    },
    {
      id: 7,
      name: 'Camila',
      role: 'COO',
      avatarUrl: 'https://i.pravatar.cc/150?u=7',
      department: 'Operaciones',
      children: [
        { id: 8, name: 'Daniel', role: 'Operations Manager', avatarUrl: 'https://i.pravatar.cc/150?u=8', department: 'Operaciones', children: [] }
      ]
    }
  ]
};

const EmployeeCard = ({ employee, onClick, isHighlighted }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.3 }}
    className={`p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow border-2 ${isHighlighted ? 'border-primary' : 'border-transparent'}`}
    onClick={() => onClick(employee)}
  >
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={employee.avatarUrl} alt={employee.name} />
        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold text-gray-800">{employee.name}</p>
        <p className="text-sm text-gray-500">{employee.role}</p>
      </div>
    </div>
  </motion.div>
);

const OrgNode = ({ node, onNodeClick, highlightedId }) => (
  <div className="flex flex-col items-center">
    <EmployeeCard employee={node} onClick={onNodeClick} isHighlighted={node.id === highlightedId} />
    {node.children && node.children.length > 0 && (
      <div className="flex pt-12 pl-8 relative">
        <div className="absolute top-0 left-1/2 w-px h-12 bg-gray-300"></div>
        {node.children.map((child, index) => (
          <div key={child.id} className="px-4 relative">
             <div className="absolute top-0 left-0 w-full h-px bg-gray-300"></div>
             {index === 0 && <div className="absolute top-0 left-0 w-1/2 h-px bg-gray-300"></div>}
             {index === node.children.length - 1 && <div className="absolute top-0 right-0 w-1/2 h-px bg-gray-300"></div>}
            <OrgNode node={child} onNodeClick={onNodeClick} highlightedId={highlightedId} />
          </div>
        ))}
      </div>
    )}
  </div>
);

const EmployeeDetailPanel = ({ employee, onClose }) => (
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-2xl p-6 z-50 overflow-y-auto"
  >
    <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">&times;</Button>
    <div className="text-center mt-8">
      <Avatar className="w-24 h-24 mx-auto mb-4">
        <AvatarImage src={employee.avatarUrl} alt={employee.name} />
        <AvatarFallback className="text-4xl">{employee.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold">{employee.name}</h2>
      <p className="text-primary">{employee.role}</p>
    </div>
    <div className="mt-8 space-y-4">
      <div className="flex items-center">
        <Mail className="w-5 h-5 mr-3 text-gray-400" />
        <span className="text-gray-700">{employee.name.toLowerCase().replace(' ', '.')}@crosslearning.com</span>
      </div>
      <div className="flex items-center">
        <Phone className="w-5 h-5 mr-3 text-gray-400" />
        <span className="text-gray-700">+57 300 123 4567</span>
      </div>
      <div className="flex items-center">
        <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
        <span className="text-gray-700">{employee.department}</span>
      </div>
    </div>
    <div className="mt-8">
        <h3 className="font-bold text-lg mb-4 flex items-center"><UserCheck className="w-5 h-5 mr-2 text-primary" />Líder Directo</h3>
        <p className="text-gray-600">🚧 Funcionalidad en construcción.</p>
        <h3 className="font-bold text-lg mt-6 mb-4 flex items-center"><Users2 className="w-5 h-5 mr-2 text-primary" />Reportes Directos</h3>
        {employee.children && employee.children.length > 0 ? (
             <ul className="space-y-2">
                 {employee.children.map(child => <li key={child.id} className="text-gray-600">{child.name} - {child.role}</li>)}
             </ul>
        ) : <p className="text-gray-600">No tiene reportes directos.</p>}
    </div>
  </motion.div>
);

const EstructuraOrganizacionalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const currentUserId = 4; // Mateo as the logged-in user

  const handleNodeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      <header className="p-6 border-b bg-white">
        <div className="flex items-center">
          <Users className="w-8 h-8 mr-3 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Estructura Organizacional</h1>
            <p className="text-gray-500">Visualiza la jerarquía de la empresa, explora equipos y encuentra colaboradores.</p>
          </div>
        </div>
        <div className="mt-4 max-w-md relative">
          <Input 
            placeholder="Buscar por nombre o cargo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </header>

      <div className="flex-grow relative overflow-hidden">
         <TransformWrapper>
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
            <div className="p-10 min-w-max min-h-full flex justify-center items-start">
              <OrgNode node={orgData} onNodeClick={handleNodeClick} highlightedId={currentUserId}/>
            </div>
          </TransformComponent>
        </TransformWrapper>
        {selectedEmployee && <EmployeeDetailPanel employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
        <div className="absolute bottom-4 left-4 z-10">
            <Button>Ir a mi posición</Button>
        </div>
      </div>
    </div>
  );
};

export default EstructuraOrganizacionalPage;