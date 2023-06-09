import { Injectable } from '@nestjs/common';
import { CandyPay } from '@candypay/checkout-sdk';

export const sdk = new CandyPay({
    api_keys: {
        private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
        public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!
    },
    network: 'devnet',
    config: {
        collect_shipping_address: false
    }
});

@Injectable()
export class CandypayService {}
