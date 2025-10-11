import * as React from 'react'
import { SERVICES } from '../../constants/services'
import ServiceCard from '../cards/ServiceCard'

const ServicesGrid: React.FC = () => {
  return (
    <div>
      {SERVICES.map((s) => (
        <ServiceCard
          key={s.id}
          // title={s.title}
          videoSrc={s.videoSrc}
          // poster={s.poster}
        />
      ))}
    </div>
  )
}

export default ServicesGrid
