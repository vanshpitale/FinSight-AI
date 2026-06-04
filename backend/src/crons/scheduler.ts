import cron from "node-cron";
import { processRecurringTransactions } from "./jobs/transaction.job";

const scheduleJob = (name: string, time: string, job:Function) => {
    console.log(`${name} job scheduled to run at ${time}`);

    return cron.schedule(time, async () => {
        try {
            await job();
            console.log(`${name} job completed successfully`);
        } catch (error) {
            console.log(`${name} job failed: ${error}`);
        }
    }, {
        timezone: 'Asia/Kolkata',
    });
};

export const startJobs = () => {
    return [
        scheduleJob("Transactions", "5 0 * * *", processRecurringTransactions), // 12.05am every day

    ];
};