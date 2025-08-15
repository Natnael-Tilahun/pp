"use client"

import { useState, useCallback } from 'react'
import { AIMessage, AIRequest, AIResponse, ChatState } from '@/lib/ai/types'
import { useAISettingsStore } from '@/lib/store'

export function useAIChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })
  const { temperature, maxTokens, topP, instructions, setInstructions } = useAISettingsStore()

  const sendMessage = useCallback(async (
    content: string,
    options?: {
      model?: string
      temperature?: number
      maxTokens?: number
      topP?: number
      isResend?: boolean
    }
  ) => {
    if (!content.trim()) return

    let updatedMessages: AIMessage[]

    // If it's a resend, just remove the last assistant message (if any) and keep existing messages
    if (options?.isResend) {
      updatedMessages = state.messages.filter((msg, index) => {
        // Remove the last assistant message if it exists
        if (index === state.messages.length - 1 && msg.role === 'assistant') {
          return false
        }
        return true
      })
    } else {
      // Normal send - add the new user message
      const userMessage: AIMessage = {
        role: 'user',
        content: content.trim(),
      }
      updatedMessages = [...state.messages, userMessage]
    }

    // Update state
    setState(prev => ({
      ...prev,
      messages: updatedMessages,
      isLoading: true,
      error: null,
    }))

    try {
      // Create messages array with system instruction if available
      const messagesToSend = [...updatedMessages]
      
      // Add system instruction if available
      if (instructions.trim()) {
        messagesToSend.unshift({
          role: 'system',
          content: instructions.trim()
        })
      }

      const request: AIRequest = {
        messages: messagesToSend,
        model: options?.model || 'gemini-1.5-flash',
        temperature: options?.temperature ?? temperature,
        maxTokens: options?.maxTokens ?? maxTokens,
        topP: options?.topP ?? topP,
      }

      const response = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AIResponse = await response.json()

      const assistantMessage: AIMessage = {
        role: 'assistant',
        content: data.content,
      }

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Error sending message:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      }))
    }
  }, [state.messages, instructions, temperature, maxTokens, topP])

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    })
  }, [])

  const removeMessage = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.filter((_, i) => i !== index),
    }))
  }, [])

  const updateInstructions = useCallback((newInstructions: string) => {
    setInstructions(newInstructions)
  }, [setInstructions])

  return {
    messages: state.messages,
    instructions,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearChat,
    removeMessage,
    updateInstructions,
  }
}