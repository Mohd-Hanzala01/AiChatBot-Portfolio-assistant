# AI Voice Agent Chatbot for Portfolio - MVP Implementation

## Core Features
1. Voice recognition using Web Speech API
2. Text-to-speech responses
3. Customizable knowledge base with portfolio Q&A
4. Modern chat interface with voice controls
5. Easy configuration system for personal details

## Files to Create
1. `src/pages/Index.tsx` - Main chatbot interface
2. `src/components/VoiceAgent.tsx` - Core voice agent component
3. `src/components/ChatMessage.tsx` - Individual chat message component
4. `src/components/VoiceControls.tsx` - Voice input/output controls
5. `src/hooks/useSpeechRecognition.ts` - Speech recognition hook
6. `src/hooks/useTextToSpeech.ts` - Text-to-speech hook
7. `src/data/portfolioData.ts` - Customizable portfolio knowledge base
8. `src/utils/chatBot.ts` - AI response logic and Q&A matching

## Implementation Strategy
- Use Web Speech API for voice recognition and synthesis
- Create a simple AI that matches user questions to predefined Q&A
- Provide fallback responses for unmatched queries
- Make the knowledge base easily customizable
- Include voice visualization and modern UI