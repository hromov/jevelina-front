import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { FilterToString } from "src/app/api.service";
import { FinanceState } from "../app.state";
import { categoriesLoaded, retrievedWallets, transferChanged, transferDeleted, transfersPageChanged, transfersRecieved, transfersRequired, walletChanged, walletDeleted } from "./finance.actions";

export const initialState: FinanceState = {
    wallets: [],
    transfers: [],
    loadedTransfers: new Map(),
    transfersPage: {},
    transfersPageTotal: 0,
    categories: [],
};

export const financeReducer = createReducer(
    initialState,
    on(retrievedWallets, (state, { wallets }) => ({ ...state, wallets: wallets })),
    on(categoriesLoaded, (state, { categories }) => ({ ...state, categories: categories })),
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
        state.transfers.forEach(l => unique.set(l.ID, l))
        transfers.forEach(l => unique.set(l.ID, l))
        //server gives 0 total if offset
        const realTotal = filter.offset ? state.transfersPageTotal : total
        state.loadedTransfers.set(FilterToString(filter), realTotal)
        return ({
            ...state,
            transfers: [...unique.values()],
            loadedTransfers: state.loadedTransfers,
            transfersPageTotal: realTotal,
        })
    }),
    on(transfersRequired, (state, { filter }) => ({
        ...state,
        transfersPageTotal: state.loadedTransfers.has(FilterToString(filter)) ? state.loadedTransfers.get(FilterToString(filter)) : state.transfersPageTotal
    })),
    on(transfersPageChanged, (state, { filter }) => ({
        ...state,
        transfersPage: filter,
    })),
    on(transferChanged, (state, { transfer }) => {
        // console.log(transfer)
        const index = state.transfers.map(c => c.ID).indexOf(transfer.ID)
        let newTransfers = state.transfers.slice(0)
        let total = state.transfersPageTotal
        let newLoaded = state.loadedTransfers
        let oldTransfer = newTransfers[index]
        let wallets = state.wallets.slice(0)
        if (transfer.Completed && !oldTransfer.Completed) {
            wallets.forEach((wallet, index) => {
                if (wallet.ID == oldTransfer.To) {
                    wallets[index] = { ...wallet, Balance: wallet.Balance + oldTransfer.Amount }
                } else if (wallet.ID == oldTransfer.From) {
                    const newWallet = { ...wallet, Balance: wallet.Balance - oldTransfer.Amount }
                    wallets[index] = newWallet
                }
            })
        }
        if (index == -1) {
            newTransfers.unshift(transfer)
            total++
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
        } else {
            newTransfers[index] = transfer
        }
        return ({
            ...state,
            transfers: newTransfers,
            transfersPageTotal: total,
            loadedTransfers: newLoaded,
            wallets: wallets
        })
    }),
    on(transferDeleted, (state, { ID }) => {
        const index = state.transfers.map(t => t.ID).indexOf(ID)
        let newTransfers = state.transfers.slice(0)
        const oldTransfer = newTransfers[index]
        newTransfers[index] = {...oldTransfer, DeletedAt: new Date()}
        let newLoaded = state.loadedTransfers
        let wallets = state.wallets.slice(0)
        if (oldTransfer.Completed) {
            wallets.forEach((wallet, index) => {
                if (wallet.ID == oldTransfer.From) {
                    wallets[index] = { ...wallet, Balance: wallet.Balance + oldTransfer.Amount }
                } else if (wallet.ID == oldTransfer.To) {
                    const newWallet = { ...wallet, Balance: wallet.Balance - oldTransfer.Amount }
                    wallets[index] = newWallet
                }
            })
        }
        return ({
            ...state,
            transfers: newTransfers,
            transfersPageTotal: state.transfersPageTotal - 1,
            loadedTransfers: newLoaded,
            wallets: wallets
        })
    }),
    // if deleted is unseen
    // on(transferDeleted, (state, { ID }) => {
    //     const index = state.transfers.map(t => t.ID).indexOf(ID)
    //     let newTransfers = state.transfers.slice(0)
    //     const oldTransfer = newTransfers[index]
    //     newTransfers.splice(index, 1)
    //     let newLoaded = state.loadedTransfers
    //     let wallets = state.wallets.slice(0)
    //     if (oldTransfer.Completed) {
    //         wallets.forEach((wallet, index) => {
    //             if (wallet.ID == oldTransfer.From) {
    //                 wallets[index] = { ...wallet, Balance: wallet.Balance + oldTransfer.Amount }
    //             } else if (wallet.ID == oldTransfer.To) {
    //                 const newWallet = { ...wallet, Balance: wallet.Balance - oldTransfer.Amount }
    //                 wallets[index] = newWallet
    //             }
    //         })
    //     }
    //     //Attention - if ListToFilter changes - it has to be changed too
    //     newLoaded.forEach((val, key) => {
    //         if (oldTransfer.From && key.includes(`&wallet=${oldTransfer.From}`)) {
    //             newLoaded.set(key, --val)
    //         }
    //         if (oldTransfer.To && key.includes(`&wallet=${oldTransfer.To}`)) {
    //             newLoaded.set(key, --val)
    //         }
    //     })
    //     return ({
    //         ...state,
    //         transfers: newTransfers,
    //         transfersPageTotal: state.transfersPageTotal - 1,
    //         loadedTransfers: newLoaded,
    //         wallets: wallets
    //     })
    // }),
)
