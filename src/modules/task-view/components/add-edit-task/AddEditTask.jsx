import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditTask = ({ visibleScreen, task, tasks, handleVisibleScreen, handleAddUpdateTask, handleDeleteTask }) => {
    const [taskDetails, setTaskDetails] = useState({
        id: Date.now(),
        title: "",
        description: "",
        dueDate: null,
        priority: "",
        status: "PENDING"
    });
    const [taskDetailsErrors, setTaskDetailsErrors] = useState({
        title: "",
        description: ""
    });

    const handleTaskDetailsChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prev) => ({ ...prev, [name]: value }));
    }

    const handleDueDateChange = (date) => {
        setTaskDetails((prev) => ({ ...prev, dueDate: date }));
    }

    const handleClickCancel = () => {
        handleVisibleScreen("TASK_LIST");
    }

    const isValidToSubmit = useMemo(() => {
        if (taskDetails.title !== "" && taskDetails.description !== "" && taskDetails.dueDate !== null && taskDetails.priority !== "") return true;
        return false;
    }, [taskDetails]);

    const handleClickSaveChanges = () => {
        let isError = false;

        if (taskDetails.title.trim() === "") {
            setTaskDetailsErrors((prev) => ({ ...prev, title: "Task title cannot be empty." }));
            isError = true;
        } else if (visibleScreen !== "EDIT_TASK" && tasks.findIndex((t) => t.title.trim().toLowerCase() === taskDetails.title.trim().toLowerCase()) > -1) {
            setTaskDetailsErrors((prev) => ({ ...prev, title: "Task with this title already exist." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, title: "" }));
        }

        if (taskDetails.description.trim() === "") {
            setTaskDetailsErrors((prev) => ({ ...prev, description: "Task description cannot be empty." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, description: "" }));
        }

        if (taskDetails.dueDate === null) {
            setTaskDetailsErrors((prev) => ({ ...prev, dueDate: "Due date cannot be empty." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, dueDate: "" }));
        }

        if (taskDetails.priority === "") {
            setTaskDetailsErrors((prev) => ({ ...prev, priority: "Priority cannot be empty." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, priority: "" }));
        }

        if (!isError) {
            handleAddUpdateTask(taskDetails);
        }
    }

    const hanldeClickMarkAsDone = () => {
        handleAddUpdateTask({ ...taskDetails, status: "DONE" });
    }

    const handleClickDelete = (task) => {
        handleDeleteTask(task);
        handleClickCancel();
    }

    useEffect(() => {
        if (visibleScreen === "EDIT_TASK" && task) {
            setTaskDetails({
                ...task,
                dueDate: new Date(task.dueDate)
            });
        }
    }, [visibleScreen, task]);

    return (
        <>
            <div className="p-4 mx-auto bg-gray-100 rounded-lg transition duration-500">

                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">{visibleScreen === "EDIT_TASK" ? "Edit Task" : "Add Task"}</h2>
                        {(visibleScreen === "EDIT_TASK" && task) && (
                            <button onClick={() => handleClickDelete(task)} className="flex justify-center items-center gap-2 bg-pink-500 hover:bg-pink-700 text-white px-4 py-1 rounded-full outline-none">
                                <MdOutlineDeleteOutline className="text-lg" />
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Task Title</label>
                        <input
                            type="text"
                            name="title"
                            autoFocus
                            value={taskDetails.title}
                            onChange={handleTaskDetailsChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 outline-none"
                        />
                        {taskDetailsErrors.title && (
                            <span className="text-red-800 text-sm font-semibold">{taskDetailsErrors.title}</span>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={taskDetails.description}
                            onChange={handleTaskDetailsChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 outline-none"
                        />
                        {taskDetailsErrors.description && (
                            <span className="text-red-800 text-sm font-semibold">{taskDetailsErrors.description}</span>
                        )}
                    </div>
                    <div className="mt-4 relative">
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <DatePicker
                            showIcon
                            showTimeSelect
                            showMonthDropdown
                            dateFormat="MMMM d yyyy - h:mm aa"
                            timeIntervals={15}
                            icon={<IoCalendarClearOutline className="top-3 right-1 text-xl" />}
                            name="dueDate"
                            minDate={new Date()}
                            selected={taskDetails.dueDate}
                            onChange={handleDueDateChange}
                            placeholderText="Select due date"
                            className="w-full mt-2 !px-4 !py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500  outline-none"
                        />
                        {taskDetailsErrors.dueDate && (
                            <span className="text-red-800 text-sm font-semibold">{taskDetailsErrors.dueDate}</span>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 ">Priority</label>
                        <select
                            name="priority"
                            value={taskDetails.priority}
                            onChange={handleTaskDetailsChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 outline-none"
                        >
                            <option value="">Select Priority</option>
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>
                        {taskDetailsErrors.priority && (
                            <span className="text-red-800 text-sm font-semibold">{taskDetailsErrors.priority}</span>
                        )}
                    </div>
                    <div className="mt-6 flex justify-center gap-3 flex-wrap">
                        <button disabled={!isValidToSubmit} onClick={handleClickSaveChanges} className="bg-teal-800 text-white px-4 py-1 rounded-full hover:bg-teal-900 transition disabled:bg-gray-300 outline-none">
                            {visibleScreen === "EDIT_TASK" ? "Save Changes" : "Add Task"}
                        </button>
                        {(visibleScreen === "EDIT_TASK" && task) && (
                            <button disabled={!isValidToSubmit} onClick={hanldeClickMarkAsDone} className="bg-teal-800 text-white px-4 py-1 rounded-full hover:bg-teal-900 transition disabled:bg-gray-300 outline-none">Mark as Done</button>
                        )}
                        <button onClick={handleClickCancel} className="bg-teal-800 text-white px-4 py-1 rounded-full hover:bg-teal-900 transition outline-none">Cancel</button>
                    </div>
                </div>

            </div>
        </>
    )
}

AddEditTask.propTypes = {
    visibleScreen: PropTypes.string.isRequired,
    task: PropTypes.object,
    tasks: PropTypes.array.isRequired,
    handleVisibleScreen: PropTypes.func.isRequired,
    handleAddUpdateTask: PropTypes.func.isRequired,
    handleDeleteTask: PropTypes.func
};

export default AddEditTask;