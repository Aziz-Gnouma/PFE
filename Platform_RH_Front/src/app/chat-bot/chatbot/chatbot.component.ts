import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppServiceService } from 'src/app/Services/app-service.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>; 

  chatId: string = '1';
  working: boolean = false;
  messages: MessageItem[] = [{
    role: 'assistant',
    content: 'Welcome to Aura ! How can I help you ?'
  }];
  userMessage: string = '';

  constructor(private appService: AppServiceService) {}

  async sendMessage(): Promise<void> {
    const message = this.userMessage.trim();
    if (message) {
      this.addMessage({ role: 'user', content: message });
      this.userMessage = ''; // Clear the input field after sending
  
      this.working = true;
      try {
        const response = await this.appService.chat(this.chatId, message).toPromise();
        if (response) {
          this.addMessage({ role: 'assistant', content: response });
        } else {
          console.error('Empty response received.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        this.working = false;
      }
    }
  }
  

  addMessage(message: MessageItem): void {
    this.messages.push(message);
    this.scrollToBottom();

  }
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}

interface MessageItem {
  role: 'user' | 'assistant';
  content: string;
}
