import { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import close_icon from '/src/assets/icons/close_icon.png'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className='navbar'>
      <div className="nav-logo">
        <Link to='/' className='logo-name'>AI.Flash</Link>
      </div>

      <div className="nav-links">
        <ul>
          <li><Link to='/' onClick={closeMenu}>Home</Link></li>
          <li><Link to='/dashboard' onClick={closeMenu}>Dashboard</Link></li>
          <li><Link to='/dashboard?create=true' onClick={closeMenu}>Create</Link></li>
          <li><HashLink smooth to='/#contact' onClick={closeMenu}>Contact</HashLink></li>
        </ul>
      </div>

      {/* Menu toggle button */}
      <button
        className='menu-toggle'
        onClick={toggleMenu}
        aria-label='Toggle menu'
        aria-expanded={isMenuOpen}
      >
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Overlay when menu is open */}
      {isMenuOpen && <div className='menu-overlay' onClick={closeMenu}></div>}

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className='mobile-menu-header'>
          <span className='menu-title'>Menu</span>
          <button className='close-menu' onClick={closeMenu}>
            <img src={close_icon} alt='close-icon'/>
          </button>
        </div>
        <nav className='mobile-nav'>
          <ul className='mobile-nav-links'>
            <li><Link to='/' onClick={closeMenu}>Home</Link></li>
            <li><Link to='/dashboard' onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to='/dashboard?create=true' onClick={closeMenu}>Create</Link></li>
            <li><HashLink smooth to='/#contact' onClick={closeMenu}>Contact</HashLink></li>
          </ul>
        </nav>
      </div>
    </nav>
  )
}

export default Navbar
