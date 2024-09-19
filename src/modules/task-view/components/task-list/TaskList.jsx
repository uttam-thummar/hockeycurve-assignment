import { useState } from "react";
import PropTypes from 'prop-types';
import { IoAddCircle } from "react-icons/io5";
import TaskFilter from "./TaskFilter";

const TaskList = ({ tasks }) => {
    const [appliedFilter, setAppliedFilter] = useState('ALL');

    const handleAppliedFilter = (filter) => {
        setAppliedFilter(filter);
    }

    return (
        <>
            <div className="rounded-lg">
                <div className="p-4 pb-0 bg-gray-300 rounded-t-lg">
                    <button className="flex justify-center items-center gap-2 text-sm bg-teal-800 hover:bg-teal-900 rounded-full text-white pl-1 pr-3 py-1">
                        <IoAddCircle className="text-3xl" />
                        Add new task
                    </button>
                    <TaskFilter appliedFilter={appliedFilter} handleAppliedFilter={handleAppliedFilter} />
                </div>
                <div className="bg-gray-100">
                    <div className="space-y-4 py-4">
                        {tasks.length === 0 ? (
                            <div className="flex justify-center items-center min-h-96">
                                <p className="text-gray-800 font-semibold font-xl">No tasks found!</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div key={index} className="bg-gray-200 p-4 flex justify-between items-center shadow">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{task.name}</h2>
                                        <p className="text-gray-600"><span className="font-semibold">Description:</span> {task.description}</p>
                                        <div className="flex gap-3 items-center mt-4">
                                            <button className="bg-teal-800 text-white px-9 py-1 rounded-full hover:bg-teal-900 transition">Edit</button>
                                            <button className="bg-teal-800 text-white px-9 py-1 rounded-full hover:bg-teal-900 transition">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default TaskList;