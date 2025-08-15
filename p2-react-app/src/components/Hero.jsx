import { Link } from "react-router-dom"
import '../styles/Hero.css'

const Hero = () => {
  return (
    <div className='hero'>

      <div className="hero-content">
         <h1>Master Any Subject with AI-Powered Flashcards</h1>
          <p>Create personalized study materials in seconds. StudyGenius uses artificial intelligence to generate the perfect flashcards for your learning style and academic level.</p>
          <div className="hero-buttons">
            <button className="btn-primary"><Link to='/create'>Start Creating</Link></button>
            <button className="btn-secondary"><Link to='/dashboard'>View Dashboard</Link></button>
          </div>
      </div>

    </div>
  )
}

export default Hero