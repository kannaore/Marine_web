import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// Preloader (Framer Motion)
// ============================================
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px bg-white/5">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-[#050505]"
            initial={{ scale: 1 }}
            animate={{ scale: progress > (i / 24) * 100 ? 0 : 1 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-light tracking-[0.3em] text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          MARINE
        </motion.h1>
        <motion.div
          className="mt-8 text-2xl font-extralight text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  )
}

// ============================================
// Smooth Scroll with Lenis
// ============================================
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    return () => lenis.destroy()
  }, [])
}

// ============================================
// Header (Framer Motion)
// ============================================
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = ['About', 'Services', 'Projects', 'Team', 'Contact']

  return (
    <>
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-xl"
          animate={{
            backgroundColor: isScrolled ? 'rgba(10,10,10,0.9)' : 'rgba(10,10,10,0.6)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative flex items-center gap-12">
          <a href="/" className="text-xl font-light tracking-[0.2em] text-white">
            MARINE
          </a>

          <nav className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors relative"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="block w-5 h-px bg-white"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex flex-col gap-8 text-center">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-5xl md:text-7xl font-light text-white hover:text-sky-400 transition-colors"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-sm text-white/30 mr-4">0{i + 1}</span>
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// Hero Section (Framer Motion + GSAP Parallax)
// ============================================
function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const words = ['Pioneering', 'the Future', 'of Ocean']

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          className="w-full h-full object-cover"
          src="https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8f963edc5f5fc&profile_id=164"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 px-8 md:px-16 max-w-6xl"
        style={{ opacity }}
      >
        <h1 className="text-5xl md:text-8xl font-light leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.5 + i * 0.2,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.a
            href="#about"
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-8 md:left-16 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-white to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs tracking-widest text-white/50 rotate-90 origin-center translate-y-8">
          SCROLL
        </span>
      </motion.div>
    </section>
  )
}

// ============================================
// Stats Section (GSAP Count-up)
// ============================================
function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { number: 2400, suffix: 'B+', label: 'Total Project Value' },
    { number: 500, suffix: '+', label: 'Completed Projects' },
    { number: 50, suffix: '+', label: 'Expert Engineers' },
    { number: 20, suffix: '+', label: 'Years Experience' },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-8 md:px-16 bg-[#050505]" id="about">
      <motion.h2
        className="text-5xl md:text-7xl font-light mb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Proven Track Record
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}

function StatCard({
  number,
  suffix,
  label,
  index,
  isInView,
}: {
  number: number
  suffix: string
  label: string
  index: number
  isInView: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      gsap.to({ val: 0 }, {
        val: number,
        duration: 2,
        delay: index * 0.2,
        ease: 'power2.out',
        onUpdate: function () {
          setCount(Math.floor(this.targets()[0].val))
        },
      })
    }
  }, [isInView, number, index])

  return (
    <motion.div
      className="relative pl-6 border-l border-white/10"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <span className="block text-xs text-white/40 mb-2">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl md:text-6xl font-extralight">
          {count.toLocaleString()}
        </span>
        <span className="text-2xl text-sky-400">{suffix}</span>
      </div>
      <span className="block mt-2 text-white/60">{label}</span>
    </motion.div>
  )
}

