
import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/Input';
import { Button } from './ui/button';
import { Textarea } from './ui/Textarea';
import { useCart } from '../context/CartContext';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
// import { supabase } from '@/integrations/supabase/client';
import { fakeApiCall } from '../../api/fakeApiCalls';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const DELIVERY_CHARGE = 10; // Fixed delivery charge of Rs10

const CheckoutForm: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    zipCode: '',
    phone: '',
    instructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // try {
    //   // Generate a unique order number
    //   const orderNumber = Math.floor(10000 + Math.random() * 90000).toString();
      
    //   // 1. Insert the order with the total amount including delivery charge
    //   const { data: orderData, error: orderError } = await supabase
    //     .from('orders')
    //     .insert({
    //       order_number: orderNumber,
    //       total_amount: cartTotal + DELIVERY_CHARGE
    //     })
    //     .select('id')
    //     .single();
      
    //   if (orderError) throw orderError;
      
    //   const orderId = orderData.id;
      
    //   // 2. Insert delivery information
    //   const { error: deliveryError } = await supabase
    //     .from('delivery_info')
    //     .insert({
    //       order_id: orderId,
    //       name: address.name,
    //       street: address.street,
    //       city: address.city,
    //       zip_code: address.zipCode,
    //       phone: address.phone,
    //       instructions: address.instructions || null,
    //       payment_method: paymentMethod
    //     });
      
    //   if (deliveryError) throw deliveryError;
      
    //   // 3. Insert order items
    //   const orderItems = cart.map(item => ({
    //     order_id: orderId,
    //     item_id: item.item.id,
    //     item_name: item.item.name,
    //     price: item.item.price,
    //     quantity: item.quantity
    //   }));
      
    //   const { error: itemsError } = await supabase
    //     .from('order_items')
    //     .insert(orderItems);
      
    //   if (itemsError) throw itemsError;
      
    //   // Show success message
    //   toast({
    //     title: "Order Placed Successfully!",
    //     description: `Your order #${orderNumber} has been received. You'll receive updates shortly.`,
    //     duration: 5000,
    //   });
      
    //   // Clear cart and navigate to success page
    //   clearCart();
    //   navigate('/success', { state: { orderNumber } });
    // } catch (error) {
    //   console.error('Error placing order:', error);
    //   toast({
    //     title: "Error placing order",
    //     description: "There was a problem processing your order. Please try again.",
    //     variant: "destructive",
    //     duration: 5000,
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }

    try {
      // Generate a unique order number
      const orderNumber = Math.floor(10000 + Math.random() * 90000).toString();
    
      // 1. Fake insert order and return fake order ID
      const orderData = await fakeApiCall<{ id: number }>({ id: Math.floor(Math.random() * 1000) });
      const orderId = orderData.id;
    
      // 2. Fake insert delivery info
      await fakeApiCall<{ success: boolean }>({ success: true });
    
      // 3. Fake insert order items
      const orderItems = cart.map(item => ({
        order_id: orderId,
        item_id: item.item.id,
        item_name: item.item.name,
        price: item.item.price,
        quantity: item.quantity
      }));
    
      await fakeApiCall<{ success: boolean }>({ success: true });
    
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderNumber} has been received. You'll receive updates shortly.`,
        duration: 5000,
      });
    
      // Clear cart and navigate to success page
      clearCart();
      navigate('/success', { state: { orderNumber } });
    
    } catch (error: unknown) {
      console.error('Error placing order:', error);
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate the final total with delivery charge
  const finalTotal = cartTotal + DELIVERY_CHARGE;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
        <CardDescription>Enter your delivery details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="Your full name" 
                  value={address.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input 
                  id="street" 
                  name="street"
                  placeholder="Street address, apartment, etc." 
                  value={address.street}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city"
                    placeholder="City" 
                    value={address.city}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode"
                    placeholder="ZIP Code" 
                    value={address.zipCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  placeholder="For delivery updates" 
                  value={address.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                <Textarea 
                  id="instructions" 
                  name="instructions"
                  placeholder="Any special instructions for delivery" 
                  value={address.instructions}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                defaultValue={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Alert className="bg-amber-50 border-amber-200">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">No advance payment required</AlertTitle>
              <AlertDescription className="text-amber-700">
                We're happy to accept payment only after you've received your order and are satisfied with it.
              </AlertDescription>
            </Alert>

            <Alert className="bg-gray-50 border-gray-200">
              <Info className="h-4 w-4 text-gray-600" />
              <AlertTitle className="text-gray-800">Important Note</AlertTitle>
              <AlertDescription className="text-gray-700">
                Real products might slightly vary from what is shown in the images.
              </AlertDescription>
            </Alert>
          
          {/* Site down notice */}

           {/* <Alert className="bg-red-400 border-gray-200">
              <Info className="h-4 w-4 text-white" />
              <AlertTitle className="text-white">Important Note</AlertTitle>
              <AlertDescription className="text-white">
                Current the site is down for maintainance reasons.
                So, we are not taking any orders.
                Sorry for inconvenience!!!
              </AlertDescription>
            </Alert> */}
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-foodapp-500">Subtotal:</span>
                <span className="font-medium">Rs {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foodapp-500">Delivery Charge:</span>
                <span className="font-medium">Rs {DELIVERY_CHARGE.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-foodapp-700">Rs {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-foodapp-700 hover:bg-foodapp-900 text-white"
            disabled={isSubmitting}
            // disabled
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
