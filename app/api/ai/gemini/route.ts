import { NextRequest, NextResponse } from 'next/server'
import { generateGeminiResponse } from '@/lib/ai/gemini'
import { AIRequest } from '@/lib/ai/types'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const body: AIRequest = await request.json()
    
    // Validate request
    if (!body.messages || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      )
    }

    // Generate response from Gemini
    const response = await generateGeminiResponse(body)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
