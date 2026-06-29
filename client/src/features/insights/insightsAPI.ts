import { apiClient } from "@/app/api-client";

export interface InsightItem {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | string;
}

export interface RecommendationItem {
  title: string;
  description: string;
}

export interface HealthScore {
  score: number;
  grade: string;
  breakdown: {
    savingHabits: number;
    cashFlow: number;
    spendingBalance: number;
    financialDiscipline: number;
  };
}

export interface InsightsResponse {
  message: string;
  insights: InsightItem[];
  recommendations: RecommendationItem[];
  healthScore?: HealthScore;
}

export const insightsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getAIInsights: builder.query<InsightsResponse, void>({
      query: () => ({
        url: "/insights",
        method: "GET",
      }),
      providesTags: ["analytics"],
    }),
  }),
});

export const { useGetAIInsightsQuery } = insightsApi;
