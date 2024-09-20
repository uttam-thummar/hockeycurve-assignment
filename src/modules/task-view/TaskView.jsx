import { useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import TaskList from "./components/task-list/TaskList";
import AddEditTask from "./components/add-edit-task/AddEditTask";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/reducers/task/taskSlice";
import { IoSunnySharp } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";

const RenderTaskView = () => {
    const dispatch = useDispatch();
    const { visibleScreen } = useSelector((store) => store.task);

    useEffect(() => {
        const tasksStringify = localStorage.getItem("tasks");
        if (tasksStringify) {
            const tasks = JSON.parse(tasksStringify);
            dispatch(setTasks({ tasks }))
        }
    }, [dispatch]);

    switch (visibleScreen.screen) {
        case "TASK_LIST":
            return (
                <TaskList />
            );
        case "ADD_TASK":
            return (
                <AddEditTask />
            );
        case "EDIT_TASK":
            return (
                <AddEditTask />
            );
        default:
            break;
    }
}

const TaskView = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    }

    return (
        <>
            <div className={`${isDarkMode ? 'dark' : 'light'} min-h-screen p-5 pt-10 transition duration-100 dark:bg-[#242424]`}>
                <div className="container mx-auto">
                    <div className="my-3 flex justify-end items-center">
                        <span className="mr-3 text-lg font-medium text-gray-700 dark:text-gray-300">Theme: {isDarkMode ? 'Dark' : 'Light'}</span>
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="hidden" checked={isDarkMode} onChange={handleToggleDarkMode} />
                                <div className={`block bg-gray-400 dark:bg-gray-700 w-14 h-8 rounded-full ${isDarkMode && 'bg-black'}`}></div>
                                <div className={`flex justify-center items-center dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${isDarkMode ? 'translate-x-full bg-yellow-400' : ''}`}>
                                    {isDarkMode ? (
                                        <BsFillMoonStarsFill className="text-white" />
                                    ) : (
                                        <IoSunnySharp className="text-yellow-400" />
                                    )}
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-start items-center">
                        <div className="bg-teal-800 dark:bg-teal-700 p-2 text-sm md:text-lg font-semibold text-white flex justify-center items-center gap-2 rounded-t-lg ml-3">
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