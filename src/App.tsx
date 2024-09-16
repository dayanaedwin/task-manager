import { AddTaskForm, TaskList } from './components';

function App() {
	return (
		<div className="min-h-screen bg-white flex flex-col px-24">
			<div className="bg-white w-full">
				<h1 className="text-2xl font-semibold text-center my-6">Task Manager</h1>
			</div>
			<AddTaskForm />
			<TaskList />
		</div>
	);
}

export default App;
