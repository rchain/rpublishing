export interface DIDDocument {
    '@context': 'https://w3id.org/did/v1' | string | string[];
    id: string;
    publicKey: PublicKey[];
    authentication?: (string | PublicKey | Authentication)[];
    /**
     * @deprecated This does not appear in the did-core spec
     */
    uportProfile?: any;
    service?: ServiceEndpoint[];
    /**
     * @deprecated this property has been removed from the did-core spec
     */
    created?: string;
    /**
     * @deprecated this property has been removed from the did-core spec
     */
    updated?: string;
    /**
     * @deprecated this property has been removed from the did-core spec
     */
    proof?: LinkedDataProof;
    keyAgreement?: (string | PublicKey)[];
}
export interface ServiceEndpoint {
    id: string;
    type: string;
    serviceEndpoint: string;
    description?: string;
}
export interface PublicKey {
    id: string;
    type: string;
    controller: string;
    ethereumAddress?: string;
    publicKeyBase64?: string;
    publicKeyBase58?: string;
    publicKeyHex?: string;
    publicKeyPem?: string;
}
/**
 * @deprecated The `authentication` array should be an array of strings or `PublicKey`
 */
export interface Authentication {
    type: string;
    publicKey: string;
}
export interface LinkedDataProof {
    type: string;
    created: string;
    creator: string;
    nonce: string;
    signatureValue: string;
}
export interface Params {
    [index: string]: string;
}
export interface ParsedDID {
    did: string;
    didUrl: string;
    method: string;
    id: string;
    path?: string;
    fragment?: string;
    query?: string;
    params?: Params;
}
export declare type DIDResolver = (did: string, parsed: ParsedDID, resolver: Resolver) => Promise<null | DIDDocument>;
export declare type WrappedResolver = () => Promise<null | DIDDocument>;
export declare type DIDCache = (parsed: ParsedDID, resolve: WrappedResolver) => Promise<null | DIDDocument>;
interface ResolverRegistry {
    [index: string]: DIDResolver;
}
export declare function inMemoryCache(): DIDCache;
export declare function noCache(parsed: ParsedDID, resolve: WrappedResolver): Promise<null | DIDDocument>;
export declare function parse(didUrl: string): ParsedDID;
export declare class Resolver {
    private registry;
    private cache;
    constructor(registry?: ResolverRegistry, cache?: DIDCache | boolean | undefined);
    resolve(didUrl: string): Promise<DIDDocument>;
}
export declare function encodeDIDFromPubKey(publicKey: string): string;
export declare function getResolver(): {
    rchain: (did: string, parsed: ParsedDID, didResolver: Resolver) => Promise<any>;
};
export {};
