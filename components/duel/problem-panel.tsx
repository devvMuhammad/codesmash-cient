import { Badge } from "@/components/ui/badge"

export function ProblemPanel() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">Two Sum</h1>
          <Badge variant="secondary">Easy</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="prose prose-invert max-w-none space-y-6">
          {/* Description */}
          <div>
            <p className="text-foreground mb-4">
              Given an array of integers <code className="bg-muted px-1 py-0.5 rounded text-sm">nums</code> and an
              integer <code className="bg-muted px-1 py-0.5 rounded text-sm">target</code>, return indices of the two
              numbers such that they add up to target.
            </p>
            <p className="text-muted-foreground mb-4">
              You may assume that each input would have exactly one solution, and you may not use the same element
              twice.
            </p>
            <p className="text-muted-foreground">You can return the answer in any order.</p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Examples</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Example 1:</h4>
                <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
                  <div>
                    <strong>Input:</strong> nums = [2,7,11,15], target = 9
                  </div>
                  <div>
                    <strong>Output:</strong> [0,1]
                  </div>
                  <div>
                    <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Example 2:</h4>
                <div className="bg-muted/50 p-3 rounded-lg font-mono text-sm">
                  <div>
                    <strong>Input:</strong> nums = [3,2,4], target = 6
                  </div>
                  <div>
                    <strong>Output:</strong> [1,2]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Constraints</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 2 ≤ nums.length ≤ 10⁴</li>
              <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
              <li>• -10⁹ ≤ target ≤ 10⁹</li>
              <li>• Only one valid answer exists.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
