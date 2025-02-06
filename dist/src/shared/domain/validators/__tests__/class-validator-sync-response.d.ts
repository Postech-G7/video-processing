declare const validateSyncErrors: ({
    target: {
        name: string;
        email: string;
        age: number;
    };
    value: string;
    property: string;
    children: any[];
    constraints: {
        minLength: string;
        isEmail?: undefined;
        min?: undefined;
    };
} | {
    target: {
        name: string;
        email: string;
        age: number;
    };
    value: string;
    property: string;
    children: any[];
    constraints: {
        isEmail: string;
        minLength?: undefined;
        min?: undefined;
    };
} | {
    target: {
        name: string;
        email: string;
        age: number;
    };
    value: number;
    property: string;
    children: any[];
    constraints: {
        min: string;
        minLength?: undefined;
        isEmail?: undefined;
    };
})[];
