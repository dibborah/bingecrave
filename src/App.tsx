
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import NotFound from "./pages/NotFound";

const App = () => (
    // <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          {/* <Toaster />
          <Sonner /> */}
          <BrowserRouter>
            <Header />
            <main className="min-h-screen pb-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    // </TooltipProvider>
);

export default App;
