
import React from 'react';
import { Button } from './ui/button';
import FoodCarousel from './FoodCarousel';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { FoodItem } from '../data/foodItems';
import { Badge } from './ui/badge';

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <FoodCarousel images={food.images} alt={food.name} />
      
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium text-foodapp-900">{food.name}</CardTitle>
          <span className="font-bold text-foodapp-700">Rs{food.price.toFixed(2)}</span>
        </div>
        
        {food.tags && food.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {food.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs bg-foodapp-50 text-foodapp-500 border-foodapp-100">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 text-sm text-foodapp-500">
        <p>{food.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(food)} 
          className="w-full bg-foodapp-700 hover:bg-foodapp-900 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
