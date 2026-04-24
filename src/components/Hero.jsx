import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="relative bg-neutral-900 rounded-[2.5rem] p-6 lg:p-8 flex flex-col items-center text-center shadow-2xl lg:col-span-1 overflow-hidden border border-white/10 group"
        >
          {/* Animated Gradient Backdrop */}
          <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-500/30 rounded-full blur-[80px] group-hover:bg-purple-500/40 transition-all duration-700 pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-lime-400/20 rounded-full blur-[80px] group-hover:bg-lime-400/30 transition-all duration-700 pointer-events-none"></div>

          {/* Status Pill */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 mb-8 relative z-10 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
            <span className="text-xs font-bold text-neutral-200 uppercase tracking-widest">Open to Work</span>
          </div>

          {/* Avatar Container */}
          <div className="relative mb-8 z-10 group-hover:scale-105 transition-transform duration-500">
            {/* Rotating gradient ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5e00] via-purple-500 to-[#c6ff00] rounded-full blur-md opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700 scale-105"></div>
            
            <img 
              src="/IMG_4794.PNG" 
              alt="Anshu Naskar" 
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-[4px] border-neutral-900 relative z-10"
            />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-3 tracking-tight z-10">
            Anshu Naskar
          </h2>
          
          <p className="text-neutral-400 font-medium mb-8 z-10 max-w-[220px] leading-relaxed">
            Crafting digital experiences with code & coffee.
          </p>
          
          {/* Socials */}
          <div className="flex gap-3 mt-auto z-10 w-full justify-center">
            <SocialLink href="https://www.linkedin.com/in/anshunaskar" icon={<LinkedinIcon />} label="LinkedIn" />
            <SocialLink href="https://github.com/Flashyfury" icon={<GithubIcon />} label="GitHub" />
            <SocialLink href="mailto:anshunaskar2003@gmail.com" icon={<Mail size={20} />} label="Email" />
          </div>
        </motion.div>

        {/* Right Column: Title, Stats & Colorful Bento Boxes */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Top Hero Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-neutral-900 rounded-[2rem] p-8 md:p-12 border border-neutral-800"
          >
            <motion.span 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="px-4 py-2 rounded-full bg-neutral-800 text-lime-400 text-sm font-bold mb-6 inline-block uppercase tracking-wider"
            >
              Available for new opportunities
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-10 tracking-tighter"
            >
              SOFTWARE<br/>ENGINEER
            </motion.h1>
            
            {/* Stats Row */}
            <div className="flex flex-wrap gap-10 border-t border-neutral-800 pt-8">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <h3 className="text-4xl font-black text-white mb-1">3+</h3>
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-wider">Projects</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <h3 className="text-4xl font-black text-white mb-1">1+</h3>
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-wider">Years Exp.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <h3 className="text-4xl font-black text-white mb-1">20+</h3>
                <p className="text-neutral-500 text-sm font-bold uppercase tracking-wider">Tech Skills</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Colorful Bento Boxes Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Orange Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="bg-[#ff5e00] rounded-[2rem] p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">View My<br/>Resume</h3>
                <p className="text-white/80 font-medium">Download my full profile</p>
              </div>
              <div className="mt-12">
                <a 
                  href="/ANSHU_N_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-[#ff5e00] px-6 py-4 rounded-full font-bold inline-flex items-center gap-2 hover:bg-neutral-100 transition-transform hover:scale-105"
                >
                  <FileText size={20} /> View Resume
                </a>
              </div>
            </motion.div>

            {/* Lime Green Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="bg-[#c6ff00] rounded-[2rem] p-8 flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-3xl font-bold text-black mb-2 leading-tight">Let's Work<br/>Together</h3>
                <p className="text-black/70 font-medium">Have a project in mind?</p>
              </div>
              <div className="mt-12">
                <a 
                  href="#contact" 
                  className="bg-black text-[#c6ff00] px-6 py-4 rounded-full font-bold inline-flex items-center gap-2 hover:bg-neutral-900 transition-transform hover:scale-105"
                >
                  <Mail size={20} /> Contact Me
                </a>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 backdrop-blur-md"
    >
      {icon}
    </a>
  );
}
