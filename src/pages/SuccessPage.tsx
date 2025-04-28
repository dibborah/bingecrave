
import React from 'react';
import { useLocation } from 'react-router-dom';
import OrderSuccess from '../components/OrderSuccess';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;
  
  return (
    <div className="container mx-auto p-4">
      <OrderSuccess orderNumber={orderNumber} />
    </div>
  );
};

export default SuccessPage;
