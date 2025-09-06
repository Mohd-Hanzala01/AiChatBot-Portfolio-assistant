import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, Settings } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { VoiceControls } from './VoiceControls';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { chatBot, ChatMessage as ChatMessageType } from '@/utils/chatBot';
import { portfolioData } from '@/data/portfolioData';

export const VoiceAgent = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { speak, isSpeaking, stop: stopSpeaking } = useTextToSpeech();

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = chatBot.getWelcomeMessage();
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle voice transcript
  useEffect(() => {
    if (transcript && !isListening) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript, isListening]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = chatBot.createUserMessage(text);
    const botResponse = chatBot.processMessage(text);

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');

    // Auto-speak the bot response
    setTimeout(() => {
      speak(botResponse.text);
      setCurrentSpeakingId(botResponse.id);
    }, 500);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handleSpeak = (text: string, messageId: string) => {
    if (isSpeaking) {
      stopSpeaking();
    }
    speak(text);
    setCurrentSpeakingId(messageId);
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setCurrentSpeakingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Bot className="h-8 w-8" />
              <CardTitle className="text-2xl font-bold">
                {portfolioData.personalInfo.name}'s AI Assistant
              </CardTitle>
            </div>
            <p className="text-blue-100">
              Ask me anything about {portfolioData.personalInfo.name}'s background, skills, experience, and projects!
            </p>
          </CardHeader>
        </Card>

        {/* Voice Controls */}
        <VoiceControls
          isListening={isListening}
          isSpeaking={isSpeaking}
          transcript={transcript}
          onStartListening={startListening}
          onStopListening={stopListening}
          onStopSpeaking={handleStopSpeaking}
          browserSupportsRecognition={browserSupportsSpeechRecognition}
        />

        {/* Chat Messages */}
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSpeak={(text) => handleSpeak(text, message.id)}
                  onStopSpeaking={handleStopSpeaking}
                  isSpeaking={isSpeaking && currentSpeakingId === message.id}
                />
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <form onSubmit={handleInputSubmit} className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your question or use the microphone above..."
                className="flex-1"
                disabled={isListening}
              />
              <Button 
                type="submit" 
                disabled={!inputText.trim() || isListening}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                💡 Try asking: "Tell me about your experience", "What are your skills?", "Show me your projects"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Customization Note */}
        <Card className="mt-4 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Settings className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-700">
                <p className="font-medium mb-1">Customization Instructions:</p>
                <p>
                  To customize this chatbot with your own details, edit the <code className="bg-green-100 px-1 rounded">src/data/portfolioData.ts</code> file. 
                  Update your personal information, skills, experience, projects, and add more Q&A pairs to make it truly yours!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};