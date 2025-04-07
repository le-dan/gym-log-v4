import { Route } from "react-router";
import { createBrowserRouter, createRoutesFromElements, Navigate, RouterProvider } from "react-router";
import WorkoutComplete from "../components/Dashboard/WorkoutComplete";
import WorkoutDisplay from "../components/Dashboard/WorkoutDisplay";
import WorkoutGrid from "../components/Dashboard/WorkoutGrid";
import WorkoutHistoryInfo from "../components/History/WorkoutHistoryInfo";
import CreateWorkout from "../components/Workout/CreateWorkout";
import Dashboard from "./Dashboard";
import Help from "./Help";
import Main from "./Main";
import Profile from "./Profile";
import Workout from "./Workout";
import History from "./History";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<Main />}>
				<Route path="/" element={<Navigate replace to="dashboard" />} />
				<Route path="dashboard" element={<Dashboard />}>
					<Route element={<WorkoutGrid />} index />
					<Route path=":workout/*" element={<WorkoutDisplay />} />
					<Route path="complete" element={<WorkoutComplete />} />
				</Route>
				<Route path="profile" element={<Profile />} />
				<Route path="workout" element={<Workout />} />
				<Route path="workout/create" element={<CreateWorkout />} />
				<Route path="history" element={<History />} />
				<Route path="history/:completionDate" element={<WorkoutHistoryInfo />} />
				<Route path="help" element={<Help />} />
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}

export default App;
