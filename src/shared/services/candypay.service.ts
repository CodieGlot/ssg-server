import { Injectable } from '@nestjs/common';
import { CandyPay, verifyWebhookSignature } from '@candypay/checkout-sdk';
import { ApiConfigService } from './api-config.service';

@Injectable()
export class CandypayService {
    webUrl: any;
    sdk: any;

    constructor(private readonly apiConfig: ApiConfigService) {
        this.webUrl = this.apiConfig.webUrlConfig.webUrl;

        this.sdk = new CandyPay({
            api_keys: {
                private_api_key: this.apiConfig.candypayConfig.privateApiKey,
                public_api_key: this.apiConfig.candypayConfig.publicApiKey
            },
            network: 'devnet',
            config: {
                collect_shipping_address: false
            }
        });
    }

    async createSession() {
        return this.sdk.session.create({
            success_url: `${this.webUrl}/payment/success`,
            cancel_url: `${this.webUrl}/payment/cancel`,
            tokens: ['samo'],
            items: [
                {
                    name: 'Solana Shades',
                    // price in USD
                    price: 0.1,
                    image: 'https://imgur.com/M0l5SDh.png',
                    quantity: 1
                }
            ],
            custom_data: {
                name: 'Heart2heart Organization',
                image: 'https://i.ibb.co/chtf9qc/2691.png',
                wallet_address: 'Aj9vbKSGcDNWt886E3kpP6xL8cRLX69QVUB5vqPToua'
            }
        });
    }

    async getMetadata(session_id: string) {
        return this.sdk.session.metadata({ session_id });
    }

    async generatePaymentUrl(session_id: string) {
        return this.sdk.session.generatePaymentURL({ session_id });
    }

    async verifyWebhookSignature(req: any) {
        const headers = req.headers;
        const payload = req.body;

        try {
            await verifyWebhookSignature({
                payload: JSON.stringify(payload),
                headers: headers as Record<string, string>,
                webhook_secret: this.apiConfig.candypayConfig.webhookSecret
            });
        } catch {
            return false;
        }

        return true;
    }
}
