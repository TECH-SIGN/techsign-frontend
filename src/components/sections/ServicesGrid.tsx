import * as React from 'react'
import { SERVICES } from '../../constants/services'
import ServiceCard from '../cards/ServiceCard'

const ServicesGrid: React.FC = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
      {SERVICES.map((s) => (
        <ServiceCard
          key={s.id}
          title={s.title}
          description={s.description}
          icon={s.icon}
          ctaLabel={s.ctaLabel}
          ctaHref={s.ctaHref}
        />
      ))}
    </div>
  )
}

export default ServicesGrid
