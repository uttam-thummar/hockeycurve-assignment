import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        visibleScreen: {
            screen: "TASK_LIST",
            data: null
        },
        tasks: [],
        taskListFilter: 'ALL'
    },
    reducers: {
        setVisibleScreen: (state, { payload }) => {
            state.visibleScreen.screen = payload.screen || "TASK_LIST";
            state.visibleScreen.data = payload.data || null
        },
        setTasks: (state, { payload }) => {
            state.tasks = payload.tasks;
        },
        setTaskListFilter: (state, { payload }) => {
            state.taskListFilter = payload;
        },
        updateTask: (state, { payload }) => {
            const tempTasks = [...state.tasks];
            const taskIndex = tempTasks.findIndex((t) => t.id === payload.task.id);
            if (taskIndex > -1) {
                tempTasks[taskIndex] = payload.task;
            } else {
                tempTasks.push(payload.task);
            }

            state.tasks = tempTasks;
            state.visibleScreen = { screen: "TASK_LIST", data: null };
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        deleteTask: (state, { payload }) => {
            let tempTasks = [...state.tasks];
            tempTasks = tempTasks.filter((t) => t.id !== payload.task.id);
            state.tasks = tempTasks;
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
    }
});

export const { setVisibleScreen, setTasks, setTaskListFilter, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;