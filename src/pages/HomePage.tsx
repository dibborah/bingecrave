
import React from 'react';
import FoodCard from '../components/FoodCard';
import CartDisplay from '../components/CartDisplay';
import Footer from '../components/Footer';
import { foodItems } from '../data/foodItems';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-foodapp-900 mb-6">Today's Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>
      
      <section id="cart" className="max-w-lg mx-auto my-12">
        <CartDisplay />
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
