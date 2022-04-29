
import { createReducer, on } from '@ngrx/store';
import { MiscState } from '../app.state';
import { retrievedRoles, retrievedSources, retrievedSteps, retrievedUsers, roleChanged, roleDeleted, stepChanged, stepDeleted, userChanged, userDeleted } from './misc.actions';


export const initialState: MiscState = { steps: [], users: [], roles: [], sources: [] };

export const miscsReducer = createReducer(
    initialState,
    on(retrievedSteps, (state, { steps }) => ({ ...state, steps: steps })),
    on(retrievedUsers, (state, { users }) => ({ ...state, users: users })),
    on(retrievedSources, (state, { sources }) => ({ ...state, sources: sources })),
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
    }),
    on(stepChanged, (state, { step }) => {
        // console.log(role)
        const index = state.steps.map(step => step.ID).indexOf(step.ID)
        let newSteps = state.steps.slice(0)
        if (index == -1) {
            newSteps.push(step)
        } else {
            newSteps[index] = step 
        }
        return ({
            ...state,
            steps: newSteps
        })
    }),
    on(stepDeleted, (state, { stepID }) => {
        const index = state.steps.map(step => step.ID).indexOf(stepID)
        let newSteps = state.steps.slice(0)
        newSteps.splice(index, 1)
        return ({
            ...state,
            steps: newSteps
        })
    })
);

