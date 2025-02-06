type EntityJson<T> = {
    id: string;
} & T;
export declare abstract class Entity<Props = any> {
    readonly _id: string;
    readonly props: Props;
    constructor(props: Props, id?: string);
    get id(): string;
    toJson(): EntityJson<Props>;
}
export {};
