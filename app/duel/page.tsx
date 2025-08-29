"use client"

import { useState } from "react"
import { ProblemPanel } from "@/components/duel/problem-panel"
import { CurrentPlayerEditor } from "@/components/duel/current-player-editor"
import { OpponentEditor } from "@/components/duel/opponent-editor"
import { OutputTerminal } from "@/components/duel/output-terminal"
import { BattleNavbar } from "@/components/duel/battle-navbar"
import { useMonacoTheme } from "@/hooks/use-monaco-theme"
import { DuelProvider } from "@/context/duel-context"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

export default function DuelPage() {
  useMonacoTheme()

  const [problemSidebarCollapsed, setProblemSidebarCollapsed] = useState(false)
  const [consoleCollapsed, setConsoleCollapsed] = useState(false)
  const [opponentEditorCollapsed, setOpponentEditorCollapsed] = useState(false)

  const duelId = "demo-duel-123"
  const playerId = "player1"

  return (
    <DuelProvider duelId={duelId} playerId={playerId}>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <BattleNavbar />

        <div className="flex-1 flex min-h-0">
          <PanelGroup direction="horizontal">
            {/* Problem Sidebar Panel - Back to left side */}
            {!problemSidebarCollapsed && (
              <Panel defaultSize={25} minSize={20} maxSize={40} className="border-r border-border/40">
                <div className="h-full flex flex-col">
                  <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
                    <span className="text-sm font-medium text-muted-foreground">Problem Description</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProblemSidebarCollapsed(true)}
                      className="h-6 w-6 p-0 hover:bg-muted"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Problem Content */}
                  <div className="flex-1 min-h-0">
                    <ProblemPanel />
                  </div>
                </div>
              </Panel>
            )}

            {problemSidebarCollapsed && (
              <div className="w-12 border-r border-border/40 bg-muted/10 flex flex-col items-center justify-start pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setProblemSidebarCollapsed(false)}
                  className="h-8 w-8 p-0 hover:bg-muted mb-2"
                  title="Show Problem Description"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mt-4">Problem</div>
              </div>
            )}

            {!problemSidebarCollapsed && (
              <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />
            )}

            {/* Editors Panel Group - Back to right side */}
            <Panel defaultSize={problemSidebarCollapsed ? 100 : 75} minSize={30}>
              <PanelGroup direction="vertical">
                {/* Editors Row */}
                <Panel defaultSize={consoleCollapsed ? 100 : 70} minSize={40}>
                  <PanelGroup direction="horizontal">
                    <Panel defaultSize={opponentEditorCollapsed ? 100 : 50} minSize={30}>
                      <div className="h-full flex flex-col">
                        <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">You</span>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-400">Connected</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOpponentEditorCollapsed(true)}
                            className="h-6 w-6 p-0 hover:bg-muted"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex-1 min-h-0">
                          <CurrentPlayerEditor playerName="You" />
                        </div>
                      </div>
                    </Panel>

                    {!opponentEditorCollapsed && (
                      <>
                        <PanelResizeHandle className="w-1 bg-border/40 hover:bg-border transition-colors" />
                        <Panel defaultSize={50} minSize={30}>
                          <div className="h-full flex flex-col">
                            {/* Opponent Editor Header with Collapse */}
                            <div className="h-10 border-b border-border/40 flex items-center justify-between px-3 bg-muted/20">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-muted-foreground">Opponent</span>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-green-400">Connected</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setOpponentEditorCollapsed(true)}
                                className="h-6 w-6 p-0 hover:bg-muted"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex-1 min-h-0">
                              <OpponentEditor playerName="Opponent" status="connected" />
                            </div>
                          </div>
                        </Panel>
                      </>
                    )}

                    {/* Collapsed Opponent Editor Toggle */}
                    {opponentEditorCollapsed && (
                      <div className="w-12 border-l border-border/40 bg-muted/10 flex flex-col items-center justify-start pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setOpponentEditorCollapsed(false)}
                          className="h-8 w-8 p-0 hover:bg-muted mb-2"
                          title="Show Opponent Editor"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-xs text-muted-foreground transform -rotate-90 whitespace-nowrap mt-4">
                          Opponent
                        </div>
                      </div>
                    )}
                  </PanelGroup>
                </Panel>

                {/* Console Panel */}
                {!consoleCollapsed && (
                  <>
                    <PanelResizeHandle className="h-1 bg-border/40 hover:bg-border transition-colors" />
                    <Panel defaultSize={30} minSize={15} maxSize={50} className="border-t border-border/40">
                      <div className="h-full flex flex-col">
                        <div className="h-12 border-b border-border/40 flex items-center justify-between px-4 bg-muted/20">
                          <span className="text-sm font-medium text-muted-foreground">Console Output</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConsoleCollapsed(true)}
                            className="h-6 w-6 p-0 hover:bg-muted"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Console Content */}
                        <div className="flex-1 min-h-0">
                          <OutputTerminal />
                        </div>
                      </div>
                    </Panel>
                  </>
                )}

                {consoleCollapsed && (
                  <div className="h-12 border-t border-border/40 bg-muted/10 flex items-center justify-between px-4">
                    <span className="text-sm font-medium text-muted-foreground">Console Output</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConsoleCollapsed(false)}
                      className="h-8 w-8 p-0 hover:bg-muted"
                      title="Show Console"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </DuelProvider>
  )
}
