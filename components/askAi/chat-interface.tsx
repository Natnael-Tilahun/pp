"use client"

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Trash2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAIChat } from '@/hooks/use-ai-chat'
import { AIMessage } from '@/lib/ai/types'
import { useModel } from '@/hooks/use-model'

interface ChatInterfaceProps {
  selectedModel?: string
  temperature?: number
  maxTokens?: number
  topP?: number
}

export function ChatInterface({
  selectedModel,
  temperature = 0.7,
  maxTokens = 2048,
  topP = 0.9,
}: ChatInterfaceProps) {
  const { selectedModel: storeSelectedModel } = useModel()
  const { messages, isLoading, error, sendMessage, clearChat, removeMessage } = useAIChat()
  
  // Use the model from props if provided, otherwise use the store model
  const currentModel = selectedModel || storeSelectedModel.id
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const currentInput = input
    setInput('')

    await sendMessage(currentInput, {
      model: currentModel,
      temperature,
      maxTokens,
      topP,
    })
  }

  const handleResend = async (messageContent: string) => {
    if (isLoading) return

    await sendMessage(messageContent, {
      model: currentModel,
      temperature,
      maxTokens,
      topP,
      isResend: true,
    })
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => (
        <div key={i} className="mb-2">
          {line}
        </div>
      ))
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Chat</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearChat}
            disabled={messages.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 min-h-[400px] max-h-[600px] border p-4 md:min-h-[600px] lg:min-h-[600px] rounded-md">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Start a conversation with AI
          </div>
        ) : (
          messages.map((message: AIMessage, index: number) => (
            <Card key={index} className={`${
              message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto'
            } max-w-[80%] px-4 py-4`}>
              <CardContent className='p-0'>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* <div className="text-sm font-medium mb-1">
                      {message.role === 'user' ? 'You' : 'AI'}
                    </div> */}
                    <div className="text-sm whitespace-pre-wrap">
                      {formatMessage(message.content)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-2">
                    {message.role === 'user' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResend(message.content)}
                            disabled={isLoading}
                            className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary/80"
                          >
                            {isLoading ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <RotateCcw className="h-3 w-3" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Resend message</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {message.role === 'assistant' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMessage(index)}
                            className="h-6 w-6 p-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove message</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {isLoading && (
          <Card className="mr-auto max-w-[80%]">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </CardContent>
          </Card>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          Error: {error}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[80px] resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {messages.length} messages
          </div>
          <Button type="submit" disabled={!input.trim() || isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </Button>
        </div>
      </form>
      </div>
    </TooltipProvider>
  )
}
