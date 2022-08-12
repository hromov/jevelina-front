import { createSelector } from "@ngrx/store";
import { FilterToString } from "src/app/api.service";
import { Lead, ListFilter, Transfer } from "src/app/shared/model";
import { AppState, FinanceState } from "../app.state";
import { selectCurrentPage, selectLeads } from "../leads/leads.selector";

export const selectFinance = (state: AppState) => state.finance;

export const selectWallets = createSelector(
  selectFinance,
  (state: FinanceState) => state.wallets.slice(0) || []
)

export const selectCategories = createSelector(
  selectFinance,
  (state: FinanceState) => state.categories.slice(0) || []
)

export const selectWalletByID = (id: number) => createSelector(
  selectFinance,
  (state: FinanceState) => {
    const index = state.wallets.map(c => c.ID).indexOf(Number(id))
    return (index != -1) ? state.wallets[index] : null
  }
)

export const areTransfersLoaded = (filter: ListFilter) => createSelector(
  selectFinance,
  (state: FinanceState) => state.loadedTransfers ? state.loadedTransfers.has(FilterToString(filter)) : false
)

//TODO: how about removing custom filter and just saving IDs from response ?
export const selectFilteredTransfers = (filter: ListFilter) => createSelector(
  selectFinance,
  (state: FinanceState) => _filter(state.transfers.slice(0), filter)
)

export const selectCurrentTransfers = createSelector(
  selectFinance,
  (state: FinanceState) => _filter(state.transfers.slice(0), state.transfersPage)
)

export const selectCurrentTransfersTotal = createSelector(
  selectFinance,
  (state: FinanceState) => state.transfersPageTotal
)

export const selectTransfersTotal = (filter: ListFilter) => createSelector(
  selectFinance,
  (state: FinanceState) => state.loadedTransfers ? state.loadedTransfers.get(FilterToString(filter)) : 0
)

export const selectTransfersByParent = (parentID: number) => createSelector(
  selectFinance,
  (state: FinanceState) => state.transfers.filter(t => t.ParentID == parentID && !t.DeletedAt)
)

export const selectProfitByParent = (parenID: number) => createSelector(
  // selectFinance,
  selectTransfersByParent(parenID),
  (transfers: Transfer[]) => _sum(transfers)
)

export const selectAllTransfers = createSelector(
  selectFinance,
  (state: FinanceState) => state.transfers
)

// DO I need it?
export const selectProfitByParents = (ids: number[]) => createSelector(
  selectAllTransfers,
  (transfers: ReadonlyArray<Transfer>) => _sum(transfers.filter(t => ids.includes(t.ID) && !t.DeletedAt))
)

export const selectProfitForPage = createSelector(
  selectCurrentPage,
  selectAllTransfers,
  (leads: ReadonlyArray<Lead>, transfers: ReadonlyArray<Transfer>) => {
    const parents = leads.filter(l => !l.Step.Active).map(l => l.ID)
    const filtered = transfers.filter(t => parents.includes(t.ParentID) && !t.DeletedAt)
    return _sum(filtered)
  }
)

//can't fully check query :-/ I have to reproduce search search algo here then
function _valid(l: Transfer, filter: ListFilter): boolean {
  // console.log(filter)
  // check date only if transfer completed, because we want all uncomplited to go first
  if (filter.completed) {
    if (filter.min_date && new Date(l.CompletedAt) < new Date(filter.min_date)) {
      return false
    }
    if (filter.max_date && new Date(l.CompletedAt) > new Date(filter.max_date)) {
      return false
    }
  }
  if (filter.query && filter.query !== l.Category) {
    return false
  }
  if (filter.parent && l.ParentID != filter.parent) {
    return false
  }
  if (filter.from && l.From != filter.from) {
    return false
  }
  if (filter.to && l.To != filter.to) {
    return false
  }
  if (filter.wallet && !(filter.wallet == l.From || filter.wallet == l.To)) {
    return false
  }
  return true
}

function _filter(tasks: Transfer[], filter: ListFilter): Transfer[] {
  // console.log(filter)
  if (Object.keys(filter).length === 0) {
    return []
  }
  // console.log(filter)
  const filtered = tasks.filter(c => _valid(c, filter)).sort((a, b) => {
    // if (!a.Completed && !b.Completed) {
    //   return b.CreatedAt < a.CreatedAt ? -1 : 1
    // }
    // return b.CompletedAt < a.CompletedAt ? -1 : 1
    if (a.Completed && b.Completed) {
      return b.CompletedAt < a.CompletedAt ? -1 : 1  
    }
    if (a.Completed && !b.Completed) {
      return 1
    }
    return b.CreatedAt < a.CreatedAt ? -1 : 1
  })
  // console.group(FilterToString(filter))
  // console.log(filter, filtered)
  // console.groupEnd()
  if (!filtered || filter.limit === undefined || filter.offset === undefined) {
    // console.log("fast return", !filtered)
    return filtered
  }
  if (!filtered || filter.offset > filtered.length) {
    // console.log("blank return")
    return []
  }
  if (filtered.length < (filter.offset + filter.limit)) {
    // console.log("trunc return")
    return filtered.slice(filter.offset, filtered.length)
  }
  // console.log("normal return with all filter")
  return filtered.slice(filter.offset, filter.offset + filter.limit)
}

function _sum(transfers: Transfer[]): number {
  return transfers.map(t => t.Amount * (t.From ? -1 : 1)).reduce((p, n) => p + n, 0)
}