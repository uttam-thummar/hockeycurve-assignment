import { useDispatch, useSelector } from "react-redux";
import { setTaskListFilter } from "../../../../redux/reducers/task/taskSlice";

const filters = ['ALL', 'HIGH', 'MEDIUM', 'LOW', 'DONE'];

const TaskFilter = () => {
    const dispatch = useDispatch();
    const { taskListFilter } = useSelector((store) => store.task);

    return (
        <>
            <div className="flex space-x-2 mt-4">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        onClick={() => dispatch(setTaskListFilter(filter))}
                        className={`min-w-5 sm:min-w-16 py-2 px-3 rounded-t-md rounded-b-none text-xs sm:text-sm  capitalize transition duration-300 ${taskListFilter === filter ? 'bg-white text-black hover:bg-white dark:bg-gray-300 dark:text-black dark:hover:bg-gray-300' : 'text-white bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-800 dark:text-gray-300'}`}
                    >
                        {filter.toLowerCase()}
                    </button>
                ))}
            </div>
        </>
    )
}

export default TaskFilter;