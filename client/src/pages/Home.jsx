import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Steps from '../components/Steps'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
function Home() {
  return (
    <div>
      <Hero />
      <Steps />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home