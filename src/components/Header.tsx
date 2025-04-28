
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div 
          className="font-sedgwick text-3xl text-foodapp-700 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Bingecrave
        </div>
        
        {isHomePage && (
          <Button
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-foodapp-100"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-foodapp-700 rounded-full">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
