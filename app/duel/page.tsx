"use client"

import { useState, FC } from "react"
import { BattleNavbar } from "@/components/duel/battle-navbar"
import { ConsolePanel } from "@/components/duel/console-panel"
import { CurrentPlayerPanel } from "@/components/duel/current-player-panel"
import { OpponentPanel } from "@/components/duel/opponent-panel"
import { ProblemDescription } from "@/components/duel/problem-description"
import { Panel, PanelGroup } from "react-resizable-panels"
import { DuelProvider } from "@/context/duel-context"

export default function DuelPage() {
  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  return (
    <DuelProvider duelId="demo-duel-123" playerId="player1">
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <BattleNavbar />
        <div className="flex-1 flex min-h-0">
          <PanelGroup direction="horizontal">
            <ProblemDescription
              collapsed={problemSidebarCollapsed}
              onCollapse={setProblemSidebarCollapsed}
            />
            <Panel defaultSize={problemSidebarCollapsed ? 100 : 75}>
              <PanelGroup direction="vertical">
                <Panel defaultSize={consoleCollapsed ? 100 : 70}>
                  <PanelGroup direction="horizontal">
                    <CurrentPlayerPanel collapsed={opponentEditorCollapsed} />
                    <OpponentPanel
                      collapsed={opponentEditorCollapsed}
                      onCollapse={setOpponentEditorCollapsed}
                    />
                  </PanelGroup>
                </Panel>
                <ConsolePanel
                  collapsed={consoleCollapsed}
                  onCollapse={setConsoleCollapsed}
                />
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </DuelProvider>

  )
}
