import { createAction, props } from "@ngrx/store";
import { Wallet } from "src/app/shared/model";

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