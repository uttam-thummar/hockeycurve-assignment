# TaskListView

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setup

### `npm install`

Install the required dependencies and dev-dependencies from package.json

### Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

#### `npm run build`

Builds the app for production environment. It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Implemented Features

### Milestone 1 (Basic)

- Created a simple list to display tasks with title and description.
- Implemented basic add and delete functionality for tasks.
- Created a form to add new tasks with title and description fields.
- Implemented basic form validation (e.g., title and description cannot be empty).
- Used React's useState hook to manage the list of tasks.
- Applied basic CSS to make the application presentable.

### Milestone 2 (Intermediate)

- Added due date and priority (Low, Medium, High) to tasks.
- Implemented edit functionality for existing tasks.
- Implemented unique task titles and future due dates advanced validations
- Added "Completed/Done task" feature with visual distinction for completed tasks.
- Implemented basic search functionality to filter tasks by title.
- Use redux store for more complex state management.
- Ensures that application works well on both desktop and mobile devices.

### Milestone 3 (Advanced)

- Used useMemo() and useCallback() hooks to optimize re-renders.
- Implemented "snooze" feature to postpone due dates.
- Implemented "priority sort" function to arrange tasks by priority and due date.
- Implemented addition of accordion for the task list item
- Implemented light-dark mode theme with smooth transition.
- Used localStorage to save tasks between page reloads.
