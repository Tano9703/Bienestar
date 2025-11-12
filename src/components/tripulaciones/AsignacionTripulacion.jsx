import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Anchor, Search } from 'lucide-react';

const AsignacionTripulacion = ({ description }) => {
  const navigate = useNavigate();

  return (
    <div className="nautical-card relative bg-blue-50/50 p-6 rounded-xl border-2 border-blue-200/50 overflow-hidden shadow-sm">
        <Anchor className="absolute -right-4 -bottom-6 text-blue-200/40 w-24 h-24 transform rotate-12 opacity-50" />
        <div className="relative z-10">
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Button onClick={() => navigate('/asignacion-tripulacion')} className="w-full sm:w-auto">
                <Search size={18} className="mr-2"/>
                Revelar mi asignación
            </Button>
        </div>
    </div>
  );
};

export default AsignacionTripulacion;