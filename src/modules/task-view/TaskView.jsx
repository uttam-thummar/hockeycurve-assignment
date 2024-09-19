import { FaRegFolderOpen } from "react-icons/fa";
import TaskList from "./components/task-list/TaskList";

const tasks = [
    {
        name: 'Task 1',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        status: 'PENDING'
    },
    {
        name: 'Task 2',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        status: 'PENDING'
    },
    {
        name: 'Task 3',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        status: 'PENDING'
    },
    {
        name: 'Task 4',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        status: 'PENDING'
    }
];

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
                    <TaskList tasks={tasks} />
                </div>
            </div>
        </>
    )
}

export default TaskView;