import { useEffect, useState } from 'react'
const profileImg = new URL('./assets/amankhilani.jpg', import.meta.url).href
const kuStarImg = new URL('./assets/ku-star.jpg', import.meta.url).href
const driverGazeImg = new URL('./assets/driver-gaze.jpg', import.meta.url).href
const surgeLidarImg = new URL('./assets/surge-lidar.jpg', import.meta.url).href
const roboticsRoverImg = new URL('./assets/robotics-rover.jpg', import.meta.url).href
const atlassianImg = new URL('./assets/atlassian.jpg', import.meta.url).href
const skyaiImg = new URL('./assets/skyai.jpg', import.meta.url).href
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
      const t = e.target
      if (!(t instanceof Element)) return
      const anchor = t.closest('a[href^="#"]')
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

    // Cursor-tracked border glow for glass cards
    const updateGlow = (e) => {
      const eventTarget = e.target;
      if (!(eventTarget instanceof Element)) return;
      const target = eventTarget.closest('.glass-card');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));
      target.style.setProperty('--glow-x', `${xPct}%`);
      target.style.setProperty('--glow-y', `${yPct}%`);
    };
    document.addEventListener('pointermove', updateGlow, { passive: true });

    import('aos').then(({ default: AOS }) => {
      AOS.init({ duration: 800, easing: 'ease-in-out', once: true })
      // Ensure observers are in place
      setTimeout(() => {
        try { AOS.refreshHard() } catch (_) { /* no-op */ }
      }, 0)
      // Fallback: if no element received aos-animate, force-show to avoid hidden sections
      setTimeout(() => {
        const nodes = Array.from(document.querySelectorAll('[data-aos]'))
        if (nodes.length && !nodes.some(n => n.classList.contains('aos-animate'))) {
          nodes.forEach(n => n.classList.add('aos-animate'))
        }
      }, 1200)
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
      document.removeEventListener('pointermove', updateGlow)
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
              <a href="#accolades" className="nav-link">Accolades</a>
              <a href="#research" className="nav-link">Research</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#leadership" className="nav-link">Leadership</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#social" className="nav-link">Social Work</a>
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
            <a href="#accolades" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Accolades</a>
            <a href="#research" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Research</a>
            <a href="#experience" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Experience</a>
            <a href="#leadership" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Leadership</a>
            <a href="#skills" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Skills</a>
            <a href="#social" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Social Work</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
            <button id="theme-toggle-mobile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500">Toggle Theme</button>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center" data-aos="fade-up" data-aos-duration="1000">
              <div className="group w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mb-6 transform transition-transform duration-300 ease-out hover:scale-105">
               <img src={profileImg} alt="Aman Khilani" className="w-full h-full object-cover transform transition-transform duration-500 ease-out scale-105 group-hover:scale-110" />
              </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Aman Khilani</h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6">Exploring intersections of engineering, creativity and life.</h2>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-lg mb-6">Hey folks! I'm Aman, a final year undergraduate student at IIT Kanpur with a passion for engineering, machine learning and creative problem-solving. My journey has been shaped by diverse experiences in research, corporate industry, leadership and social impact.</p>
              <p className="text-lg mb-8">Apart from this, I love watching, shooting, editing and creating films, primarily from a cinematographer's perspective. I'm also a big fan of travelling and photography. I love to explore new places and cultures. </p>
              <p className="text-lg mb-8"> Music keeps me going. </p>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-6">Education Timeline</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6 py-2">
                  <h4 className="font-bold">B.Tech, IIT Kanpur</h4>
                  <p className="text-gray-600 dark:text-gray-300">Electrical & Civil Engineering | Machine Learning Minor</p>
                  <p className="text-sm text-gray-400">2021 - Present</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6 py-2">
                  <h4 className="font-bold">High School, Vrindavan Public School Ajmer</h4>
                  <p className="text-gray-600 dark:text-gray-300">Science Stream</p>
                  <p className="text-sm text-gray-400">2019 - 2021</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6 py-2">
                  <h4 className="font-bold">Middle School, St. Anselm's Sr. Sec. School Ajmer</h4>
                  <p className="text-gray-600 dark:text-gray-300">CBSE Board</p>
                  <p className="text-sm text-gray-400">2016 - 2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="accolades" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Scholastic Achievements</h2>
          {/* Single Bento grid with four category tiles */}
          <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
          <MagicBento
            className="accolades-three"
            data-aos="fade-up"
            cards={[
              {
                color: '#060010',
                title: 'Hackathons - 2025',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Won the 1st place in Atlassian’s internal ShipIt Hackathon among 20 teams, during my summer internship</li>
                    <li>Secured a spot among the top 2% of 2000+ submissions in the NK Securities Research Hackathon 2025</li>
                  </ul>
                )
              },
              {
                color: '#060010',
                title: 'Scholarships & Selections - 2024',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Received the K.N. Saluja Scholarship consecutively for the 2nd time, among 140+ CE students for excellence in academics</li>
                    <li>Selected among the top 18 students for the KU-STAR research program from 900+ applicants</li>
                  </ul>
                )
              },
              {
                color: '#060010',
                title: 'Competitions - 2023',
                label: 'Category',
                content: (
                  <ul className="list-disc list-inside space-y-2">
                    <li>Won the 1st place in the National Level ROV design competition and received a funding of Rs. 50,000</li>
                    <li>Received the Best Project Award in the course: Manufacturing Processes for a working model of Falconet</li>
                  </ul>
                )
              }
            ]}
          />
          </div>

          <h2 className="text-3xl font-bold text-center mb-12 mt-16" data-aos="fade-up">Extracurricular Achievements</h2>
          <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
            <MagicBento
              className="accolades-two"
              data-aos="fade-up"
              cards={[
                {
                  color: '#060010',
                  title: 'International',
                  label: 'Category',
                  content: (
                    <ul className="list-disc list-inside space-y-2">
                      <li>From over 2000 entries, nominated among the top 40 submissions in the IFP Short Scriptwriting Challenge ’23</li>
                      <li>Recognized among the top 30 submissions from 1500+ entries in the IFP 50hr Film Making Challenge ’22</li>
                    </ul>
                  )
                },
                {
                  color: '#060010',
                  title: 'Inter IIT Cultural Meet',
                  label: 'Category',
                  content: (
                    <ul className="list-disc list-inside space-y-2">
                      <li>Acheived a Silver in the 51hr Film Making Challenge & an overall Silver in Filmmaking Arts Cup at Inter IIT Cultural Meet 7.0</li>
                      <li>Directed a film, securing the Silver medal in the 51hr Film Making Challenge, in the Filmmaking Arts Cup at Inter IIT Cultural Meet 6.0</li>
                    </ul>
                  )
                }
              ]}
            />
          </div>
        </div>
      </section>

      <section id="research" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Research & Technical Experience</h2>

          {(() => {
            const researchItems = [
              {
                id: 'ku-star',
                title: 'KU-STAR Program, Kyoto University, Japan',
                label: 'Research Internship',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: 'Summer 2022',
                description:
                  "Conducted cutting-edge research in engineering solutions under the guidance of leading professors at one of Japan's top universities.",
                bullets: [
                  'Developed novel approaches to complex engineering problems',
                  'Collaborated with international research team',
                  'Presented findings at university symposium'
                ],
                tags: ['Machine Learning', 'Data Analysis', 'Research'],
                image: kuStarImg,
                imageAlt: 'KU-STAR Research'
              },
              {
                id: 'driver-gaze',
                title: 'Driver Gaze Detection',
                label: 'Academic Project',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: '',
                description:
                  'Developed a computer vision system to detect driver attention levels using OpenCV and deep learning.',
                bullets: [],
                tags: [],
                image: driverGazeImg,
                imageAlt: 'Driver Gaze Detection'
              },
              {
                id: 'surge-lidar',
                title: 'SURGE LiDAR Research',
                label: 'Research Project',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: '',
                description: 'Worked on LiDAR data processing and analysis at IIT Kanpur under SURGE program.',
                bullets: [],
                tags: [],
                image: surgeLidarImg,
                imageAlt: 'SURGE LiDAR Research'
              },
              {
                id: 'robotics-rover',
                title: 'Robotics Club Rover',
                label: 'Club Project',
                labelClasses: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
                period: '',
                description: 'Designed and programmed autonomous rover for inter-college competitions.',
                bullets: [],
                tags: [],
                image: roboticsRoverImg,
                imageAlt: 'Robotics Club Rover'
              }
            ];

            const [featuredId, setFeaturedId] = useState(researchItems[0].id);
            const featured = researchItems.find(i => i.id === featuredId) || researchItems[0];
            const others = researchItems.filter(i => i.id !== featured.id);

            return (
              <>
                <GlassSurface className="rounded-xl overflow-hidden mb-12 glass-card" data-aos="fade-up">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img src={featured.image} alt={featured.imageAlt} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-8 md:w-2/3">
                      <div className="flex items-center mb-4">
                        <div className={`${featured.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{featured.label}</div>
                        {featured.period ? (
                          <span className="ml-4 text-gray-500 dark:text-gray-400">{featured.period}</span>
                        ) : null}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{featured.title}</h3>
                      {featured.description ? (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{featured.description}</p>
                      ) : null}
                      {featured.bullets && featured.bullets.length > 0 ? (
                        <ul className="space-y-2 mb-6">
                          {featured.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>{b}</span></li>
                          ))}
                        </ul>
                      ) : null}
                      {featured.tags && featured.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.map((t, idx) => (
                            <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </GlassSurface>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {others.map((item, i) => (
                    <GlassSurface
                      key={item.id}
                      className="rounded-xl overflow-hidden transition-all duration-300 glass-card cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={(i + 1) * 100}
                    >
                      <div
                        className="p-6"
                        role="button"
                        tabIndex={0}
                        onClick={() => setFeaturedId(item.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFeaturedId(item.id); }}
                      >
                        <div className="flex items-center mb-4"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div></div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200/90 dark:text-gray-200 mb-4">{item.description}</p>
                        {/* Optional link row could go here if needed */}
                      </div>
                    </GlassSurface>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Work Experience</h2>
          {(() => {
            const experienceItems = [
              {
                id: 'atlassian',
                company: 'Atlassian',
                label: 'Software Engineering Intern',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: 'Summer 2023',
                description: "Worked on core product development for one of the world's leading software companies.",
                bullets: [
                  'Developed and optimized backend services using Golang',
                  'Implemented CI/CD pipelines improving deployment efficiency by 40%',
                  'Collaborated with cross-functional teams across multiple time zones'
                ],
                tags: ['Golang', 'Docker', 'Kubernetes', 'AWS'],
                image: atlassianImg,
                imageAlt: 'Atlassian'
              },
              {
                id: 'skyai',
                company: 'SkyAI',
                label: 'AI Intern',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: 'Winter 2022',
                description: 'Developed drone tracking algorithms using computer vision and machine learning techniques.',
                bullets: [],
                tags: ['Python', 'OpenCV', 'TensorFlow'],
                image: skyaiImg,
                imageAlt: 'SkyAI'
              },
              {
                id: 'vibinex',
                company: 'Vibinex',
                label: 'Software Engineer Intern',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: 'Summer 2021',
                description: 'Contributed to full-stack development of productivity tools for software teams.',
                bullets: [],
                tags: ['JavaScript', 'React', 'Node.js'],
                image: 'http://static.photos/office/640x360/7',
                imageAlt: 'Vibinex'
              }
            ];

            const [featuredExp, setFeaturedExp] = useState(experienceItems[0].id);
            const featured = experienceItems.find(i => i.id === featuredExp) || experienceItems[0];
            const others = experienceItems.filter(i => i.id !== featured.id);

            return (
              <>
                <GlassSurface className="rounded-xl overflow-hidden mb-12 glass-card" data-aos="fade-up">
                  <div className="md:flex">
                    <div className="md:w-1/4 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center p-8">
                      {featured.image ? (
                        <img src={featured.image} alt={featured.imageAlt} className="w-full max-w-[200px]" />
                      ) : null}
                    </div>
                    <div className="p-8 md:w-3/4">
                      <div className="flex items-center mb-4">
                        <div className={`${featured.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{featured.label}</div>
                        {featured.period ? (
                          <span className="ml-4 text-gray-500 dark:text-gray-400">{featured.period}</span>
                        ) : null}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{featured.company}</h3>
                      {featured.description ? (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{featured.description}</p>
                      ) : null}
                      {featured.bullets && featured.bullets.length > 0 ? (
                        <ul className="space-y-2 mb-6">
                          {featured.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start"><i data-feather="check" className="text-green-500 mr-2 mt-1"></i><span>{b}</span></li>
                          ))}
                        </ul>
                      ) : null}
                      {featured.tags && featured.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.map((t, idx) => (
                            <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </GlassSurface>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {others.map((item, i) => (
                    <GlassSurface
                      key={item.id}
                      className="rounded-xl overflow-hidden glass-card transition-all duration-300 cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={(i + 1) * 100}
                    >
                      <div
                        className="p-6"
                        role="button"
                        tabIndex={0}
                        onClick={() => setFeaturedExp(item.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFeaturedExp(item.id); }}
                      >
                        <div className="flex items-center mb-4"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div>{item.period ? (<span className="ml-4 text-gray-500 dark:text-gray-400">{item.period}</span>) : null}</div>
                        <h3 className="text-xl font-bold mb-2">{item.company}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </GlassSurface>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <section id="leadership" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Leadership & Cultural Impact</h2>
          {(() => {
            const leadershipItems = [
              {
                id: 'inter-iit',
                title: 'Inter IIT Cultural Meet',
                label: 'Contingent Leader',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: '2022-2023',
                description: "Led IIT Kanpur's contingent of 250+ members at India's largest inter-collegiate cultural festival.",
                image: 'http://static.photos/sport/1024x576/6',
                imageAlt: 'Inter IIT',
                metrics: [
                  { value: '250+', label: 'Team Members' },
                  { value: '15', label: 'Medals Won' }
                ],
                tags: ['Leadership', 'Event Management', 'Team Building']
              },
              {
                id: 'antaragni',
                title: "Antaragni '24",
                label: 'Head, Media & Publicity',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: '2023-2024',
                description: "Led 120+ member team for Asia's largest college cultural festival with INR 2 Cr budget.",
                image: 'http://static.photos/event/1024x576/3',
                imageAlt: 'Antaragni',
                metrics: [
                  { value: '1M+', label: 'Reach' },
                  { value: '120+', label: 'Team Size' }
                ],
                tags: ['Marketing', 'Branding', 'Social Media']
              },
              {
                id: 'film-club',
                title: 'Film Club, IIT Kanpur',
                label: 'Coordinator',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: '2021-2023',
                description: 'Led film production initiatives, winning Inter IIT medals and reaching 8K+ viewership.',
                image: 'http://static.photos/event/1024x576/4',
                imageAlt: 'Film Club',
                metrics: [
                  { value: '8K+', label: 'Viewership' },
                  { value: '3', label: 'Awards' }
                ],
                tags: ['Film Production', 'Storytelling', 'Creative Direction']
              }
            ];

            const [featuredLead, setFeaturedLead] = useState(leadershipItems[0].id);
            const featured = leadershipItems.find(i => i.id === featuredLead) || leadershipItems[0];
            const others = leadershipItems.filter(i => i.id !== featured.id);

            return (
              <>
                <GlassSurface className="rounded-xl overflow-hidden mb-12 glass-card" data-aos="fade-up">
                  <div className="md:flex">
                    <div className="md:w-1/3"><img src={featured.image} alt={featured.imageAlt} className="w-full h-full object-cover" /></div>
                    <div className="p-8 md:w-2/3">
                      <div className="flex items-center mb-4"><div className={`${featured.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{featured.label}</div>{featured.period ? (<span className="ml-4 text-gray-500 dark:text-gray-400">{featured.period}</span>) : null}</div>
                      <h3 className="text-2xl font-bold mb-4">{featured.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{featured.description}</p>
                      {featured.metrics && featured.metrics.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {featured.metrics.map((m, idx) => (
                            <div key={idx} className="tile-glass glass-card p-4 rounded-lg"><div className="text-3xl font-bold gradient-text mb-1">{m.value}</div><div className="text-gray-700 dark:text-gray-200">{m.label}</div></div>
                          ))}
                        </div>
                      ) : null}
                      {featured.tags && featured.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {featured.tags.map((t, idx) => (
                            <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </GlassSurface>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {others.map((item, i) => (
                    <GlassSurface
                      key={item.id}
                      className="rounded-xl overflow-hidden glass-card transition-all duration-300 cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={(i + 1) * 100}
                    >
                      <div
                        className="p-6"
                        role="button"
                        tabIndex={0}
                        onClick={() => setFeaturedLead(item.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFeaturedLead(item.id); }}
                      >
                        <div className="flex items-center mb-4"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div>{item.period ? (<span className="ml-4 text-gray-500 dark:text-gray-400">{item.period}</span>) : null}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                        {item.metrics && item.metrics.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            {item.metrics.map((m, idx) => (
                              <div key={idx}><div className="text-xl font-bold gradient-text">{m.value}</div><div className="text-sm text-gray-500">{m.label}</div></div>
                            ))}
                          </div>
                        ) : null}
                        {item.tags && item.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </GlassSurface>
                  ))}
                </div>
              </>
            );
          })()}
          
        </div>
      </section>

      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="code" className="text-blue-500 mr-2"></i>Programming</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Golang</span><span>90%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Python</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>C/C++</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="cpu" className="text-purple-500 mr-2"></i>AI/ML</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>TensorFlow</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>OpenCV</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Scikit-learn</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="database" className="text-green-500 mr-2"></i>Web & Data</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Next.js</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Supabase</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Pandas</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="400">
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

      <section id="social" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Social Work & Outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface className="rounded-xl overflow-hidden glass-card transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">Volunteer</div><span className="ml-4 text-gray-500 dark:text-gray-400">2020-2022</span></div>
                <h3 className="text-xl font-bold mb-2">Cybercrime Awareness with CRY</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Educated 1000+ students across 20+ schools in 7 cities about online safety and cybercrime prevention.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Education</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Public Speaking</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Community Service</span></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden glass-card transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
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
              <GlassSurface className="rounded-xl p-8 glass-card">
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
              <a href="#accolades" className="hover:text-white focus:ring-2 focus:ring-white">Accolades</a>
              <a href="#research" className="hover:text-white focus:ring-2 focus:ring-white">Research</a>
              <a href="#experience" className="hover:text-white focus:ring-2 focus:ring-white">Experience</a>
              <a href="#leadership" className="hover:text-white focus:ring-2 focus:ring-white">Leadership</a>
              <a href="#skills" className="hover:text-white focus:ring-2 focus:ring-white">Skills</a>
              <a href="#social" className="hover:text-white focus:ring-2 focus:ring-white">Social Work</a>
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
