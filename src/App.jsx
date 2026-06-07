import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Wind,
  ShieldCheck,
  Zap,
  Dumbbell,
  Droplets,
  Users,
  Heart,
  Activity,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Star,
  Sun,
  Moon,
} from "lucide-react";

// --- CUSTOM ANIMATED COUNTER ---
const AnimatedCounter = ({ end, duration = 2.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const rawProgress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      setCount(Math.floor(easeProgress * end));

      if (rawProgress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// --- HELPER FOR BUTTONS ---
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// --- CUSTOM NAV LINK COMPONENT (Modern Font & Hover Effect) ---
const NavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative font-montserrat font-bold text-sm md:text-xs uppercase tracking-widest text-zinc-800 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-300 group py-1"
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

// --- COMPONENTS ---

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 py-2 shadow-sm dark:shadow-none"
          : "bg-transparent py-4 md:py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center relative h-16 sm:h-20">
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <img
            src="Gym-logo.png"
            alt="Wellness Planet Logo"
            className="w-15 h-15 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]"
          />
          <div className="font-montserrat font-black text-xl sm:text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase">
            WELLNESS <span className="text-orange-500">PLANET</span>
          </div>
        </div>

        {/* Desktop Menu - UPDATED FONTS & HOVER */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#facilities">Facilities</NavLink>
          <NavLink href="#memberships">Memberships</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-800 dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* WORKABLE BUTTON */}
          <button
            onClick={() => scrollToSection("memberships")}
            className="bg-orange-500 text-zinc-950 font-black tracking-wide py-2 px-6 rounded-full hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors"
          >
            JOIN NOW
          </button>
        </div>

        {/* Mobile Menu Toggle & Theme Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-800 dark:text-white"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="text-zinc-900 dark:text-white p-2 hover:text-orange-500 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen
            ? "max-h-96 py-6 opacity-100 shadow-lg"
            : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <NavLink href="#home" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink href="#about" onClick={() => setIsOpen(false)}>
            About
          </NavLink>
          <NavLink href="#facilities" onClick={() => setIsOpen(false)}>
            Facilities
          </NavLink>
          <NavLink href="#memberships" onClick={() => setIsOpen(false)}>
            Memberships
          </NavLink>
          <NavLink href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <button
            onClick={() => {
              setIsOpen(false);
              scrollToSection("memberships");
            }}
            className="bg-orange-500 text-zinc-950 font-black py-3 px-8 rounded-full hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors mt-2"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-luminosity"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-kettlebell-in-the-gym-23035-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-montserrat font-black text-4xl sm:text-5xl md:text-7xl lg:text-6xl leading-tight mb-6 text-zinc-900 dark:text-white uppercase tracking-tighter"
        >
          BECOME THE{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 drop-shadow-lg">
            STRONGEST
          </span>
          <br /> VERSION OF YOURSELF
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-zinc-600 dark:text-gray-400 font-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 px-2 tracking-wide"
        >
          Premium fitness experience with certified trainers, state-of-the-art
          equipment, and world-class facilities in Biratnagar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          {/* WORKABLE BUTTONS */}
          <button
            onClick={() => scrollToSection("memberships")}
            className="bg-orange-500 text-zinc-950 font-black tracking-widest uppercase py-4 px-8 rounded-full text-sm hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-all transform hover:scale-105 w-full sm:w-auto shadow-[0_0_20px_rgba(249,115,22,0.4)]"
          >
            Join Today
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="border-2 border-orange-500 text-orange-500 font-black tracking-widest uppercase py-4 px-8 rounded-full text-sm hover:bg-orange-500 hover:text-white dark:hover:text-zinc-950 transition-all transform hover:scale-105 w-full sm:w-auto"
          >
            Book Free Tour
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 max-w-4xl mx-auto bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl dark:shadow-none"
        >
          {[
            { end: 70, suffix: "+", label: "Reviews" },
            { end: 4, suffix: ".0", label: "Rating" },
            { end: 10, suffix: "+", label: "Years Serving" },
            { end: 1000, suffix: "+", label: "Members" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-2">
              <div className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-orange-500">
                <AnimatedCounter end={stat.end} duration={2.5} />
                {stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-zinc-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Wind />,
      title: "Fully Air Conditioned",
      desc: "Train comfortably in our climate-controlled environment.",
    },
    {
      icon: <ShieldCheck />,
      title: "Certified Trainers",
      desc: "Expert guidance from industry-certified professionals.",
    },
    {
      icon: <Zap />,
      title: "Full Power Backup",
      desc: "Uninterrupted workouts with 100% power reliability.",
    },
    {
      icon: <Dumbbell />,
      title: "Modern Equipment",
      desc: "Top-tier machinery for strength and cardio.",
    },
    {
      icon: <Droplets />,
      title: "Sauna & Steam",
      desc: "Premium recovery facilities to soothe your muscles.",
    },
    {
      icon: <Users />,
      title: "Personal Training",
      desc: "1-on-1 coaching tailored to your exact goals.",
    },
    {
      icon: <Heart />,
      title: "Yoga Programs",
      desc: "Find balance and flexibility with expert-led sessions.",
    },
    {
      icon: <Activity />,
      title: "Supportive Community",
      desc: "Join a family of fitness enthusiasts.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border-t border-zinc-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4 tracking-tight uppercase">
            WHY CHOOSE <span className="text-orange-500">WELLNESS PLANET</span>
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto px-4 font-sans text-lg">
            Experience the highest standard of fitness in Eastern Nepal.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-sm hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-zinc-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors">
                {feat.icon}
              </div>
              <h3 className="font-montserrat font-bold text-lg mb-2 uppercase tracking-wide">
                {feat.title}
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Facilities = () => {
  const images = [
    {
      name: "Strength Zone",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Cardio Area",
      url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Yoga Studio",
      url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Sauna & Recovery",
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="facilities"
      className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4 tracking-tight uppercase">
            WORLD-CLASS <span className="text-orange-500">FACILITIES</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative h-56 sm:h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-md"
            >
              <div className="absolute inset-0 bg-zinc-900/60 dark:bg-zinc-950/60 group-hover:bg-zinc-900/20 dark:group-hover:bg-zinc-950/20 transition-colors z-10 mix-blend-multiply"></div>
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 group-hover:grayscale-0"
              />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
                <h3 className="font-montserrat font-black text-xl sm:text-2xl text-white tracking-wider uppercase">
                  {img.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section className="py-16 md:py-24 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center mb-12 md:mb-16 tracking-tight uppercase">
          YOUR <span className="text-orange-500">TRANSFORMATION</span> JOURNEY
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-zinc-300 dark:bg-white/5 -translate-y-1/2 z-0 transition-colors duration-300"></div>

          {[
            {
              step: "01",
              title: "Join & Get Assessed",
              desc: "Start with a complete body composition and fitness assessment.",
            },
            {
              step: "02",
              title: "Personalized Plan",
              desc: "Get a custom workout and nutrition plan tailored to your goals.",
            },
            {
              step: "03",
              title: "Achieve Your Dream",
              desc: "Execute the plan with our expert trainers and see real results.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative z-10 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-white/5 text-center w-full md:w-1/3 hover:border-orange-500/30 dark:hover:border-orange-500/30 shadow-sm transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center font-montserrat font-black text-2xl text-white dark:text-zinc-950 mx-auto mb-6 shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                {item.step}
              </div>
              <h3 className="font-black text-xl mb-3 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Memberships = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "Rs. 3,500",
      features: [
        "Gym Access",
        "Locker Access",
        "Equipment Use",
        "General Support",
      ],
      highlight: false,
    },
    {
      name: "Popular Plan",
      price: "Rs. 2,333",
      features: [
        "Everything in Basic",
        "Personal Guidance",
        "Diet Consultation",
        "Progress Tracking",
        "For 1 year",
      ],
      highlight: true,
    },
    {
      name: "Elite Plan",
      price: "Rs. 2500",
      features: [
        "Everything in Popular",
        "Sauna Access",
        "Steam Access",
        "Priority Support",
        "For 6 months",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="memberships"
      className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center mb-12 md:mb-16 tracking-tight uppercase">
          MEMBERSHIP <span className="text-orange-500">PLANS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`p-6 sm:p-8 rounded-3xl border transition-colors duration-300 ${
                plan.highlight
                  ? "bg-zinc-100 dark:bg-zinc-900 border-orange-500 transform md:scale-105 shadow-xl dark:shadow-[0_0_40px_rgba(249,115,22,0.15)]"
                  : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="text-orange-500 text-sm font-black tracking-widest uppercase mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="font-montserrat font-black text-2xl mb-2 uppercase tracking-wide">
                {plan.name}
              </h3>
              <div className="font-black text-4xl mb-6 text-zinc-900 dark:text-white">
                {plan.price}
                <span className="text-lg text-zinc-500 dark:text-gray-500 font-medium">
                  /mo
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-zinc-600 dark:text-gray-300"
                  >
                    <CheckCircle2
                      className="text-orange-500 shrink-0"
                      size={20}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* WORKABLE BUTTON */}
              <button
                onClick={() => scrollToSection("contact")}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                  plan.highlight
                    ? "bg-orange-500 text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-white hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white hover:bg-orange-500 hover:text-white dark:hover:text-zinc-950"
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "One of the best gyms in Biratnagar with excellent facilities and certified trainers.",
      author: "Rahul S.",
    },
    {
      text: "Full AC facility, excellent environment, and supportive staff.",
      author: "Priya M.",
    },
    {
      text: "Modern equipment and trainers who genuinely care about your progress.",
      author: "Amit K.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-center mb-12 md:mb-16 tracking-tight uppercase">
          MEMBER <span className="text-orange-500">STORIES</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-white/5 hover:border-orange-500/20 dark:hover:border-orange-500/20 shadow-sm transition-colors duration-300"
            >
              <div className="flex text-orange-500 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-600 dark:text-gray-400 mb-6 italic leading-relaxed">
                "{rev.text}"
              </p>
              <div className="font-black uppercase tracking-wider text-sm">
                {rev.author}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="relative py-24 md:py-32 overflow-hidden text-white px-4 border-y border-orange-500/20">
    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 z-0">
      <div className="absolute inset-0 bg-zinc-950/80 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
    </div>
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-6xl mb-8 leading-tight tracking-tighter uppercase drop-shadow-lg">
        YOUR TRANSFORMATION <br />{" "}
        <span className="text-orange-500">STARTS TODAY</span>
      </h2>

      {/* WORKABLE BUTTON */}
      <button
        onClick={() => scrollToSection("memberships")}
        className="bg-white text-zinc-950 font-black tracking-widest uppercase py-4 px-8 md:px-12 rounded-full text-sm md:text-base hover:bg-orange-500 hover:text-white dark:hover:text-zinc-950 shadow-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all duration-300 w-full sm:w-auto"
      >
        Become a Member
      </button>
    </div>
  </section>
);

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-16 md:pt-20 pb-10 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        {/* Brand */}
        <div>
          <div className="font-montserrat font-black text-2xl tracking-tighter mb-6 uppercase flex items-center gap-2">
            <img
              src="Gym-logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
            WELLNESS <span className="text-orange-500">PLANET</span>
          </div>
          <p className="text-zinc-600 dark:text-gray-400 text-sm mb-6 leading-relaxed font-sans">
            Transform Your Body. Elevate Your Life. The premium fitness
            destination in Biratnagar.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/wellnessplanetbrt/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-white/5 flex items-center justify-center hover:bg-orange-500 dark:hover:bg-orange-500 hover:-translate-y-1 hover:scale-110 transition-all duration-300 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="w-5 h-5 object-contain group-hover:grayscale-0 transition-all"
              />
            </a>
            <a
              href="https://www.facebook.com/kalupar/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-white/5 flex items-center justify-center hover:bg-orange-500 dark:hover:bg-orange-500 hover:-translate-y-1 hover:scale-110 transition-all duration-300 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5 h-5 object-contain group-hover:grayscale-0 transition-all"
              />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-montserrat font-black tracking-widest uppercase mb-6 text-lg">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm text-zinc-600 dark:text-gray-400 font-sans">
            <li className="flex items-start gap-3">
              <MapPin className="text-orange-500 shrink-0" size={20} />
              <span>Dharan Road, Biratnagar, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-orange-500 shrink-0" size={20} />
              <span>+977 980-2754739</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-orange-500 shrink-0" size={20} />{" "}
              <span>021-503190</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-orange-500 shrink-0" size={20} />{" "}
              <span className="break-all">wellnessplanetbrt@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-montserrat font-black tracking-widest uppercase mb-6 text-lg">
            Opening Hours
          </h4>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-gray-400 font-sans">
            <li className="flex justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
              <span>Sun - Fri</span>{" "}
              <span className="font-bold text-zinc-900 dark:text-white text-right">
                5:00 AM - 10:00 PM
              </span>
            </li>
            <li className="flex justify-between pt-2">
              <span>Saturday</span>{" "}
              <span className="font-bold text-orange-500">Closed</span>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div className="h-48 sm:h-full min-h-48 rounded-xl overflow-hidden bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/5">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114144.57790696347!2d87.20231945!3d26.46083315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744704331cc5%3A0x7b588ee5c2e1f422!2sBiratnagar%2C%20Nepal!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-80 hover:opacity-100 transition-opacity filter dark:invert-0 dark:contrast-100"
          ></iframe>
        </div>
      </div>
      <div className="text-center text-zinc-500 dark:text-gray-500 text-sm border-t border-zinc-200 dark:border-white/5 pt-8 px-4 font-sans tracking-wide">
        © {new Date().getFullYear()} Wellness Planet Biratnagar. All rights
        reserved.
      </div>
    </footer>
  );
};

export default function App() {
  const [theme, setTheme] = useState("dark"); // Default to dark mode

  // Load theme from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen selection:bg-orange-500 selection:text-white dark:selection:text-zinc-950 font-sans transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <Facilities />
      <Process />
      <Memberships />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
