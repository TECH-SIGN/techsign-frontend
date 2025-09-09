import * as React from 'react'
import { cn } from '../../lib/cn'
import type { ServiceCardProps } from '../../types/services'
import { Button } from '../ui'

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, ctaHref, ctaLabel, className, ...props }) => {
  return (
    <div className={cn('rounded-lg border border-slate-200 p-4 shadow-sm bg-white', className)} {...props}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-700" aria-hidden>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mt-3">
        <a href={ctaHref} aria-label={ctaLabel}>
          <Button variant="outline" className="justify-start">{ctaLabel}</Button>
        </a>
      </div>
    </div>
  )
}

export default ServiceCard
