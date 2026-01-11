'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    const willOpen = !isMobileMenuOpen
    setIsMobileMenuOpen(willOpen)

    if (willOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu()
    }
  }

  const navStateClass = isScrolled || isHovered || isMobileMenuOpen ? 'scrolled' : ''

  return (
    <>
      <nav
        className={`pill-nav ${navStateClass}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pill-nav-container">
          {/* Left Pill - Logo + Nav Items */}
          <div className={`pill-nav-left ${isScrolled ? 'frosted' : ''}`}>
            <Link href="/" className="pill-nav-logo">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            <a href="#product" className="pill-nav-item">
              Features
            </a>
            <a href="#pricing" className="pill-nav-item">
              Pricing
            </a>
            <Link href="/blog" className="pill-nav-item">
              Blog
            </Link>
            <a href="#faq" className="pill-nav-item">
              FAQ
            </a>
          </div>

          {/* Right Pill - CTA */}
          <div className={`pill-nav-right ${isScrolled ? 'frosted' : ''}`}>
            <Link href="/login" className="pill-nav-item">
              Login
            </Link>
            <Link href="/signup" className="pill-nav-cta">
              Start Free Trial
            </Link>

            {/* Mobile Hamburger */}
            <button
              className={`pill-nav-hamburger ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`pill-mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div className={`pill-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="pill-mobile-header">
          <Link href="/" className="pill-mobile-logo" onClick={closeMobileMenu}>
            <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
          </Link>
          <button className="pill-mobile-close" onClick={toggleMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="pill-mobile-content">
          <div className="pill-mobile-nav-links">
            <a href="#product" className="pill-mobile-nav-link" onClick={closeMobileMenu}>
              Features
            </a>
            <a href="#pricing" className="pill-mobile-nav-link" onClick={closeMobileMenu}>
              Pricing
            </a>
            <Link href="/blog" className="pill-mobile-nav-link" onClick={closeMobileMenu}>
              Blog
            </Link>
            <a href="#faq" className="pill-mobile-nav-link" onClick={closeMobileMenu}>
              FAQ
            </a>
          </div>

          {/* Bottom CTA */}
          <div className="pill-mobile-bottom">
            <Link href="/login" className="pill-mobile-cta-btn secondary" onClick={closeMobileMenu}>
              Login
            </Link>
            <Link href="/signup" className="pill-mobile-cta-btn" onClick={closeMobileMenu}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
