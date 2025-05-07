"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function BreathingAnimation() {
  const [isBreathing, setIsBreathing] = useState(false)
  const [instruction, setInstruction] = useState("Klicke zum Starten")

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isBreathing) {
      // Cycle through breathing instructions
      const breathingCycle = () => {
        // Inhale for 4 seconds
        setInstruction("Einatmen...")
        timer = setTimeout(() => {
          // Hold for 4 seconds
          setInstruction("Halten...")
          timer = setTimeout(() => {
            // Exhale for 6 seconds
            setInstruction("Ausatmen...")
            timer = setTimeout(() => {
              // Repeat
              breathingCycle()
            }, 6000)
          }, 4000)
        }, 4000)
      }

      breathingCycle()
    } else {
      setInstruction("Klicke zum Starten")
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isBreathing])

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing)
  }

  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      transition: { duration: 4, ease: "linear" },
    },
    exhale: {
      scale: 1,
      transition: { duration: 6, ease: "easeInOut" },
    },
    idle: {
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  const getAnimationState = () => {
    if (!isBreathing) return "idle"

    switch (instruction) {
      case "Einatmen...":
        return "inhale"
      case "Halten...":
        return "hold"
      case "Ausatmen...":
        return "exhale"
      default:
        return "idle"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center" onClick={toggleBreathing}>
      <motion.div
        className="w-40 h-40 bg-gradient-to-r from-green-300 to-blue-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        animate={getAnimationState()}
        variants={circleVariants}
      >
        <div className="text-white text-lg font-medium">{instruction}</div>
      </motion.div>
      <p className="mt-6 text-gray-600 text-center max-w-md">
        {isBreathing
          ? "Folge dem Rhythmus. Atme tief durch die Nase ein und durch den Mund aus."
          : "Klicke auf den Kreis, um eine geführte Atemübung zu starten."}
      </p>
    </div>
  )
}
