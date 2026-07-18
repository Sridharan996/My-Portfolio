import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Copy, Check, X, Play, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heroImage from '../assets/hero.png';
import brandLogo from '../assets/logo.png';

interface Project {
  id: number;
  title: string;
  category: string;
  src: string;
  role: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Car Delivery Glimpse",
    category: "Commercial / Automotive",
    src: "/works/Car Delivery Glimpse.mp4",
    role: "Lead Editor & Sound Designer",
    description: "High-end commercial automotive promo featuring dynamic editing rhythms and sharp transitions."
  },
  {
    id: 2,
    title: "Echoes of Orlia",
    category: "Narrative / Short Film",
    src: "/works/Echoes of Orlia.mp4",
    role: "Lead Video Editor & Colorist",
    description: "A narrative dramatic edit focusing on pacing, visual storytelling, and rich color grading."
  },
  {
    id: 3,
    title: "Naval Decors II",
    category: "Corporate Showcase",
    src: "/works/Naval Decors 2.mp4",
    role: "Lead Editor",
    description: "An elegant corporate documentary-style showcase combining interviews with polished B-roll."
  },
  {
    id: 4,
    title: "KMP Final Glimpse",
    category: "Promo / Reel",
    src: "/works/kmp final glimpse.mp4",
    role: "VFX Editor & Sound Mixing",
    description: "High-retention promo showcase highlighting modern visual pacing and audio enhancement."
  },
  {
    id: 5,
    title: "BTS of Hackfest 2k26",
    category: "Behind The Scenes",
    src: "/works/BTS of Hackfest 2k26 works.mp4",
    role: "Lead Editor & Sound Designer",
    description: "Energetic behind-the-scenes showcase highlighting the creative buzz and quick editing pacing."
  },
  {
    id: 6,
    title: "Hackfest Event Showcase",
    category: "Event Promo",
    src: "/works/Hackfest event.mp4",
    role: "Lead Video Editor",
    description: "Official event showcase film compiling high-energy highlights, synced music beats, and cinematic grades."
  },
  {
    id: 7,
    title: "Pongal Festival Celebration",
    category: "Cultural / Creative",
    src: "/works/pongal.mp4",
    role: "Editor & Colorist",
    description: "Cinematic montage documenting traditional festival details, warm grading, and fast-paced visual storytelling."
  },
  {
    id: 8,
    title: "Production Showcase 0913",
    category: "Commercial / Motion",
    src: "/works/0913.mp4",
    role: "Lead Editor & Sound Designer",
    description: "Creative commercial project focus combining detailed edits and custom audio soundscapes."
  },
  {
    id: 9,
    title: "YouTube Production Showcase",
    category: "Creative Content",
    src: "/works/a.youtube video.mp4",
    role: "Lead Video Editor & Colorist",
    description: "A high-retention YouTube format edit built with detailed narrative pacing, sound mixing, and creative pacing."
  }
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(600);

  const cardRef = useRef<HTMLButtonElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('sridharank2345@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  const isNearVisible = (idx: number) => {
    const diff = Math.min(
      Math.abs(idx - currentIndex),
      projects.length - Math.abs(idx - currentIndex)
    );
    return diff <= 2;
  };

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Autoplay intervals slide step
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, projects.length]);

  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000); // Resume autoplay after 4 seconds of inactivity
  };

  const scrollPrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    resetAutoplayTimer();
  };

  const scrollNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    resetAutoplayTimer();
  };

  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white relative">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-6 md:px-16 lg:px-24"
      >
        <div className="font-semibold tracking-tight text-[14px] sm:text-[15px] uppercase w-auto sm:w-72">
          SRIDHARAN
        </div>
        
        <nav className="flex items-center gap-6 sm:gap-8 font-semibold tracking-tight text-[14px] sm:text-[15px] uppercase">
          <a href="#work" className="hover:opacity-70 transition-opacity">WORK</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">ABOUT</a>
        </nav>

        <div className="hidden sm:flex w-72 justify-end">
          <button 
            onClick={handleCopy}
            className="bg-black hover:bg-gray-800 text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-[13px] font-semibold tracking-wide transition-all cursor-pointer min-w-[220px] justify-center"
          >
            {copied ? 'COPIED!' : 'SRIDHARANK2345@GMAIL.COM'}
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 pt-16 md:pt-24 pb-24 flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12 lg:gap-20">
        
        {/* Left Column - Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-auto flex justify-center shrink-0"
        >
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden bg-[#EDEDE9] relative shrink-0">
            <img 
              src={heroImage} 
              alt="Zenvis Profile" 
              className="w-full h-full object-cover grayscale contrast-125 object-[center_top]"
            />
          </div>
        </motion.div>

        {/* Right Column - Text */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:max-w-xl flex flex-col justify-center"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.05] tracking-[-0.04em] font-medium text-[#111111]">
            Video Editor &<br />
            Motion Designer
          </h1>

          <div className="flex items-center gap-2 mt-4 text-zinc-500 font-semibold tracking-wide uppercase text-sm">
            <span>FOUNDER OF</span>
            <img src={brandLogo} alt="Zenvis.ed Logo" className="w-5 h-5 object-contain" />
            <span className="text-black font-bold">ZENVIS.ED</span>
          </div>
          
          <div className="mt-8 space-y-4 text-base md:text-[17px] leading-relaxed text-gray-700 font-medium max-w-md">
            <p>
              Crafting narrative rhythm, visual style, and emotional impact. I collaborate with brands and creators to build high-end commercial campaigns and short films.
            </p>
            <p>
              Specialized in offline/online editing, detailed color grading, and dynamic audio sound design.
            </p>
          </div>

          {/* Mobile Email Copy Button */}
          <div className="sm:hidden mt-8 flex justify-start w-full">
            <button 
              onClick={handleCopy}
              className="bg-black hover:bg-gray-800 text-white rounded-full px-5 py-3 flex items-center gap-2.5 text-[13px] font-semibold tracking-wide transition-all cursor-pointer w-full max-w-[280px] justify-center"
            >
              {copied ? 'COPIED!' : 'SRIDHARANK2345@GMAIL.COM'}
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

      </main>

      {/* Featured Work Section */}
      <motion.section 
        id="work"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full py-24 flex flex-col overflow-hidden bg-white"
      >
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 w-full mb-12 flex justify-center items-center z-10">
          <h2 className="text-4xl md:text-[5rem] font-medium tracking-tight text-[#111111] text-center">
            Featured Work
          </h2>
        </div>
        
        {/* Horizontal Scroll Marquee */}
        <div className="relative w-full py-8 overflow-hidden group">
          {/* Left Navigation Arrow */}
          <button 
            onClick={scrollPrev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-2 md:p-3.5 rounded-full shadow-md md:shadow-lg border border-zinc-200 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={scrollNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black p-2 md:p-3.5 rounded-full shadow-md md:shadow-lg border border-zinc-200 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <motion.div 
            animate={{ x: -currentIndex * (cardWidth + 32) }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-8 w-max px-8 md:px-16 lg:px-24 will-change-transform"
          >
            {projects.map((project, idx) => (
              <button 
                ref={idx === 0 ? cardRef : null}
                key={`project-${project.id}-${idx}`} 
                onClick={() => setSelectedProject(project)}
                className="w-[300px] md:w-[450px] lg:w-[600px] aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 flex-shrink-0 relative shadow-xl cursor-pointer group/card border-0 p-0 text-left outline-none block will-change-transform"
              >
                <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white text-black p-4 rounded-full shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                {isNearVisible(idx) ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700"
                  >
                    <source src={project.src} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                    <img src={brandLogo} className="w-12 h-12 opacity-5 object-contain" alt="Loading" />
                  </div>
                )}
                <div className="absolute bottom-6 left-8 right-8 z-10 text-white transform translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 pointer-events-none">
                  <span className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">{project.category}</span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1 tracking-tight">{project.title}</h3>
                </div>
                <div className="absolute inset-0 bg-black/5 pointer-events-none transition-colors duration-700 group-hover/card:bg-transparent" />
              </button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Project Statistics Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 py-24 border-t border-gray-100"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "5M+", label: "Combined Views" },
            { value: "150+", label: "Videos Delivered" },
            { value: "5+ Years", label: "Industry Experience" },
            { value: "98%", label: "Client Satisfaction" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] mb-2 transition-transform duration-300 group-hover:scale-105 block origin-left">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-20 pt-32 pb-24 border-t border-gray-100 mt-16"
      >
        <h2 className="text-6xl md:text-[5rem] font-medium tracking-tight mb-20 text-[#111111]">
          About
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="w-full md:w-[45%] pr-4">
            <p className="text-3xl md:text-[2.25rem] font-medium leading-[1.3] text-[#111111] tracking-tight">
              Bringing storytelling to life through professional editing and cinematic visuals.
            </p>
          </div>
          <div className="w-full md:w-[55%] text-lg md:text-[1.125rem] text-gray-700 font-medium leading-relaxed pt-2 max-w-2xl">
            <p>
              My name is Sridharan, and I'm a professional Video Editor and Motion Designer. Over the past decade, I've developed a sharp eye for pacing, visual continuity, and creative transitions. I specialize in taking raw footage and weaving it into structured, high-retention stories that engage audiences. Working across DaVinci Resolve, Premiere Pro, and After Effects, I ensure every frame, cut, and audio beat is polished to perfection.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-8 md:px-16 lg:px-20 pt-16 pb-12 flex flex-col items-center"
      >
        <h2 className="text-4xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-medium tracking-tight mb-16 text-center leading-[1.05] text-[#111111]">
          Let's get to know<br />each other
        </h2>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-40 w-full max-w-4xl px-4">
          <a 
            href="mailto:sridharank2345@gmail.com"
            className="bg-black hover:bg-white text-white hover:text-black border border-black rounded-full px-7 py-3.5 flex items-center gap-3 text-[14px] font-semibold tracking-wide transition-all duration-300 cursor-pointer min-w-[240px] justify-center no-underline"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.356 1.478-2.194 2.632-1.484L12 10.154l9.368-6.18C22.522 3.263 24 4.101 24 5.457z"/>
            </svg>
            GMAIL
          </a>

          <a 
            href="https://wa.me/919963966642"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-white text-white hover:text-black border border-black rounded-full px-7 py-3.5 flex items-center gap-3 text-[14px] font-semibold tracking-wide transition-all duration-300 cursor-pointer min-w-[240px] justify-center no-underline"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.954-4.41 9.957-9.829.002-2.624-1.013-5.093-2.859-6.941C16.518 1.988 14.07 1.948 12.01 1.948c-5.49 0-9.957 4.411-9.96 9.831-.001 1.924.547 3.791 1.587 5.421l-1.01 3.687 3.83-1.004zM16.821 14c-.267-.134-1.58-.78-1.822-.867-.243-.088-.419-.133-.596.134-.176.265-.681.867-.835 1.047-.155.177-.309.2-.576.066-.267-.134-1.127-.417-2.148-1.327-.795-.71-1.332-1.588-1.488-1.854-.156-.265-.017-.409.117-.541.12-.12.267-.31.4-.464.133-.156.177-.265.267-.442.089-.176.044-.332-.022-.464-.066-.134-.596-1.436-.816-1.971-.215-.518-.432-.447-.597-.456-.153-.008-.33-.01-.508-.01s-.466.066-.708.332c-.243.265-.929.907-.929 2.21 0 1.302.947 2.561 1.079 2.738.133.177 1.863 2.845 4.512 3.993.63.272 1.122.434 1.507.556.633.201 1.209.173 1.664.105.508-.076 1.58-.646 1.802-1.238.221-.593.221-1.102.155-1.21-.066-.109-.243-.177-.51-.311z"/>
            </svg>
            WHATSAPP
          </a>

          <a 
            href="https://instagram.com/zenvis.ed"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-white text-white hover:text-black border border-black rounded-full px-7 py-3.5 flex items-center gap-3 text-[14px] font-semibold tracking-wide transition-all duration-300 cursor-pointer min-w-[240px] justify-center no-underline"
          >
            <Instagram className="w-[18px] h-[18px]" />
            @ZENVIS.ED
          </a>
        </div>
      </motion.footer>

      {/* Cinema Lightbox / Selection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />

            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-zinc-950/90 border border-zinc-800/80 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row text-white z-10 max-h-[90vh] md:max-h-none"
            >
              {/* Close button inside modal */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 text-zinc-400 hover:text-white transition-colors bg-zinc-900/80 hover:bg-zinc-800/80 p-2.5 rounded-full border border-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Box */}
              <div className="w-full md:w-[62%] aspect-video md:aspect-[16/10] bg-black flex items-center justify-center relative border-b md:border-b-0 md:border-r border-zinc-800/80">
                <video 
                  src={selectedProject.src} 
                  controls 
                  controlsList="nodownload"
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Information Panel */}
              <div className="w-full md:w-[38%] p-8 flex flex-col justify-between overflow-y-auto min-h-[300px] md:min-h-0 bg-zinc-900/20">
                <div className="pr-8">
                  <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">
                        Role
                      </span>
                      <p className="text-sm text-zinc-300 font-medium">
                        {selectedProject.role}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">
                        Project Details
                      </span>
                      <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Zenvis portfolio</span>
                  <span>© 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
