import React, { useState } from 'react';
import { MdEdit, MdDelete, MdOutlineCheck } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete, editTask } from '../slices/taskSlice';
import { AppDispatch } from '../store';

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(task.title);
    const dispatch = useDispatch<AppDispatch>();

    const handleUpdate = () => {
        dispatch(editTask({ id: task.id, title: newTitle }));
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        dispatch(toggleComplete(task.id));
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };


    return (
        <li className="flex items-center justify-between p-2 space-x-2 cursor-pointer hover:bg-gray-100 group">
            <label className="flex items-center cursor-pointer relative">
                <input
                    type="checkbox"
                    checked={task.isCompleted && !isEditing}
                    onChange={handleToggleComplete}
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                </span>
            </label>
            {isEditing ? (
                <form onSubmit={handleUpdate} className="flex-grow">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className={`w-full border-0 bg-gray-100 text-lg focus:outline-none ${isEditing ? 'border-b border-slate-900' : ''}`}
                    />
                </form>
            ) : (
                <span
                    className={`flex-grow text-lg ${task.isCompleted ? 'line-through text-gray-500' : ''}`}
                    onClick={handleToggleComplete}
                >
                    {task.title}
                </span>
            )}
            <div className="ml-4 space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        <MdEdit size={20} />
                    </button>
                )}
                <button
                    onClick={isEditing ? handleUpdate : handleDelete}
                    className={`text-red-500 hover:text-red-700`}
                >
                    {isEditing ? <MdOutlineCheck size={20} /> : <MdDelete size={20} />}
                </button>
            </div>
        </li>
    );
};