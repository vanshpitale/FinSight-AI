import { Router } from 'express';
import { getInsightsController } from '../controllers/insights.controller.js';

const insightsRoutes = Router();

insightsRoutes.get('/', getInsightsController);

export default insightsRoutes;