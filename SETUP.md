# Setup Guide for AI Integration

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Gemini AI (Required for current implementation)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI (Optional - for future OpenAI integration)
OPENAI_API_KEY=your_openai_api_key_here
```

## Getting API Keys

### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env.local` file

### OpenAI API Key (Optional)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the generated API key
5. Paste it in your `.env.local` file

## Testing the Integration

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the Ask AI page
3. Select a Gemini model from the sidebar
4. Try sending a message in the chat interface

## Troubleshooting

- **"Gemini API key not configured"**: Make sure your `.env.local` file exists and contains the `GEMINI_API_KEY`
- **"Failed to generate response"**: Check your internet connection and API key validity
- **Package installation issues**: Run `npm install --legacy-peer-deps` if you encounter dependency conflicts
