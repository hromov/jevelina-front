import { createSelector } from "@ngrx/store";
import { AppState, FinanceState } from "../app.state";

export const selectFinance = (state: AppState) => state.finance;

export const selectWallets = createSelector(
    selectFinance,
    (state: FinanceState) => state.wallets || []
)