import "dotenv/config";
import "./config/passport.config.js"
import express, { NextFunction, Request, Response } from "express";
import { Env } from "./config/env.config.js";
import cors from "cors";
import passport from "passport";
import { HTTPSTATUS } from "./config/http.config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { BadRequestException } from "./utils/app-error.js";
import { asyncHandler } from "./middlewares/asyncHandler.middleware.js";
import connectDB from "./config/database.config.js";
import authRoutes from "./routes/auth.route.js";
import { passportAuthenticateJwt } from "./config/passport.config.js";
import userRoutes from "./routes/user.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import { initializeCrons } from "./crons/index.js";
import reportRoutes from "./routes/report.route.js";
import analyticsRoute from "./routes/analytics.route.js";

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
    cors({
        origin: [Env.FRONTEND_ORIGIN, "http://192.168.1.83:5173"],
        credentials: true,
    })
);

app.get("/", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
        message: "Welcome to the FinSight AI API!"
    });
}));

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRoutes);
app.use(`${BASE_PATH}/transaction`, passportAuthenticateJwt, transactionRoutes);
app.use(`${BASE_PATH}/report`, passportAuthenticateJwt, reportRoutes);
app.use(`${BASE_PATH}/analytics`, passportAuthenticateJwt, analyticsRoute);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
    await connectDB();

    if (Env.NODE_ENV === "development") {
        await initializeCrons();
    }

    console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});