"use client"

import { useState } from "react"
import { RotateCcw, Send, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useAIChat } from "@/hooks/use-ai-chat"
import { useModel } from "@/hooks/use-model"

export function Assistant() {
    const [input, setInput] = useState("")
    const { selectedModel } = useModel()
    const { 
        messages, 
        instructions, 
        isLoading, 
        error, 
        sendMessage, 
        clearChat, 
        updateInstructions 
    } = useAIChat()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const currentInput = input
        setInput("")

        await sendMessage(currentInput, {
            model: selectedModel.id,
        })
    }

    const handleClear = () => {
        clearChat()
        setInput("")
        updateInstructions("")
    }

    const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateInstructions(e.target.value)
    }

    const formatMessage = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => (
                <div key={i} className="mb-2">
                    {line}
                </div>
            ))
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="grid h-full gap-6 lg:grid-cols-2">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-1 flex-col space-y-2">
                        <Label htmlFor="input">Input</Label>
                        <Textarea
                            id="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="We is going to the market."
                            className="flex-1 lg:min-h-[580px]"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="instructions">Instructions (System Prompt)</Label>
                        <Textarea
                            id="instructions"
                            value={instructions}
                            onChange={handleInstructionsChange}
                            placeholder="You are a genius physician. Fix the grammar in the user's text."
                            className="min-h-[100px]"
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px] lg:max-h-[720px] p-4 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                            Enter text and instructions to get started
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <Card key={index} className={`${message.role === 'user' ? 'ml-auto bg-background text-secondary-foreground' : 'mr-auto'
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
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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
                        </div>
                    )}
                    {error && (
                        <div className="text-red-500 text-sm p-2 bg-red-50 rounded mt-4">
                            Error: {error}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button onClick={handleSubmit} disabled={!input.trim() || isLoading}>
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                    Submit
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                    <span className="sr-only">Clear</span>
                    <RotateCcw />
                </Button>
            </div>
        </div>
    )
}
