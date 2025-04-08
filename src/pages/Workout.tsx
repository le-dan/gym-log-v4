import { NavLink} from "react-router";
import { WorkoutInterface } from "../util/interfaces";
import db from "local-db-storage";
import { useEffect, useState } from "react";
import { fetchData } from "../util/util";

export default function Workout() {
	const [workouts, setWorkouts] = useState<WorkoutInterface[] | undefined>(undefined);

	useEffect(() => {
		fetchData<WorkoutInterface[]>("WorkoutsDB").then((res) => {			
			setWorkouts(res);
		});
	}, []);

	async function handleRemoveButton(name: string) {
		let workoutDB: WorkoutInterface[] | undefined = await db.getItem("WorkoutsDB");

		if (workoutDB === undefined) {
			workoutDB = [];
		}
		workoutDB = workoutDB.filter(workout => workout.name !== name);
		await db.setItem("WorkoutsDB", workoutDB);
		setWorkouts(workoutDB);
	}

	return workouts !== undefined && workouts.length > 0 ? (
		<div className="flex flex-col items-center h-full w-full gap-12">
			<h1 className="text-4xl font-bold mb-8">Your Workouts</h1>
			<div className="flex flex-col gap-6 w-full max-w-4xl px-4">
				{workouts.map((workout) => (
					<div className="rounded-xl hover-css p-5 h-full w-full flex flex-col bg-snow-white shadow-2xl shadow-primary text-text hover:bg-accent hover:cursor-pointer transform transition-transform duration-300 hover:scale-105" key={workout.name}>
						<div className="flex items-center justify-between mb-4 h-full w-full">
							<h2 className="text-4xl font-semibold">{workout.name}</h2>
							<button
								onClick={() => {
									if (window.confirm(`Are you sure you want to delete the workout "${workout.name}"?`)) {
										handleRemoveButton(workout.name);
									}
								}}
								className="text-red-500 hover:text-red-700 font-bold text-2xl p-2"
							>
								X
							</button>
						</div>
						<div className="flex flex-col gap-2 text-xl">
							Exercises: 
							{workout.exercises.map((exercise, index) => (
								<div key={index} className="flex flex-col gap-2 text-lg">
									<div>Name: {exercise.name}</div>
									<div>Sets: {exercise.sets}</div>
									<div>Reps: {exercise.reps}</div>
								</div>
							))}
						</div>
					</div>
				))}
				<NavLink
					to="create"
					className="rounded-xl p-5 flex items-center justify-center bg-primary text-snow-white shadow-2xl hover:bg-accent transform transition-transform duration-300 hover:scale-105 text-4xl"
				>
					Add
				</NavLink>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex flex-col text-primary/60 items-center justify-center text-4xl gap-12">
			There are no custom workouts yet! Bummer! :(
			<NavLink
				to="create"
				className="text-xl py-3 px-5 bg-primary text-snow-white hover-css rounded-xl hover:bg-accent hover:cursor-pointer hover:scale-105 ease-in-out"
			>
				create workout
			</NavLink>
		</div>
	);
}
