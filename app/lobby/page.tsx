"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap, UserPlus } from "lucide-react"
import { CommonNavbar } from "@/components/common-navbar"
import { MatchmakingDialog } from "@/components/lobby/matchmaking-dialog"
import { ChallengeDialog } from "@/components/lobby/challenge-dialog"
import { LiveBattles } from "@/components/lobby/live-battles"

export default function LobbyPage() {
  const [isMatchmaking, setIsMatchmaking] = useState(false)
  const [isChallenging, setIsChallenging] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <CommonNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Live Battles</h1>
            <p className="text-muted-foreground">Watch ongoing battles and join the action</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="lg" className="glow-blue" onClick={() => setIsMatchmaking(true)}>
              <Zap className="h-4 w-4 mr-2" />
              Find Match
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 bg-transparent"
              onClick={() => setIsChallenging(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Challenge Friend
            </Button>
          </div>
        </div>

        <LiveBattles />
      </div>

      <MatchmakingDialog open={isMatchmaking} onOpenChange={setIsMatchmaking} />
      <ChallengeDialog open={isChallenging} onOpenChange={setIsChallenging} />
    </div>
  )
}
