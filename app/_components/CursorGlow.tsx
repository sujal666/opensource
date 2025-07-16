'use client'

import React, { useEffect, useRef } from 'react'

export const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      x += (targetX - x) * 0.3 // Increase 0.3 → 1 for even faster
      y += (targetY - y) * 0.3
      if (glow) {
        glow.style.transform = `translate3d(${x - 75}px, ${y - 75}px, 0)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <div className="w-[150px] h-[150px] rounded-full bg-white/20 blur-3xl" />
    </div>
  )
}
