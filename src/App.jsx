import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { AnimatedSection } from './components/AnimatedSection';
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <AnimatedSection><Hero /></AnimatedSection>
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Skills /></AnimatedSection>
        <AnimatedSection><Projects /></AnimatedSection>
      </main>
      <AnimatedSection><Footer /></AnimatedSection>
    </>
  );
}
