"use client"

import { Badge } from "@/components/ui/badge"
import { useModel } from "@/hooks/use-model"

export function ModelDisplay() {
  const { selectedModelName, selectedModelId } = useModel()
  
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <span className="text-sm text-muted-foreground">Current Model:</span>
      <Badge variant="outline">
        {selectedModelName} ({selectedModelId})
      </Badge>
    </div>
  )
}
