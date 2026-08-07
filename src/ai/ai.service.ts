import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService { 
    private ai: GoogleGenAI;

    constructor(private readonly configService: ConfigService) {
        const geminiApiKey = this.configService.get('GEMINI_API_KEY');
        this.ai = new GoogleGenAI({
            apiKey: geminiApiKey,
        });
    }

    public async getResponse(prompt: string) {
        const response = await this.ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });

        return response.text;
    }
}
