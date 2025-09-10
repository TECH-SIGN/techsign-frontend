import * as React from 'react'
import { ServicesGrid } from '../components/sections'
import { Button } from '../components/ui'
import { Section } from '../components/layout'

const Services: React.FC = () => {
  return (
    <div className="space-y-12">
      <Section py="normal">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
          <p className="text-slate-600">Explore what TechSign can do for you</p>
        </div>
      </Section>

      <Section py="normal">
        <ServicesGrid />
      </Section>

      <Section py="normal">
        <div className="text-center">
          <a href="#contact">
            <Button>Contact Us</Button>
          </a>
        </div>
      </Section>
    </div>
  )
}

export default Services
