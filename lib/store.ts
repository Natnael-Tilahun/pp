import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { models, Model } from '@/components/askAi/data/models'
import { Preset } from '@/components/askAi/data/presets'

interface ModelStore {
  selectedModel: Model
  setSelectedModel: (model: Model) => void
  getSelectedModel: () => Model
}

interface AISettingsStore {
  temperature: number
  maxTokens: number
  topP: number
  instructions: string
  setTemperature: (temperature: number) => void
  setMaxTokens: (maxTokens: number) => void
  setTopP: (topP: number) => void
  setInstructions: (instructions: string) => void
  getSettings: () => { temperature: number; maxTokens: number; topP: number; instructions: string }
}

interface PresetStore {
  selectedPreset: Preset | null
  instructions: string
  setSelectedPreset: (preset: Preset | null) => void
  setInstructions: (instructions: string) => void
  clearPreset: () => void
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

export const useAISettingsStore = create<AISettingsStore>()(
  persist(
    (set, get) => ({
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.9,
      instructions: '',
      setTemperature: (temperature: number) => set({ temperature }),
      setMaxTokens: (maxTokens: number) => set({ maxTokens }),
      setTopP: (topP: number) => set({ topP }),
      setInstructions: (instructions: string) => set({ instructions }),
      getSettings: () => {
        const state = get()
        return {
          temperature: state.temperature,
          maxTokens: state.maxTokens,
          topP: state.topP,
          instructions: state.instructions,
        }
      },
    }),
    {
      name: 'ai-settings-store',
    }
  )
)

export const usePresetStore = create<PresetStore>()(
  persist(
    (set, get) => ({
      selectedPreset: null,
      instructions: '',
      setSelectedPreset: (preset: Preset | null) => {
        set({ 
          selectedPreset: preset,
          instructions: preset ? preset.instructions : ''
        })
      },
      setInstructions: (instructions: string) => set({ instructions }),
      clearPreset: () => set({ selectedPreset: null, instructions: '' }),
    }),
    {
      name: 'preset-store',
    }
  )
)