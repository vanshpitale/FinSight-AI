export interface FinancialHealthScore {
    score: number;
    grade: string;
    breakdown: {
        savingHabits: number;
        cashFlow: number;
        spendingBalance: number;
        financialDiscipline: number;
    };
}

interface CalculateHealthScoreParams {
    savingsRate: number;
    balance: number;
    totalExpense: number;
    transactionCount: number;
    topCategoryShare: number; // percentage (0-100)
}

export function calculateFinancialHealthScore({
    savingsRate,
    balance,
    transactionCount,
    topCategoryShare,
}: CalculateHealthScoreParams): FinancialHealthScore {

    // ---------- Saving Habits (40) ----------
    let savingHabits = 0;

    if (savingsRate >= 40) savingHabits = 40;
    else if (savingsRate >= 30) savingHabits = 35;
    else if (savingsRate >= 20) savingHabits = 30;
    else if (savingsRate >= 10) savingHabits = 20;
    else if (savingsRate >= 0) savingHabits = 10;
    else savingHabits = 0;

    // ---------- Cash Flow (25) ----------
    let cashFlow = 0;

    if (balance > 0) cashFlow = 25;
    else if (balance === 0) cashFlow = 15;
    else cashFlow = 0;

    // ---------- Spending Balance (20) ----------
    let spendingBalance = 0;

    if (topCategoryShare <= 25) spendingBalance = 20;
    else if (topCategoryShare <= 35) spendingBalance = 15;
    else if (topCategoryShare <= 50) spendingBalance = 10;
    else spendingBalance = 5;

    // ---------- Financial Discipline (15) ----------
    let financialDiscipline = 0;

    if (transactionCount >= 20) financialDiscipline = 15;
    else if (transactionCount >= 10) financialDiscipline = 10;
    else if (transactionCount >= 5) financialDiscipline = 5;
    else financialDiscipline = 0;

    const score =
        savingHabits +
        cashFlow +
        spendingBalance +
        financialDiscipline;

    let grade = "F";

    if (score >= 90) grade = "A+";
    else if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";
    else if (score >= 40) grade = "D";

    return {
        score,
        grade,
        breakdown: {
            savingHabits,
            cashFlow,
            spendingBalance,
            financialDiscipline,
        },
    };
}