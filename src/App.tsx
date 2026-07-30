import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Chi sono", href: "#about" },
  { name: "Competenze", href: "#skills" },
  { name: "Progetti", href: "#projects" },
  { name: "Contatti", href: "#contact" },
];

const skillGroups = [
  {
    title: "Linguaggi",
    icon: "💻",
    skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    icon: "🌐",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  { title: "Backend", icon: "🧩", skills: ["Node.js", "Express", "REST API"] },
  { title: "Database", icon: "🗄️", skills: ["PostgreSQL", "MySQL"] },
  {
    title: "DevOps & Tool",
    icon: "⚙️",
    skills: ["Git", "GitHub", "CI/CD", "Npm", "Agile/Scrum"],
  },
];

const projects = [
  {
    title: "MiCurApp",
    description:
      "App creata come ultimo progetto di gruppo nel corso di Develhope.",
    tags: ["React", "PostgreSQL", "Express", "Tailwind"],
    image: "/Micurapp.png",
    github: "https://github.com/develhope/FS37-TeamProject-2",
  },
  {
    title: "Nike Clone",
    description:
      "Progetto di gruppo del corso di Develhope basato sulla replica del sito della Nike.",
    tags: ["Html", "CSS", "JavaScript"],
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    github:
      "https://github.com/develhope/FS37-TeamProject-1/tree/branch-merge-finale",
  },
  {
    title: "ZodiAPP",
    description: "Compito personale datomi da Develhope.",
    tags: ["React", "Tailwind"],
    image:
      "https://media.istockphoto.com/id/1035676256/it/foto/sfondo-di-galassie-e-stelle.jpg?s=612x612&w=0&k=20&c=e_Hy2QZiOHJsCzTiP2wwM2llaYTNIyKiDGlskiQCrlM=",
    github: "https://github.com/Chrisack66/ZodiAPP",
  },
  {
    title: "Qubica Store",
    description: "Sito E-Commerce usando FakeStoreAPI.",
    tags: ["Vibe Coding"],
    image:
      "/QubicaStore.jpg",
    github: "https://github.com/ChristianSestito/QubicaStore",
  },
];

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActiveSection(entry.target.id),
        ),
      { threshold: 0.3 },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    // Chiudi il menu immediatamente
    setIsMenuOpen(false);

    if (elem) {
      setTimeout(() => {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  return (
    <div
      className={
        isDarkMode
          ? "min-h-screen bg-gray-900 text-white transition-colors duration-500"
          : "min-h-screen bg-white text-gray-900 transition-colors duration-500"
      }
    >
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 py-3"
              : "bg-white/80 backdrop-blur-lg border-b py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 relative flex justify-end md:justify-center items-center">
          {/* LINK CENTRALI */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className={`text-sm font-medium transition-all relative py-1 ${
                  activeSection === link.href.slice(1)
                    ? "text-violet-600"
                    : isDarkMode
                      ? "text-gray-300 hover:text-violet-400"
                      : "text-gray-600 hover:text-violet-600"
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-600"
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8 md:ml-12">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode((prev) => !prev)}
              className={`p-2 rounded-full ${isDarkMode ? "text-yellow-400 bg-gray-800" : "text-gray-600 bg-gray-100"}`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                  }
                  className={`w-full h-0.5 rounded-full ${isDarkMode ? "bg-white" : "bg-black"}`}
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`w-full h-0.5 rounded-full ${isDarkMode ? "bg-white" : "bg-black"}`}
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }
                  }
                  className={`w-full h-0.5 rounded-full ${isDarkMode ? "bg-white" : "bg-black"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden ${isDarkMode ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b"}`}
            >
              <div className="flex flex-col items-center gap-6 py-8">
                {navLinks.map((link, idx) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors px-6 py-3 rounded-lg cursor-pointer w-full max-w-xs text-center ${
                      activeSection === link.href.slice(1)
                        ? "text-violet-600 font-semibold"
                        : isDarkMode
                          ? "text-gray-300 hover:text-violet-400 hover:bg-gray-800"
                          : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
                    }`}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HOME */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-24 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Sestito Christian Pio
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Full Stack Developer
              </span>
            </h1>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              onClick={(e) => handleNavLinkClick(e, "#projects")}
              className="mx-auto lg:mx-0 inline-flex items-center gap-2 bg-violet-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-violet-700 transition"
            >
              Guarda i miei progetti →
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden flex items-center justify-center bg-gray-100">
              <img
                src="/Sestito_Christian_Pio.jpg"
                alt="Sestito Christian Pio"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CHI SONO */}
      <section
        id="about"
        className={`py-20 sm:py-32 scroll-mt-20 overflow-hidden relative ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <motion.a
              href="https://www.credential.net/c734e86a-ea9a-4065-b992-5220e8061d3c#acc.VctzJwfx"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              className="cursor-pointer w-full max-w-sm lg:max-w-none mx-auto"
            >
              <img
                src="https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/161755450"
                alt="Certificato Accredia"
                className="w-full h-auto object-contain"
              />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-center lg:text-left"
            >
              <h3 className="text-violet-600 font-bold tracking-wider uppercase text-2xl mb-4">
                Chi sono
              </h3>

              <div
                className={`space-y-4 text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p>
                  Sono un giovane ragazzo con una forte passione per
                  l'informatica e in particolare nello sviluppo web. Dopo il
                  diploma in Informatica e Telecomunicazioni presso l{" "}
                  <a
                    href="https://www.itmalafarina.edu.it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Istituto Malafarina di Soverato
                  </a>
                  , ho proseguito con un corso intensivo Full Stack Developer
                  presso{" "}
                  <a
                    href="https://landing.develhope.co/iscriviti-corsi-develhope"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Develhope
                  </a>
                  , dove ho lavorato a progetti concreti in team, simulando
                  ambienti di lavoro reali e appreso i linguaggi web più
                  fondamentali.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Le mie competenze
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`border rounded-2xl p-6 hover:shadow-lg transition text-center ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800/50"
                    : "border-gray-200"
                }`}
              >
                <h3 className="font-semibold mb-3">
                  {group.icon} {group.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGETTI */}
      <section
        id="projects"
        className={`py-16 sm:py-24 scroll-mt-20 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Progetti in evidenza
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl overflow-hidden shadow hover:shadow-2xl transition-all flex flex-col ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex-1 flex items-center justify-center bg-white dark:bg-white min-h-[300px] p-4">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <h3
                    className={`font-bold text-xl mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM con EmailJS */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-violet-600 to-indigo-700 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Lavoriamo insieme!
            </h2>
            <p className="text-lg text-violet-100 max-w-2xl mx-auto">
              Hai un progetto in mente? Compila questo form per farmelo sapere
              così da poterci lavorare insieme!
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`max-w-xl mx-auto rounded-3xl p-8 shadow-2xl transition-colors duration-500 ${
              isDarkMode ? "bg-gray-100" : "bg-white"
            }`}
          >
            <form
              className="space-y-6"
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                if (!formRef.current) return;

                emailjs
                  .sendForm(
                    "service_anwnmlx", //  Service ID
                    "template_5sogxjo", // Template ID
                    formRef.current,
                    "V23oSHtH1ezq_saSR", // Public/User ID
                  )
                  .then(
                    () => {
                      alert("Messaggio inviato con successo!");
                      formRef.current?.reset();
                    },
                    (error) => {
                      alert("Errore nell'invio, riprova più tardi.");
                      console.error(error.text);
                    },
                  );
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Inserisci il tuo nome"
                    required
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all ${
                      isDarkMode
                        ? "bg-white text-black placeholder:text-gray-500"
                        : "bg-white text-gray-700 placeholder:text-gray-400"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="tua@email.com"
                    required
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all ${
                      isDarkMode
                        ? "bg-white text-black placeholder:text-gray-500"
                        : "bg-white text-gray-700 placeholder:text-gray-400"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oggetto
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Di che cosa si tratta?"
                  required
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all ${
                    isDarkMode
                      ? "bg-white text-black placeholder:text-gray-500"
                      : "bg-white text-gray-700 placeholder:text-gray-400"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Messaggio
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Raccontami in poche parole l'idea del tuo progetto..."
                  required
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none ${
                    isDarkMode
                      ? "bg-white text-black placeholder:text-gray-500"
                      : "bg-white text-gray-700 placeholder:text-gray-400"
                  }`}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-violet-600 text-white py-4 rounded-xl font-semibold hover:bg-violet-700 transition-colors duration-200 shadow-lg"
              >
                Invia Messaggio
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-gray-200 text-2xl font-semibold text-center tracking-wide">
              I miei collegamenti
            </h3>

            <div className="flex items-center justify-center gap-6">
              {[
                {
                  icon: "github",
                  path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                  url: "https://github.com/ChristianSestito",
                },
                {
                  icon: "linkedin",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  url: "https://www.linkedin.com/in/christian-sestito-8013a628b/",
                },
              ].map((social) => (
                <motion.a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, backgroundColor: "#7c3aed" }}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>

            <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Sestito Christian Pio. Tutti i
              diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
