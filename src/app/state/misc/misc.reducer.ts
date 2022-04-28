
import { createReducer, on } from '@ngrx/store';
import { MiscState } from '../app.state';
import { retrievedRoles, retrievedSteps, retrievedUsers, roleChanged, roleDeleted, userChanged, userDeleted } from './misc.actions';


export const initialState: MiscState = { steps: [], users: [], roles: [] };

export const miscsReducer = createReducer(
    initialState,
    on(retrievedSteps, (state, { steps }) => ({ ...state, steps: steps })),
    on(retrievedUsers, (state, { users }) => ({ ...state, users: users })),
    on(retrievedRoles, (state, { roles }) => ({ ...state, roles: roles })),
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
    }),
    on(roleChanged, (state, { role }) => {
        // console.log(role)
        const index = state.roles.map(role => role.ID).indexOf(role.ID)
        let newRoles = state.roles.slice(0)
        if (index == -1) {
            newRoles.push(role)
        } else {
            newRoles[index] = role 
        }
        return ({
            ...state,
            roles: newRoles
        })
    }),
    on(roleDeleted, (state, { roleID }) => {
        const index = state.roles.map(role => role.ID).indexOf(roleID)
        let newRoles = state.roles.slice(0)
        newRoles.splice(index, 1)
        return ({
            ...state,
            roles: newRoles
        })
    })
);

