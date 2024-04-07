import { useEffect, useState } from 'react'

export const useDraggHandler = () => {
  const [initialBorderPosition, setInitialBorderPosition] = useState<{ md: number; lg: number }>({ md: 225, lg: 300 }) // Initial position of the border
  const [borderPosition, setBorderPosition] = useState<any>(initialBorderPosition) // Initial position of the border

  const mouseDownHandler = (e: any) => {
    const startX = e.clientX
    const startWidth = parseInt(borderPosition, 10) // Gets the number, removing possible 'px' or '%'

    const handleMouseMove = (e: any) => {
      const newWidth = startWidth - e.clientX + startX

      // Minimum limit
      if (
        (window.innerWidth >= 768 && window.innerWidth < 1024 && newWidth < window.innerWidth * 0.3) || //
        (window.innerWidth >= 1024 && newWidth < initialBorderPosition.lg)
      )
        return

      // Maximum limit
      if (
        (window.innerWidth >= 1670 && newWidth > window.innerWidth * 0.35) || //
        (window.innerWidth < 1670 && window.innerWidth >= 1550 && newWidth > initialBorderPosition.lg + window.innerWidth * 0.1) ||
        (window.innerWidth < 1550 && window.innerWidth >= 1420 && newWidth > initialBorderPosition.lg + window.innerWidth * 0.08) ||
        (window.innerWidth < 1420 && window.innerWidth >= 1400 && newWidth > initialBorderPosition.lg + window.innerWidth * 0.05) ||
        (window.innerWidth < 1400 && window.innerWidth >= 1280 && newWidth > initialBorderPosition.lg) ||
        (window.innerWidth < 1280 && window.innerWidth >= 1070 && newWidth > initialBorderPosition.lg + window.innerWidth * 0.03) ||
        (window.innerWidth < 1070 && window.innerWidth >= 1024 && newWidth > initialBorderPosition.lg) ||
        (window.innerWidth < 1024 && window.innerWidth >= 850 && newWidth > window.innerWidth * 0.3 + window.innerWidth * 0.07) ||
        (window.innerWidth < 850 && newWidth > window.innerWidth * 0.3)
      )
        return

      setBorderPosition(newWidth + 'px')
    }

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setBorderPosition(initialBorderPosition.lg)
    } else if (window.innerWidth >= 768) {
      setBorderPosition(window.innerWidth * (3 / 10))
    } else {
      setBorderPosition('100%')
    }
  }, [window.innerWidth])

  return { mouseDownHandler, borderPosition }
}
