
export interface FoodItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    images: string[];
    tags?: string[];
  }
  
  export const foodItems: FoodItem[] = [
    {
      id: 1,
      name: "Sugarcane Juice",
      price: 20,
      images: [
        "https://static.india.com/wp-content/uploads/2016/05/Sugarcane-Juice-1-eathealthystayhealthy.wordpress.com_.jpg?impolicy=Medium_Resize&w=1200&h=800",
        "https://images.news18.com/ibnlive/uploads/2025/03/Sugarcane-Juice-2025-03-041acaa12470b325e1d2d342c0eaf50f-16x9.png?impolicy=website&width=640&height=360",
        "https://www.thestatesman.com/wp-content/uploads/2022/10/sugarcane.jpg",
      ],
      tags: ["Refreshing", "Summers"]
    },
    {
      id: 2,
      name: "Chole aur parathe(2 parathe/order)",
      price: 30,
      images: [
        "https://i0.wp.com/thefoodhog.com/wp-content/uploads/2023/04/matar-kulcha-by-Agamani-Saha-CC-by-SA-4.0.jpeg",
        "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/11/22115418/pandit-ji-paranthe-wale.jpg",
        "https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/aloo-paratha-recipe-4.jpg"
      ],
      tags: ["Affordable", "Tasty", "Fast"]
    },
    {
      id: 3,
      name: "Banana Juice",
      price: 30,
      images: [
        "https://www.fourscoreliving.com/wp-content/uploads/2022/12/Banana-Juice-1.2-683x1024.jpg",
        "https://img.freepik.com/free-photo/high-angle-delicious-banana-smoothie_23-2148858623.jpg?semt=ais_hybrid&w=740",
        "https://t3.ftcdn.net/jpg/06/20/49/38/360_F_620493882_JrhySdhOArPD9wTmwwTTVb9hRE8EmKrr.jpg"
      ],
      tags: ["Refreshing", "Summers", "Protein-rich"]
    },
    {
      id: 4,
      name: "Lassi",
      price: 20,
      images: [
        "https://5.imimg.com/data5/SELLER/Default/2024/3/405704301/VQ/JH/AJ/38483162/hand-motor-operated-500x500.jpeg",
        "https://media01.stockfood.com/largepreviews/MjEyNTcxOTY=/00685716-Hands-Holding-Cardamom-Lassi-with-Straw.jpg",
        "https://i.dawn.com/primary/2017/07/596da40593446.png"
      ],
      tags: ["Resfreshing", "Protein-rich", "Summers"]
    }
  ];
  