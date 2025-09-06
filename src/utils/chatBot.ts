import { qnaDatabase, portfolioData } from '@/data/portfolioData';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export class PortfolioChatBot {
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private findBestMatch(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Find the best matching Q&A based on keywords
    let bestMatch = null;
    let maxMatches = 0;

    for (const qa of qnaDatabase) {
      let matches = 0;
      for (const keyword of qa.keywords) {
        if (input.includes(keyword.toLowerCase())) {
          matches++;
        }
      }
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = qa;
      }
    }

    if (bestMatch && maxMatches > 0) {
      return bestMatch.response;
    }

    // If no specific match, provide a helpful default response
    return this.getDefaultResponse(input);
  }

  private getDefaultResponse(input: string): string {
    const defaultResponses = [
      `I'm not sure I understand that question about ${portfolioData.personalInfo.name}. Could you ask about my skills, experience, projects, or background?`,
      `That's an interesting question! I can tell you about ${portfolioData.personalInfo.name}'s work experience, technical skills, projects, or education. What would you like to know?`,
      `I'd be happy to help! You can ask me about ${portfolioData.personalInfo.name}'s background, current projects, technical expertise, or how to get in touch.`,
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  public processMessage(userInput: string): ChatMessage {
    const response = this.findBestMatch(userInput);
    
    return {
      id: this.generateId(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
  }

  public createUserMessage(text: string): ChatMessage {
    return {
      id: this.generateId(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
  }

  public getWelcomeMessage(): ChatMessage {
    return {
      id: this.generateId(),
      text: `Hello! I'm ${portfolioData.personalInfo.name}'s AI assistant. I can tell you about my background, skills, experience, and projects. You can type your questions or use the microphone to speak with me. What would you like to know?`,
      isUser: false,
      timestamp: new Date(),
    };
  }
}

export const chatBot = new PortfolioChatBot();