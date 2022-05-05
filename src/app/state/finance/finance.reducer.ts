import { createReducer, on } from "@ngrx/store";
import { FilterToString } from "src/app/api.service";
import { FinanceState } from "../app.state";
import { retrievedWallets, transferChanged, transferDeleted, transfersPageChanged, transfersRecieved, walletChanged, walletDeleted } from "./finance.actions";

export const initialState: FinanceState = {
    wallets: [],
    transfers: [],
    loadedTransfers: new Map(),
    transfersPage: {},
    transfersPageTotal: 0,
};

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
    on(transfersRecieved, (state, { transfers, total, filter }) => {
        let unique = new Map()
        // console.log(transfers, total, filter)
        state.transfers.forEach(l => unique.set(l.ID, l))
        transfers.forEach(l => unique.set(l.ID, l))
        //server gives 0 total if offset
        const realTotal = filter.offset ? state.transfersPageTotal : total
        state.loadedTransfers.set(FilterToString(filter), realTotal)
        // console.log(state.loadedTransfers)
        return ({
            ...state,
            transfers: [...unique.values()],
            loadedTransfers: state.loadedTransfers,
            transfersPageTotal: realTotal,
        })
    }),
    on(transfersPageChanged, (state, { filter }) => ({
        ...state,
        transfersPage: filter,
        transfersPageTotal: state.loadedTransfers.get(FilterToString(filter))
    })),
    on(transferChanged, (state, { transfer }) => {
        // console.log(transfer)
        const index = state.transfers.map(c => c.ID).indexOf(transfer.ID)
        let newTransfers = state.transfers.slice(0)
        let total = state.transfersPageTotal
        let newLoaded = state.loadedTransfers
        if (index == -1) {
            newTransfers.push(transfer)
            total++
            // console.log(newLoaded)
            //Attention - if ListToFilter changes - it has to be changed too
            newLoaded.forEach((val, key) => {
                // console.log(key, val)
                if (transfer.From && key.includes(`&wallet=${transfer.From}`)) {
                    newLoaded.set(key, ++val)
                }
                if (transfer.To && key.includes(`&wallet=${transfer.To}`)) {
                    newLoaded.set(key, ++val)
                }
            })
            // console.log(newLoaded)
        } else {
            newTransfers[index] = transfer
        }
        return ({
            ...state,
            transfers: newTransfers,
            transfersPageTotal: total,
            loadedTransfers: newLoaded
        })
    }),
    on(transferDeleted, (state, { ID }) => {
        const index = state.transfers.map(t => t.ID).indexOf(ID)
        let newTransfers = state.transfers.slice(0)
        const oldTransfer = newTransfers[index]
        newTransfers.splice(index, 1)
        let newLoaded = state.loadedTransfers
        //Attention - if ListToFilter changes - it has to be changed too
        newLoaded.forEach((val, key) => {
            if (oldTransfer.From && key.includes(`&wallet=${oldTransfer.From}`)) {
                newLoaded.set(key, --val)
            }
            if (oldTransfer.To && key.includes(`&wallet=${oldTransfer.To}`)) {
                newLoaded.set(key, --val)
            }
        })
        return ({
            ...state,
            transfers: newTransfers,
            transfersPageTotal: state.transfersPageTotal - 1,
            loadedTransfers: newLoaded
        })
    }),
)
