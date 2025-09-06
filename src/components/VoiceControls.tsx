import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onStopSpeaking: () => void;
  browserSupportsRecognition: boolean;
}

export const VoiceControls = ({
  isListening,
  isSpeaking,
  transcript,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  browserSupportsRecognition,
}: VoiceControlsProps) => {
  if (!browserSupportsRecognition) {
    return (
      <Card className="mb-4 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-orange-700">
            <MicOff className="h-4 w-4" />
            <span className="text-sm">
              Voice recognition is not supported in your browser. Please use the text input instead.
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={isListening ? onStopListening : onStartListening}
              variant={isListening ? "destructive" : "default"}
              size="sm"
              className={`${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice
                </>
              )}
            </Button>

            {isSpeaking && (
              <Button
                onClick={onStopSpeaking}
                variant="outline"
                size="sm"
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                <VolumeX className="h-4 w-4 mr-2" />
                Stop Speaking
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isListening && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Listening...
              </Badge>
            )}

            {isSpeaking && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Volume2 className="h-3 w-3 mr-1" />
                Speaking...
              </Badge>
            )}
          </div>
        </div>

        {transcript && (
          <div className="mt-3 p-2 bg-white rounded border">
            <p className="text-sm text-gray-600">
              <span className="font-medium">You said:</span> {transcript}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};