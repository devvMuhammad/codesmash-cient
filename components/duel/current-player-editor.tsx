"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { User, Wifi } from "lucide-react"
import { MonacoEditor } from "./monaco-editor"

interface CurrentPlayerEditorProps {
  playerName: string
}

export function CurrentPlayerEditor({ playerName }: CurrentPlayerEditorProps) {
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your solution here
    
}`)

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  return (
    <Card className="h-full rounded-none border-0 flex flex-col">
      

      <div className="flex-1 relative">
        <MonacoEditor
          value={code}
          onChange={handleCodeChange}
          language="javascript"
          readOnly={false}
          playerId="current"
        />
      </div>
    </Card>
  )
}
