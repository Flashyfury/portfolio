import { motion } from 'framer-motion';

const experiences = [
  {
    id: 1,
    role: 'Full-Stack Developer Intern',
    company: 'Unified Mentor INC',
    period: '10/2025 - 01/2026',
    location: 'Haryana, India',
    description: [
      'Developed and optimized Node.js(Express) REST APIs, reduced API response time after query optimization.',
      'Gained knowledge about advanced MERN Stack.',
      'Collaborated with a cross-functional team and learnt version control with Github following Agile practices, CI/CD pipelines and Dockerized services for seamless deployment.'
    ]
  }
];

const education = [
  {
    id: 1,
    degree: 'Bachelor of Technology, Computer Science And Engineering',
    institution: 'SWAMI VIVEKANANDA UNIVERSITY',
    period: '2022 - 2026',
    location: 'Barrackpore',
    details: 'CGPA: 7.86'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">
          Experience <span className="text-neutral-500">& Education</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Professional
            </h3>
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l border-neutral-800">
                  <div className="absolute w-4 h-4 rounded-full bg-neutral-900 border border-blue-500 -left-[9px] top-1"></div>
                  <div className="mb-2 flex flex-wrap items-baseline gap-3">
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <span className="text-sm font-medium text-blue-400">{exp.company}</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-4 font-mono">
                    {exp.period} • {exp.location}
                  </div>
                  <ul className="space-y-2 text-neutral-400">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-blue-500/50 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Education
            </h3>
            <div className="space-y-12">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-8 border-l border-neutral-800">
                  <div className="absolute w-4 h-4 rounded-full bg-neutral-900 border border-purple-500 -left-[9px] top-1"></div>
                  <div className="mb-2">
                    <h4 className="text-xl font-bold text-white leading-tight mb-1">{edu.degree}</h4>
                    <span className="text-sm font-medium text-purple-400">{edu.institution}</span>
                  </div>
                  <div className="text-sm text-neutral-500 mb-3 font-mono">
                    {edu.period} • {edu.location}
                  </div>
                  <p className="text-neutral-400">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
