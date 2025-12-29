import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// Preloader (Metalab Style)
// ============================================
function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Counter animation
    tl.to(counterRef.current, {
      innerText: 100,
      duration: 2.5,
      snap: { innerText: 1 },
      ease: 'power2.out',
    })

    // Grid boxes animation
    tl.to(
      '.preloader-box',
      {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: {
          each: 0.05,
          from: 'random',
        },
        ease: 'power2.in',
      },
      '-=0.5'
    )

    // Text reveal
    tl.from(
      '.preloader-title span',
      {
        y: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={gridRef} className="preloader-grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="preloader-box" data-index={i + 1}>
            <span>{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="preloader-content">
        <div ref={textRef} className="preloader-title">
          {'MARINE'.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>
        <div className="preloader-counter">
          <span ref={counterRef}>0</span>%
        </div>
      </div>
    </div>
  )
}

// ============================================
// Custom Cursor (Metalab Style)
// ============================================
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'drag'>('default')

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const onMouseEnterLink = () => {
      setCursorState('hover')
      gsap.to(cursor, { scale: 2, duration: 0.3 })
    }

    const onMouseLeaveLink = () => {
      setCursorState('default')
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, .draggable').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${cursorState}`}>
        <span className="cursor-text">
          {cursorState === 'hover' && 'View'}
          {cursorState === 'drag' && 'Drag'}
        </span>
      </div>
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  )
}

// ============================================
// Smooth Scroll Setup with Lenis
// ============================================
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}

// ============================================
// Header (Enhanced Metalab Style)
// ============================================
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        '.menu-item',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  return (
    <>
      <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="header-bg" />
        <div className="header-blur" />
        <div className="header-inner">
          <a href="/" className="logo">
            <svg viewBox="0 0 120 24" className="logo-icon">
              <text x="0" y="18" className="logo-text">MARINE</text>
            </svg>
          </a>

          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Projects</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-right">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="menu-text">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className={`menu-icon ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div ref={menuRef} className={`fullscreen-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <nav className="menu-nav">
            <a href="#about" className="menu-item" onClick={() => setMenuOpen(false)}>
              <span className="menu-item-number">01</span>
              <span className="menu-item-text">About Us</span>
            </a>
            <a href="#services" className="menu-item" onClick={() => setMenuOpen(false)}>
              <span className="menu-item-number">02</span>
              <span className="menu-item-text">Services</span>
            </a>
            <a href="#work" className="menu-item" onClick={() => setMenuOpen(false)}>
              <span className="menu-item-number">03</span>
              <span className="menu-item-text">Projects</span>
            </a>
            <a href="#team" className="menu-item" onClick={() => setMenuOpen(false)}>
              <span className="menu-item-number">04</span>
              <span className="menu-item-text">Team</span>
            </a>
            <a href="#contact" className="menu-item" onClick={() => setMenuOpen(false)}>
              <span className="menu-item-number">05</span>
              <span className="menu-item-text">Contact</span>
            </a>
          </nav>
          <div className="menu-footer">
            <div className="menu-footer-col">
              <span className="menu-footer-label">Email</span>
              <a href="mailto:contact@marine.co.kr">contact@marine.co.kr</a>
            </div>
            <div className="menu-footer-col">
              <span className="menu-footer-label">Phone</span>
              <a href="tel:+821012345678">+82 10 1234 5678</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ============================================
// Inline Video Hero (Enhanced)
// ============================================
function InlineVideoHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from('.hero-line', {
        y: '105%',
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
      })

      // CTA animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1.2,
        ease: 'power2.out',
      })

      // Parallax effect on scroll
      gsap.to('.hero-video-bg', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero-overlay" />
      <video
        className="hero-video-bg"
        src="https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8f963edc5f5fc&profile_id=164&oauth2_token_id=57447761"
        autoPlay
        loop
        muted
        playsInline
      />

      <h1 ref={titleRef} className="hero-title">
        <span className="hero-line-container">
          <span className="hero-line">Pioneering</span>
        </span>
        <span className="hero-inline-media">
          <video
            className="hero-inline-video"
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
            autoPlay
            loop
            muted
            playsInline
          />
        </span>
        <span className="hero-line-container">
          <span className="hero-line">the</span>
        </span>
        <br />
        <span className="hero-inline-media">
          <img
            className="hero-inline-image"
            src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=400&q=80"
            alt="Ocean"
          />
        </span>
        <span className="hero-line-container">
          <span className="hero-line">Future</span>
        </span>
        <span className="hero-inline-media">
          <img
            className="hero-inline-image"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
            alt="Research"
          />
        </span>
        <span className="hero-line-container">
          <span className="hero-line">of Ocean</span>
        </span>
      </h1>

      <div ref={ctaRef} className="hero-cta">
        <a href="#about" className="cta-link">
          Discover More
          <span className="cta-arrow">→</span>
        </a>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}

