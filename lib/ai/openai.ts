import OpenAI from 'openai'
import { AIRequest, AIResponse } from './types'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Available OpenAI models
export const OPENAI_MODELS = {
  'gpt-4': 'gpt-4',
  'gpt-4-turbo': 'gpt-4-turbo-preview',
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'text-davinci-003': 'text-davinci-003',
  'text-curie-001': 'text-curie-001',
  'text-babbage-001': 'text-babbage-001',
  'text-ada-001': 'text-ada-001',
} as const

export type OpenAIModel = keyof typeof OPENAI_MODELS

export async function generateOpenAIResponse(
  request: AIRequest
): Promise<AIResponse> {
  try {
    const model = request.model || 'gpt-3.5-turbo'
    
    // Check if it's a chat model or completion model
    const isChatModel = model.startsWith('gpt-')
    
    if (isChatModel) {
      const response = await openai.chat.completions.create({
        model: OPENAI_MODELS[model as OpenAIModel] || 'gpt-3.5-turbo',
        messages: request.messages.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content,
        })),
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2048,
        top_p: request.topP || 0.9,
      })

      return {
        content: response.choices[0]?.message?.content || '',
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens,
        } : undefined,
      }
    } else {
      // For completion models (text-davinci-003, etc.)
      const prompt = request.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')
      
      const response = await openai.completions.create({
        model: OPENAI_MODELS[model as OpenAIModel] || 'text-davinci-003',
        prompt,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 2048,
        top_p: request.topP || 0.9,
      })

      return {
        content: response.choices[0]?.text || '',
        usage: response.usage ? {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          totalTokens: response.usage.total_tokens,
        } : undefined,
      }
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('Failed to generate response from OpenAI')
  }
}
