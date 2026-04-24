import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag, HeartPulse, QrCode } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const projects = [
  {
    id: 1,
    title: 'Jewellery site',
    description: 'Developed a full-stack jewellery e-commerce website. Implemented user authentication, CRUD operations, RESTful API integration, and real-time database management. Designed a responsive and mobile-first UI/UX with reusable components.',
    tech: ['React.js', 'TypeScript', 'HTML', 'CSS', 'Supabase'],
    github: 'https://github.com/Flashyfury/jewellery-site',
    live: 'https://olivia-exclusive.vercel.app/',
    gradient: 'from-blue-500 to-purple-600',
    glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]',
    borderHover: 'group-hover:border-purple-500/40',
    iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    Icon: ShoppingBag
  },
  {
    id: 2,
    title: 'Curalink AI',
    description: 'Built a full-stack healthcare web application. Integrated Groq API for real-time symptom-based responses and local ollama LLM Model for medical QA. Developed REST APIs for chat processing and session management.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Groq API'],
    github: 'https://github.com/Flashyfury/Curalink',
    live: 'https://curalink-theta.vercel.app/',
    gradient: 'from-emerald-400 to-teal-600',
    glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    borderHover: 'group-hover:border-emerald-500/40',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    Icon: HeartPulse
  },
  {
    id: 3,
    title: 'QRgenerator',
    description: 'A fully interactive QR code generator featuring customizable colors, optional logo upload, user authentication, and live preview functionality.',
    tech: ['Python 3', 'Django', 'SQLite', 'qrcode', 'HTML/CSS', 'Bootstrap'],
    github: 'https://github.com/Flashyfury/Qr-code-generator',
    live: 'https://qrcodegenerator-00.onrender.com',
    gradient: 'from-orange-400 to-rose-600',
    glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]',
    borderHover: 'group-hover:border-orange-500/40',
    iconBg: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    Icon: QrCode
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20 text-center"
      >
        <span className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-purple-400 text-sm font-bold mb-6 inline-block uppercase tracking-wider">
          Portfolio
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Projects</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Here are some selected projects that showcase my passion for building scalable, beautiful, and user-centric applications.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`group relative bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full ${project.glow} ${project.borderHover}`}
          >
            {/* Top Gradient Line */}
            <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} transition-all duration-500 opacity-80 group-hover:opacity-100`} />
            
            <div className="p-8 md:p-10 relative z-10 flex flex-col h-full">
              {/* Icon & Title */}
              <div className="flex flex-col gap-6 mb-8">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${project.iconBg} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                  <project.Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{project.title}</h3>
              </div>
              
              {/* Description */}
              <p className="text-neutral-400 text-base leading-relaxed mb-10 flex-grow">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Action Links */}
              <div className="flex items-center gap-6 pt-6 border-t border-white/5 mt-auto relative z-20">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors">
                  <span className="p-2.5 rounded-full bg-white/5 group-hover/link:bg-white/10 group-hover/link:scale-110 transition-all duration-300">
                    <GithubIcon />
                  </span>
                  Code
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors ml-auto">
                  <span className="p-2.5 rounded-full bg-white/5 group-hover/link:bg-white/10 group-hover/link:scale-110 transition-all duration-300">
                    <ExternalLink size={18} />
                  </span>
                  Demo
                </a>
              </div>
            </div>

            {/* Background animated blob */}
            <div className={`absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br ${project.gradient} rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
