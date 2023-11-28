declare global {
    export type Attributes = Partial<{
        durability: number,
        cannon: number,
        torpedo: number,
        antiaircraft: number,
        air: number,
        reload: number,
        hit: number,
        dodge: number,
        speed: number,
        luck: number,
        antisub: number
    }>;
}

export {};