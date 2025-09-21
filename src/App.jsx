import { useEffect, useState, useRef } from 'react'
const profileImg = new URL('./assets/amankhilani.jpg', import.meta.url).href
const kuStarImg = new URL('./assets/ku-star.jpg', import.meta.url).href
const driverGazeImg = new URL('./assets/driver-gaze.png', import.meta.url).href
const surgeLidarImg = new URL('./assets/surge-lidar.jpg', import.meta.url).href
const roboticsRoverImg = new URL('./assets/robotics-rover.webp', import.meta.url).href
const atlassianImg = new URL('./assets/atlassian.png', import.meta.url).href
const antaragniImg = new URL('./assets/antaragni.jpg', import.meta.url).href
const interIitImg = new URL('./assets/inter-iit.jpg', import.meta.url).href
const filmClubImg = new URL('./assets/film-club.jpg', import.meta.url).href
const skyaiImg = new URL('./assets/skyai.jpg', import.meta.url).href
import LiquidEtherBackground from './components/LiquidEther.jsx'
import TravelInfiniteScroll from './components/InfiniteScroll.jsx'
import GlassSurface from './components/GlassSurface.jsx'
import MagicBento from './components/MagicBento.jsx'

function App() {
  // Refs for section titles
  const researchTitleRef = useRef(null);
  const experienceTitleRef = useRef(null);

  useEffect(() => {
    // Force dark theme permanently
    document.documentElement.classList.add('dark')

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
    // Track latest intersection ratios for all sections and underline the one covering >50% of viewport
    const sectionRatios = new Map()
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id || ''
        if (!id) return
        sectionRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
      })
      let bestId = ''
      let bestRatio = 0
      sections.forEach((s) => {
        const r = sectionRatios.get(s.id) || 0
        if (r > bestRatio) { bestRatio = r; bestId = s.id }
      })
      if (!bestId || bestRatio < 0.5) return
      navLinks.forEach((link) => {
        link.classList.remove('active-nav')
        if (link.getAttribute('href') === `#${bestId}`) link.classList.add('active-nav')
      })
    }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) })
    sections.forEach((s) => sectionIO.observe(s))

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
      mobileMenuButton?.removeEventListener('click', toggleMenu)
      document.removeEventListener('click', handleAnchorClick)
      try { sectionIO.disconnect() } catch (_) { /* noop */ }
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
            <div className="nav-desktop items-center space-x-8" style={{ display: 'flex' }}>
              <a href="#home" className="nav-link active-nav">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#accolades" className="nav-link">Accolades</a>
              <a href="#research" className="nav-link">Research</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#leadership" className="nav-link">Leadership</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#travel" className="nav-link">Travel</a>
              <a href="#social" className="nav-link">Social Work</a>
              <a href="#contact" className="nav-link">Contact</a>
              {/* <button id="theme-toggle" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-blue-500">
                <i data-feather="moon" className="hidden dark:block"></i>
                <i data-feather="sun" className="dark:hidden"></i>
              </button> */}
      </div>
            <div className="nav-mobile flex items-center" style={{ display: 'none' }}>
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
            <a href="#travel" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Travel</a>
            <a href="#social" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Social Work</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
            {/* <button id="theme-toggle-mobile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500">Toggle Theme</button> */}
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
                <div className="border-l-4 border-blue-500 pl-6 py-2">
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
          <h2 ref={researchTitleRef} className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Research & Technical Experience</h2>

          {(() => {
            const researchItems = [
              {
                id: 'ku-star',
                title: 'KU-STAR Program, Kyoto University, Japan',
                label: 'Research Internship',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: 'Summer 2024',
                description:
                  "Worked on Physics-Informed Neural Networks under the supervision of Prof. Manabu Kano, Informatics Lab, Kyoto University",
                bullets: [
                  'Developed novel approaches to complex engineering problems using Physics-Informed Neural Networks',
                  'Successfully demonstrated the superiority of PINNs in terms of accuracy, computational cost, and scalability',
                  'Presented the findings at the university symposium, during the internship'
                ],
                tags: ['Machine Learning', 'Data Analysis', 'Research', 'Physics-Informed Neural Networks'],
                image: kuStarImg,
                imageAlt: 'KU-STAR Research',
                githubUrl: 'https://github.com/doomsday4/PINN-for-CSTR.git'
              },
              {
                id: 'driver-gaze',
                title: 'Driver Gaze Detection in Static & Moving Vehicles',
                label: 'Academic Project',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: 'Jan 2024 - Apr 2024',
                description:
                  'Analyzing driver gaze patterns to enhance vehicle safety, driver fatigue detection systems & human-computer interaction interfaces',
                bullets: [
                  'Utilized the Pupil Invisible Eye tracker device to monitor eye movements and installed cameras to track head positions of drivers',
                  'Conducted field tests with 11 participants, collecting data, to evaluate the performance & reliability of the hardware systems',
                  'Implemented iris region detection and positional tracking during gaze transitions using cv2, pupil-detectors, argparse, numpy',
                ],
                tags: ['Computer Vision', 'Human-Computer Interaction', 'Driver Gaze Detection', 'Vehicle Safety'],
                image: driverGazeImg,
                imageAlt: 'Driver Gaze Detection',
                githubUrl: 'https://github.com/doomsday4/Driver-Gaze-Analysis.git'
              },
              {
                id: 'surge-lidar',
                title: '3D Object Detection for Autonomous Vehicles using LiDAR',
                label: 'Research Project',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: 'May 2023 - Jul 2023',
                description: 'Worked on LiDAR based data processing, analysis and object-detection at IIT Kanpur during the SURGE Research program.',
                bullets: [
                  'Developed a LiDAR-based 3D object detection system for autonomous vehicles, using Open3D, PyTorch and LiDAR data',
                  'Implemented point cloud segmentation and clustering algorithms to identify objects in the Indian environment',
                  'Evaluated the performance of the system using metrics such as precision, recall, and F1 score',
                ],
                tags: ['Computer Vision', 'LiDAR', 'Object Detection', 'Autonomous Vehicles'],
                image: surgeLidarImg,
                imageAlt: 'SURGE LiDAR Research',
                githubUrl: 'https://github.com/doomsday4/surge-2023.git'
              },
              {
                id: 'robotics-rover',
                title: 'Rover Base',
                label: 'Robotics Club Summer Project',
                labelClasses: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
                period: 'May 2022 - Jul 2022',
                description: 'Designed the structure of an autonomous rover, using Fusion 360 and implemented the software using Arduino.',
                bullets: [
                  'Studied & analyzed the design and structural components of the Stanford and Monash rovers to create a hybrid of them',
                  'Implemented the software using Arduino IDE and successfully simulated the rover’s autonomous navigation and obstacle avoidance capabilities',
                  'Enhanced the rover’s mobility features & rugged terrain handling capabilities, to improve performance on diverse terrains',
                ],
                tags: ['Fusion 360', 'Arduino', 'Autonomous Vehicles', 'Robotics'],
                image: roboticsRoverImg,
                imageAlt: 'Robotics Club Rover Base'
              }
            ];

            const [featuredId, setFeaturedId] = useState(researchItems[0].id);
            const featured = researchItems.find(i => i.id === featuredId) || researchItems[0];
            const others = researchItems.filter(i => i.id !== featured.id);

            const handleSelect = (id) => {
              setFeaturedId(id);
              // Scroll to research section title
              setTimeout(() => {
                researchTitleRef.current?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
              }, 100);
            };

            return (
              <>
                <GlassSurface className="rounded-xl overflow-hidden mb-12 glass-card" data-aos="fade-up">
                  <div className="md:flex">
                    {featured.id !== 'robotics-rover' ? (
                      <div className="md:w-1/3 flex items-center justify-center">
                        <span className="image-frame">
                          <img
                            src={featured.image}
                            alt={featured.imageAlt}
                            className={featured.id === 'ku-star' ? 'max-w-full h-auto object-contain' : 'w-full h-full object-cover'}
                          />
                        </span>
                    </div>
                    ) : null}
                    <div className={featured.id !== 'robotics-rover' ? 'p-8 md:w-2/3' : 'p-8 md:w-full'}>
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
                        <ul className="list-disc list-inside space-y-2 mb-6">
                          {featured.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                      {featured.tags && featured.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {featured.tags.map((t, idx) => (
                            <span key={idx} className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">{t}</span>
                          ))}
                        </div>
                      ) : null}
                      {(featured.youtubeUrl || featured.websiteUrl || featured.githubUrl) ? (
                        <div className="flex gap-3 mt-2 mb-4">
                          {featured.youtubeUrl ? (
                            <a href={featured.youtubeUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">YouTube</a>
                          ) : null}
                          {featured.websiteUrl ? (
                            <a href={featured.websiteUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">Website</a>
                          ) : null}
                          {featured.githubUrl ? (
                            <a href={featured.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">GitHub</a>
                          ) : null}
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
                        onClick={() => handleSelect(item.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(item.id); }}
                      >
                        <div className="flex items-center mb-2"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div></div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200/90 dark:text-gray-200">{item.description}</p>
                        {item.githubUrl ? (
                          <div className="mt-3"><a href={item.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">GitHub</a></div>
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

      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={experienceTitleRef} className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Work Experience</h2>
          {(() => {
            const experienceItems = [
              {
                id: 'atlassian',
                company: 'Atlassian',
                label: 'Software Engineering Intern',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: 'Summer 2025',
                description: "Worked on core infrastructure development for one of the world's leading software companies.",
                bullets: [
                  'Achieved a 3x improvement in test throughput by eliminating blocking using asynchronous goroutine cache handlers',
                  'Integrated WPR as an additional mocking backend within Criterion, enabling multi-threaded Golang proxy service',
                  'Replaced in-memory caching with disk-based file caching, improving stability & reducing runtime memory footprint'
                ],
                tags: ['Golang', 'Docker', 'AWS', 'Testing', 'Performance Optimization'],
                image: atlassianImg,
                imageAlt: 'Atlassian'
              },
              {
                id: 'skyai',
                company: 'SkyAI',
                label: 'AI Intern',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: 'April 2025 - May 2025',
                description: 'Developed drone tracking algorithms using computer vision and machine learning techniques.',
                bullets: [
                  'Integrated object tracking algorithms (CSRT) to detect and follow targets in drone video streams',
                  'Calculated 3D coordinates using pinhole camera models, leveraging real-time drone altitude and rotation matrices',
                  'Achieved accurate real-time estimation of world coordinates (X, Y, Z) of targets on the ground'
                ],
                tags: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Machine Learning', 'Drones'],
                image: skyaiImg,
                imageAlt: 'SkyAI',
                githubUrl: 'https://github.com/skyai-dev/Tracking-code-comrado.git'
              },
              {
                id: 'vibinex',
                company: 'Vibinex',
                label: 'Software Engineer Intern',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: 'Summer 2023',
                description: 'Contributed to full-stack development of productivity tools for users.',
                bullets: [
                  'Transferred the entire codebase from JavaScript to a TypeScript based project using the extension tool Plasmo',
                  'Analyzed over 10,000 user interactions, leading to 15% increase in conversion rates & user engagement',
                  'Accelerated feature implementations by 40%, resulting in faster development & reducing time-to-market',
                ],
                tags: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Plasmo', 'Extension Development'],
                image: 'http://static.photos/office/640x360/7',
                imageAlt: 'Vibinex',
                githubUrl: 'https://github.com/doomsday4/chrome-extension-Vibinex.git'
              }
            ];

            const [featuredExp, setFeaturedExp] = useState(experienceItems[0].id);
            const featured = experienceItems.find(i => i.id === featuredExp) || experienceItems[0];
            const others = experienceItems.filter(i => i.id !== featured.id);

            const handleExpSelect = (id) => {
              setFeaturedExp(id);
              // Scroll to experience section title
              setTimeout(() => {
                experienceTitleRef.current?.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
              }, 100);
            };

            return (
              <>
                <GlassSurface className="rounded-xl overflow-hidden mb-12 glass-card" data-aos="fade-up">
                  <div className="md:flex">
                    {featured.id !== 'atlassian' && featured.id !== 'skyai' && featured.id !== 'vibinex' ? (
                      <div className="md:w-1/4 flex items-center justify-center p-8">
                      {featured.image ? (
                          <span className="image-frame">
                        <img src={featured.image} alt={featured.imageAlt} className="w-full max-w-[200px]" />
                          </span>
                      ) : null}
                    </div>
                    ) : null}
                    <div className={featured.id !== 'atlassian' && featured.id !== 'skyai' && featured.id !== 'vibinex' ? 'p-8 md:w-3/4' : 'p-8 md:w-full'}>
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
                        <ul className="list-disc list-inside space-y-2 mb-6">
                          {featured.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
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
                      {(featured.youtubeUrl || featured.websiteUrl) ? (
                        <div className="flex gap-3 mt-2 mb-4">
                          {featured.youtubeUrl ? (
                            <a href={featured.youtubeUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">YouTube</a>
                          ) : null}
                          {featured.websiteUrl ? (
                            <a href={featured.websiteUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">Website</a>
                          ) : null}
                        </div>
                      ) : null}
                      {featured.githubUrl ? (
                        <div className="flex gap-3 mt-2 mb-4">
                          <a href={featured.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">GitHub</a>
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
                        onClick={() => handleExpSelect(item.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleExpSelect(item.id); }}
                      >
                        <div className="flex items-center mb-2"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div></div>
                        <h3 className="text-xl font-bold mb-2">{item.company}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                        {item.githubUrl ? (
                          <div className="mt-3"><a href={item.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">GitHub</a></div>
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
                title: 'Inter IIT Cultural Meet 7.0',
                label: 'Contingent Leader',
                labelClasses: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                period: '2022-2023',
                description: "Led IIT Kanpur's contingent of 250+ members at the Inter IIT Cultural Meet 7.0 and secured and overall 4th position from among 23 IITs.",
                image: interIitImg,
                imageAlt: 'Inter IIT',
                metrics: [
                  { value: '250+', label: 'Team Members' },
                  { value: '15', label: 'Medals Won' }
                ],
                tags: ['Leadership', 'Event Management', 'Team Building', 'Inter IIT Cultural Meet']
              },
              {
                id: 'antaragni',
                title: "Antaragni '24",
                label: 'Head, Media & Publicity',
                labelClasses: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
                period: '2024-2025',
                description: "Led a 120+ member team for one of the largest college cultural festivals in Asia with INR 2 Cr budget.",
                image: antaragniImg,
                imageAlt: 'Antaragni',
                metrics: [
                  { value: '1.5M+', label: 'Reach' },
                  { value: '120+', label: 'Team Size' }
                ],
                  tags: ['Marketing', 'Branding', 'Social Media', 'Event Management', 'Team Building'],
                  websiteUrl: 'https://antaragni.in/'
              },
              {
                id: 'film-club',
                title: 'Film Club, IIT Kanpur',
                label: 'Coordinator',
                labelClasses: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
                period: '2023-2024',
                  description: 'Led film production initiatives, winning Inter IIT medals and reaching 8K+ viewership on our YouTube channel.',
                image: filmClubImg,
                imageAlt: 'Film Club',
                metrics: [
                  { value: '8K+', label: 'Viewership' },
                  { value: '4', label: 'Awards' }
                ],
                  tags: ['Film Production', 'Storytelling', 'Creative Direction', 'Inter IIT Cultural Meet'],
                  youtubeUrl: 'https://www.youtube.com/c/filmclubiitkanpur'
              }
            ];

            // single-row layout; no featured selection

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {leadershipItems.map((item, i) => (
                    <GlassSurface
                      key={item.id}
                      className="rounded-xl overflow-hidden glass-card"
                      data-aos="fade-up"
                      data-aos-delay={(i + 1) * 100}
                    >
                      <div>
                        <div className="w-full flex items-center justify-center p-6">
                          <span className="image-frame inline-block">
                            <img src={item.image} alt={item.imageAlt} className="max-w-full h-auto object-contain" />
                          </span>
                        </div>
                        <div className="p-8">
                        <div className="flex items-center mb-4"><div className={`${item.labelClasses} px-3 py-1 rounded-full text-sm font-medium`}>{item.label}</div>{item.period ? (<span className="ml-4 text-gray-500 dark:text-gray-400">{item.period}</span>) : null}</div>
                          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                        {item.metrics && item.metrics.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {item.metrics.map((m, idx) => (
                                <div key={idx} className="tile-glass glass-card p-4 rounded-lg"><div className="text-3xl font-bold gradient-text mb-1">{m.value}</div><div className="text-gray-700 dark:text-gray-200">{m.label}</div></div>
                            ))}
                          </div>
                        ) : null}
                          {/* tags intentionally hidden on leadership cards */}
                          {(item.youtubeUrl || item.websiteUrl) ? (
                            <div className="flex gap-3 mt-2 mb-2">
                              {item.youtubeUrl ? (
                                <a href={item.youtubeUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">YouTube</a>
                              ) : null}
                              {item.websiteUrl ? (
                                <a href={item.websiteUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 dark:text-blue-400">Website</a>
                              ) : null}
                          </div>
                        ) : null}
                        </div>
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
                <div><div className="flex justify-between mb-1"><span>Golang</span><span>65%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Python</span><span>85%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>C/C++</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="cpu" className="text-purple-500 mr-2"></i>AI/ML</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>TensorFlow</span><span>60%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>OpenCV</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Scikit-learn</span><span>65%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="database" className="text-green-500 mr-2"></i>Web & Data</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Next.js</span><span>60%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Supabase</span><span>70%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Pandas</span><span>75%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl p-6 glass-card" data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-xl font-bold mb-4 flex items-center"><i data-feather="tool" className="text-yellow-500 mr-2"></i>DevOps</h3>
              <div className="space-y-3">
                <div><div className="flex justify-between mb-1"><span>Docker</span><span>80%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>Kubernetes</span><span>40%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div></div></div>
                <div><div className="flex justify-between mb-1"><span>AWS</span><span>50%</span></div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div></div></div>
              </div>
            </GlassSurface>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-10" data-aos="fade-up" data-aos-delay="500">
            Always learning, iterating, and building—one day at a time.
          </p>
        </div>
      </section>

      <section id="travel" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Travel & Photography</h2>
          <div className="w-full">
            <TravelInfiniteScroll />
          </div>
        </div>
      </section>

      <section id="social" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Social Work & Outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassSurface className="rounded-xl overflow-hidden glass-card transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">Initiative Lead</div><span className="ml-4 text-gray-500 dark:text-gray-400">2023-2024</span></div>
                <h3 className="text-xl font-bold mb-2">Cybercrime Awareness with CRY</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Educated 1000+ students across 20+ schools in 7 cities about online safety and cybercrime prevention.</p>
                <div className="flex flex-wrap gap-2"><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Education</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Public Speaking</span><span className="chip-glass px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-100">Community Service</span></div>
              </div>
            </GlassSurface>
            <GlassSurface className="rounded-xl overflow-hidden glass-card transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4"><div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text sm font-medium">Initiative Lead</div><span className="ml-4 text-gray-500 dark:text-gray-400">2024</span></div>
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
          <div className="grid grid-cols-1 gap-12 place-items-center">
            <div data-aos="fade-right" className="text-center">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Feel free to reach out for collaborations, opportunities and if possible, NOT just to say hello haha! </p>
              <div className="space-y-6">
                <a href="mailto:amankhilani.ajmer@gmail.com" className="inline-flex items-center gap-3 px-4 py-3 chip-glass rounded-full focus:ring-2 focus:ring-blue-500" aria-label="Email">
                  <i data-feather="mail" className="text-blue-500 dark:text-blue-400"></i>
                  <span className="font-medium">Email</span>
                </a>
              </div>
              <div className="mt-8">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://www.linkedin.com/in/aman-khilani" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400" aria-label="LinkedIn"><i data-feather="linkedin"></i></a>
                  <a href="https://github.com/doomsday4" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400" aria-label="GitHub"><i data-feather="github"></i></a>
                  <a href="https://instagram.com/main.ak56" target="_blank" className="p-3 chip-glass rounded-full transition-colors focus:ring-2 focus:ring-cyan-400" aria-label="Instagram"><i data-feather="instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            
        <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left"><p>© 2025 Aman Khilani. All rights reserved.</p></div>
      </div>
      </footer>
    </>
  )
}

export default App
