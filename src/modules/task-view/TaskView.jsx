import { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import TaskList from "./components/task-list/TaskList";
import AddEditTask from "./components/add-edit-task/AddEditTask";

const RenderTaskView = () => {
    const [visibleScreen, setVisibleScreen] = useState({ screen: "TASK_LIST", data: null });
    const [tasks, setTasks] = useState([]);

    const handleVisibleScreen = (screen, data = null) => {
        setVisibleScreen((prev) => ({ ...prev, screen, data }));
    }

    const handleAddUpdateTask = (task) => {
        const tempTasks = [...tasks];
        const taskIndex = tempTasks.findIndex((t) => t.id === task.id);
        if (taskIndex > -1) {
            tempTasks[taskIndex] = task;
        } else {
            tempTasks.push(task);
        }

        setTasks(tempTasks);
        handleVisibleScreen("TASK_LIST");
    }

    const handleDeleteTask = (task) => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }

    switch (visibleScreen.screen) {
        case "TASK_LIST":
            return (
                <TaskList
                    tasks={tasks}
                    handleVisibleScreen={handleVisibleScreen}
                    handleDeleteTask={handleDeleteTask}
                />
            );
        case "ADD_TASK":
            return (
                <AddEditTask
                    visibleScreen={visibleScreen.screen}
                    handleVisibleScreen={handleVisibleScreen}
                    handleAddUpdateTask={handleAddUpdateTask}
                />
            );
        case "EDIT_TASK":
            return (
                <AddEditTask
                    visibleScreen={visibleScreen.screen}
                    task={visibleScreen.data}
                    handleVisibleScreen={handleVisibleScreen}
                    handleAddUpdateTask={handleAddUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                />
            );
        default:
            break;
    }
}

const TaskView = () => {
    return (
        <>
            <div className="transition duration-500 m-5 mt-10">
                <div className="container mx-auto">
                    <div className="flex justify-start items-center">
                        <div className="bg-teal-800 p-2 text-sm md:text-lg font-semibold text-white flex justify-center items-center gap-2 rounded-t-lg ml-3">
                            <FaRegFolderOpen />
                            <div>Task List View</div>
                        </div>
                    </div>
                    <RenderTaskView />
                </div>
            </div>
        </>
    )
}

export default TaskView;