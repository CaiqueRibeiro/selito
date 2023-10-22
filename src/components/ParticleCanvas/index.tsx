import React, { useRef, useEffect } from "react"

interface Particle {
  x: number
  y: number
  color: string
  radius: number
  speed: number
  directionAngle: number
  vector: {
    x: number
    y: number
  }
  update: () => void
  border: () => void
  draw: () => void
}

interface Options {
  particleColor: string
  lineColor: string
  particleAmount: number
  defaultRadius: number
  variantRadius: number
  defaultSpeed: number
  variantSpeed: number
  linkRadius: number
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const w = typeof window !== 'undefined' ? window.outerWidth : 0
  const h = typeof window !== 'undefined' ? window.outerHeight : 0
  const particles: Particle[] = []
  const options: Options = {
    particleColor: "rgba(255,255,255)",
    lineColor: "rgba(0,181,255)",
    particleAmount: 80,
    defaultRadius: 0,
    variantRadius: 1,
    defaultSpeed: 1,
    variantSpeed: 1,
    linkRadius: 250,
  }
  const rgb = options.lineColor.match(/\d+/g)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    const resizeReset = () => {
      canvas?.setAttribute("width", w.toString())
      canvas?.setAttribute("height", h.toString())
    }

    const initialiseElements = () => {
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new ParticleClass())
      }
    }

    const startAnimation = () => {
      animationLoop()
    }

    const animationLoop = () => {
      ctx?.clearRect(0, 0, w, h)
      drawScene()

      requestAnimationFrame(animationLoop)
    }

    const drawScene = () => {
      drawLine()
      drawParticle()
    }

    const drawParticle = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
    }

    const drawLine = () => {
      for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles)
      }
    }

    const linkPoints = (point: Particle, hubs: Particle[]) => {
      for (let i = 0; i < hubs.length; i++) {
        const distance = checkDistance(
          point.x,
          point.y,
          hubs[i].x,
          hubs[i].y
        )
        const opacity = 1 - distance / options.linkRadius
        if (opacity > 0) {
          ctx?.beginPath()
          ctx?.moveTo(point.x, point.y)
          ctx?.lineTo(hubs[i].x, hubs[i].y)
          ctx?.closePath()
          ctx!.strokeStyle =
            "rgba(" +
            rgb?.[0] +
            "," +
            rgb?.[1] +
            "," +
            rgb?.[2] +
            "," +
            opacity +
            ")"
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }

    const checkDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    class ParticleClass implements Particle {
      x = Math.random() * w
      y = Math.random() * h
      color = options.particleColor
      radius = options.defaultRadius + Math.random() * options.variantRadius
      speed = options.defaultSpeed + Math.random() * options.variantSpeed
      directionAngle = Math.floor(Math.random() * 360)
      vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed,
      }

      update = () => {
        this.border()
        this.x += this.vector.x
        this.y += this.vector.y
      }

      border = () => {
        if (this.x >= w || this.x <= 0) {
          this.vector.x *= -1
        }
        if (this.y >= h || this.y <= 0) {
          this.vector.y *= -1
        }
        if (this.x > w) this.x = w
        if (this.y > h) this.y = h
        if (this.x < 0) this.x = 0
        if (this.y < 0) this.y = 0
      }

      draw = () => {
        ctx?.beginPath()
        ctx?.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx?.closePath()
        ctx!.fillStyle = this.color
        ctx?.fill()
      }
    }

    resizeReset()
    initialiseElements()
    startAnimation()
  }, [])

  return <canvas className="fixed border" ref={canvasRef} />
}

export default ParticleCanvas