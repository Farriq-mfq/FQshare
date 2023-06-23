export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number,
            NODE_ENV: "production" | "development",
            DATABASE_URL: string | undefined,
        }
    }
}