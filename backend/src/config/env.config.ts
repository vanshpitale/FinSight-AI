import { getEnv } from '../utils/get-env';

const envConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),

    PORT: getEnv("PORT", "8000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),

    JWT_SECRET: getEnv("JWT_SECRET", "jwt_secret_key"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m") as string,

    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET", "jwt_refresh_secret_key"),
    JWT_REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "7d") as string,

    GEMINI_API_KEY: getEnv("GEMINI_API_KEY", "your_gemini_api_key"),
    
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN", "http://localhost:5173"),
});

export const Env = envConfig();