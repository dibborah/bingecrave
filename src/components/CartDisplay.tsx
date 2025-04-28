
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
// Not making a component directly importing its
import { Separator } from '@radix-ui/react-separator';
import { useNavigate } from 'react-router-dom';

const CartDisplay: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Your Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.map((cartItem) => (
          <div key={cartItem.item.id} className="flex justify-between items-center">
            <div className="flex-1">
              <h4 className="font-medium">{cartItem.item.name}</h4>
              <p className="text-sm text-muted-foreground">Rs{cartItem.item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center">{cartItem.quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7" 
                onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => removeFromCart(cartItem.item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Separator className="my-2" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">Rs{cartTotal.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-foodapp-700 hover:bg-foodapp-900 text-white"
          onClick={() => navigate('/checkout')}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartDisplay;
