
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { TasksState } from '../app.state';
import { retrievedTasks, taskChanged } from './tasks.actions';


export const initialState: TasksState = { tasks: [], loaded: [] };

export const tasksReducer = createReducer(
    initialState,
    on(retrievedTasks, (state, { tasks, parentID }) => {
        let newTasks = state.tasks.filter(t => t.ParentID != parentID)
        newTasks.push(...tasks)
        let newLoaded = state.loaded.slice(0)
        if (newLoaded.indexOf(parentID) == -1) {
            newLoaded.push(parentID)
        }
        return ({
            tasks: newTasks,
            loaded: newLoaded
        })
    }),
    on(taskChanged, (state, { task }) => {
        const index = state.tasks.map(t => t.ID).indexOf(task.ID)
        let newTasks = state.tasks.slice(0)
        if (index == -1) {
            newTasks.push(task)
        } else {
            newTasks[index] = task
        }
        return ({
            ...state,
            tasks: newTasks,
        })
    })
)

