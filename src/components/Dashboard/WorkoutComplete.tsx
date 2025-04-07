import { WorkoutInterface } from "../../util/interfaces";
import dayjs from "dayjs";
import { Trash, X } from "lucide-react";
import db from "local-db-storage";
import { NavLink, useLocation, useNavigate } from "react-router";
import Confetti from "react-confetti";

interface WorkoutCompleteProps {
	archive?: boolean;
}

export default function WorkoutComplete({ archive }: WorkoutCompleteProps) {
	const locationState = useLocation().state;
	const workout: WorkoutInterface = locationState.workout;
	const navigate = useNavigate();
	async function handleSaveButton() {
		if (workout) {
			let workoutHistory: WorkoutInterface[] | undefined = await db.getItem("WorkoutHistory");

			if (workoutHistory === undefined) {
				workoutHistory = [];
			}
			workout.completionDate = dayjs().format("MMM-DD-YYYY");
			workoutHistory.push(workout);
			await db.setItem("WorkoutHistory", workoutHistory);
			navigate("/history");
		}
	}

	async function handleDeleteButton() {
		if (workout) {
			let workoutHistory: WorkoutInterface[] | undefined = await db.getItem("WorkoutHistory");

			if (workoutHistory === undefined) {
				workoutHistory = [];
			}
			workoutHistory.splice(
				workoutHistory.findIndex((w) => {
					return w.name === workout.name && w.completionDate === workout.completionDate;
				}),
				1
			);
			await db.setItem("WorkoutHistory", workoutHistory);
			navigate("/history");
		}
	}

	return (
		<div className="h-full w-full flex justify-center items-center relative overflow-y-scroll">
			<Confetti numberOfPieces={75} />
			<div className="rounded-lg p-10 gap-10 h-fit w-1/2 flex flex-col bg-snow-white shadow-2xl shadow-primary text-text justify-center items-center relative">
				{!archive ? (
					<></>
				) : (
					<NavLink className="absolute top-8 right-8" to={"/history"}>
						<X size={30} className="hover-css hover:scale-110" />
					</NavLink>
				)}
				<span className="text-5xl font-bold w-full text-center">
					{!archive ? dayjs().format("dddd").toLowerCase() : workout?.completionDate} <span className="text-primary">{workout?.name}</span>
					{!archive ? " done" : ""}
				</span>
				<div className="grid grid-cols-2 grid-rows-1 gap-8">
					<div className="flex flex-col gap-1 shadow-xl p-8 rounded-3xl">
						<span className="text-3xl font-bold text-primary">Exercises Done</span>
						{workout?.exercises.map((exercise) => {
							return (
								<div className="text-2xl" key={exercise.name}>
									{exercise.name} : {exercise.sets}x{exercise.reps}
								</div>
							);
						})}
					</div>
					<div className="flex flex-col justify-center items-center gap-1 shadow-xl p-8 rounded-3xl text-3xl font-bold">
						<span className="text-primary">Time Elapsed</span>
						<span>Minutes: {String(workout.elapsedMin).padStart(2, "0")}</span>
						<span>Seconds: {String(workout.elapsedSec).padStart(2, "0")}</span>
					</div>
				</div>
				{!archive ? (
					<div className="flex gap-4 w-full items-center justify-center">
						<button className="hover-css button-light rounded-lg w-[25%] text-2xl" onClick={handleSaveButton}>
							Save Workout
						</button>
						<button className="bg-red-400 hover-css p-3 rounded-lg text-2xl text-snow-white h-full hover:bg-red-700">
							<Trash size={30} />
						</button>
					</div>
				) : (
					<></>
				)}
				{!archive ? (
					<></>
				) : (
					<NavLink className="absolute bottom-8 right-8 text-red-500" to={"/history"}>
						<Trash size={30} className="hover-css hover:scale-110" onClick={handleDeleteButton} />
					</NavLink>
				)}
			</div>
		</div>
	);
}
