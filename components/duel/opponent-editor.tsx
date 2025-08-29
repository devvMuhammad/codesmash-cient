"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { MonacoEditor } from "./monaco-editor"
import { useDuel } from "@/context/duel-context"

interface OpponentEditorProps {
  playerName: string
  status: "connected" | "disconnected" | "typing"
}

export function OpponentEditor({ playerName, status }: OpponentEditorProps) {
  const { codeSync } = useDuel()
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Opponent's solution
    
}`)

  useEffect(() => {
    const opponentCode = codeSync.playerCode["player2"]
    if (opponentCode && opponentCode !== code) {
      setCode(opponentCode)
    }
  }, [codeSync.playerCode, code])


  return (
    <Card className="h-full rounded-none border-0 flex flex-col">
      <div className="flex-1 relative min-h-0">
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 z-10 pointer-events-none" />
        <MonacoEditor
          value={code}
          onChange={() => { }} // No-op for opponent editor
          language="javascript"
          readOnly={true}
          playerId="opponent"
        />
      </div>
    </Card>
  )
}
