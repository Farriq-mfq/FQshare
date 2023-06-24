export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number | undefined,
            NODE_ENV: "production" | "development",
            DATABASE_URL: string | undefined,
            BASE_URL: string | undefined
        }
    }
}