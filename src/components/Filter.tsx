import { useState } from "react";
import { filterOptions } from "../constants";

interface IFilter {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
}

export const Filter: React.FC<IFilter> = ({ selectedFilter, onFilterChange }) => {

    return (
        < div className="flex justify-end space-x-2 mb-4" >
            {filterOptions.map((filter) => (
                <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.value)}
                    className={`px-4 py-1 rounded-full text-sm border ${selectedFilter === filter.value ? 'bg-gray-800 text-white' : 'bg-white'}`}
                >
                    {filter.value}
                </button>
            ))}
        </div >
    )
}