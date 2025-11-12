import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CursoCard = ({ curso }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartCourse = () => {
    navigate(`/poc/curso/${curso.id}`);
  };
  
  const handleShowDate = () => {
    toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "Pronto podrás ver la fecha de cierre aquí. ¡Sigue adelante!",
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-sky-500/90 rounded-2xl shadow-lg overflow-hidden flex flex-col text-white transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="w-full h-48">
        <img  className="w-full h-full object-cover" alt={curso.imageDescription} src="https://images.unsplash.com/photo-1601651514327-8702c4f2ade0" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2">{curso.title}</h3>
        <p className="text-sky-100 mb-4 flex-grow">{curso.description}</p>
        
        <div className="mb-4">
            <span className="text-sm font-semibold tracking-wider text-sky-200">PROGRESO</span>
            <Progress value={curso.progress} className="mt-1 h-3 bg-white/30 [&>div]:bg-white" />
        </div>

        <div className="flex flex-col space-y-2 mt-auto">
            <Button
                variant="link"
                className="p-0 h-auto justify-start text-white hover:text-sky-200 text-sm font-semibold"
                onClick={handleShowDate}
            >
                FECHA DE CIERRE <ChevronRight size={16} className="ml-1" />
            </Button>
            <Button
                variant="link"
                className="p-0 h-auto justify-start text-white hover:text-sky-200 text-sm font-semibold"
                onClick={handleStartCourse}
            >
                INICIAR EL CURSO <ChevronRight size={16} className="ml-1" />
            </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CursoCard;