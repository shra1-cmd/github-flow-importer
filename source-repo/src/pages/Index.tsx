
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import QuickAccess from '../components/QuickAccess';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <QuickAccess />
    </div>
  );
};

export default Index;
