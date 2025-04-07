import { WorkoutInterface } from "../../util/interfaces";
import { useEffect, useState } from "react";
import { aggregateMuscles, fetchData } from "../../util/util";
import { NavLink } from "react-router";
import NavBar from "./NavBar";

export default function WorkoutGrid() {
	const renderWorkouts = (workouts: WorkoutInterface[]) => {
		return workouts.map((workout, index) => {
			const allMuscles = aggregateMuscles(workout);

			return (
				<NavLink
					className="bg-snow-white drop-shadow-lg rounded-lg h-35 w-[340px] justify-between items-center hover:scale-105 hover:shadow-md hover:shadow-accent ease-in-out duration-300 hover:cursor-pointer p-6 flex gap-5"
					key={index}
					to={"/dashboard/" + workout.name.replace(" ", "").toLowerCase()}
					state={{ workout: workout, exercises: workout.exercises }}
				>
					<div className="flex-col flex shrink-0 max-w-19">
						<span className="font-bold">{workout.name}</span>
						<span>{workout.exercises.length} exercises</span>
					</div>
					<div className="h-full w-[2px] bg-snow-white-dark opacity-80 rounded-xl shrink-0"></div>
					<div className="overflow-y-auto flex flex-col h-full w-full items-center scroll-smooth">
						<span>Muscles Worked</span>
						{allMuscles.map((muscle, index) => {
							return (
								<span className="font-thin" key={index}>
									{muscle.toLowerCase()}
								</span>
							);
						})}
					</div>
				</NavLink>
			);
		});
	};

	const [workouts, setWorkouts] = useState<WorkoutInterface[]>([]);
	useEffect(() => {
		if (workouts.length === 0) {
			fetchData<WorkoutInterface[]>("WorkoutsDB")
				.then((res) => {
					if (res) {
						setWorkouts(res);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return (
		<>
			<NavBar />
			<div className="h-full w-full flex items-center justify-center">
				<div className="h-[80%] w-[80%] bg-snow-white p-10 shadow-lg rounded-lg flex flex-col gap-10 text-text min-h-0">
					<span className="text-4xl font-bold text-primary">choose a workout for today,</span>
					{workouts.length > 0 ? (
						<div
							className="min-h-0 h-full w-full grid grid-rows-[repeat(auto-fill,_minmax(140px,1fr))] grid-cols-[repeat(auto-fill,_minmax(330px,1fr))] gap-8 overflow-y-auto p-4"
							style={{ scrollbarGutter: "stable both-edges" }}
						>
							{renderWorkouts(workouts)}
						</div>
					) : (
						<div className="h-full w-full flex justify-center items-center flex-col text-primary/60  text-4xl gap-12">
							There are no custom workouts yet! Bummer! :(
							<NavLink
								to="/workout/create"
								className="text-xl py-3 px-5 w-fit bg-primary text-snow-white hover-css rounded-xl hover:bg-accent hover:cursor-pointer hover:scale-105 ease-in-out"
							>
								create workout
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
