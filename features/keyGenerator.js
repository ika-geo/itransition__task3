import crypto from 'crypto';

export class KeyGenerator {
    static generateKey(length) {
        return crypto.randomBytes(length).toString('hex');
    }
}