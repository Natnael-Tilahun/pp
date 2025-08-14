# Propo - AI Playground

A modern AI playground built with Next.js, featuring Gemini AI integration and a beautiful UI.

## Features

- 🤖 **Gemini AI Integration** - Chat with Google's latest AI models
- 🎨 **Modern UI** - Built with shadcn/ui components
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast Performance** - Built with Next.js 15 and React 19
- 🎯 **Multiple AI Models** - Support for Gemini, GPT-3, and Codex models
- 🔧 **Configurable Parameters** - Temperature, max tokens, top-p controls

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd propo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Models

### Gemini Models
- **gemini-1.5-flash** - Fast and efficient for real-time applications
- **gemini-1.5-pro** - Most capable with advanced reasoning
- **gemini-2.0-flash** - Latest generation optimized for speed
- **gemini-2.0-pro** - Most advanced with cutting-edge capabilities

### OpenAI Models
- **text-davinci-003** - Most capable GPT-3 model
- **text-curie-001** - Fast and cost-effective
- **text-babbage-001** - Straightforward tasks
- **text-ada-001** - Simple tasks, fastest and lowest cost

### Codex Models
- **code-davinci-002** - Most capable code generation
- **code-cushman-001** - Fast code generation

## Project Structure

```
propo/
├── app/
│   ├── api/ai/gemini/     # Gemini API routes
│   ├── askAi/             # AI playground page
│   └── ...
├── components/
│   ├── askAi/             # AI-specific components
│   └── ui/                # Reusable UI components
├── lib/
│   └── ai/                # AI utilities and types
├── hooks/
│   └── use-ai-chat.ts     # AI chat hook
└── ...
```

## Usage

1. Navigate to the **Ask AI** page
2. Select your preferred AI model from the sidebar
3. Adjust parameters like temperature, max tokens, and top-p
4. Start chatting with the AI in the chat interface
5. Use the different tabs for various interaction modes:
   - **Chat** - Conversational AI interface
   - **Complete** - Text completion
   - **Insert** - Insert text within existing content
   - **Edit** - Edit existing text with instructions

## API Routes

- `POST /api/ai/gemini` - Handle Gemini AI requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
