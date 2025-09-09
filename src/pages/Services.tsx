import * as React from 'react'
import { ServicesGrid } from '../components/sections'
import { Button } from '../components/ui'

const Services: React.FC = () => {
  return (
    <section className="space-y-10">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-slate-600">Explore what TechSign can do for you</p>
      </div>

      {/* Services Grid */}
      <ServicesGrid />

      {/* CTA */}
      <div className="text-center">
        <a href="#contact">
          <Button>Contact Us</Button>
        </a>
      </div>
    </section>
  )
}

export default Services
