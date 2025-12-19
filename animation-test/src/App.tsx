import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// Custom Cursor (Metalab Style)
// ============================================
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

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
      gsap.to(cursor, { scale: 2, duration: 0.3 })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
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
// Header (Metalab Style - Floating Pill)
// ============================================
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-bg" />
        <div className="header-blur" />
        <div className="header-inner">
          <a href="/" className="logo">
            <svg viewBox="0 0 120 24" className="logo-icon">
              <text x="0" y="18" className="logo-text">MARINE</text>
            </svg>
          </a>

          <nav className="nav-links">
            <a href="#about">회사소개</a>
            <a href="#services">서비스</a>
            <a href="#work">프로젝트</a>
            <a href="#contact">문의하기</a>
          </nav>

          <div className="header-right">
            <button className="theme-toggle">
              <span className="theme-icon">☀️</span>
            </button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="menu-text">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`fullscreen-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="menu-nav">
          <a href="#about" onClick={() => setMenuOpen(false)}>회사소개</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>서비스</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>프로젝트</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>문의하기</a>
        </nav>
      </div>
    </>
  )
}

// ============================================
// Inline Video Hero (Metalab Style)
// ============================================
function InlineVideoHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero">
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
          <span className="hero-line">해양의</span>
        </span>
        <span className="hero-inline-media">
          <video
            className="hero-inline-video"
            src="https://player.vimeo.com/external/449623579.sd.mp4?s=d5f3c5e5b5b5e5b5e5b5e5b5e5b5e5b5e5b5e5b5&profile_id=164"
            autoPlay
            loop
            muted
            playsInline
          />
        </span>
        <span className="hero-line-container">
          <span className="hero-line">미래를,</span>
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
          <span className="hero-line">함께</span>
        </span>
        <span className="hero-inline-media">
          <img
            className="hero-inline-image"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
            alt="Research"
          />
        </span>
        <span className="hero-line-container">
          <span className="hero-line">개척합니다</span>
        </span>
      </h1>

      <div ref={ctaRef} className="hero-cta">
        <a href="#about" className="cta-link">
          더 알아보기
          <span className="cta-arrow">→</span>
        </a>
      </div>
    </section>
  )
}

// ============================================
// Cities Scroller (Location Parallax)
// ============================================
function LocationsScroller() {
  const sectionRef = useRef<HTMLElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const locations = locationsRef.current?.querySelectorAll('.location-item')
    if (!locations) return

    const ctx = gsap.context(() => {
      locations.forEach((loc, i) => {
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
    })

    return () => ctx.revert()
  }, [])

  const locations = [
    { name: '대한민국', image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80' },
    { name: '싱가포르', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' },
    { name: '일본', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' },
    { name: '대만', image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80' },
    { name: '인도네시아', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80' },
    { name: '베트남', image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800&q=80' },
  ]

  return (
    <section ref={sectionRef} className="locations-scroller" id="about">
      <div className="locations-bg-container">
        {locations.map((loc, i) => (
          <div key={i} className="locations-bg-image" style={{ '--index': i } as React.CSSProperties}>
            <img src={loc.image} alt={loc.name} />
          </div>
        ))}
        <div className="locations-overlay" />
      </div>
      <div className="locations-content">
        <div className="locations-header">
          <span className="locations-label">글로벌 네트워크</span>
          <div className="locations-line" />
        </div>
        <div ref={locationsRef} className="locations-grid">
          {locations.map((loc, i) => (
            <div key={i} className="location-item">
              {loc.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// Text With Stats Section
// ============================================
function TextWithStats() {
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { value: 2400, suffix: '억+', label: '누적 프로젝트 규모' },
    { value: 500, suffix: '+', label: '완료 프로젝트' },
    { value: 50, suffix: '+', label: '전문 기술 인력' },
    { value: 20, suffix: '+', label: '운영 연수' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text
      gsap.from('.stats-text-line', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="text-with-stats">
      <div className="stats-text-container">
        <p className="stats-text-line">
          마린리서치는 <strong>20년 이상</strong>의 해양조사 경험을 바탕으로
        </p>
        <p className="stats-text-line">
          해상풍력, 지구물리탐사, 지반조사 분야에서
        </p>
        <p className="stats-text-line">
          <strong>최고의 전문성</strong>을 제공합니다.
        </p>
      </div>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} index={i} />
        ))}
      </div>
    </section>
  )
}

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number
  suffix: string
  label: string
  index: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.from(ref.current?.querySelector('.stat-line'), {
        scaleX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      })

      // Counter animation
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true
          gsap.to(
            { val: 0 },
            {
              val: value,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCount(Math.floor(this.targets()[0].val))
              },
            }
          )
        },
      })
    })

    return () => ctx.revert()
  }, [value, index])

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-line" />
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        <span className="stat-number">{count.toLocaleString()}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
    </div>
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
      quote: '마린리서치의 전문성과 정확한 데이터는 우리 프로젝트의 성공에 핵심이었습니다. 복잡한 해양 환경에서도 신뢰할 수 있는 결과를 제공해주셨습니다.',
      author: '김영수',
      role: '해양 프로젝트 매니저',
      company: '한국해양에너지',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      quote: '20년 이상의 경험이 느껴지는 신뢰할 수 있는 파트너입니다. 해상풍력 프로젝트에서 가장 먼저 찾게 되는 회사입니다.',
      author: '이정민',
      role: '에너지 기업 대표',
      company: '그린파워코리아',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    {
      quote: '최첨단 장비와 전문 인력으로 완벽한 조사 결과를 제공받았습니다. 특히 다국적 프로젝트에서 원활한 협업이 인상적이었습니다.',
      author: '박현우',
      role: '건설사 CEO',
      company: '동해건설',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
      quote: '정밀한 해저 지형 조사 덕분에 케이블 설치 작업을 안전하게 완료할 수 있었습니다. 감사합니다.',
      author: '최서연',
      role: '프로젝트 디렉터',
      company: '해저통신네트웍',
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
        <h2 className="reviews-title">신뢰의 목소리</h2>
        <p className="reviews-subtitle">고객사의 생생한 경험을 들어보세요</p>
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
        <span>← 드래그하여 더 보기 →</span>
      </div>
    </section>
  )
}

// ============================================
// Info Drawers (Accordion)
// ============================================
function InfoDrawers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const items = [
    {
      title: '해양 물리 탐사',
      description:
        '최첨단 멀티빔 음향측심기, 사이드스캔 소나, 서브바텀 프로파일러 등을 활용한 정밀 해저 지형 조사. 해저면의 3D 지형도 작성 및 해저 장애물 탐지를 수행합니다.',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80',
    },
    {
      title: '해양 지질 조사',
      description:
        '해저 퇴적물 샘플링, 지층 분석을 통한 해저 지반 특성 파악. CPT(콘관입시험), 비브로코어링, 그랩샘플링 등 다양한 시험을 수행합니다.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      title: '해양 환경 모니터링',
      description:
        '수질, 해류, 조석 등 해양 환경 요소의 실시간 모니터링 및 분석. ADCP를 이용한 해류 측정 및 장기 모니터링 시스템을 구축합니다.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
    },
    {
      title: '해상풍력 사이트 조사',
      description:
        '해상풍력 발전 단지 개발을 위한 종합 해양 조사 서비스. 풍력 터빈 설치 위치 선정, 해저 케이블 경로 조사, 환경영향평가를 지원합니다.',
      image: 'https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=600&q=80',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.drawers-title-text', {
        y: 105,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="drawers-section" id="services">
      <div className="drawers-header">
        <h2 className="drawers-title">
          <span className="drawers-title-line">
            <span className="drawers-title-text">전문</span>
          </span>
          <span className="drawers-title-line">
            <span className="drawers-title-text">서비스</span>
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
          {'프로젝트에 대해'.split('').map((char, i) => (
            <span key={i}>{char}</span>
          ))}
          <br />
          {'이야기해 보세요'.split('').map((char, i) => (
            <span key={i + 100}>{char}</span>
          ))}
        </h2>
        <a href="mailto:contact@marineresearch.co.kr" className="footer-cta-button">
          <span className="button-text">문의하기</span>
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
              <h4>회사</h4>
              <a href="#about">회사소개</a>
              <a href="#services">서비스</a>
              <a href="#work">프로젝트</a>
            </div>
            <div className="footer-column">
              <h4>연락처</h4>
              <a href="mailto:contact@marine.co.kr">contact@marine.co.kr</a>
              <a href="tel:+821012345678">+82 10 1234 5678</a>
            </div>
            <div className="footer-column">
              <h4>소셜</h4>
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
  useLenis()

  return (
    <div className="app" data-theme="dark">
      <CustomCursor />
      <Header />
      <main>
        <InlineVideoHero />
        <LocationsScroller />
        <TextWithStats />
        <DraggableReviewGrid />
        <InfoDrawers />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
