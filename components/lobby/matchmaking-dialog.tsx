"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Swords } from "lucide-react"
import { motion } from "framer-motion"

interface MatchmakingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MatchmakingDialog({ open, onOpenChange }: MatchmakingDialogProps) {
  const [dots, setDots] = useState("")
  const [searchText, setSearchText] = useState("Finding opponent")

  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ""
        return prev + "."
      })
    }, 500)

    const textInterval = setInterval(() => {
      setSearchText((prev) => {
        const texts = ["Finding opponent", "Analyzing skill level", "Preparing battle arena", "Almost ready"]
        const currentIndex = texts.indexOf(prev)
        return texts[(currentIndex + 1) % texts.length]
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-sm">
        <div className="flex justify-end">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-6 w-6">
            
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-6 py-8">
          {/* Animated Swords */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <Swords className="h-16 w-16 text-primary" />
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              />
            </motion.div>
          </div>

          {/* Search Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {searchText}
              {dots}
            </h3>
            <p className="text-muted-foreground">This might take a few seconds, hang tight!</p>
          </div>

          {/* Orbital Dots */}
          

          {/* Cancel Button */}
          <Button variant="destructive" onClick={() => onOpenChange(false)} className="mt-4">
            Cancel Matchmaking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
