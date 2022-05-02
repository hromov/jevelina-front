import { createSelector } from '@ngrx/store';
import { FilterToString } from 'src/app/api.service';
import { ListFilter, Task } from 'src/app/shared/model';
import { AppState, TasksState } from '../app.state';

export const selectTasks = (state: AppState) => state.tasks;

// export const selectTasksFor = (parentID: number) => createSelector(
//     selectTasks,
//     (state: TasksState) => state.tasks.filter(t => t.ParentID == parentID)
// )

export const isTaskLoaded = (filter: ListFilter) => createSelector(
    selectTasks,
    (state: TasksState) => state.loaded.has(FilterToString(filter))
)

export const selectFilteredTasks = (filter: ListFilter) => createSelector(
    selectTasks,
    (state: TasksState) => _filter(state.tasks.slice(0), filter)
)


//can't fully check query :-/ I have to reproduce search search algo here then
function _valid(l: Task, filter: ListFilter): boolean {
    // console.log(filter)
    if (filter.min_date && new Date(l.DeadLine) < new Date(filter.min_date)) {
        return false
    }
    if (filter.max_date && new Date(l.DeadLine) > new Date(filter.max_date)) {
        return false
    }
    if ((filter.min_date || filter.max_date) && l.Completed) {
        return false
    }
    if (filter.parent && l.ParentID != filter.parent) {
        return false
    }
    if (filter.responsible && l.ResponsibleID != filter.responsible) {
        return false
    }
    return true
}

function _filter(tasks: Task[], filter: ListFilter): Task[] {
    // console.log(filter)
    if (Object.keys(filter).length === 0) {
        return []
    }
    // console.log(filter)
    const filtered = tasks.filter(c => _valid(c, filter))
    // console.group(FilterToString(filter))
    // console.log(filter, filtered)
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