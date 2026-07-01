import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Code, 
  Sparkles, 
  Cpu, 
  Palette, 
  Film, 
  Briefcase, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowUpRight, 
  Check, 
  Inbox, 
  Building, 
  User, 
  Mail, 
  FileText,
  ChevronDown,
  Layers,
  Terminal,
  FileCode,
  Camera,
  Upload
} from 'lucide-react';

// Structure of Wajiha's Portfolio details
interface ServiceGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  tags: string[];
  description: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  gradient: string;
  link?: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  timestamp: string;
}

interface GallerySlide {
  name: string;
  description: string;
  transform: string;
  transformOrigin: string;
}

const GALLERY_DATA: Record<string, GallerySlide[]> = {
  'proj-1': [
    {
      name: "1. Complete Brand Presentation Board",
      description: "The full, master layout board for the Luxury Editorial & Brand Guideline System. It compiles the visual tone, editorial grids, color theory, and identity collateral into a single high-fidelity presentation sheet.",
      transform: "scale(1)",
      transformOrigin: "center center"
    },
    {
      name: "2. Editorial Cover & Title Typography",
      description: "Detail of the custom geometric typography, serif headlines, and minimal layout alignment rules. Notice the precise tracking, leading, and elegant use of editorial white space.",
      transform: "scale(2)",
      transformOrigin: "0% 0%"
    },
    {
      name: "3. Luxury Color Harmony Sheets",
      description: "Close-up of the brand color palette guidelines, specifying exact values for warm champagne gold, rich charcoal grays, and pure matte black accents.",
      transform: "scale(2)",
      transformOrigin: "100% 0%"
    },
    {
      name: "4. Layout Alignment Grid System",
      description: "Visual grid mapping showing how the margins, multi-column divisions, and geometric spacing lock elements in place for a structured, balanced aesthetic.",
      transform: "scale(2)",
      transformOrigin: "0% 100%"
    },
    {
      name: "5. Stationery & Business Card Mockups",
      description: "Close-up of physical brand collaterals, presenting premium textured paper card stocks with realistic gold-leaf embossing and corporate folder layouts.",
      transform: "scale(2)",
      transformOrigin: "100% 100%"
    }
  ],
  'proj-4': [
    {
      name: "1. Full Packaging Presentation Kit",
      description: "The complete visual presentation board for the Froye brand, compiling premium bottle labels, custom product boxes, and artistic physical assets.",
      transform: "scale(1)",
      transformOrigin: "center center"
    },
    {
      name: "2. Premium Glassware Identity Detail",
      description: "Detailed view of the brand identity on the custom glassware mockups, showcasing the minimalist white logo and clean typography contrast.",
      transform: "scale(1.95)",
      transformOrigin: "0% 0%"
    },
    {
      name: "3. Embossed Gold Box Packaging",
      description: "Close-up of the structural layout for the custom product boxes, featuring luxury matte black textures and gold leaf branding guidelines.",
      transform: "scale(1.95)",
      transformOrigin: "100% 0%"
    },
    {
      name: "4. Label Mockup & Core Typography",
      description: "Highlights the central product label layout, showing font hierarchies, spacing ratios, and minimal gold borders.",
      transform: "scale(1.95)",
      transformOrigin: "0% 100%"
    },
    {
      name: "5. Stationery Layout & Texture Context",
      description: "Details of physical brand stationery, including letterheads, custom brand stamps, and modern corporate envelopes.",
      transform: "scale(1.95)",
      transformOrigin: "100% 100%"
    }
  ]
};

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Active navigation tab
  const [activeTab, setActiveTab] = useState('home');

  // Mouse tracking for parallax and 3D depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring configuration for slow, fluid, natural easing
  const springConfig = { damping: 55, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background glow translates slightly
  const bgGlowX = useTransform(smoothX, [-400, 400], [-35, 35]);
  const bgGlowY = useTransform(smoothY, [-400, 400], [-35, 35]);

  const bgGlowXOpposite = useTransform(smoothX, [-400, 400], [35, -35]);
  const bgGlowYOpposite = useTransform(smoothY, [-400, 400], [35, -35]);

  // Main UI components translate gently
  const midX = useTransform(smoothX, [-400, 400], [-12, 12]);
  const midY = useTransform(smoothY, [-400, 400], [-12, 12]);

  // Accent components drift faster / counter-parallax
  const float1X = useTransform(smoothX, [-400, 400], [18, -18]);
  const float1Y = useTransform(smoothY, [-400, 400], [18, -18]);

  const float2X = useTransform(smoothX, [-400, 400], [25, -25]);
  const float2Y = useTransform(smoothY, [-400, 400], [25, -25]);

  const float3X = useTransform(smoothX, [-400, 400], [15, -15]);
  const float3Y = useTransform(smoothY, [-400, 400], [15, -15]);

  // 3D perspective rotational tilt for premium sphere scene and cards
  const rotateX = useTransform(smoothY, [-400, 400], [6, -6]);
  const rotateY = useTransform(smoothX, [-400, 400], [-6, 6]);

  // Handle mouse movement for ambient parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Contact form states
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [selectedService, setSelectedService] = useState('Web & App Development');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local Storage Lead Vault state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showLeadVault, setShowLeadVault] = useState(false);

  // Profile picture upload and state
  const [profileImage, setProfileImage] = useState<string>('/src/assets/images/wajiha_new_avatar_1782818869130.jpg');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('wajiha_portfolio_profile_image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Interactive Project Gallery Lightbox states
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Load existing leads and profile image on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('wajiha_portfolio_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.error('Error parsing saved leads', e);
      }
    }

    const savedImage = localStorage.getItem('wajiha_portfolio_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Handle active navigation highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'showcase', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadMessage) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newLead: Lead = {
        id: 'lead_' + Math.random().toString(36).substr(2, 9),
        name: leadName,
        email: leadEmail,
        company: leadCompany || 'Freelance / Individual',
        service: selectedService,
        message: leadMessage,
        timestamp: new Date().toLocaleString()
      };

      const updatedLeads = [newLead, ...leads];
      setLeads(updatedLeads);
      localStorage.setItem('wajiha_portfolio_leads', JSON.stringify(updatedLeads));

      setIsSubmitting(false);
      setFormSubmitted(true);

      // Reset form fields
      setLeadName('');
      setLeadEmail('');
      setLeadCompany('');
      setLeadMessage('');
    }, 1200);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Wajiha's exact services and tags
  const services: ServiceGroup[] = [
    {
      id: 'web-dev',
      title: 'Web & App Development',
      icon: <Code className="w-5 h-5 text-[#FFC928]" />,
      description: 'Building custom modern, ultra-fast web frameworks and responsive client solutions.',
      tags: ['Next.js', 'Node.js', 'Express.js', 'WordPress']
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions & Automation',
      icon: <Sparkles className="w-5 h-5 text-[#FFC928]" />,
      description: 'Integrating intelligent models, creating custom AI website overlays, and streamlining operation workflows.',
      tags: ['AI Solutions', 'AI Website Development', 'Automation']
    },
    {
      id: 'design',
      title: 'Luxury Graphic Design & Brand Identity',
      icon: <Palette className="w-5 h-5 text-[#FFC928]" />,
      description: 'Establishing elite premium visual languages, custom layout typography, sophisticated color theories, and intuitive high-fidelity brand assets.',
      tags: ['Luxury Brand Identity', 'Graphic Design', 'UI/UX Design']
    },
    {
      id: 'content',
      title: 'Content & Media Creation',
      icon: <Film className="w-5 h-5 text-[#FFC928]" />,
      description: 'Producing high-impact narrative videos, corporate identity assets, and modern content engagement cycles.',
      tags: ['Content Creation', 'Social Media Management', 'Video Editing']
    },
    {
      id: 'leadership',
      title: 'Technical Leadership',
      icon: <Cpu className="w-5 h-5 text-[#FFC928]" />,
      description: 'Directing technical lifecycles, strategic project mapping, and coordinating agile cross-functional teams.',
      tags: ['Technical Leadership', 'Project Management']
    }
  ];

  // Beautiful curated projects representing her focus and experience
  const projects: Project[] = [
    {
      id: 'proj-sourceefy',
      title: 'Sourceefy',
      category: 'B2B Lead Generation & Digital Growth Agency',
      description: 'Designed and developed a modern agency website focused on lead generation, business growth, and delivering a seamless user experience.',
      image: '/src/assets/images/sourceefy_website_mockup_1782810929205.jpg',
      tech: ['Next.js', 'React', 'Node.js', 'Responsive Web Design'],
      gradient: 'from-[#FFC928]/20 to-transparent',
      link: 'https://sourceefy.com/'
    },
    {
      id: 'proj-1',
      title: 'Luxury Editorial & Brand Guideline System',
      category: 'Graphic Design / Luxury Brand Identity',
      description: 'A pristine, premium visual identity system and luxury brand guidelines with custom geometric typography and color theory sheets.',
      image: '/src/assets/images/elan_luxury_brand_1782737143245.jpg',
      tech: ['Graphic Design', 'Typography', 'Brand Identity'],
      gradient: 'from-[#FFC928]/20 to-transparent'
    },
    {
      id: 'proj-2',
      title: 'Sovereign AI Automation Brand Collateral',
      category: 'Graphic Design / Brand Asset Creation',
      description: 'Bespoke marketing assets, corporate vector layouts, and high-fidelity branding mockups for a next-gen automation platform.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
      tech: ['Graphic Design', 'Brand Collateral', 'Vector Illustration'],
      gradient: 'from-amber-500/10 to-transparent'
    },
    {
      id: 'proj-3',
      title: 'UI/UX Design & Web Interface Design',
      category: 'UI/UX Design / Web Design',
      description: 'Designing clean, responsive, and user-friendly website interfaces with intuitive layouts and organized content.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      tech: ['UI Layout Design', 'Responsive Web Design', 'Information Architecture (Basic)'],
      gradient: 'from-yellow-600/15 to-transparent'
    },
    {
      id: 'proj-4',
      title: 'Premium Packaging & Visual Identity Kit',
      category: 'Graphic Design / Packaging & Art Direction',
      description: 'Bespoke high-end custom product packaging and elite physical-digital brand presentation packages with gold leaf branding accents.',
      image: '/src/assets/images/froye_branding_1782806521430.jpg',
      tech: ['Packaging Design', 'Graphic Design', 'Art Direction'],
      gradient: 'from-[#FFC928]/10 to-transparent'
    }
  ];

  return (
    <div className="relative min-h-screen custom-grid-bg text-gray-100 font-sans selection:bg-[#FFC928] selection:text-black overflow-x-hidden">
      
      {/* Background ambient light decorations */}
      <motion.div 
        style={{ x: bgGlowX, y: bgGlowY }}
        className="absolute top-[5%] left-[15%] w-[45vw] h-[45vw] bg-amber-500/[0.025] rounded-full ambient-glow-circle" 
      />
      <motion.div 
        style={{ x: bgGlowXOpposite, y: bgGlowYOpposite }}
        className="absolute top-[35%] right-[5%] w-[55vw] h-[55vw] bg-[#FFC928]/[0.02] rounded-full ambient-glow-circle" 
      />
      <motion.div 
        style={{ x: bgGlowX, y: bgGlowYOpposite }}
        className="absolute bottom-[5%] left-[10%] w-[40vw] h-[40vw] bg-amber-400/[0.02] rounded-full ambient-glow-circle" 
      />

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass-header px-6 md:px-12 py-4 flex justify-between items-center">
        <div 
          onClick={() => scrollToSection('home')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-full bg-[#FFC928] flex items-center justify-center transition-all duration-500 group-hover:rotate-45 group-hover:scale-110">
            <div className="w-3 h-3 bg-black rounded-[2px]" />
          </div>
          <span className="font-poppins font-bold text-lg tracking-tight group-hover:text-[#FFC928] transition-colors">
            Wajiha
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md text-sm font-medium">
          <button
            onClick={() => scrollToSection('home')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'home' 
                ? 'bg-[#FFC928]/10 text-[#FFC928] border border-[#FFC928]/20 font-semibold' 
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'services' 
                ? 'bg-[#FFC928]/10 text-[#FFC928] border border-[#FFC928]/20 font-semibold' 
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('showcase')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'showcase' 
                ? 'bg-[#FFC928]/10 text-[#FFC928] border border-[#FFC928]/20 font-semibold' 
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'about' 
                ? 'bg-[#FFC928]/10 text-[#FFC928] border border-[#FFC928]/20 font-semibold' 
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`px-4 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeTab === 'contact' 
                ? 'bg-[#FFC928]/10 text-[#FFC928] border border-[#FFC928]/20 font-semibold' 
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile menu triggers */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-lg pt-24 px-6 flex flex-col justify-start gap-6"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'showcase', label: 'Projects' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-2xl font-poppins font-semibold border-b border-white/5 pb-4 cursor-pointer ${
                  activeTab === item.id ? 'text-[#FFC928]' : 'text-gray-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative"
      >
        <motion.div 
          style={{ x: midX, y: midY }}
          className="flex-1 text-left z-10 max-w-2xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111]/40 border border-[#FFC928]/15 text-xs text-gray-300 font-medium tracking-wide mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            CTO • Web Development & AI Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-extrabold tracking-tight leading-[1.1] mb-6 text-white"
          >
            Hi, Meet <span className="text-gradient-gold">Wajiha</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl font-medium text-amber-100/90 tracking-wide mb-4"
          >
            Chief Technology Officer (CTO) at <span className="text-white font-semibold">Sourceefy</span>
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base text-gray-400 leading-relaxed mb-8 max-w-xl"
          >
            Building modern websites, scalable web applications, and AI-powered digital solutions with a focus on performance, innovation, and exceptional user experience.
          </motion.p>

          {/* Quick Experience Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            <div className="flex items-start gap-3 p-4 rounded-xl glass-card">
              <Briefcase className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">1+ Year at Sourceefy</h4>
                <p className="text-xs text-gray-400">Leading web development, AI solutions, and digital innovation at Sourceefy.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl glass-card">
              <Clock className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">1+ Year Aviation Experience</h4>
                <p className="text-xs text-gray-400">Empowering global travel through expert aviation operations and Galileo GDS.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button 
              onClick={() => scrollToSection('showcase')}
              className="px-6 py-3 rounded-full font-semibold text-sm bg-[#FFC928] text-black hover:bg-amber-400 shadow-[0_0_20px_rgba(255,201,40,0.15)] hover:shadow-[0_0_30px_rgba(255,201,40,0.35)] transition-all flex items-center gap-2 group hover:scale-105 cursor-pointer"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 rounded-full font-semibold text-sm bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/5 hover:border-white/20 transition-all hover:scale-105 cursor-pointer"
            >
              Discuss Your Project
            </button>
          </motion.div>
        </motion.div>

        {/* High-fidelity 3D-styled floating sphere avatar scene */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[420px] z-10">
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] flex items-center justify-center"
          >
            
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-[#FFC928]/5 rounded-full blur-3xl animate-pulse" />

            {/* Orbiting Ring 1 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-white/5"
            />

            {/* Orbiting Ring 2 */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-12 rounded-full border border-dashed border-[#FFC928]/10"
            />

            {/* Outer Rotating Rim */}
            <div className="absolute inset-0 rounded-full border border-white/5 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              
              {/* Inner Specular Sphere representing Design Work & Tech Mastery */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={handleImageClick}
                className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full relative cursor-pointer group shadow-[0_30px_60px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.05)] overflow-hidden bg-gradient-to-tr from-[#030303] via-[#111111] to-[#201802]"
                title="Click to upload custom picture"
              >
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Wajiha Noor" 
                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Internal Abstract Golden 3D Element (Simulated Vector Mesh) */
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none">
                    <div className="w-[140px] h-[140px] rounded-2xl border-2 border-[#FFC928]/20 rotate-45 animate-[spin_18s_linear_infinite] flex items-center justify-center">
                      <div className="w-[100px] h-[100px] rounded-xl border border-white/15 rotate-12 flex items-center justify-center">
                        <div className="w-[60px] h-[60px] rounded-lg bg-gradient-to-tr from-[#FFC928]/30 to-amber-700/40 blur-[2px] animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Golden Radial overlay for ambient lighting integration */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-amber-500/10 z-1 pointer-events-none" />

                {/* Design Specular Highlight layer */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_50%)] z-10 pointer-events-none" />
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,201,40,0.08)_0%,transparent_60%)] z-10 pointer-events-none" />
                
                {/* Click to Upload Overlay */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 z-20 animate-fade-in">
                  <Camera className="w-5 h-5 text-[#FFC928]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC928]">Upload Photo</span>
                </div>

                {/* Glassmorphism Rim Ring */}
                <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-[#FFC928]/30 transition-colors z-25" />
              </motion.div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />


            </div>

            {/* Floating Element 1 - Web Dev Card */}
            <motion.div 
              style={{ x: float1X, y: float1Y }}
              className="absolute -left-12 top-[20%] p-3.5 rounded-xl glass-card flex items-center gap-2.5 max-w-[155px]"
            >
              <div className="w-7 h-7 rounded bg-[#FFC928]/10 flex items-center justify-center shrink-0">
                <Code className="w-4 h-4 text-[#FFC928]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-medium">Core Stack</p>
                <p className="text-xs font-bold text-white tracking-tight">Next.js • Node</p>
              </div>
            </motion.div>

            {/* Floating Element 2 - AI Solutions Card */}
            <motion.div 
              style={{ x: float2X, y: float2Y }}
              className="absolute -right-8 top-[10%] p-3.5 rounded-xl glass-card flex items-center gap-2.5 max-w-[165px]"
            >
              <div className="w-7 h-7 rounded bg-[#FFC928]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#FFC928]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-medium">AI & Agency</p>
                <p className="text-xs font-bold text-white tracking-tight">AI Automation</p>
              </div>
            </motion.div>

            {/* Floating Element 3 - Branding / Design Card */}
            <motion.div 
              style={{ x: float3X, y: float3Y }}
              className="absolute right-[-4%] bottom-[12%] p-3 rounded-xl glass-card flex items-center gap-2 max-w-[165px]"
            >
              <div className="w-7 h-7 rounded bg-[#FFC928]/10 flex items-center justify-center shrink-0">
                <Palette className="w-4 h-4 text-[#FFC928]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400 font-medium">Artistic Direction</p>
                <p className="text-xs font-bold text-white tracking-tight">Luxury UI/UX</p>
              </div>
            </motion.div>

            {/* Floating Badge (Wajiha name overlay) */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
              className="absolute bottom-6 -left-6 bg-[#FFC928] text-black px-4 py-2 rounded-full font-poppins font-extrabold text-xs tracking-wider uppercase shadow-[0_10px_25px_rgba(255,201,40,0.25)] flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              WAJIHA
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Services / Professional Ecosystem Section */}
      <section id="services" className="py-24 px-6 md:px-12 border-t border-white/5 bg-[#050505]/40 relative overflow-hidden">
        {/* Subtle background glow specific to services */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.012] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#FFC928] uppercase mb-3">Ecosystem & Skills</h2>
            <p className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight mb-4">
              Core Capabilities & Services
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore my core expertise across web development, AI solutions, branding, and digital strategy.
            </p>
          </div>

          {/* Elegant Bento Grid for Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="p-8 rounded-2xl glass-card group flex flex-col justify-between h-full hover:translate-y-[-4px]"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 group-hover:bg-[#FFC928]/10 group-hover:border-[#FFC928]/20 transition-all duration-500">
                    {svc.icon}
                  </div>
                  <h3 className="text-lg font-poppins font-semibold text-white mb-3 group-hover:text-[#FFC928] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {svc.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded bg-white/[0.02] text-gray-300 border border-white/5 hover:border-[#FFC928]/30 hover:bg-[#FFC928]/5 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Extra Bento Card: Chief Technology Officer Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.01] via-white/[0.02] to-[#201802]/10 border border-[#FFC928]/15 hover:border-[#FFC928]/30 md:col-span-2 lg:col-span-1 flex flex-col justify-between min-h-[250px] transition-all duration-500 shadow-lg hover:translate-y-[-4px]"
            >
              <div>
                <div className="inline-block px-2.5 py-1 rounded bg-[#FFC928]/10 border border-[#FFC928]/20 text-[10px] text-[#FFC928] font-bold uppercase tracking-wider mb-4">
                  Strategic Leadership Focus
                </div>
                <h3 className="text-xl font-poppins font-bold text-white mb-3">
                  CTO Strategy & Delivery
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Shaping the technical vision of Sourceefy by leading web development, AI innovation, and scalable digital solutions.
                </p>
              </div>

              <div className="flex items-center gap-3 text-[#FFC928] text-xs font-bold uppercase tracking-wider mt-6 cursor-pointer hover:underline" onClick={() => scrollToSection('contact')}>
                Book an Advisory Consultation <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Graphic Design Showcase & Projects Section */}
      <section id="showcase" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle background glow specific to showcase */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFC928]/[0.01] rounded-full blur-[150px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
          <div className="text-left">
            <h2 className="text-xs font-bold tracking-widest text-[#FFC928] uppercase mb-3">Visual Craft</h2>
            <p className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight">
              Featured Graphic Design & Creative Works
            </p>
          </div>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Designing premium brand identities, marketing creatives, and social media visuals that strengthen brand presence and drive engagement.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden glass-card shadow-xl"
            >
              {/* Overlay Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-t ${proj.gradient} z-10 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

              {/* Dynamic Image Container */}
              <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Filter Top Ring */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-gray-300 font-semibold tracking-wide border border-white/5">
                  {proj.category}
                </div>
              </div>

              {/* Info Container */}
              <div className="p-8 relative z-20">
                <h3 className="text-xl font-poppins font-bold text-white group-hover:text-[#FFC928] transition-colors mb-3">
                  {proj.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-3">
                  {GALLERY_DATA[proj.id] && (
                    <button
                      onClick={() => {
                        setGalleryProject(proj);
                        setActiveSlide(0);
                      }}
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-bold bg-[#FFC928]/10 text-[#FFC928] hover:bg-[#FFC928] hover:text-black border border-[#FFC928]/30 hover:border-transparent transition-all shadow-md cursor-pointer hover:scale-105"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      View Design Layout
                    </button>
                  )}

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold bg-[#FFC928] text-black hover:bg-amber-400 hover:scale-105 transition-all shadow-md"
                    >
                      🌐 View Live Website
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {proj.tech.map((t) => (
                    <span 
                      key={t}
                      className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA inside showcase */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-4">Interested in customized graphic designs or an advanced web solution?</p>
          <button 
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#FFC928] hover:text-white transition-colors group"
          >
            Request Graphic Design Consultation & Mockup
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>
      </section>

      {/* Meet Wajiha & Experience (About) Section */}
      <section id="about" className="py-24 px-6 md:px-12 border-t border-white/5 bg-[#050505]/30 relative overflow-hidden">
        {/* Subtle background glow specific to about */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.01] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Bio Column */}
            <div className="lg:col-span-7 text-left">
              <h2 className="text-xs font-bold tracking-widest text-[#FFC928] uppercase mb-3">Executive Bio</h2>
              <p className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight mb-6">
                Hi, I'm Wajiha Noor.
              </p>

              <div className="space-y-6 text-gray-400 text-sm leading-relaxed font-normal">
                <p>
                  As the <span className="text-white font-semibold">Chief Technology Officer (CTO) at Sourceefy</span>, I lead the company's technical vision by building high-performance websites, scalable web applications, and AI-powered digital solutions. My focus is on creating products that combine modern technology with exceptional user experiences.
                </p>
                <p>
                  With <span className="text-white font-semibold">1+ year at Sourceefy</span> and <span className="text-white font-semibold">1+ year of experience in the aviation industry</span>, I bring a business-focused approach to every project. From web development and AI automation to luxury brand identity and UI/UX design, I help businesses establish a strong digital presence and achieve long-term growth.
                </p>
                <p>
                  I believe great digital products are built through innovation, clean design, technical excellence, and a deep understanding of business needs.
                </p>
              </div>

              {/* Highlight credentials tags */}
              <div className="flex flex-wrap gap-2.5 mt-8">
                <span className="text-xs px-3.5 py-2 rounded-lg bg-white/[0.02] text-[#FFC928] border border-[#FFC928]/20 font-medium shadow-sm">
                  Sourceefy CTO
                </span>
                <span className="text-xs px-3.5 py-2 rounded-lg bg-white/[0.02] text-gray-300 border border-white/5 font-medium shadow-sm">
                  1+ Yr Aviation Industry
                </span>
                <span className="text-xs px-3.5 py-2 rounded-lg bg-white/[0.02] text-gray-300 border border-white/5 font-medium shadow-sm">
                  Agile Project Management
                </span>
              </div>
            </div>

            {/* Experience Detail Column */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC928]/5 rounded-full blur-2xl" />
                
                <h3 className="font-poppins font-bold text-lg text-white mb-6 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#FFC928]" /> Experience Matrix
                </h3>

                <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-[#FFC928]/15">
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-[#FFC928] -left-[8px] top-1.5 border-4 border-[#121212]" />
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#FFC928]">2026 – Present</span>
                    <h4 className="text-sm font-bold text-white">Chief Technology Officer (CTO)</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Sourceefy • Leading web development, AI-powered solutions, and technical strategy to deliver scalable digital products.</p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-[#FFC928]/15">
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-[#FFC928] -left-[8px] top-1.5 border-4 border-[#121212]" />
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">Previous Experience</span>
                    <h4 className="text-sm font-bold text-white">Aviation & Travel Operations</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">Travel & Aviation Industry • Managing airline reservations, Galileo GDS operations, international ticketing, and end-to-end travel solutions.</p>
                  </div>
                </div>

                {/* Simulated Core Expertise Grid */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Target Technologies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> Next.js & React</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> Node.js & Express.js</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> Web & App Development</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> WordPress Development</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> AI-Powered Solutions</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> UI/UX Design</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> Brand Identity Design</div>
                    <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#FFC928]" /> Content & Social Media</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Lead Generation & Contact Section (Main Goal) */}
      <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* Subtle background glow specific to contact */}
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FFC928]/[0.012] rounded-full blur-[150px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Pitch Panel */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-[#FFC928] uppercase mb-3">Let's Connect</h2>
              <p className="text-3xl md:text-4xl font-poppins font-bold text-white tracking-tight mb-6">
                Let's Build Something Extraordinary
              </p>
              <div className="space-y-4 text-gray-400 text-sm leading-relaxed mb-8 font-normal">
                <p>
                  Ready to turn your ideas into powerful digital experiences? From modern websites and web applications to AI solutions and luxury brand identities, I help businesses build products that stand out and deliver results.
                </p>
                <p>
                  Let's create something remarkable together.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                    <span className="text-sm">📧</span>
                  </div>
                  <span>thisiswajiha16@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                    <span className="text-sm">🏢</span>
                  </div>
                  <span>Chief Technology Officer, Sourceefy</span>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Lead Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl glass-card relative">
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="lead-form"
                    onSubmit={handleLeadSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-left">
                      <h3 className="text-lg font-poppins font-bold text-white mb-2">Project Intake Form</h3>
                      <p className="text-xs text-gray-400">Share your project requirements to receive a tailored solution and professional consultation.</p>
                    </div>

                    {/* Quick Service Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-3 text-left">
                        Project Primary Area
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Web & App Development', 
                          'AI Solutions & Automation', 
                          'Graphic Design & Brand Identity', 
                          'Content Creation', 
                          'Custom Consultation'
                        ].map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setSelectedService(srv)}
                            className={`px-3 py-2.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all cursor-pointer ${
                              selectedService === srv 
                                ? 'bg-[#FFC928] text-black border-[#FFC928] font-bold shadow-md' 
                                : 'bg-white/[0.02] text-gray-300 border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                            }`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Standard Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2 text-left">
                        <label htmlFor="lead-name" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#FFC928]" /> Name *
                        </label>
                        <input
                          type="text"
                          id="lead-name"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-[#FFC928]/50 focus:bg-[#FFC928]/[0.01] focus:outline-none focus:ring-1 focus:ring-[#FFC928]/25 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2 text-left">
                        <label htmlFor="lead-email" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#FFC928]" /> Email *
                        </label>
                        <input
                          type="email"
                          id="lead-email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-white/[0.02] border border-white/5 focus:border-[#FFC928]/50 focus:bg-[#FFC928]/[0.01] focus:outline-none focus:ring-1 focus:ring-[#FFC928]/25 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="lead-company" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-[#FFC928]" /> Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="lead-company"
                        value={leadCompany}
                        onChange={(e) => setLeadCompany(e.target.value)}
                        placeholder="e.g. Sourceefy (Optional)"
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-[#FFC928]/50 focus:bg-[#FFC928]/[0.01] focus:outline-none focus:ring-1 focus:ring-[#FFC928]/25 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2 text-left">
                      <label htmlFor="lead-message" className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#FFC928]" /> Project Summary *
                      </label>
                      <textarea
                        id="lead-message"
                        required
                        rows={4}
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        placeholder="Describe your technical challenges or project requirements..."
                        className="w-full bg-white/[0.02] border border-white/5 focus:border-[#FFC928]/50 focus:bg-[#FFC928]/[0.01] focus:outline-none focus:ring-1 focus:ring-[#FFC928]/25 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl text-sm font-bold bg-[#FFC928] hover:bg-amber-400 text-black shadow-[0_4px_15px_rgba(255,201,40,0.15)] hover:shadow-[0_6px_25px_rgba(255,201,40,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Submitting Inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Project Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="lead-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-poppins font-bold text-white">Inquiry Successfully Sent</h3>
                      <p className="text-sm text-gray-400 max-w-md mx-auto">
                        Your specifications are registered. I will get back to you shortly.
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-white transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>



      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#050505]/40 backdrop-blur-md text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#FFC928] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-[1px]" />
            </div>
            <span className="font-poppins font-bold text-white text-sm tracking-tight">Wajiha</span>
          </div>

          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Wajiha. All rights reserved. CTO at Sourceefy.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#FFC928] transition-colors cursor-pointer" onClick={() => scrollToSection('home')}>Home</span>
            <span className="hover:text-[#FFC928] transition-colors cursor-pointer" onClick={() => scrollToSection('services')}>Services</span>
            <span className="hover:text-[#FFC928] transition-colors cursor-pointer" onClick={() => scrollToSection('contact')}>Contact</span>
          </div>
        </div>
      </footer>

      {/* Lightbox Gallery Modal */}
      <AnimatePresence>
        {galleryProject && (() => {
          const slides = GALLERY_DATA[galleryProject.id] || [];
          const currentSlide = slides[activeSlide];

          const handlePrevSlide = () => {
            setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
          };

          const handleNextSlide = () => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
          };

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
              onClick={() => setGalleryProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="w-full max-w-5xl h-[85vh] md:h-[75vh] bg-[#111111] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left/Main Image Stage */}
                <div className="flex-1 relative bg-black/40 overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-0 group/stage">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-[#FFC928]/5 pointer-events-none" />
                  
                  {/* Image Viewer Container */}
                  <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-4">
                    <motion.img
                      key={activeSlide}
                      src={galleryProject.image}
                      alt={currentSlide?.name || galleryProject.title}
                      initial={{ opacity: 0.4, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        transform: currentSlide?.transform || "scale(1)",
                        transformOrigin: currentSlide?.transformOrigin || "center center",
                      }}
                      className="max-w-full max-h-full object-contain transition-all duration-700 ease-out select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

                  {/* Glass Focus Watermark */}
                  <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-mono text-[#FFC928] border border-white/5 tracking-wider uppercase">
                    🔭 Viewport: {currentSlide?.name ? currentSlide.name.replace(/^\d+\.\s*/, '') : 'Full Layout'}
                  </div>

                  {/* Arrow controls - Only if more than 1 slide */}
                  {slides.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#FFC928] text-white hover:text-black border border-white/5 hover:border-transparent transition-all cursor-pointer group/btn hover:scale-110"
                        aria-label="Previous Slide"
                      >
                        <ChevronDown className="w-5 h-5 rotate-90 transition-transform group-hover/btn:-translate-x-0.5" />
                      </button>

                      <button 
                        onClick={handleNextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#FFC928] text-white hover:text-black border border-white/5 hover:border-transparent transition-all cursor-pointer group/btn hover:scale-110"
                        aria-label="Next Slide"
                      >
                        <ChevronDown className="w-5 h-5 -rotate-90 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Right Sidebar Control Panel */}
                <div className="w-full md:w-[360px] flex flex-col justify-between p-6 md:p-8 bg-[#141414] border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-[#FFC928] tracking-widest uppercase block mb-1 truncate">
                          {galleryProject.category}
                        </span>
                        <h4 className="font-poppins font-bold text-white text-base tracking-tight leading-tight">
                          {galleryProject.title}
                        </h4>
                      </div>
                      <button 
                        onClick={() => setGalleryProject(null)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all cursor-pointer border border-white/5 shrink-0"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Active Slide Info */}
                    <div className="space-y-3 pt-4 border-t border-white/5 text-left">
                      <h5 className="font-poppins font-bold text-white text-sm">
                        {currentSlide?.name || "Project View"}
                      </h5>
                      <p className="text-gray-400 text-xs leading-relaxed font-normal">
                        {currentSlide?.description || galleryProject.description}
                      </p>
                    </div>

                    {/* Interactive Slide/Segment Quick Jump Tabs */}
                    {slides.length > 1 && (
                      <div className="space-y-3 pt-4 border-t border-white/5 text-left">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                          Layout Quadrants / Sections
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {slides.map((slide, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveSlide(idx)}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all border flex items-center gap-2.5 cursor-pointer ${
                                activeSlide === idx
                                  ? 'bg-[#FFC928]/10 border-[#FFC928]/40 text-[#FFC928] font-semibold shadow-inner'
                                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full transition-all ${activeSlide === idx ? 'bg-[#FFC928] scale-125' : 'bg-gray-600'}`} />
                              <span className="truncate">{slide.name.replace(/^\d+\.\s*/, '')}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer & Navigation Controls */}
                  <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            activeSlide === idx ? 'bg-[#FFC928] w-4' : 'bg-gray-700 hover:bg-gray-500'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setGalleryProject(null)}
                      className="text-xs font-semibold text-gray-400 hover:text-[#FFC928] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      Exit Viewer
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
