import dayjs from "dayjs";
import { Exercise, WorkoutInterface } from "../../util/interfaces";
import WorkoutOverview from "./WorkoutDisplay/WorkoutOverview";
import ExerciseList from "./WorkoutDisplay/ExerciseList";
import { useEffect, useState } from "react";
import ExerciseInformation from "./WorkoutDisplay/ExerciseInformation";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useStopwatch } from "react-timer-hook";
import { CircleArrowLeft, CirclePause, CirclePlay } from "lucide-react";

export default function WorkoutDisplay() {
	const currentDay = dayjs();

	const navigate = useNavigate();
	const location = useLocation();

	const workout: WorkoutInterface = location.state.workout;
	const [exercises, setExercises] = useState<Exercise[]>(location.state.exercises);
	const [chosenExercise, setChosenExercise] = useState<Exercise | undefined>();

	const stopwatch = useStopwatch({ autoStart: true });

	// when chosen exercise done, move on to next
	useEffect(() => {
		if (chosenExercise === undefined && workout && !workout.done) {
			setChosenExercise(exercises[0]);
			navigate(`/dashboard/${workout.name}/${exercises[0].name.replace(" ", "").toLowerCase()}`, {
				state: { workout: workout, exercises: exercises },
			});
			return;
		}

		const exerciseIndex = exercises.findIndex((e) => e.name === (chosenExercise && chosenExercise.name));
		if (exerciseIndex >= 0 && exercises[exerciseIndex].setsCompleted === exercises[exerciseIndex].sets) {
			// go to next available exercise
			for (let i = 0; i < exercises.length; i++) {
				if (exercises[i].setsCompleted < exercises[i].sets) {
					console.log(exercises);
					
					setChosenExercise(exercises[i]);
					navigate(`/dashboard/${workout.name}/${exercises[i].name.replace(" ", "").toLowerCase()}`, {
						state: { workout: workout, exercises: exercises },
					});
					return;
				}
			}
			// no more left
			stopwatch.pause();
			workout.done = true;
			workout.elapsedMin = stopwatch.minutes;
			workout.elapsedSec = stopwatch.seconds;
			setChosenExercise(undefined);
			navigate(`/dashboard/complete`, {
				state: {
					workout: workout,
				},
			});
		}
	}, [exercises]);

	return (
		<div className="rounded-lg h-full w-full flex flex-col gap-5 bg-snow-white shadow-2xl text-text">
			<div className="flex justify-center items-center rounded-t-lg shadow-sm text-primary shadow-primary py-5 px-10 h-45 md:h-35 w-full gap-3">
				<CircleArrowLeft size={75} className="mr-auto hover-css text-red-400 hover:text-accent" onClick={() => navigate("/dashboard")} />
				<label
					className={`${
						!stopwatch.isRunning ? "opacity-50" : ""
					} select-none flex flex-col text-2xl items-center text-text/75 gap-3 duration-200`}
				>
					Time Elapsed
					<span className="text-primary text-5xl md:text-3xl font-black rounded-lg p-3 md:p-2 w-75 md:w-50 text-center shadow-[0px_3px_1px_3px_var(--color-primary)]">
						{String(stopwatch.minutes).padStart(2, "0")}:{String(stopwatch.seconds).padStart(2, "0")}
					</span>
				</label>
				{stopwatch.isRunning ? (
					<>
						<CirclePause size={75} className="ml-auto hover-css hover:text-yellow-400 text-yellow-500" onClick={stopwatch.pause} />
					</>
				) : (
					<>
						<CirclePlay size={75} className="ml-auto hover-css hover:text-green-400 text-green-500" onClick={stopwatch.start} />
					</>
				)}
			</div>
			<div className={`${!stopwatch.isRunning ? "opacity-50 select-none pointer-events-none" : ""} flex h-full gap-10 py-10 px-15 min-h-0`}>
				<WorkoutOverview currentDay={currentDay} workout={workout} />
				<div className="h-full w-2 bg-primary rounded-4xl"></div>
				<ExerciseList workout={workout} exercises={exercises} chosenExercise={chosenExercise} setChosenExercise={setChosenExercise} />
				<div className="h-full w-2 bg-primary rounded-4xl"></div>
				<Routes>
					<Route
						path={`:exercise`}
						element={<ExerciseInformation chosenExercise={chosenExercise} exercises={exercises} setExercises={setExercises} />}
					/>
				</Routes>
			</div>
		</div>
	);
}
