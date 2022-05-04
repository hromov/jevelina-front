import { createReducer, on } from "@ngrx/store";
import { FinanceState } from "../app.state";
import { retrievedWallets, walletChanged, walletDeleted } from "./finance.actions";

export const initialState: FinanceState = { wallets: [] };

export const financeReducer = createReducer(
    initialState,
    on(retrievedWallets, (state, { wallets }) => ({ ...state, wallets: wallets })),
    on(walletChanged, (state, { wallet }) => {
        const index = state.wallets.map(item => item.ID).indexOf(wallet.ID)
        let newItems = state.wallets.slice(0)
        if (index == -1) {
            newItems.push(wallet)
        } else {
            newItems[index] = wallet 
        }
        return ({
            ...state,
            wallets: newItems
        })
    }),
    on(walletDeleted, (state, { ID }) => {
        const index = state.wallets.map(item => item.ID).indexOf(ID)
        let newItems = state.wallets.slice(0)
        newItems.splice(index, 1)
        return ({
            ...state,
            wallets: newItems
        })
    }),
)
