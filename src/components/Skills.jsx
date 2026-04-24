import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'Data Structures', 'OOPs']
  },
  {
    title: 'Front-end',
    skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
  },
  {
    title: 'Back-end',
    skills: ['Node.js (Express)', 'SpringBoot', 'Django']
  },
  {
    title: 'Database & APIs',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'REST', 'GraphQL', 'Groq API (LLM)']
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git / GitHub', 'CI/CD', 'Postman', 'Cypress', 'Playwright', 'Linux/Unix']
  },
  {
    title: 'Other',
    skills: ['System Design', 'Debugging', 'Agile Methodology', 'AI Tools (Claude, ChatGPT)']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">
          Technical <span className="text-neutral-500">Expertise</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-neutral-800/50 text-neutral-300 border border-neutral-700 hover:border-purple-500/50 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
