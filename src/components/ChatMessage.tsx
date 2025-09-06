import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/utils/chatBot';
import { portfolioData } from '@/data/portfolioData';

interface ChatMessageProps {
  message: ChatMessageType;
  onSpeak: (text: string) => void;
  onStopSpeaking: () => void;
  isSpeaking: boolean;
}

export const ChatMessage = ({ message, onSpeak, onStopSpeaking, isSpeaking }: ChatMessageProps) => {
  const handleSpeakToggle = () => {
    if (isSpeaking) {
      onStopSpeaking();
    } else {
      onSpeak(message.text);
    }
  };

  return (
    <div className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!message.isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/api/placeholder/32/32" alt="AI Assistant" />
          <AvatarFallback className="bg-blue-500 text-white text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${message.isUser ? 'order-first' : ''}`}>
        <Card className={`${
          message.isUser 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <CardContent className="p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm leading-relaxed flex-1">
                {message.text}
              </p>
              
              {!message.isUser && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSpeakToggle}
                  className="h-6 w-6 p-0 hover:bg-gray-100 flex-shrink-0"
                >
                  {isSpeaking ? (
                    <VolumeX className="h-3 w-3" />
                  ) : (
                    <Volume2 className="h-3 w-3" />
                  )}
                </Button>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.isUser ? 'You' : portfolioData.personalInfo.name}
              </span>
              <span className={`text-xs ${
                message.isUser ? 'text-blue-100' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {message.isUser && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="/api/placeholder/32/32" alt="User" />
          <AvatarFallback className="bg-gray-500 text-white text-xs">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};