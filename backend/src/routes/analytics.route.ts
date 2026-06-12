import { Router } from 'express';
import { chartAnalyticsContoller, expensePieChartBreakdownController, summaryAnalyticsController } from '../controllers/analytics.controller';

const analyticsRoute = Router();

analyticsRoute.get('/summary', summaryAnalyticsController);
analyticsRoute.get('/chart', chartAnalyticsContoller);
analyticsRoute.get('/expense-breakdown', expensePieChartBreakdownController);

export default analyticsRoute;