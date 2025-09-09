import * as React from 'react'
import { cn } from '../../lib/cn'
import type { FeatureCardData } from '../../types'
import { Button } from '../ui'

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FeatureCardData
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ data, className, ...props }) => {
  return (
    <div
      className={cn('rounded-lg border border-slate-200 p-4 shadow-sm bg-white', className)}
      role="region"
      aria-labelledby={`${data.id}-title`}
      {...props}
    >
      <h3 id={`${data.id}-title`} className="font-semibold text-slate-900">
        {data.title}
      </h3>
      <p className="mt-1 text-sm text-slate-600">{data.description}</p>
      <div className="mt-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          disabled={data.action.disabled}
          onClick={() => {
            if (data.action.href && !data.action.disabled) {
              window.location.hash = data.action.href
            }
          }}
          aria-label={data.action.label}
        >
          {data.action.label}
        </Button>
      </div>
    </div>
  )
}

export default FeatureCard
