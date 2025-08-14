export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIRequest {
  messages: AIMessage[]
  model?: string
  temperature?: number
  maxTokens?: number
  topP?: number
}

export interface AIResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface AIModel {
  id: string
  name: string
  description: string
  type: 'gemini' | 'openai'
  maxTokens?: number
}

export interface ChatState {
  messages: AIMessage[]
  isLoading: boolean
  error: string | null
}
