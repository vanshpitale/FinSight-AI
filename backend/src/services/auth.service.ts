import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import { NotFoundException, UnauthorizedException } from "../utils/app-error.js";
import { LoginSchemaType, RegisterSchemaType } from "../validators/zod.validator.js";
import ReportSettingModel, { ReportFrequencyEnum } from "../models/report-setting.model.js";
import { calculateNextReportDate } from "../utils/helper.js";
import { signJwtToken } from "../utils/jwt.js";


export const registerService = async (body: RegisterSchemaType) => {
    const { email } = body;

    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const existingUser = await UserModel.findOne({ email }).session(session);

            if (existingUser) throw new UnauthorizedException("User already exists");

            const newUser = new UserModel({ ...body });
            await newUser.save({ session });

            const reportSetting = new ReportSettingModel({
                userId: newUser._id,
                frequency: ReportFrequencyEnum.MONTHLY,
                isEnabled: true,
                lastSentDate: null,
                nextReportDate: calculateNextReportDate(),
            });
            await reportSetting.save({ session });

            return { user: newUser.omitPassword() };
        })
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }

};


export const loginService = async (body: LoginSchemaType) => {
    const { email, password } = body;
    const user = await UserModel.findOne({ email });

    if (!user) throw new NotFoundException("Email or Password not found");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid Email or Password");

    const { token, expiresAt } = signJwtToken({ userId: user.id });

    const reportSetting = await ReportSettingModel.findOne({ userId: user._id }, {_id: 1, frequency: 1, isEnabled: 1}).lean(); 

    return {
        user: user.omitPassword(),
        accessToken: token,
        expiresAt,
        reportSetting,
    };
}