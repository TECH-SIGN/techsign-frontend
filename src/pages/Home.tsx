import * as React from 'react'
import { FeatureCard } from '../components/cards'
import { BRAND_NAME, FEATURE_CARDS } from '../constants'
import { Button } from '../components/ui'
import { motion } from 'framer-motion'


const Home: React.FC = () => {
  return (
    <div className='bg-white/100'>
      {/* Hero */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}     // start hidden & below
            animate={{ opacity: 1, y: 0 }}       // animate to visible & normal position
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-slate-950 text-7xl font-bold tracking-tight font-montserrat">{BRAND_NAME} is a digital agency</motion.h1>
          <p className=" text-lg text-slate-800 max-w-3xl mx-auto font-montserrat">
            focused on crafting intelligent websites, powerful backends, and AI-driven solutions that help businesses scale with confidence.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 text-left items-stretch">
            {FEATURE_CARDS.map((card) => (
              <FeatureCard key={card.id} data={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold">Quick Access</h2>
          <div className="mt-4 flex justify-center">
            <Button className="min-w-56">Account Deletion Policy</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
