import * as React from "react"
import { BRAND_NAME } from "../constants"
import { Button } from "../components/ui"
import { motion } from "framer-motion"
import Hero from '../components/sections/Hero'
import shortVideo from '../assets/short.mp4'
import Magnetic from '../components/ui/Magnetic'

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const Home: React.FC = () => {
  return (
    <div className="bg-white text-slate-900">
      {/* ================= Hero Section ================= */}
      <Hero
        title={"From concept to launch, TechSign builds solutions that stand out and scale."}
        subtitle= "Scalable, secure, and smart solutions for ambitious brands"
        ctaLabel="Get in touch"
        ctaHref="/contact"
        videoSrc={shortVideo}
        poster="/images/hero-poster.svg"
        overlay
      />

      {/* ================= Services Section ================= */}
      <section
        className="py-28"
        role="region"
        aria-labelledby="services-heading"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="services-heading"
            className="text-5xl font-bold font-montserrat mb-16 text-center"
            data-parallax="20"
          >
            What We Do
          </h2>

          <div className="space-y-16">
            {[
              {
                title: "Web Development",
                desc: "Modern, responsive, and scalable websites tailored for your business.",
              },
              {
                title: "Backend & Cloud",
                desc: "High-performance and secure backend systems with cloud-native architecture.",
              },
              {
                title: "AI & Automation",
                desc: "Intelligent, AI-powered automation that drives efficiency and growth.",
              },
              {
                title: "UI/UX Design",
                desc: "Beautiful, human-centered design that engages and converts users.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col md:flex-row md:items-start md:space-x-10"
              >
                <div className="md:w-1/3 text-3xl font-semibold">
                  {service.title}
                </div>
                <div className="md:w-2/3 text-lg text-slate-600">
                  {service.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Portfolio Section ================= */}
      <section
        className="py-28"
        role="region"
        aria-labelledby="portfolio-heading"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2
            id="portfolio-heading"
            className="text-5xl font-bold font-montserrat mb-16"
            data-parallax="20"
          >
            Selected Work
          </h2>

          <div className="space-y-20">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="relative group overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={`/images/placeholder-${item}.svg`}
                  alt={`Placeholder project ${item}`}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    Project {item}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Why Choose Us Section ================= */}
      <section
        className="py-28"
        role="region"
        aria-labelledby="why-heading"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2
            id="why-heading"
            className="text-5xl font-bold font-montserrat mb-16"
            data-parallax="20"
          >
            Why Choose Us
          </h2>

          <div className="grid gap-16 md:grid-cols-4">
            {[
              {
                icon: "",
                title: "Scalable",
                desc: "Solutions designed to grow with your business.",
              },
              {
                icon: "",
                title: "Secure",
                desc: "Robust architecture with enterprise-level security.",
              },
              {
                icon: "",
                title: "Intelligent",
                desc: "AI at the core of smarter digital products.",
              },
              {
                icon: "",
                title: "Global",
                desc: "Working with clients across the world.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="space-y-4"
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Final CTA Section ================= */}
      <section
        className="py-28 bg-slate-900 text-white text-center"
        role="region"
        aria-labelledby="cta-heading"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-4xl space-y-8 px-4">
          <h2
            id="cta-heading"
            className="text-5xl font-bold font-montserrat"
            data-parallax="15"
          >
            Ready to build your next big project?
          </h2>
          <p className="text-lg text-slate-300">
            Let’s collaborate and craft intelligent, scalable solutions that
            make a difference.
          </p>
          <Magnetic>
            <Button data-cursor="hover" className="px-10 py-4 text-lg font-bold bg-white text-slate-900 hover:bg-slate-200">
              Get in Touch
            </Button>
          </Magnetic>
        </div>
      </section>
    </div>
  )
}

export default Home
