import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { models, Model } from '@/components/askAi/data/models'

interface ModelStore {
  selectedModel: Model
  setSelectedModel: (model: Model) => void
  getSelectedModel: () => Model
}

// Find the default model (gemini-1.5-flash)
const defaultModel = models.find(model => model.id === 'gemini-1.5-flash') || models[0]

// Validate that we have a valid default model
if (!defaultModel) {
  throw new Error('No valid default model found')
}

export const useModelStore = create<ModelStore>()(
  persist(
    (set, get) => ({
      selectedModel: defaultModel,
      setSelectedModel: (model: Model) => set({ selectedModel: model }),
      getSelectedModel: () => get().selectedModel,
    }),
    {
      name: 'model-store',
    }
  )
)
