import * as React from "react"
import { BRAND_NAME } from "../constants"
import { Button } from "../components/ui"
import Hero from '../components/sections/Hero'
import shortVideo from '../assets/short.mp4'
import Magnetic from '../components/ui/Magnetic'
import videos from "../assets/videos/Hidden entrance _ 2D animated short (30 seconds Version) - ARWAKE (720p, h264).mp4"
import PortfolioVideo from "../components/animations/videoOnMouseEnterLeave"
import AnimatedFadeIn from "../components/animations/AnimatedFadeIn"   // 👈 new import
import { Layers, Shield, Brain, Globe } from "lucide-react"
import Container from "../components/layout/Spacing/Container"

const Home: React.FC = () => {
  return (
    <div className="bg-white text-slate-900">
      {/* ================= Hero Section ================= */}
      <section>
        <Container>
          <Hero
            title={`From concept to launch, ${BRAND_NAME} builds solutions that stand out and scale.`}
            subtitle="Scalable, secure, and smart solutions for ambitious brands"
            ctaHref="/contact"
            videoSrc={shortVideo}
            poster="/images/hero-poster.svg"
            overlay
          />
        </Container>
      </section>

      {/* ================= Services Section ================= */}
      <section
        className="py-28 max-w-7xl mx-auto"
        role="region"
        aria-labelledby="services-heading"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="services-heading"
            className="text-5xl font-bold mb-16 text-center"
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
              <AnimatedFadeIn key={idx} delay={idx * 0.2}>
                <div className="flex flex-col md:flex-row md:items-start md:space-x-10">
                  <div className="md:w-1/3 text-3xl font-semibold">
                    {service.title}
                  </div>
                  <div className="md:w-2/3 text-lg text-slate-600">
                    {service.desc}
                  </div>
                </div>
              </AnimatedFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Portfolio Section ================= */}
      <section
        className="py-28 bg-black/93 text-white rounded-[75px]"
        role="region"
        aria-labelledby="portfolio-heading"
      >
        <Container className="text-center" >
          <h2
            id="portfolio-heading"
            className="text-5xl font-bold font-montserrat mb-26"
            data-parallax="20"
          >
            Selected Work
          </h2>

          <div className="space-y-24">
            {[
              {
                src: videos,
                thumbnail: "/images/thumb-1.jpg",
                title: "Hidden Entrance",
                desc: "A 2D animated short showcasing a creative entrance sequence.",
              },
              {
                src: videos,
                thumbnail: "/images/thumb-1.jpg",
                title: "Creative Motion",
                desc: "Exploring motion graphics and smooth animations.",
              },
              {
                src: videos,
                thumbnail: "/images/thumb-1.jpg",
                title: "Interactive Animation",
                desc: "Engaging animation with interactive elements.",
              },
            ].map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <AnimatedFadeIn key={idx} delay={idx * 0.2}>
                  <div
                    className={`flex flex-col md:flex-row items-center  md:space-x-10 ${!isEven ? "md:flex-row-reverse md:space-x-reverse" : ""
                      }`}
                  >
                    {/* Video */}
                    <div className="aspect-video w-full md:w-1/2">
                      <PortfolioVideo src={item.src} thumbnail={item.thumbnail} />
                    </div>

                    {/* Detail */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-left px-5">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-lg lg:text-xl text-white text-center md:text-left md:items-start">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedFadeIn>
              )
            })}
          </div>
        </Container>
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
                icon: <Layers className="w-12 h-12 mx-auto text-slate-900" />,
                title: "Scalable",
                desc: "Solutions designed to grow with your business.",
              },
              {
                icon: <Shield className="w-12 h-12 mx-auto text-slate-900" />,
                title: "Secure",
                desc: "Robust architecture with enterprise-level security.",
              },
              {
                icon: <Brain className="w-12 h-12 mx-auto text-slate-900" />,
                title: "Intelligent",
                desc: "AI at the core of smarter digital products.",
              },
              {
                icon: <Globe className="w-12 h-12 mx-auto text-slate-900" />,
                title: "Global",
                desc: "Working with clients across the world.",
              },
            ].map((item, idx) => (
              <AnimatedFadeIn key={idx} delay={idx * 0.2} amount={0.2}>
                <div className="space-y-4">
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </AnimatedFadeIn>
            ))}
          </div>
        </div>

      </section>

      {/* ================= Final CTA Section ================= */}
      <Container className="my-20">
      <section
        className="py-28 bg-black/90 text-white text-center rounded-[40px]"
        role="region"
        aria-labelledby="cta-heading"
        data-animate="fade-up"
      >
        <section className="mx-auto max-w-4xl space-y-8">  
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
            <Button data-cursor="hover" className="px-10 py-4 text-lg font-bold bg-white text-slate-900 hover:bg-black hover:text-white">
              Get in Touch
            </Button>
          </Magnetic>
        </section>
      </section>
      </Container>
    </div>
  )
}

export default Home
