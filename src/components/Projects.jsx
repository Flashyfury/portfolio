import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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
    gradient: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    title: 'Curalink - AI Healthcare Assistant',
    description: 'Built a full-stack healthcare web application. Integrated Groq API (LLM) for real-time symptom-based responses and local ollama LLM Model for medical question answering. Developed REST APIs for chat processing and session management.',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Groq API'],
    github: '#',
    live: '#',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 3,
    title: 'QRgenerator',
    description: 'A fully interactive QR code generator featuring customizable colors, optional logo upload, user authentication, and live preview functionality.',
    tech: ['Python 3', 'Django', 'SQLite', 'qrcode', 'HTML/CSS', 'Bootstrap'],
    github: '#',
    live: '#',
    gradient: 'from-orange-500/20 to-rose-500/20'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">
          Selected <span className="text-neutral-500">Works</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:neon-border flex flex-col h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="p-8 relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-glow transition-all">{project.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    <GithubIcon />
                    Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors ml-auto">
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
