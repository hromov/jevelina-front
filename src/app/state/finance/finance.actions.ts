import { createAction, props } from "@ngrx/store";
import { ListFilter, Transfer, Wallet } from "src/app/shared/model";

export const walletsRequired = createAction(
  '[Components] Wallets Required'
);

export const retrievedWallets = createAction(
    '[Finance Service] Wallets Loaded',
    props<{ wallets: Wallet[] }>()
  );

export const walletChanged = createAction(
    '[Settings / Wallets Tab] Wallet Updated or Added',
    props<{ wallet: Wallet }>()
  );
  
  export const walletDeleted = createAction(
    '[Settings / Wallets Tab] Wallet Deleted',
    props<{ ID: number }>()
  );


export const transfersRecieved = createAction(
  '[Finance Service] Transfers Success',
  props<{ transfers: Transfer[], total: number, filter: ListFilter }>()
);

export const transfersRequired = createAction(
  '[Finance Service] Transfers Required',
  props<{ filter: ListFilter }>()
)

export const transfersPageChanged = createAction(
  '[Wallets Table] Page Changed',
  props<{ filter: ListFilter}>()
)

export const transferChanged = createAction(
  '[Transfer Data Component] Transfer Changed',
  props<{ transfer: Transfer, filter?: ListFilter}>()
)

export const transferDeleted = createAction(
  '[Transfer Data Component] Transfer Deleted',
  props<{ ID: number, filter?: ListFilter }>()
);