// ============================================
// Cities Scroller (Location Parallax Enhanced)
// ============================================
function LocationsScroller() {
  const sectionRef = useRef<HTMLElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const locations = [
    { name: 'South Korea', image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80' },
    { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' },
    { name: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' },
    { name: 'Taiwan', image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80' },
    { name: 'Indonesia', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80' },
    { name: 'Vietnam', image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80' },
  ]

  useEffect(() => {
    const locationItems = locationsRef.current?.querySelectorAll('.location-item')
    if (!locationItems) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.locations-title-line', {
        y: '100%',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Location items animation
      locationItems.forEach((loc, i) => {
        gsap.from(loc, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        })
      })

      // Line animation
      gsap.from('.locations-line', {
        scaleX: 0,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      // Background image transition based on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * locations.length)
          setActiveIndex(Math.min(index, locations.length - 1))
        },
      })
    })

    return () => ctx.revert()
  }, [locations.length])

  return (
    <section ref={sectionRef} className="locations-scroller" id="about">
      <div className="locations-bg-container">
        {locations.map((loc, i) => (
          <div
            key={i}
            className={`locations-bg-image ${activeIndex === i ? 'active' : ''}`}
          >
            <img src={loc.image} alt={loc.name} />
          </div>
        ))}
        <div className="locations-overlay" />
      </div>
      <div className="locations-content">
        <div className="locations-header">
          <h2 className="locations-title">
            <span className="locations-title-wrapper">
              <span className="locations-title-line">Global</span>
            </span>
            <span className="locations-title-wrapper">
              <span className="locations-title-line">Network</span>
            </span>
          </h2>
          <div className="locations-line" />
        </div>
        <div ref={locationsRef} className="locations-grid">
          {locations.map((loc, i) => (
            <div
              key={i}
              className={`location-item ${activeIndex === i ? 'active' : ''}`}
            >
              {loc.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// Vertical Stats Section (Metalab Style)
// ============================================
function VerticalStats() {
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { number: 2400, suffix: 'B+', label: 'Total Project Value', description: 'Cumulative value of completed projects' },
    { number: 500, suffix: '+', label: 'Completed Projects', description: 'Successfully delivered worldwide' },
    { number: 50, suffix: '+', label: 'Expert Engineers', description: 'Specialized technical team members' },
    { number: 20, suffix: '+', label: 'Years Experience', description: 'Industry-leading expertise' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.stats-main-title span', {
        y: '100%',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // Stats items animation
      gsap.from('.stat-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-grid-vertical',
          start: 'top 70%',
        },
      })

      // Line animations
      gsap.from('.stat-line-vertical', {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.stats-grid-vertical',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="vertical-stats-section">
      <div className="stats-title-container">
        <h2 className="stats-main-title">
          {'Proven Track Record'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
      </div>
      <div className="stats-grid-vertical">
        {stats.map((stat, i) => (
          <StatCardVertical key={i} {...stat} index={i} />
        ))}
      </div>
    </section>
  )
}

function StatCardVertical({
  number,
  suffix,
  label,
  description,
  index,
}: {
  number: number
  suffix: string
  label: string
  description: string
  index: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true
        gsap.to(
          { val: 0 },
          {
            val: number,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].val))
            },
          }
        )
      },
    })
  }, [number])

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-line-vertical" />
      <span className="stat-number-label">{String(index + 1).padStart(2, '0')}</span>
      <div className="stat-value-vertical">
        <span className="stat-number-large">{count.toLocaleString()}</span>
        <span className="stat-suffix-large">{suffix}</span>
      </div>
      <div className="stat-info">
        <span className="stat-label-vertical">{label}</span>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  )
}

