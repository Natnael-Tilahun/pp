export const types = ["GPT", "Gemini"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description: string
  strengths?: string
  type: Type
}

// export const models: Model<ModelType>[] = [
//   {
//     id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
//     name: "text-davinci-003",
//     description:
//       "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
//     type: "GPT-3",
//     strengths:
//       "Complex intent, cause and effect, creative generation, search, summarization for audience",
//   },
//   {
//     id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
//     name: "text-curie-001",
//     description: "Very capable, but faster and lower cost than Davinci.",
//     type: "GPT-3",
//     strengths:
//       "Language translation, complex classification, sentiment, summarization",
//   },
//   {
//     id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
//     name: "text-babbage-001",
//     description: "Capable of straightforward tasks, very fast, and lower cost.",
//     type: "GPT-3",
//     strengths: "Moderate classification, semantic search",
//   },
//   {
//     id: "be638fb1-973b-4471-a49c-290325085802",
//     name: "text-ada-001",
//     description:
//       "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
//     type: "GPT-3",
//     strengths:
//       "Parsing text, simple classification, address correction, keywords",
//   },
//   {
//     id: "b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb",
//     name: "code-davinci-002",
//     description:
//       "Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.",
//     type: "Codex",
//   },
//   {
//     id: "bbd57291-4622-4a21-9eed-dd6bd786fdd1",
//     name: "code-cushman-001",
//     description:
//       "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
//     type: "Codex",
//     strengths: "Real-time application where low-latency is preferable",
//   },
//   // Gemini Models
//   {
//     id: "gemini-1.5-flash",
//     name: "gemini-1.5-flash",
//     description:
//       "Fast and efficient Gemini model optimized for speed and cost-effectiveness. Great for real-time applications and quick responses.",
//     type: "Gemini",
//     strengths: "Fast responses, cost-effective, real-time applications, general conversation",
//   },
//   {
//     id: "gemini-1.5-pro",
//     name: "gemini-1.5-pro",
//     description:
//       "Most capable Gemini model with advanced reasoning and multimodal capabilities. Excellent for complex tasks and detailed analysis.",
//     type: "Gemini",
//     strengths: "Complex reasoning, detailed analysis, multimodal tasks, creative writing",
//   },
//   {
//     id: "gemini-2.0-flash",
//     name: "gemini-2.0-flash",
//     description:
//       "Latest generation Gemini model optimized for speed and efficiency. Improved performance with faster response times.",
//     type: "Gemini",
//     strengths: "High-speed responses, improved efficiency, general tasks",
//   },
//   {
//     id: "gemini-2.0-pro",
//     name: "gemini-2.0-pro",
//     description:
//       "Most advanced Gemini model with cutting-edge capabilities. Best for complex reasoning, creative tasks, and detailed analysis.",
//     type: "Gemini",
//     strengths: "Advanced reasoning, creative tasks, detailed analysis, complex problem solving",
//   },
// ]

export const models: Model<ModelType>[] = [
  {
    id: "gpt-5",
    name: "gpt-5",
    description:
      "OpenAI’s flagship, unified model combining fast-style and deep reasoning (o-series) capabilities, multimodal, big long-context support, agentic tools, and “built-in thinking.”",
    type: "GPT",
    strengths:
      "Expert-level reasoning, coding, multimodal understanding (text, image, audio, video), long context, adaptive response strategy",
  },
  {
    id: "gpt-5-mini",
    name: "gpt-5-mini",
    description:
      "Faster, cost-efficient variant of the flagship GPT-5 model, optimized for well-defined tasks with multisource input.",
    type: "GPT",
    strengths:
      "Speed, affordability, solid reasoning and multimodal support",
  },
  {
    id: "gpt-5-nano",
    name: "gpt-5-nano",
    description:
      "Ultra-light, minimal-latency variant of GPT-5—super fast and efficient for basic workflows.",
    type: "GPT",
    strengths:
      "High speed, very low cost, lightweight reasoning",
  },
  {
    id: "gpt-5-chat",
    name: "gpt-5-chat",
    description:
      "Variant of GPT-5 tailored for interactive, context-aware conversational use cases, especially for enterprise chat systems.",
    type: "GPT",
    strengths:
      "Context tracking, chat-optimized responses, enterprise-ready",
  },
  {
    id: "gpt-4.1",
    name: "gpt-4.1",
    description:
      "Pre-GPT-5 multimodal model for general tasks, excels at complex non-reasoning tasks with large context.",
    type: "GPT",
    strengths:
      "General-purpose multimodal use, large context, strong general performance",
  },
  {
    id: "o3",
    name: "o3",
    description:
      "OpenAI’s reflective reasoning model series: o3-mini (Jan 31), o3 (Apr 16), and o3-pro (June 10, 2025). Built for stepwise 'private chain-of-thought' reasoning.",
    type: "GPT",
    strengths:
      "Deep reasoning, logic, coding, technical and scientific problem-solving",
  },
  {
    id: "o4-mini",
    name: "o4-mini",
    description:
      "Small but capable reasoning model (Apr 16, 2025) capable of multimodal thinking, cheaper than larger reasoning models.",
    type: "GPT",
    strengths:
      "Affordable reasoning, image-aware processing, chain-of-thought support",
  },
  {
    id: "gpt-oss-120b",
    name: "gpt-oss-120b",
    description:
      "Open-weight reasoning model (open-source), 120B-parameter version released Aug 5, 2025; ideal for self-hosting.",
    type: "GPT",
    strengths:
      "On-premise use, customization, open-source flexibility, reasoning",
  },
  {
    id: "gpt-oss-20b",
    name: "gpt-oss-20b",
    description:
      "Smaller open-weight reasoning model (open-source), 20B-parameter version released Aug 5, 2025; runnable on consumer hardware.",
    type: "GPT",
    strengths:
      "Runs locally, low-resource environments, reasoning, self-hosting",
  },
  {
    id: "gemini-2.5-flash",
    name: "gemini-2.5-flash",
    description:
      "Fast, general-purpose version of Gemini 2.5 — now generally available for everyday tasks.",
    type: "Gemini",
    strengths:
      "Speed, cost-efficiency, multimodal",
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "gemini-2.5-flash-lite",
    description:
      "Preview-stage ultra-fast and cost-efficient variant of Gemini 2.5, optimized for high-volume tasks.",
    type: "Gemini",
    strengths:
      "Lowest latency, very high throughput, cost-efficient",
  },
  {
    id: "gemini-2.5-pro",
    name: "gemini-2.5-pro",
    description:
      "Google’s top-tier reasoning Gemini model: built-in chain-of-thought, 1M-token context, coding/multimodal, with “Deep Think” mode.",
    type: "Gemini",
    strengths:
      "Advanced reasoning, long context, multimodal, coding, strategic thinking",
  },
  {
    id: "gemini-robotics",
    name: "gemini-robotics",
    description:
      "Vision-language-action model for robotics applications, released Mar 12, 2025, and on-device variant (June 24, 2025).",
    type: "Gemini",
    strengths:
      "Embodied reasoning, vision-language control, robotics integration",
  },
]
