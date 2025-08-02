// Remove 'use client' if using App Router
import ContactSection from '@/pages/ContactSection'
import Home from '../pages/Home'
import ProductsSection from '../pages/ProductsSection'
import TechnologySection from '../pages/TechnologySection' // Your component

export default function Page() {
  return <>
  <Home />  
  <TechnologySection />
    <ProductsSection />
  <ContactSection />
  </>
}