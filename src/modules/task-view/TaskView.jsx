import { useEffect } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import TaskList from "./components/task-list/TaskList";
import AddEditTask from "./components/add-edit-task/AddEditTask";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../redux/reducers/task/taskSlice";

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