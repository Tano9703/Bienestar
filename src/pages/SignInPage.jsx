import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const SignInPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();
    toast({
      title: "¡Inicio de Sesión Exitoso!",
      description: "Serás redirigido a la página principal.",
      duration: 3000,
    });
    setTimeout(() => navigate('/'), 3000);
  };
  
  const handleSSOSignIn = (provider) => {
    toast({
      title: `Inicio de Sesión con ${provider}`,
      description: `Simulando inicio de sesión con ${provider}. Serás redirigido.`,
      duration: 3000,
    });
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <motion.div 
        className="absolute top-4 left-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" onClick={() => navigate('/')} className="text-[#1e3a5f] hover:bg-blue-100">
          <ChevronLeft size={24} className="mr-2" /> Volver a Inicio
        </Button>
      </motion.div>
      <motion.div
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
            <img 
              src="https://placehold.co/150x50/e6f7ff/1e3a5f?text=CrossLearning" 
              alt="CrossLearning Logo" 
              className="h-10 mx-auto mb-4"
            />
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">Bienvenido de nuevo.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" required className="mt-1"/>
          </div>
          <div className="relative">
            <Label htmlFor="password">Contraseña</Label>
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              required 
              className="mt-1"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-9 text-gray-500 hover:text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-gray-600">Recuérdame</Label>
            </div>
            <a href="#" className="font-medium text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg">
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continuar con</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button variant="outline" className="w-full flex items-center justify-center py-3" onClick={() => handleSSOSignIn('Google')}>
            <img  alt="Google logo" className="h-5 w-5 mr-2" src="https://images.unsplash.com/photo-1678483789111-3a04c4628bd6" />
            Google
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center py-3" onClick={() => handleSSOSignIn('Apple')}>
             <img  alt="Apple logo" className="h-5 w-5 mr-2" src="https://images.unsplash.com/photo-1620829868801-8a443f0370f3" />
            Apple
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center py-3" onClick={() => handleSSOSignIn('Microsoft')}>
            <img  alt="Microsoft logo" className="h-5 w-5 mr-2" src="https://images.unsplash.com/photo-1680128369834-3abfc00155fc" />
            Microsoft
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <Link to="/signup" className="font-medium text-blue-500 hover:underline">Regístrate</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignInPage;