
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import Footer from '../components/Footer';

const CheckoutPage: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center min-h-screen flex flex-col">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-foodapp-700 hover:bg-foodapp-900 text-white"
          >
            Return to Menu
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <div className="flex-grow">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
          <CheckoutForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
