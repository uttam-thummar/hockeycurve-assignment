import { useState } from "react";
import PropTypes from "prop-types";
import { IoAddCircle } from "react-icons/io5";
import TaskFilter from "./TaskFilter";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const TaskList = ({ tasks, handleVisibleScreen, handleDeleteTask }) => {
    const [appliedFilter, setAppliedFilter] = useState("ALL");

    const handleAppliedFilter = (filter) => {
        setAppliedFilter(filter);
    }

    const handleClickAddTask = () => {
        handleVisibleScreen("ADD_TASK");
    }

    const handleClickEditTask = (task) => {
        handleVisibleScreen("EDIT_TASK", task);
    }

    const getTaskStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <>
            <div className="rounded-lg">
                <div className="p-4 pb-0 bg-gray-300 rounded-t-lg">
                    <button onClick={handleClickAddTask} className="flex justify-center items-center gap-2 text-sm bg-teal-800 hover:bg-teal-900 rounded-full text-white pl-1 pr-3 py-1">
                        <IoAddCircle className="text-3xl" />
                        Add new task
                    </button>
                    <TaskFilter appliedFilter={appliedFilter} handleAppliedFilter={handleAppliedFilter} />
                </div>
                <div className="bg-gray-100">
                    <div className="space-y-4 py-4">
                        {tasks.length === 0 ? (
                            <div className="flex justify-center items-center min-h-96">
                                <p className="text-gray-800 font-semibold text-xl">No tasks found!</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div key={index} className="bg-gray-200 p-4 flex justify-between items-center shadow">
                                    <div className="w-full">
                                        <div className="w-full flex items-center justify-between gap-2">
                                            <h2 className="grow text-xl font-semibold text-gray-800">{task.name}</h2>
                                            <span className={`w-max px-3 py-1 rounded-full text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600"><span className="font-semibold">Description:</span> {task.description}</p>
                                        <div className="flex gap-3 items-center mt-4">
                                            <button onClick={() => handleClickEditTask(task)} className="flex justify-center items-center gap-3 bg-teal-800 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
                                                Edit
                                                <FiEdit className="text-lg" />
                                            </button>
                                            <button onClick={() => handleDeleteTask(task)} className="flex justify-center items-center gap-2 bg-teal-800 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
                                                <MdOutlineDeleteOutline className="text-lg" />
                                                Delete
                                            </button>
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
    tasks: PropTypes.array.isRequired,
    handleVisibleScreen: PropTypes.func.isRequired,
    handleDeleteTask: PropTypes.func.isRequired
};

export default TaskList;