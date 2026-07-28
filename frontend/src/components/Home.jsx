import React from 'react'
import Navbar from './Navbar'
import About from './About'
import Options from './Options'
import Contact from './Contact'
import Footer from './Footer'
import Hero from './Hero'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Options />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
