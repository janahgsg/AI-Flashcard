import facebook from '/src/assets/icons/facebook.png'
import instagram from '/src/assets/icons/instagram.png'
import twitter from '/src/assets/icons/twitter.png'
import youtube from '/src/assets/icons/youtube.png'
import '../styles/Contact.css'
const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact-content'>
        
        <div className='contact-header'>
          <div className='contact-info'>
            <h2>AI.Flash</h2>
            <p>Master any topic with AI-powered flashcards. Study smarter, not harder.</p>
            <div className='contact-social'>
              <div className='social-icon'><img src={facebook} alt='Facebook icon' /></div>
              <div className='social-icon'><img src={instagram} alt='Instagram icon' /></div>
              <div className='social-icon'><img src={twitter} alt='Twitter icon' /></div>
              <div className='social-icon'><img src={youtube} alt='YouTube icon' /></div>
            </div>
          </div>
        </div>
        
        <div className='contact-grid'>
          <div className='column'>
            <div className='column-heading'>
              <h4>Company</h4>
            </div>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Partners</li>
              <li>Blog</li>
            </ul>
          </div>
          
          <div className='column'>
            <div className='column-heading'>
              <h4>Help</h4>
            </div>
            <ul>
              <li>Support</li>
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Report a Problem</li>
            </ul>
          </div>
          
          <div className='column'>
            <div className='column-heading'>
              <h4>Legal</h4>
            </div>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>License</li>
              <li>Security</li>
            </ul>
          </div>
          
          <div className='column'>
            <div className='column-heading'>
              <h4>Resources</h4>
            </div>
            <ul>
              <li>Study Guides</li>
              <li>API Docs</li>
              <li>Community</li>
              <li>Tutorials</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className='contact-divider' />
      <footer>
        <p>&copy; {new Date().getFullYear()} AI Flashcard. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default Contact
