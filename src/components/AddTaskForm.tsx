import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoPlus } from "react-icons/go";
import { addTask } from '../slices/taskSlice';
import { AppDispatch } from '../store';

export const AddTaskForm = () => {
    const [title, setTitle] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim()) {
            dispatch(addTask(title));
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex mb-4 relative">
            <input
                type="text"
                className="pl-10 w-full p-2 border bg-gray-50 border-gray-100 rounded focus:outline-none"
                placeholder="Add a new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <span className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-gray-500">
                <GoPlus />
            </span>
            <button
                type="submit"
                className="ml-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900"
            >
                <GoPlus size={20} />
            </button>
        </form>
    );
};
