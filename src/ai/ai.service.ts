import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

export interface ValidacionImagenResult {
  esImagenIdeal: boolean;
  motivo: string;
}

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

  async validarImagenProducto(
    nombre: string,
    descripcion: string,
    imagenBase64: string,
    mimeType: string,
  ): Promise<ValidacionImagenResult> {
    const prompt = `
Eres un validador de imágenes para un catálogo de productos.

Producto:
- Nombre: "${nombre}"
- Descripción: "${descripcion}"

Evalúa si la imagen es IDEAL para representar este producto en un e-commerce.

Criterios de imagen NO ideal (rechazar):
- No muestra el producto descrito
- Imagen borrosa, muy oscura o ilegible
- Contenido inapropiado o irrelevante
- Es un meme, captura de pantalla o imagen genérica sin el producto
- Muestra otro producto claramente distinto

Criterios de imagen IDEAL (aceptar):
- Se ve claramente el producto del nombre/descripción
- Buena iluminación y enfoque
- El producto es el protagonista de la imagen

Responde SOLO con JSON válido, sin markdown:
{"esImagenIdeal": true|false, "motivo": "explicación breve"}
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: imagenBase64,
              },
            },
          ],
        },
      ],
    });

    return this.parseValidacionImagen(response.text ?? '');
  }

  private parseValidacionImagen(texto: string): ValidacionImagenResult {
    const limpio = texto.replace(/```json|```/g, '').trim();
    const json = JSON.parse(limpio) as {
      esImagenIdeal?: boolean;
      motivo?: string;
    };

    return {
      esImagenIdeal: Boolean(json.esImagenIdeal),
      motivo: json.motivo ?? 'Sin motivo',
    };
  }
}
