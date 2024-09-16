import React from 'react';
import { useSelector } from 'react-redux';
import { TaskItem } from './TaskItem';
import { RootState } from '../store';

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

export const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.task);

    return (
        <div>
            {tasks.length === 0 ? (
                <p className="text-gray-500 text-center px-">No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};