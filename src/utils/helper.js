import { taskPriorityLevels } from "./constants";

const sortByPriorityAndDueDate = (tasks) => {
    return tasks.toSorted((a, b) => {
        if (taskPriorityLevels[a.priority] !== taskPriorityLevels[b.priority]) {
            return taskPriorityLevels[a.priority] - taskPriorityLevels[b.priority];
        }

        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
    });
}

export { sortByPriorityAndDueDate }