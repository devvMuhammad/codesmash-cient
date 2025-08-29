"use client"

import { useEffect } from "react"
import * as monaco from "monaco-editor"

export function useMonacoTheme() {
  useEffect(() => {
    // Configure Monaco Editor for better integration
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
    })

    // Add custom completions for common coding interview patterns
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: "twoSum",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "function twoSum(nums, target) {\n    $0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Two Sum problem template",
          },
          {
            label: "hashmap",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "const map = new Map();\nfor (let i = 0; i < ${1:array}.length; i++) {\n    $0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "HashMap iteration pattern",
          },
          {
            label: "twopointer",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "let left = 0, right = ${1:array}.length - 1;\nwhile (left < right) {\n    $0\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Two pointer technique",
          },
        ]

        return { suggestions }
      },
    })
  }, [])
}
