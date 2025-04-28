
import React from 'react';
import { Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foodapp-700 text-white p-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <Phone className="h-5 w-5 text-white" />
        <span className="text-sm font-medium">Customer Care: +1 (123) 456-7890</span>
      </div>
    </footer>
  );
};

export default Footer;
