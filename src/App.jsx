import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ShaderBackground from './components/ShaderBackground';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-neutral-300 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <ShaderBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
        </main>
        <Contact />
      </div>
    </div>
  );
}

export default App;