// ============================================
// Services Showcase (Hoverable Columns)
// ============================================
function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)

  const services = [
    {
      number: '01',
      title: 'Geophysical Survey',
      description: 'State-of-the-art multibeam echosounders, side-scan sonar, and sub-bottom profilers for precise seafloor mapping.',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
    },
    {
      number: '02',
      title: 'Geological Investigation',
      description: 'Comprehensive sediment sampling, stratigraphy analysis, and CPT testing for seabed characterization.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    },
    {
      number: '03',
      title: 'Environmental Monitoring',
      description: 'Real-time monitoring of water quality, currents, and tides using advanced ADCP systems.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    },
    {
      number: '04',
      title: 'Offshore Wind Survey',
      description: 'Complete site assessment for offshore wind farms including turbine positioning and cable routing.',
      image: 'https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=800&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-title span', {
        y: '100%',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.service-item', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="services-showcase" id="services">
      <div className="services-header">
        <h2 className="services-title">
          {'Our Expertise'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="services-subtitle">
          Comprehensive marine survey solutions backed by 20+ years of experience
        </p>
      </div>

      <div className="services-background">
        {services.map((service, i) => (
          <div
            key={i}
            className={`service-bg-image ${activeService === i ? 'active' : ''}`}
          >
            <img src={service.image} alt={service.title} />
          </div>
        ))}
      </div>

      <div className="services-list">
        {services.map((service, i) => (
          <article
            key={i}
            className={`service-item ${activeService === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveService(i)}
            onMouseLeave={() => setActiveService(null)}
          >
            <div className="service-divider" />
            <div className="service-content">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href="#contact" className="service-link">
                Learn More <span>→</span>
              </a>
            </div>
          </article>
        ))}
        <div className="service-divider-bottom" />
      </div>
    </section>
  )
}

// ============================================
// Team Section
// ============================================
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const team = [
    {
      name: 'James Park',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Sarah Kim',
      role: 'Chief Technical Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    {
      name: 'David Lee',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
      name: 'Emily Chen',
      role: 'Lead Geophysicist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    },
    {
      name: 'Michael Wang',
      role: 'Senior Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
    {
      name: 'Anna Johnson',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-title span', {
        y: '100%',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.team-member', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="team-section" id="team">
      <div className="team-header">
        <h2 className="team-title">
          {'Meet Our Team'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="team-subtitle">
          A global team of experts passionate about ocean research
        </p>
      </div>

      <div className="team-grid">
        {team.map((member, i) => (
          <article key={i} className="team-member">
            <div className="team-member-image">
              <img src={member.image} alt={member.name} />
              <div className="team-member-overlay" />
            </div>
            <div className="team-member-info">
              <h3 className="team-member-name">{member.name}</h3>
              <span className="team-member-role">{member.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ============================================
// Equipment Gallery (Draggable)
// ============================================
function EquipmentGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const equipment = [
    {
      name: 'Multibeam Echosounder',
      description: 'High-resolution seafloor mapping system',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
    },
    {
      name: 'ROV System',
      description: 'Remotely operated underwater vehicle',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      name: 'Side Scan Sonar',
      description: 'Acoustic imaging of seafloor',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    },
    {
      name: 'Sub-bottom Profiler',
      description: 'Sediment layer analysis tool',
      image: 'https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=600&q=80',
    },
    {
      name: 'ADCP System',
      description: 'Current profiling equipment',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    },
    {
      name: 'Survey Vessel',
      description: 'Purpose-built research vessel',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80',
    },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.equipment-title span', {
        y: '100%',
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.equipment-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.equipment-container',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="equipment-section" id="equipment">
      <div className="equipment-header">
        <h2 className="equipment-title">
          {'Our Equipment'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <p className="equipment-subtitle">
          State-of-the-art technology for precise marine surveys
        </p>
      </div>

      <div
        ref={containerRef}
        className={`equipment-container ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {equipment.map((item, i) => (
          <article key={i} className="equipment-card">
            <div className="equipment-image-container">
              <img src={item.image} alt={item.name} className="equipment-image" />
            </div>
            <div className="equipment-info">
              <h3 className="equipment-name">{item.name}</h3>
              <p className="equipment-description">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="equipment-hint">
        <span>← Drag to explore →</span>
      </div>
    </section>
  )
}

// ============================================
// Draggable Review Grid
// ============================================
function DraggableReviewGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const reviews = [
    {
      quote: "Marine Research's expertise and precision data were key to our project's success. They delivered reliable results even in complex marine environments.",
      author: 'John Smith',
      role: 'Marine Project Manager',
      company: 'Ocean Energy Corp',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      quote: 'Over 20 years of experience shows in every project. They are our first choice for offshore wind surveys.',
      author: 'Lisa Chen',
      role: 'Energy Executive',
      company: 'Green Power Asia',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    {
      quote: 'Their cutting-edge equipment and expert team delivered flawless results. The multinational project collaboration was impressive.',
      author: 'Robert Kim',
      role: 'Construction CEO',
      company: 'Pacific Construction',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
      quote: 'Precise seafloor surveys enabled safe cable installation. Thank you for your excellent work.',
      author: 'Michelle Park',
      role: 'Project Director',
      company: 'Subsea Networks',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.reviews-section',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="reviews-section" id="work">
      <div className="reviews-header">
        <h2 className="reviews-title">Client Testimonials</h2>
        <p className="reviews-subtitle">Hear from our trusted partners worldwide</p>
      </div>
      <div
        ref={containerRef}
        className={`reviews-container ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {reviews.map((review, i) => (
          <article key={i} className="review-card">
            <div className="review-image-container">
              <img src={review.image} alt={review.author} className="review-image" />
            </div>
            <div className="review-content">
              <p className="review-quote">"{review.quote}"</p>
              <div className="review-author">
                <span className="author-name">{review.author}</span>
                <span className="author-role">{review.role}</span>
                <span className="author-company">{review.company}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="reviews-hint">
        <span>← Drag to see more →</span>
      </div>
    </section>
  )
}

// ============================================
// Info Drawers (Accordion with Enhanced Animation)
// ============================================
function InfoDrawers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const items = [
    {
      title: 'Geophysical Survey',
      description:
        'Precision seafloor mapping using advanced multibeam echosounders, side-scan sonar, and sub-bottom profilers. We deliver 3D terrain models and underwater obstacle detection.',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
    },
    {
      title: 'Geological Investigation',
      description:
        'Comprehensive seabed characterization through sediment sampling and stratigraphic analysis. CPT testing, vibrocoring, and grab sampling services available.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      title: 'Environmental Monitoring',
      description:
        'Real-time monitoring of marine environmental parameters including water quality, currents, and tides. Long-term ADCP-based current measurement systems.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    },
    {
      title: 'Offshore Wind Assessment',
      description:
        'Complete marine survey services for offshore wind farm development. Site selection, cable routing, and environmental impact assessment support.',
      image: 'https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=600&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.drawers-title-text', {
        y: 105,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      gsap.from('.drawer-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.drawers-list',
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="drawers-section">
      <div className="drawers-header">
        <h2 className="drawers-title">
          <span className="drawers-title-line">
            <span className="drawers-title-text">Expert</span>
          </span>
          <span className="drawers-title-line">
            <span className="drawers-title-text">Services</span>
          </span>
        </h2>
      </div>
      <div className="drawers-list">
        {items.map((item, i) => (
          <article
            key={i}
            className={`drawer-item ${openIndex === i ? 'open' : ''}`}
          >
            <div className="drawer-divider-top" />
            <button
              className="drawer-header"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="drawer-number">0{i + 1}</span>
              <span className="drawer-title">{item.title}</span>
              <span className="drawer-icon">
                {openIndex === i ? '−' : '+'}
              </span>
            </button>
            <div className="drawer-content">
              <div className="drawer-content-inner">
                <div className="drawer-text">
                  <p>{item.description}</p>
                </div>
                <div className="drawer-media">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="drawer-divider-bottom" />
      </div>
    </section>
  )
}

// ============================================
// Footer CTA
// ============================================
function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-cta-title span', {
        y: 100,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="footer-cta" id="contact">
      <div className="footer-cta-content">
        <h2 className="footer-cta-title">
          {"Let's Talk".split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
          <br />
          {'About Your Project'.split('').map((char, i) => (
            <span key={i + 100}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h2>
        <a href="mailto:contact@marineresearch.co.kr" className="footer-cta-button">
          <span className="button-text">Get in Touch</span>
          <span className="button-arrow">→</span>
        </a>
      </div>
    </section>
  )
}

// ============================================
// Footer
// ============================================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-logo">
            <svg viewBox="0 0 120 24" className="logo-icon">
              <text x="0" y="18" className="logo-text">MARINE</text>
            </svg>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#work">Projects</a>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <a href="mailto:contact@marine.co.kr">contact@marine.co.kr</a>
              <a href="tel:+821012345678">+82 10 1234 5678</a>
            </div>
            <div className="footer-column">
              <h4>Social</h4>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 Marine Research. All rights reserved.</span>
          <span className="footer-time">Seoul, KST</span>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// Main App
// ============================================
function App() {
  const [isLoading, setIsLoading] = useState(true)
  useLenis()

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className={`app ${isLoading ? 'loading' : ''}`} data-theme="dark">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Header />
      <main>
        <InlineVideoHero />
        <LocationsScroller />
        <VerticalStats />
        <ServicesShowcase />
        <TeamSection />
        <EquipmentGallery />
        <DraggableReviewGrid />
        <InfoDrawers />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
