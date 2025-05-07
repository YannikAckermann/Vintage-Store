"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const moods = [
  { emoji: "😔", label: "Sehr schlecht", color: "bg-red-100 border-red-300" },
  { emoji: "😕", label: "Schlecht", color: "bg-orange-100 border-orange-300" },
  { emoji: "😐", label: "Neutral", color: "bg-yellow-100 border-yellow-300" },
  { emoji: "🙂", label: "Gut", color: "bg-green-100 border-green-300" },
  { emoji: "😄", label: "Sehr gut", color: "bg-blue-100 border-blue-300" },
]

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index)
    setSaved(false)
  }

  const handleSave = () => {
    if (selectedMood !== null) {
      setSaved(true)
      // In a real app, you would save this to a database
      console.log(`Mood saved: ${moods[selectedMood].label}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-2">
        {moods.map((mood, index) => (
          <motion.div key={index} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
            <Card
              className={`p-4 flex flex-col items-center cursor-pointer border-2 transition-all duration-300 ${
                selectedMood === index
                  ? `${mood.color} border-opacity-100 shadow-md`
                  : "bg-white border-gray-200 border-opacity-50"
              }`}
              onClick={() => handleMoodSelect(index)}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-xs text-center text-gray-700">{mood.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={handleSave}
          disabled={selectedMood === null || saved}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          {saved ? "Gespeichert ✓" : "Stimmung speichern"}
        </Button>

        {saved && <p className="text-green-600 text-sm">Deine Stimmung wurde erfolgreich gespeichert!</p>}
      </div>

      <div className="text-sm text-gray-600 mt-4">
        <p>
          Regelmäßiges Tracking deiner Stimmung kann dir helfen, Muster zu erkennen und dein emotionales Wohlbefinden
          besser zu verstehen.
        </p>
      </div>
    </div>
  )
}
