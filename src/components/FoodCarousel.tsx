
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface FoodCarouselProps {
  images: string[];
  alt: string;
}

const FoodCarousel: React.FC<FoodCarouselProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full overflow-hidden relative rounded-lg">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <img 
            src={images[currentIndex]} 
            alt={`${alt} - image ${currentIndex + 1}`} 
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          
          {images.length > 1 && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-black hover:bg-white/50 h-8 w-8 rounded-full"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm text-black hover:bg-white/50 h-8 w-8 rounded-full"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCarousel;
