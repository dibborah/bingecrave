
import React from 'react';
import { Button } from './ui/button';
import { CheckCircle2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface OrderSuccessProps {
  orderNumber?: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderNumber }) => {
  const navigate = useNavigate();
  const displayOrderNumber = orderNumber || Math.floor(10000 + Math.random() * 90000).toString();
  
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>
            Your order #{displayOrderNumber} has been placed successfully
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Thank you for your order. We've received your order and will begin preparing it right away.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            You will receive an update when your order is ready for delivery.
            Remember, you can pay after receiving your order.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="bg-foodapp-700 hover:bg-foodapp-900 text-white"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Menu
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderSuccess;
