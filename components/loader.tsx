'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative w-32 h-32">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
            className="text-primary animate-[spin_1s_linear_infinite] origin-center"
          />
        </svg>
        <svg
          className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite] origin-center"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="5"
            ry="5"
            fill="currentColor"
            className="text-primary-foreground"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.6666666666666666s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="5"
            ry="5"
            fill="currentColor"
            className="text-primary-foreground"
            transform="rotate(60 50 50)"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5833333333333334s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="5"
            ry="5"
            fill="currentColor"
            className="text-primary-foreground"
            transform="rotate(120 50 50)"
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin="-0.5s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        {mounted && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-foreground rounded-full opacity-75 blur-xl" />
          </div>
        )}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
