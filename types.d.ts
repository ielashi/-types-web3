export type Callback<T> = (error: Error, result: T) => void;

export interface EventEmitter {
    on(type: "data", handler: (event: EventLog) => void): EventEmitter;
    on(type: "changed", handler: (receipt: EventLog) => void): EventEmitter;
    on(type: "error", handler: (error: Error) => void): EventEmitter;
    on(
        type: "error" | "data" | "changed",
        handler: (error: Error | TransactionReceipt | string) => void
    ): EventEmitter;
}

export interface EventLog {
    event: string;
    address: string;
    returnValues: any;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    raw?: { data: string; topics: string[] };
}

export interface TransactionReceipt {
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    logs?: Log[];
    events?: {
        [eventName: string]: EventLog;
    };
    status: boolean;
}

export interface EncodedTransaction {
    raw: string;
    tx: {
        nonce: string;
        gasPrice: string;
        gas: string;
        to: string;
        value: string;
        input: string;
        v: string;
        r: string;
        s: string;
        hash: string;
    };
}

export interface Logs {
    fromBlock?: number;
    address?: string;
    topics?: Array<string | string[]>;
}
export interface Log {
    address: string;
    data: string;
    topics: string[];
    logIndex: number;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
}
export interface Subscribe<T> {
    id: string;
    subscribe(callback?: Callback<Subscribe<T>>): Subscribe<T>;
    unsubscribe(callback?: Callback<boolean>): void | boolean;
    arguments: object;
    on(type: "data" | "changed", handler: (data: T) => void): void;
    on(type: "error", handler: (data: Error) => void): void;
}

export interface IncomingMessage {
	hash: string;
	padding: string;
	payload: string;
	pow: number;
	recipientPublicKey: string;
	sig: string;
	timestamp: number;
	topic: string;
	ttl: number;
}

export interface Subscription<T> {
  id: string;
  arguments: object;
  on(type: "data", handler: (data:T) => void): void;
  on(type: "error", handler: (data: Error) => void): void;
}

export interface Shh {
    generateSymKeyFromPassword(password: string): Promise<string>;
    generateSymKeyFromPassword(
        password: string,
        callback: Callback<string>
    ): void;


    subscribe(
      messages: string,
      options: {
          symKeyID?: string;
          privateKeyID?: string;
          sig?: string;
          topics?: string[];
          minPow?: number;
          allowP2P?: boolean;
      },
      cb?: (error, message:IncomingMessage, subscription) => void
    ):Promise<Subscription<IncomingMessage>>;
    post(
      options: {
        symKeyID?: string;
        pubKey?: string;
        sig?: string;
        ttl?: number;
        topic?: string;
        payload?: string;
        padding?: number;
        powTime?: number;
        powTarget?: number;
        targetPeer?: number;
      },
      cb?: (error,hash:string) => void
    ):Promise<void>;
    unsubscribe(id:string): void;
    clearSubscriptions(keepIsSyncing?:boolean): void;
    newKeyPair(cb?: (hash:string) => void):string;
    getPublicKey(id, cb?: (hash:string)=>void):string;
    // TODO: type every method
}
export class Bzz {
    download(hash: string): Promise<Buffer>;
    setProvider(provider: Object): boolean;
} // TODO: type every method
