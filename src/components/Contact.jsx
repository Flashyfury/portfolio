import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="pt-24 pb-12 px-6 md:px-12 max-w-6xl mx-auto border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Let's build something <span className="text-glow text-white">great</span> together.
            </h2>
            <p className="text-neutral-400 mb-10 text-lg">
              Feel free to reach out for collaborations, opportunities, or just a quick hello.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-purple-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-0.5">Email</p>
                  <a href="mailto:anshunaskar2003@gmail.com" className="hover:text-white transition-colors">
                    anshunaskar2003@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-0.5">Phone</p>
                  <a href="tel:+916289079181" className="hover:text-white transition-colors">
                    +91 6289079181
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-neutral-300">
                <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-teal-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium mb-0.5">Location</p>
                  <span>Maheshtala, Kolkata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Send a message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                <textarea 
                  rows="4"
                  placeholder="How can I help you?"
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="button"
                className="w-full py-3.5 px-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Anshu Naskar. All rights reserved.
          </p>
          <p className="text-neutral-600 text-sm flex items-center gap-1">
            Built with React & Tailwind CSS
          </p>
        </div>
      </motion.div>
    </section>
  );
}
