import { Router } from 'express';
import { chartAnalyticsContoller, summaryAnalyticsController } from '../controllers/analytics.controller';

const analyticsRoute = Router();

analyticsRoute.get('/summary', summaryAnalyticsController);
analyticsRoute.get('/chart', chartAnalyticsContoller);

export default analyticsRoute;