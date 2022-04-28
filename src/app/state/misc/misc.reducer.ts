
import { createReducer, on } from '@ngrx/store';
import { MiscState } from '../app.state';
import { retrievedSteps, retrievedUsers, userChanged, userDeleted } from './misc.actions';


export const initialState: MiscState = { steps: [], users: [] };

export const miscsReducer = createReducer(
    initialState,
    on(retrievedSteps, (state, { steps }) => ({ ...state, steps: steps })),
    on(retrievedUsers, (state, { users }) => ({ ...state, users: users })),
    on(userChanged, (state, { user }) => {
        // console.log(user)
        const index = state.users.map(user => user.ID).indexOf(user.ID)
        let newUsers = state.users.slice(0)
        if (index == -1) {
            newUsers.push(user)
        } else {
            newUsers[index] = user 
        }
        return ({
            ...state,
            users: newUsers
        })
    }),
    on(userDeleted, (state, { userID }) => {
        const index = state.users.map(user => user.ID).indexOf(userID)
        let newUsers = state.users.slice(0)
        newUsers.splice(index, 1)
        return ({
            ...state,
            users: newUsers
        })
    })
);

