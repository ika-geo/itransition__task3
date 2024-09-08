import crypto from 'crypto';

export class HMACCalculator {
    static calculateHMAC(key, message) {
        return crypto.createHmac('sha256', key).update(message).digest('hex');
    }
}