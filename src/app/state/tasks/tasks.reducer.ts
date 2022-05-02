
import { createReducer, on } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { TasksState } from '../app.state';
import { retrievedTasks, taskChanged } from './tasks.actions';


export const initialState: TasksState = { tasks: [], loaded: new Map() };

export const tasksReducer = createReducer(
    initialState,
    on(retrievedTasks, (state, { tasks, filter }) => {
        let unique = new Map()
        state.tasks.forEach(l => unique.set(l.ID, l))
        tasks.forEach(l => unique.set(l.ID, l))
        state.loaded.set(FilterToString(filter), true)
        return ({
            tasks: [...unique.values()],
            loaded: state.loaded,
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

