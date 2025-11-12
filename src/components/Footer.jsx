import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-sm">© 2025 CrossLearning. Todos los derechos reservados.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">Términos</a>
            <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="text-secondary-foreground hover:text-primary transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;