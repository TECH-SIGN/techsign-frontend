import * as React from 'react'
import { FeatureCard } from '../components/cards'
import { FEATURE_CARDS } from '../constants'
import { Button } from '../components/ui'

const Home: React.FC = () => {
  return (
    <section className="space-y-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Welcome to TechSign</h1>
      <p className="text-slate-600 max-w-3xl mx-auto">
        Your trusted platform for digital commerce and services. Manage your account,
        explore policies, and access all our features.
      </p>

      <div className="mx-auto max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-3 text-left">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.id} data={card} />
          ))}
        </div>
      </div>

      <div className="pt-2">
        <h2 className="text-xl font-semibold">Quick Access</h2>
        <div className="mt-3 flex justify-center">
          <Button className="min-w-56">Account Deletion Policy</Button>
        </div>
      </div>
    </section>
  )
}

export default Home
