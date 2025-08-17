import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Statistics from "../components/Statistics"
import Contact from "../components/Contact"

const Homepage = () => {
  return (
    <div className='homepage'>

      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <section id="contact">
        <Contact />
      </section>
 
    </div>
  )
}

export default Homepage