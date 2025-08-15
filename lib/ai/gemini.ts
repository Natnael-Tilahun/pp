import { GoogleGenAI } from '@google/genai'
import { AIMessage, AIRequest, AIResponse } from './types'

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

// Available Gemini models
export const GEMINI_MODELS = {
  'gemini-1.5-flash': 'models/gemini-1.5-flash',
  'gemini-1.5-pro': 'models/gemini-1.5-pro',
  'gemini-2.0-flash': 'models/gemini-2.0-flash',
  'gemini-2.0-pro': 'models/gemini-2.0-pro',
  'gemini-2.5-flash': 'models/gemini-2.5-flash'
} as const

export type GeminiModel = keyof typeof GEMINI_MODELS

export async function generateGeminiResponse(
  request: AIRequest
): Promise<AIResponse> {
  // Use the request model or fallback to default
  const model = request.model || 'gemini-1.5-flash'

  console.log("GEMINI_MODELS[model as GeminiModel]: ", GEMINI_MODELS[model as GeminiModel])
  let modelName = GEMINI_MODELS[model as GeminiModel] || GEMINI_MODELS['gemini-1.5-flash']
  
  // Fallback to a more stable model if the requested one might not be available
  if (modelName.includes('gemini-2.0')) {
    modelName = GEMINI_MODELS['gemini-1.5-flash']
  }
  
  try {
    // Extract system instructions and user/assistant messages
    const systemMessages = request.messages.filter(msg => msg.role === 'system')
    const conversationMessages = request.messages.filter(msg => msg.role !== 'system')
    
    // Combine all system instructions into one
    const systemInstruction = systemMessages.length > 0 
      ? systemMessages.map(msg => msg.content).join('\n\n')
      : undefined

    // Convert conversation messages to the Gemini format
    const contents = conversationMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    console.log('Sending request to Gemini:', {
      model: modelName,
      messageCount: contents.length,
      systemInstruction: systemInstruction ? systemInstruction.substring(0, 100) + '...' : 'None',
      firstMessage: contents[0]?.parts[0]?.text?.substring(0, 100) + '...'
    })

    // Generate content using the new API with system instruction
    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        temperature: request.temperature || 1.1,
        topP: request.topP || 0.9,
        maxOutputTokens: request.maxTokens || 2048,
        candidateCount: 1,
        systemInstruction: systemInstruction ? {
          parts: [{ text: systemInstruction }]
        } : undefined,
      },
    })

    return {
      content: response.text || '',
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount || 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: response.usageMetadata?.totalTokenCount || 0,
      }
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    console.error('Model used:', modelName)
    console.error('Request details:', {
      model: request.model,
      temperature: request.temperature,
      maxTokens: request.maxTokens,
      messageCount: request.messages.length
    })
    
    // Provide more specific error information
    if (error instanceof Error) {
      throw new Error(`Gemini API error: ${error.message}`)
    } else {
      throw new Error('Failed to generate response from Gemini')
    }
  }
}
