import { useEffect } from 'react'
import LiquidEtherBackground from './components/LiquidEther.jsx'
import GlassSurface from './components/GlassSurface.jsx'
import MagicBento from './components/MagicBento.jsx'

function App() {

  useEffect(() => {
    const applySavedTheme = () => {
      if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    applySavedTheme()

    const toggleTheme = () => {
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('darkMode', document.documentElement.classList.contains('dark').toString())
      if (window.feather) window.feather.replace()
    }

    const themeBtn = document.getElementById('theme-toggle')
    const themeBtnMobile = document.getElementById('theme-toggle-mobile')
    themeBtn?.addEventListener('click', toggleTheme)
    themeBtnMobile?.addEventListener('click', toggleTheme)

    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')
    const toggleMenu = () => mobileMenu?.classList.toggle('hidden')
    mobileMenuButton?.addEventListener('click', toggleMenu)

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const targetId = anchor.getAttribute('href')
      if (!targetId) return
      const targetElement = document.querySelector(targetId)
      if (!targetElement) return
      e.preventDefault()
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' })
      mobileMenu?.classList.add('hidden')
    }
    document.addEventListener('click', handleAnchorClick)

    const sections = Array.from(document.querySelectorAll('section'))
    const navLinks = Array.from(document.querySelectorAll('.nav-link'))
    const onScroll = () => {
      let current = ''
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.pageYOffset >= sectionTop - 100) current = section.id || ''
      })
      navLinks.forEach((link) => {
        link.classList.remove('active-nav')
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active-nav')
      })
    }
    window.addEventListener('scroll', onScroll)

    const nav = document.querySelector('nav')
    const onNavShadow = () => {
      if (!nav) return
      if (window.scrollY > 12) {
        nav.classList.add('nav-glass');
        nav.classList.add('shadow-lg');
        nav.classList.remove('shadow-sm');
      } else {
        nav.classList.remove('nav-glass');
        nav.classList.remove('shadow-lg');
        nav.classList.add('shadow-sm');
      }
    }
    window.addEventListener('scroll', onNavShadow)

    import('aos').then(({ default: AOS }) => {
      AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
    })

    if (window.feather) window.feather.replace()

    // Vanta removed (replaced by Liquid Ether)

    return () => {
      themeBtn?.removeEventListener('click', toggleTheme)
      themeBtnMobile?.removeEventListener('click', toggleTheme)
      mobileMenuButton?.removeEventListener('click', toggleMenu)
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onNavShadow)
      // no cleanup needed
    }
  }, [])

  return (
    <>
      <LiquidEtherBackground />
      <nav id="site-nav" className="fixed w-full z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-xl font-bold gradient-text">Aman Khilani</a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link active-nav">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#research" className="nav-link">Research</a>
              <a href="#achievements" className="nav-link">Achievements</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#leadership" className="nav-link">Leadership</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button id="theme-toggle" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                <i data-feather="moon" className="hidden dark:block"></i>
                <i data-feather="sun" className="dark:hidden"></i>
              </button>
      </div>
            <div className="md:hidden flex items-center">
              <button id="mobile-menu-button" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                <i data-feather="menu"></i>
        </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" className="hidden md:hidden bg-white dark:bg-dark shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
            <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">About</a>
            <a href="#research" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Research</a>
            <a href="#achievements" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Achievements</a>
            <a href="#experience" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Experience</a>
            <a href="#leadership" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Leadership</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
            <button id="theme-toggle-mobile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500">Toggle Theme</button>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mb-6">
              <img src="http://static.photos/people/640x360/1" alt="Aman Khilani" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Aman Khilani</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6">Final Year Undergraduate, IIT Kanpur | Electrical & Civil Engineering | Machine Learning Minor</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">"Exploring intersections of engineering, AI, and creativity."</p>
            <div className="flex justify-center space-x-4">
              <a href="#contact" className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-900 rounded-full font-medium hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-cyan-400">Contact Me</a>
              <a href="#" className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:ring-2 focus:ring-gray-500">Download Resume</a>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Scholastic Achievements</h2>
          {/* Single Bento grid with four category tiles */}
          <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
          <MagicBento
            className=""
            data-aos="fade-up"
            cards={[
              {
                color: '#060010',
                title: 'Hackathons - 2025',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Won 1st place in Atlassian’s internal ShipIt Hackathon among 20 teams</li>
                    <li>Top 2% among 2000+ submissions in NK Securities Research Hackathon</li>
                  </ul>
                )
              },
              {
                color: '#060010',
                title: 'Scholarships & Selections - 2024',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Received K.N. Saluja Scholarship consecutively among 140+ CE students</li>
                    <li>Selected 18/900+ for KU-STAR research internship in Japan</li>
                  </ul>
                )
              },
              {
                color: '#060010',
                title: 'Competitions - 2023',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>1st place in National Level ROV design; Rs. 50,000 funding</li>
                    <li>Best Project Award: Manufacturing Processes – Falconet model</li>
                  </ul>
                )
              },
              {
                color: '#060010',
                title: 'Competitive Exams - 2021',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>JEE Advanced Rank 5026 among 2.6 lacs shortlisted</li>
                    <li>JEE Main Rank 13713 among 10.5 lacs shortlisted</li>
                  </ul>
                )
              }
            ]}
          />
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-lg mb-6">Final year undergraduate student at IIT Kanpur with a passion for engineering, artificial intelligence, and creative problem-solving. My journey has been shaped by diverse experiences in research, leadership, and social impact.</p>
              <p className="text-lg mb-8">I thrive at the intersection of technology and creativity, whether it's developing machine learning models or leading large-scale cultural events.</p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-blue-500"><i data-feather="linkedin"></i></a>
                <a href="https://github.com" target="_blank" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-blue-500"><i data-feather="github"></i></a>
                <a href="mailto:aman@example.com" className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-blue-500"><i data-feather="mail"></i></a>
              </div>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-6">Education Timeline</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h4 className="font-bold">B.Tech, IIT Kanpur</h4>
                  <p className="text-gray-600 dark:text-gray-300">Electrical & Civil Engineering | Machine Learning Minor</p>
                  <p className="text-sm text-gray-500">2019 - 2023 | CGPA: 8.2/10</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6 py-2">
                  <h4 className="font-bold">Class XII</h4>
                  <p className="text-gray-600 dark:text-gray-300">Science Stream</p>
                  <p className="text-sm text-gray-500">2017 - 2019 | 93.2%</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6 py-2">
                  <h4 className="font-bold">Class X</h4>
                  <p className="text-gray-600 dark:text-gray-300">CBSE Board</p>
                  <p className="text-sm text-gray-500">2016 - 2017 | 92.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Research & Technical Experience</h2>

          <GlassSurface className="rounded-xl overflow-hidden mb-12" data-aos="fade-up">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img src="http://static.photos/technology/1024x576/4" alt="KU-STAR Research" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Research Internship</div>
                  <span className="ml-4 text-gray-500 dark:text-gray-400">Summer 2022</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">KU-STAR Program, Kyoto University, Japan</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Conducted cutting-edge research in engineering solutions under the guidance of leading professors at one of Japan's top universities.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Developed novel approaches to complex engineering problems</span></li>
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Collaborated with international research team</span></li>
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Presented findings at university symposium</span></li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Machine Learning</span>
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Data Analysis</span>
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Research</span>
                </div>
              </div>
            </div>
          </GlassSurface>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">Academic Project</div></div>
                <h3 className="text-xl font-bold mb-2">Driver Gaze Detection</h3>
                <p className="text-gray-200/90 dark:text-gray-200 mb-4">Developed a computer vision system to detect driver attention levels using OpenCV and deep learning.</p>
                <a href="#" className="text-blue-300 dark:text-blue-300 font-medium hover:underline flex items-center focus:ring-2 focus:ring-blue-500">View on GitHub<i data-feather="arrow-right" className="ml-1 w-4 h-4"></i></a>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">Research Project</div></div>
                <h3 className="text-xl font-bold mb-2">SURGE LiDAR Research</h3>
                <p className="text-gray-200/90 dark:text-gray-200 mb-4">Worked on LiDAR data processing and analysis at IIT Kanpur under SURGE program.</p>
                <a href="#" className="text-blue-300 dark:text-blue-300 font-medium hover:underline flex items-center focus:ring-2 focus:ring-blue-500">View Details<i data-feather="arrow-right" className="ml-1 w-4 h-4"></i></a>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">Club Project</div></div>
                <h3 className="text-xl font-bold mb-2">Robotics Club Rover</h3>
                <p className="text-gray-200/90 dark:text-gray-200 mb-4">Designed and programmed autonomous rover for inter-college competitions.</p>
                <a href="#" className="text-blue-300 dark:text-blue-300 font-medium hover:underline flex items-center focus:ring-2 focus:ring-blue-500">View Demo<i data-feather="arrow-right" className="ml-1 w-4 h-4"></i></a>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Work Experience</h2>
          <GlassSurface className="rounded-xl overflow-hidden mb-12" data-aos="fade-up">
            <div className="md:flex">
              <div className="md:w-1/4 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center p-8">
                <img src="http://static.photos/office/640x360/5" alt="Atlassian" className="w-full max-w-[200px]" />
              </div>
              <div className="p-8 md:w-3/4">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Software Engineering Intern</div>
                  <span className="ml-4 text-gray-500 dark:text-gray-400">Summer 2023</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Atlassian</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Worked on core product development for one of the world's leading software companies.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Developed and optimized backend services using Golang</span></li>
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Implemented CI/CD pipelines improving deployment efficiency by 40%</span></li>
                  <li className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>Collaborated with cross-functional teams across multiple time zones</span></li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Golang</span>
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Docker</span>
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Kubernetes</span>
                  <span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">AWS</span>
                </div>
              </div>
            </div>
          </GlassSurface>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">AI Intern</div><span className="ml-4 text-gray-500 dark:text-gray-400">Winter 2022</span></div>
                <h3 className="text-xl font-bold mb-2">SkyAI</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Developed drone tracking algorithms using computer vision and machine learning techniques.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Python</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">OpenCV</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">TensorFlow</span></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">Software Engineer Intern</div><span className="ml-4 text-gray-500 dark:text-gray-400">Summer 2021</span></div>
                <h3 className="text-xl font-bold mb-2">Vibinex</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Contributed to full-stack development of productivity tools for software teams.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">JavaScript</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">React</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Node.js</span></div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      <section id="leadership" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Leadership & Cultural Impact</h2>
          <GlassSurface className="rounded-xl overflow-hidden mb-12" data-aos="fade-up">
            <div className="md:flex">
              <div className="md:w-1/3"><img src="http://static.photos/sport/1024x576/6" alt="Inter IIT" className="w-full h-full object-cover" /></div>
              <div className="p-8 md:w-2/3">
                <div className="flex items-center mb-4"><div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">Contingent Leader</div><span className="ml-4 text-gray-500 dark:text-gray-400">2022-2023</span></div>
                <h3 className="text-2xl font-bold mb-4">Inter IIT Cultural Meet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Led IIT Kanpur's contingent of 250+ members at India's largest inter-collegiate cultural festival.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="tile-glass p-4 rounded-lg"><div className="text-3xl font-bold gradient-text mb-1">250+</div><div className="text-gray-700 dark:text-gray-200">Team Members</div></div>
                  <div className="tile-glass p-4 rounded-lg"><div className="text-3xl font-bold gradient-text mb-1">15</div><div className="text-gray-700 dark:text-gray-200">Medals Won</div></div>
                </div>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Leadership</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Event Management</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Team Building</span></div>
              </div>
            </div>
          </GlassSurface>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">Head, Media & Publicity</div><span className="ml-4 text-gray-500 dark:text-gray-400">2023-2024</span></div>
                <h3 className="text-xl font-bold mb-2">Antaragni '24</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Led 120+ member team for Asia's largest college cultural festival with INR 2 Cr budget.</p>
                <div className="grid grid-cols-2 gap-2 mb-4"><div><div className="text-xl font-bold gradient-text">1M+</div><div className="text-sm text-gray-500">Reach</div></div><div><div className="text-xl font-bold gradient-text">120+</div><div className="text-sm text-gray-500">Team Size</div></div></div>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Marketing</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Branding</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Social Media</span></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">Coordinator</div><span className="ml-4 text-gray-500 dark:text-gray-400">2021-2023</span></div>
                <h3 className="text-xl font-bold mb-2">Film Club, IIT Kanpur</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Led film production initiatives, winning Inter IIT medals and reaching 8K+ viewership.</p>
                <div className="grid grid-cols-2 gap-2 mb-4"><div><div className="text-xl font-bold gradient-text">8K+</div><div className="text-sm text-gray-500">Viewership</div></div><div><div className="text-xl font-bold gradient-text">3</div><div className="text-sm text-gray-500">Awards</div></div></div>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Film Production</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Storytelling</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Creative Direction</span></div>
              </div>
            </GlassSurface>
          </div>
          <h3 className="text-2xl font-bold mb-8" data-aos="fade-up">Social Work & Outreach</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">Volunteer</div><span className="ml-4 text-gray-500 dark:text-gray-400">2020-2022</span></div>
                <h3 className="text-xl font-bold mb-2">Cybercrime Awareness with CRY</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Educated 1000+ students across 20+ schools in 7 cities about online safety and cybercrime prevention.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Education</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Public Speaking</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Community Service</span></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden card-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text sm font-medium">Initiative Lead</div><span className="ml-4 text-gray-500 dark:text-gray-400">2023</span></div>
                <h3 className="text-xl font-bold mb-2">Beyond Barriers (Antaragni x CDAP)</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Created inclusive festival experience for differently-abled students through accessibility initiatives.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Inclusion</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Accessibility</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Social Impact</span></div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassSurface className="rounded-xl p-6" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="code" className="text-blue-500 mr-2"></i>Programming</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Golang</span><span>90%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Python</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>C/C++</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="cpu" className="text-purple-500 mr-2"></i>AI/ML</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>TensorFlow</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>OpenCV</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Scikit-learn</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="database" className="text-green-500 mr-2"></i>Web & Data</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Next.js</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Supabase</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Pandas</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="tool" className="text-yellow-500 mr-2"></i>DevOps</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Docker</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Kubernetes</span><span>70%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>AWS</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
              <div className="space-y-6">
                <div className="flex items-start"><div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4"><i data-feather="mail" className="text-blue-500 dark:text-blue-400"></i></div><div><h4 className="font-medium">Email</h4><a href="mailto:aman@example.com" className="text-gray-600 dark:text-gray-300 hover:underline focus:ring-2 focus:ring-blue-500">aman@example.com</a></div></div>
                <div className="flex items-start"><div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4"><i data-feather="phone" className="text-purple-500 dark:text-purple-400"></i></div><div><h4 className="font-medium">Phone</h4><a href="tel:+919876543210" className="text-gray-600 dark:text-gray-300 hover:underline focus:ring-2 focus:ring-purple-500">+91 98765 43210</a></div></div>
                <div className="flex items-start"><div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4"><i data-feather="map-pin" className="text-green-500 dark:text-green-400"></i></div><div><h4 className="font-medium">Location</h4><p className="text-gray-600 dark:text-gray-300">IIT Kanpur, Uttar Pradesh, India</p></div></div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400"><i data-feather="linkedin"></i></a>
                  <a href="https://github.com" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400"><i data-feather="github"></i></a>
                  <a href="https://twitter.com" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400"><i data-feather="twitter"></i></a>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <GlassSurface className="rounded-xl p-8">
                <div className="mb-6"><label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Name</label><input type="text" id="name" className="w-full px-4 py-3 rounded-lg input-glass text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300" placeholder="Your full name" /></div>
                <div className="mb-6"><label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label><input type="email" id="email" className="w-full px-4 py-3 rounded-lg input-glass text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300" placeholder="you@example.com" /></div>
                <div className="mb-6"><label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label><textarea id="message" rows="4" className="w-full px-4 py-3 rounded-lg input-glass text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300" placeholder="Write your message..."></textarea></div>
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-emerald-500 text-slate-900 py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-cyan-400">Send Message</button>
              </GlassSurface>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0"><a href="#" className="text-xl font-bold gradient-text">Aman Khilani</a><p className="mt-2">Exploring intersections of engineering, AI, and creativity.</p></div>
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-white focus:ring-2 focus:ring-white">Home</a>
              <a href="#about" className="hover:text-white focus:ring-2 focus:ring-white">About</a>
              <a href="#research" className="hover:text-white focus:ring-2 focus:ring-white">Research</a>
              <a href="#achievements" className="hover:text-white focus:ring-2 focus:ring-white">Achievements</a>
              <a href="#experience" className="hover:text-white focus:ring-2 focus:ring-white">Experience</a>
              <a href="#contact" className="hover:text-white focus:ring-2 focus:ring-white">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left"><p>© 2023 Aman Khilani. All rights reserved.</p></div>
      </div>
      </footer>
    </>
  )
}

export default App
