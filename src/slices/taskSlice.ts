import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
    id: number;
    title: string;
    isCompleted: boolean;
}

const loadFromLocalStorage = () => {
    try {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
        console.log('Failed to load tasks from localStorage:', error);
        return [];
    }
};

const saveToLocalStorage = (state: ITask[]) => {
    try {
        const tasks = JSON.stringify(state);
        localStorage.setItem('tasks', tasks);
    } catch (error) {
        console.log('Failed to save tasks to localStorage:', error);
    }
};

const initialState: ITask[] = loadFromLocalStorage();

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.push({
                id: Date.now(),
                title: action.payload,
                isCompleted: false,
            });
            saveToLocalStorage(state);
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            const task = state.find((task) => task.id === action.payload);
            if (task) {
                task.isCompleted = !task.isCompleted;
                saveToLocalStorage(state);
            }
        },
        editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const task = state.find((task) => task.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
                saveToLocalStorage(state);
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((task) => task.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
                saveToLocalStorage(state);
            }
        },
    },
});

export const { addTask, toggleComplete, editTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
