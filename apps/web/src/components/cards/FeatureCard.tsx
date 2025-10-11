import * as React from "react"
import { cn } from "../../lib/cn"
import { Button } from "../ui"
import { FeatureCardProps } from "../../types"


export const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ data, className, ...props }) => {
    const handleClick = React.useCallback(() => {
      if (data.action.disabled) return

      if (data.action.href) {
        // Handle external or internal navigation
        if (data.action.href.startsWith("http")) {
          window.open(data.action.href, "_blank", "noopener,noreferrer")
        } else if (data.action.href.startsWith("#")) {
          window.location.hash = data.action.href
        } else {
          window.location.href = data.action.href
        }
      }
    }, [data.action])

    return (
      <div
        className={cn(
          "rounded-lg border border-slate-200 p-5 shadow-sm bg-white h-full flex flex-col transition hover:shadow-md focus-within:ring-2 focus-within:ring-slate-400",
          className
        )}
        role="region"
        aria-labelledby={`${data.id}-title`}
        {...props}
      >
        {/* Title */}
        <h3
          id={`${data.id}-title`}
          className="font-semibold text-lg text-slate-900"
        >
          {data.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 flex-grow">
          {data.description}
        </p>

        {/* Action */}
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full justify-start whitespace-normal break-words text-left"
            disabled={data.action.disabled}
            onClick={handleClick}
            aria-label={data.action.label}
          >
            {data.action.label}
          </Button>
        </div>
      </div>
    )
  }
)

FeatureCard.displayName = "FeatureCard"

export default FeatureCard
