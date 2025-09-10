import * as React from 'react'
import { FeatureCard } from '../components/cards'
import { BRAND_NAME, FEATURE_CARDS } from '../constants'
import { Button } from '../components/ui'

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to TechSign</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Your trusted platform for digital commerce and services. Manage your account,
            explore policies, and access all our features.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12">
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
