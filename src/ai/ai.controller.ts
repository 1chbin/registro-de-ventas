import { Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { Body } from '@nestjs/common';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {
        
    }

    @Post()
    async aksToGemini(@Body('prompt') prompt: string) {
        const response = await this.aiService.getResponse(prompt);
        return response
    }
}
