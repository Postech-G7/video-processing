import { HashProviderContract } from '../hash-provider-interface';
export declare class HashProvider implements HashProviderContract {
    private readonly SALT_ROUNDS;
    generateHash(payload: string): Promise<string>;
    compareHash(payload: string, hash: string): Promise<boolean>;
}
