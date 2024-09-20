import { useCallback, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import TaskFilter from "./TaskFilter";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setVisibleScreen, updateTask } from "../../../../redux/reducers/task/taskSlice";

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, taskListFilter } = useSelector((store) => store.task);

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
        switch (taskListFilter) {
            case "ALL":
                return tasks;
            case "HIGH":
                return tasks.filter((t) => t.priority === "HIGH");
            case "MEDIUM":
                return tasks.filter((t) => t.priority === "MEDIUM");
            case "LOW":
                return tasks.filter((t) => t.priority === "LOW");
            case "DONE":
                return tasks.filter((t) => t.status === "DONE");
            default:
                break;
        }
    }, [tasks, taskListFilter]);

    return (
        <>
            <div className="rounded-lg">
                <div className="p-4 pb-0 bg-gray-300 rounded-t-lg">
                    <button onClick={handleClickAddTask} className="flex justify-center items-center gap-2 text-sm bg-teal-800 hover:bg-teal-900 rounded-full text-white pl-1 pr-3 py-1">
                        <IoAddCircle className="text-3xl" />
                        Add new task
                    </button>
                    <TaskFilter />
                </div>
                <div className="bg-gray-100">
                    <div className="space-y-4 py-4">
                        {getFilteredTasks().length === 0 ? (
                            <div className="flex justify-center items-center min-h-96">
                                <p className="text-gray-800 font-semibold text-xl">No tasks found!</p>
                            </div>
                        ) : (
                            getFilteredTasks().map((task, index) => (
                                <div key={index} className="mb-4 overflow-hidden">
                                    <div
                                        onClick={() => handleToggleExpandedTaskId(task.id)}
                                        className="flex items-baseline justify-between gap-3 bg-gray-300 px-4 py-3 cursor-pointer"
                                    >
                                        <div className={`flex items-baseline gap-2 ${task.status === "DONE" && "line-through"}`}>
                                            <div>
                                                <BiSolidRightArrow className={`transition-all duration-500 text-teal-800 ease-in-out text-sm ${expandedTaskId === task.id && "rotate-90"}`} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg sm:text-xl font-semibold line-clamp-2 overflow-hidden text-ellipsis break-words">{task.title}</h2>
                                                <p className="text-sm">Due Date: {moment(new Date(task.dueDate)).format("DD MMM YYYY")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className="capitalize text-sm sm:text-lg">{task.priority.toLowerCase()}</p>
                                            <div className={`w-3 sm:w-5 h-3 sm:h-5 rounded-full ${getTaskPriorityColor(task.priority)}`}></div>
                                        </div>
                                    </div>

                                    <div className={`overflow-y-auto transition-all duration-500 ease-in-out ${expandedTaskId === task.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="px-4 py-4 sm:px-6 md:px-8 space-y-3">
                                            <div>
                                                <p className="text-lg font-bold"><span className="text-teal-800">Title :</span> {task.title}</p>
                                            </div>
                                            <div>
                                                <p className="text-lg text-teal-800"><strong>Description :</strong></p>
                                                <p className="text-lg">{task.description || "No description provided."}</p>
                                            </div>
                                            <div>
                                                <div className="text-lg text-teal-800">
                                                    <strong>Due Date :</strong>
                                                    <span className={`w-max ml-3 px-3 py-1 rounded-full text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 items-center">
                                                    <p className="text-lg">
                                                        {moment(new Date(task.dueDate)).format("DD MMM YYYY - hh:mm a")}
                                                    </p>
                                                    <p onClick={() => handleClickOnSnooze(task)} className="underline text-sm cursor-pointer transition-all duration-100 hover:font-semibold">Snooze for 6 hours</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 items-center mt-4">
                                                <button onClick={() => handleClickEditTask(task)} className="flex justify-center items-center gap-3 bg-teal-800 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
                                                    Edit
                                                    <FiEdit className="text-lg" />
                                                </button>
                                                <button onClick={() => dispatch(deleteTask({ task }))} className="flex justify-center items-center gap-2 bg-teal-800 text-white px-7 py-1 rounded-full hover:bg-teal-900 transition">
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