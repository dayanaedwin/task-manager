import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskItem } from './TaskItem';
import { RootState } from '../store';
import { Filter } from './Filter';

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

export const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.task);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
    };

    useEffect(() => {
        const tasklist = tasks.filter((task) => {
            if (selectedFilter === 'Completed') {
                return task.isCompleted;
            } else if (selectedFilter === 'Incomplete') {
                return !task.isCompleted;
            }
            return true;
        });
        setFilteredTasks(tasklist);
    }, [selectedFilter, tasks])

    return (
        <div>
            <Filter selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />
            {filteredTasks?.length === 0 ? (
                <p className="text-gray-500 text-center px-2">No tasks available</p>
            ) : (
                <ul>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};