// ============================================
// Services Section (Framer Motion Hover)
// ============================================
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      title: 'Geophysical Survey',
      description: 'High-resolution seafloor mapping with multibeam and side-scan sonar systems.',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
    },
    {
      title: 'Geological Investigation',
      description: 'Comprehensive seabed characterization through sediment sampling and analysis.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    },
    {
      title: 'Environmental Monitoring',
      description: 'Real-time monitoring of water quality, currents, and marine ecosystems.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    },
    {
      title: 'Offshore Wind Survey',
      description: 'Complete site assessment for offshore renewable energy installations.',
      image: 'https://images.unsplash.com/photo-1466629437334-b4f6603563c5?w=800&q=80',
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-32 px-8 md:px-16" id="services">
      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === i ? 0.15 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={service.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-light mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our Expertise
        </motion.h2>
        <motion.p
          className="text-white/60 mb-16 max-w-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Comprehensive marine survey solutions backed by 20+ years of experience
        </motion.p>

        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.article
              key={i}
              className="group border-t border-white/10 py-8 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-8">
                <span className="text-xs text-white/40 w-8">0{i + 1}</span>
                <motion.h3
                  className="text-2xl md:text-4xl font-light flex-1"
                  animate={{ color: hoveredIndex === i ? '#0ea5e9' : '#ffffff' }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="hidden md:block text-white/50 max-w-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    x: hoveredIndex === i ? 0 : -20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.description}
                </motion.p>
                <motion.span
                  className="text-2xl"
                  animate={{ x: hoveredIndex === i ? 10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}

// ============================================
// Team Section (Framer Motion)
// ============================================
function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const team = [
    { name: 'James Park', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Sarah Kim', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { name: 'David Lee', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
    { name: 'Emily Chen', role: 'Lead Engineer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-8 md:px-16 bg-[#0a0a0a]" id="team">
      <motion.h2
        className="text-5xl md:text-7xl font-light mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Meet Our Team
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.article
            key={i}
            className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-white/60 text-sm">{member.role}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

// ============================================
// Accordion / Info Drawers (Framer Motion)
// ============================================
function AccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const items = [
    {
      title: 'Geophysical Survey',
      content: 'Precision seafloor mapping using advanced multibeam echosounders, side-scan sonar, and sub-bottom profilers.',
      image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600',
    },
    {
      title: 'Geological Investigation',
      content: 'Comprehensive seabed characterization through CPT testing, vibrocoring, and grab sampling.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    },
    {
      title: 'Environmental Monitoring',
      content: 'Real-time monitoring with ADCP systems for water quality, currents, and marine ecosystems.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600',
    },
  ]

  return (
    <section ref={sectionRef} className="py-32 px-8 md:px-16 bg-[#050505]" id="projects">
      <motion.h2
        className="text-5xl md:text-7xl font-light mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Expert Services
      </motion.h2>

      <div className="max-w-4xl">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="border-t border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
          >
            <motion.button
              className="w-full py-6 flex items-center gap-6 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              whileHover={{ paddingLeft: 16 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs text-white/40">0{i + 1}</span>
              <motion.h3
                className="text-xl md:text-3xl font-light flex-1"
                animate={{ color: openIndex === i ? '#0ea5e9' : '#ffffff' }}
              >
                {item.title}
              </motion.h3>
              <motion.span
                className="text-2xl"
                animate={{ rotate: openIndex === i ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                +
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 grid md:grid-cols-2 gap-8">
                    <p className="text-white/60 leading-relaxed">{item.content}</p>
                    <motion.div
                      className="rounded-lg overflow-hidden aspect-video"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <div className="border-t border-white/10" />
      </div>
    </section>
  )
}

// ============================================
// Footer CTA (Framer Motion)
// ============================================
function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="min-h-[70vh] flex items-center justify-center px-8 md:px-16 bg-gradient-to-br from-[#0a0a0a] to-[#0d1520]"
      id="contact"
    >
      <div className="text-center">
        <motion.h2
          className="text-5xl md:text-8xl font-light mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Let's Talk
        </motion.h2>
        <motion.p
          className="text-xl text-white/60 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          About Your Project
        </motion.p>
        <motion.a
          href="mailto:contact@marine.co.kr"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-sky-400 transition-colors"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
          <span>→</span>
        </motion.a>
      </div>
    </section>
  )
}

// ============================================
// Footer
// ============================================
function Footer() {
  return (
    <footer className="py-16 px-8 md:px-16 bg-[#050505] border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div>
          <h3 className="text-2xl font-light tracking-[0.2em] mb-4">MARINE</h3>
          <p className="text-white/50 text-sm">Pioneering the Future of Ocean</p>
        </div>
        <div className="flex gap-16">
          <div>
            <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/60">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="mailto:contact@marine.co.kr" className="hover:text-white transition-colors">
                contact@marine.co.kr
              </a>
              <span>Seoul, South Korea</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        © 2024 Marine Research. All rights reserved.
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
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <main>
            <Hero />
            <StatsSection />
            <ServicesSection />
            <TeamSection />
            <AccordionSection />
            <FooterCTA />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  )
}

export default App
