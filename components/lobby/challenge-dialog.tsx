"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, Users, Link2, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ChallengeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ChallengeDialog({ open, onOpenChange }: ChallengeDialogProps) {
  const [step, setStep] = useState<"create" | "share">("create")
  const [challengeLink, setChallengeLink] = useState("")
  const [copied, setCopied] = useState(false)

  const generateChallenge = () => {
    // Generate a unique challenge link
    const challengeId = Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/duel/${challengeId}`
    setChallengeLink(link)
    setStep("share")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(challengeLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleClose = () => {
    setStep("create")
    setChallengeLink("")
    setCopied(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Challenge Someone</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6 py-4"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Create Challenge Link</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate a unique link to challenge your friends to a coding duel
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="challenge-name">Challenge Name (Optional)</Label>
                  <Input id="challenge-name" placeholder="Epic Coding Battle" className="mt-1" />
                </div>

                <Button onClick={generateChallenge} className="w-full glow-blue" size="lg">
                  <Link2 className="h-4 w-4 mr-2" />
                  Generate Challenge Link
                </Button>
              </div>
            </motion.div>
          )}

          {step === "share" && (
            <motion.div
              key="share"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Challenge Created!</h3>
                  <p className="text-muted-foreground text-sm">Share this link with your friend to start the duel</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Challenge Link</Label>
                  <div className="flex mt-1">
                    <Input value={challengeLink} readOnly className="rounded-r-none" />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      className="rounded-l-none border-l-0 bg-transparent"
                    >
                      {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copied && <p className="text-green-500 text-xs mt-1">Copied to clipboard!</p>}
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "CodeDuel Challenge",
                          text: "Join me for a coding duel!",
                          url: challengeLink,
                        })
                      }
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handleClose} className="flex-1">
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
