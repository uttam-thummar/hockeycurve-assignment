import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineDeleteOutline } from "react-icons/md";

const AddEditTask = ({ visibleScreen, task, handleVisibleScreen, handleAddUpdateTask, handleDeleteTask }) => {
    const [taskDetails, setTaskDetails] = useState({
        id: Date.now(),
        name: "",
        description: "",
        status: "PENDING"
    });
    const [taskDetailsErrors, setTaskDetailsErrors] = useState({
        name: "",
        description: ""
    });

    const handleTaskDetailsChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prev) => ({ ...prev, [name]: value }));
    }

    const handleClickCancel = () => {
        handleVisibleScreen("TASK_LIST");
    }

    const isValidToSubmit = useMemo(() => {
        if (taskDetails.name !== "" && taskDetails.description !== "") return true;
        return false;
    }, [taskDetails]);

    const handleClickSaveChanges = () => {
        let isError = false;

        if (taskDetails.name.trim() === "") {
            setTaskDetailsErrors((prev) => ({ ...prev, name: "Task name cannot be empty." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, name: "" }));
        }
        if (taskDetails.description.trim() === "") {
            setTaskDetailsErrors((prev) => ({ ...prev, description: "Task description cannot be empty." }));
            isError = true;
        } else {
            setTaskDetailsErrors((prev) => ({ ...prev, description: "" }));
        }

        if (!isError) {
            handleAddUpdateTask(taskDetails);
        }
    }

    const hanldeClickMarkAsDone = () => {
        handleAddUpdateTask({ ...taskDetails, status: 'COMPLETED' });
    }

    const handleClickDelete = (task) => {
        handleDeleteTask(task);
        handleClickCancel();
    }

    useEffect(() => {
        if (visibleScreen === "EDIT_TASK" && task) {
            setTaskDetails(task);
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
                        <label className="block text-sm font-medium text-gray-700">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            autoFocus
                            value={taskDetails.name}
                            onChange={handleTaskDetailsChange}
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-500 outline-none"
                        />
                        {taskDetailsErrors.name && (
                            <span className="text-red-800 text-sm font-semibold">{taskDetailsErrors.name}</span>
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
                    <div className="mt-6 flex justify-center gap-3 flex-wrap">
                        <button disabled={!isValidToSubmit} onClick={handleClickSaveChanges} className="bg-teal-800 text-white px-4 py-1 rounded-full hover:bg-teal-900 transition disabled:bg-gray-300 outline-none">
                            {visibleScreen === "EDIT_TASK" ? 'Save Changes' : 'Add Task'}
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
    handleVisibleScreen: PropTypes.func.isRequired,
    handleAddUpdateTask: PropTypes.func.isRequired,
    handleDeleteTask: PropTypes.func
};

export default AddEditTask;