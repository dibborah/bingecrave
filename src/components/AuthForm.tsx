
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
// label is an updated versions
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/Input';
import { Button } from './ui/button';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        duration: 3000,
      });
      navigate('/'); // Redirect to homepage after successful sign-in
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.message ?? "Please check your credentials and try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 p-6 border rounded-md shadow-sm">
        <h3 className="text-lg font-medium">Sign in to your account</h3>
        <p className="text-sm text-muted-foreground">
          Track your orders and save your preferences
        </p>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            {/* Labels might look different verify at end */}
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <Button type="submit" className="w-full bg-foodapp-700 hover:bg-foodapp-900">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
