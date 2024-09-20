import { useCallback, useState } from "react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";
import TaskFilter from "./TaskFilter";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidRightArrow, BiSort } from "react-icons/bi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setTasks, setVisibleScreen, updateTask } from "../../../../redux/reducers/task/taskSlice";
import { sortByPriorityAndDueDate } from "../../../../utils/helper";

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, taskListFilter } = useSelector((store) => store.task);
    const [searchQuery, setSearchQuery] = useState('');

    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const handleClickAddTask = () => {
        dispatch(setVisibleScreen({ screen: "ADD_TASK" }));

    }

    const handleClickEditTask = (task) => {
        dispatch(setVisibleScreen({ screen: "EDIT_TASK", data: task }));
    }

    const handleToggleExpandedTaskId = (id) => {
        setExpandedTaskId((prev) => prev === id ? null : id);
    }

    const handleClickOnSnooze = (task) => {
        dispatch(updateTask({ task: { ...task, dueDate: new Date(new Date(task.dueDate).getTime() + 1000 * 60 * 60 * 6).toString() } }));
    }

    const handleClickSortByProirityAndDueDate = () => {
        const sortedTasks = sortByPriorityAndDueDate(tasks);
        dispatch(setTasks({ tasks: sortedTasks }));
    }

    const getTaskPriorityColor = (priority) => {
        switch (priority) {
            case "HIGH":
                return "bg-red-800";
            case "MEDIUM":
                return "bg-yellow-600";
            case "LOW":
                return "bg-green-800";
            default:
                return "bg-gray-600";
        }
    }

    const getTaskStatusColor = (status) => {
        switch (status) {
            case "DONE":
                return "bg-green-100 text-green-800";
            case "PENDING":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    const getFilteredTasks = useCallback(() => {
        let filteredTasks = [];

        switch (taskListFilter) {
            case "ALL":
                filteredTasks = tasks;
                break;
            case "HIGH":
                filteredTasks = tasks.filter((t) => t.priority === "HIGH");
                break;
            case "MEDIUM":
                filteredTasks = tasks.filter((t) => t.priority === "MEDIUM");
                break;
            case "LOW":
                filteredTasks = tasks.filter((t) => t.priority === "LOW");
                break;
            case "DONE":
                filteredTasks = tasks.filter((t) => t.status === "DONE");
                break;
            default:
                break;
        }

        filteredTasks = filteredTasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

        return filteredTasks;
    }, [tasks, taskListFilter, searchQuery]);

    return (
        <>
            <div className="rounded-lg">
                <div className="p-4 pb-0 bg-gray-300 dark:bg-gray-700 rounded-t-lg">
                    <button onClick={handleClickAddTask} className="flex justify-center items-center gap-2 text-sm bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-800 rounded-full text-white pl-1 pr-3 py-1">
                        <IoAddCircle className="text-3xl" />
                        Add new task
                    </button>
                    <div className="flex gap-3 items-center mt-4">
                        <div className="relative grow">
                            <input
                                type="text"
                                name="title"
                                placeholder="Search tasks by title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:ring focus:ring-teal-500 outline-none"
                            />
                            {searchQuery && (
                                <div className="absolute right-3 top-3 cursor-pointer text-gray-400">
                                    <IoCloseCircle onClick={() => setSearchQuery('')} className="text-xl text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-300" />
                                </div>
                            )}
                        </div>
                        <div className="relative group">
                            <div onClick={handleClickSortByProirityAndDueDate} className="w-9 h-9 flex justify-center items-center bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full cursor-pointer hover:bg-black hover:text-white transition-all duration-300">
                                <BiSort className="text-xl" />
                            </div>
                            <div className="absolute right-0 transform bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 text-center w-max">
                                Sort by priority and due date
                            </div>
                        </div>
                    </div>
                    <TaskFilter />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800">
                    <div className="space-y-4 py-4">
                        {getFilteredTasks().length === 0 ? (
                            <div className="flex justify-center items-center min-h-96">
                                <p className="text-gray-800 dark:text-gray-100 font-semibold text-xl">No tasks found!</p>
                            </div>
                        ) : (
                            getFilteredTasks().map((task, index) => (
                                <div key={index} className="mb-4 overflow-hidden">
                                    <div
                                        onClick={() => handleToggleExpandedTaskId(task.id)}
                                        className="flex items-baseline justify-between gap-3 bg-gray-300 dark:bg-gray-700 px-4 py-3 cursor-pointer"
                                    >
                                        <div className={`flex items-baseline gap-2 ${task.status === "DONE" && "line-through"}`}>
                                            <div>
                                                <BiSolidRightArrow className={`transition-all duration-500 text-teal-800 dark:text-teal-400 ease-in-out text-sm ${expandedTaskId === task.id && "rotate-90"}`} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg sm:text-xl font-semibold line-clamp-2 overflow-hidden text-ellipsis break-words dark:text-gray-100">{task.title}</h2>
                                                <p className="text-sm dark:text-gray-400">Due Date: {moment(new Date(task.dueDate)).format("DD MMM YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className="capitalize text-sm sm:text-lg dark:text-gray-300">{task.priority.toLowerCase()}</p>
                                            <div className={`w-3 sm:w-5 h-3 sm:h-5 rounded-full ${getTaskPriorityColor(task.priority)}`}></div>
                                        </div>
                                    </div>

                                    <div className={`overflow-y-auto transition-all duration-500 ease-in-out ${expandedTaskId === task.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="px-4 py-4 sm:px-6 md:px-8 space-y-3 dark:text-gray-300">
                                            <div>
                                                <p className="text-lg font-bold"><span className="text-teal-800 dark:text-teal-400">Title :</span> {task.title}</p>
                                            </div>
                                            <div>
                                                <p className="text-lg text-teal-800 dark:text-teal-400"><strong>Description :</strong></p>
                                                <p className="text-lg">{task.description || "No description provided."}</p>
                                            </div>
                                            <div>
                                                <div className="text-lg text-teal-800 dark:text-teal-400">
                                                    <strong>Due Date :</strong>
                                                    <span className={`w-max ml-3 px-3 py-1 rounded-full text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <p className="text-lg">
                                                        {moment(new Date(task.dueDate)).format("DD MMM YYYY - hh:mm a")}
                                                    </p>
                                                    {task.status !== "DONE" && (
                                                        <p onClick={() => handleClickOnSnooze(task)} className="underline text-sm cursor-pointer transition-all duration-300 hover:font-semibold dark:text-teal-400">Snooze for 6 hours</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-center mt-4">
                                                <button onClick={() => handleClickEditTask(task)} className="flex justify-center items-center gap-3 bg-teal-800 dark:bg-teal-600 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
                                                    Edit
                                                    <FiEdit className="text-lg" />
                                                </button>
                                                <button onClick={() => dispatch(deleteTask({ task }))} className="flex justify-center items-center gap-2 bg-teal-800 dark:bg-teal-600 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
                                                    <MdOutlineDeleteOutline className="text-lg" />
                                                    Delete
                                                </button>
                                            </div>
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

export default TaskList;