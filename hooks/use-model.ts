import { useModelStore } from '@/lib/store'

export const useModel = () => {
  const { selectedModel, setSelectedModel, getSelectedModel } = useModelStore()
  
  return {
    selectedModel,
    setSelectedModel,
    getSelectedModel,
    selectedModelId: selectedModel.id,
    selectedModelName: selectedModel.name,
  }
}
