import { NavLink } from "react-router";
import { WorkoutInterface } from "../util/interfaces";
import { useEffect, useState } from "react";
import { fetchData } from "../util/util";

export default function History() {
	const [workoutHistory, setWorkoutHistory] = useState<WorkoutInterface[]>();

	useEffect(() => {
		fetchData<WorkoutInterface[]>("WorkoutHistory").then((res) => {
			setWorkoutHistory(res);
		});
	}, []);
	console.log(workoutHistory);
	
	return (
		<div className="h-full w-full p-10 shadow-2xl bg-snow-white rounded-lg gap-10 flex flex-col">
			<span className="text-3xl font-bold text-primary">Workout History</span>
			<div className="h-full grid grid-rows-[repeat(auto-fill,_minmax(150px,1fr))] grid-cols-[repeat(auto-fill,_minmax(200px,1fr))] gap-8">
				{workoutHistory?.map((workout) => {
					return (
						<NavLink
							key={workout.name}
							className="bg-snow-white drop-shadow-lg rounded-lg flex flex-col justify-center items-center w-full h-full text-xl hover:shadow-sm hover-css hover:shadow-accent"
							to={`${workout.completionDate?.toLowerCase()}`}
							state={{ workout: workout }}
						>
							<span className="font-bold text-2xl">{workout.completionDate}</span>
							<span>{workout.name}</span>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
}
