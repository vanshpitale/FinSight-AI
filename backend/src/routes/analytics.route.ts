import { Router } from 'express';
import { summaryAnalyticsController } from '../controllers/analytics.controller';

const analyticsRoute = Router();

analyticsRoute.get('/summary', summaryAnalyticsController);

export default analyticsRoute;