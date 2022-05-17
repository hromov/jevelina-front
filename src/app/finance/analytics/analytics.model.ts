export interface CategorisedCashflow {
    Incomes: CatSum[],
    Expenses: CatSum[],
}
export interface CatSum {
    Category: string;
    Total: number;
}
