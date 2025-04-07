import { NavLink } from "react-router";
import { Exercise, WorkoutInterface } from "../../../util/interfaces";
import React, { useMemo } from "react";

interface ExerciseCardProps {
	workout: WorkoutInterface;
	exercise: Exercise;
	exercises: Exercise[];
	chosenExercise: Exercise | undefined;
	setChosenExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>;
}

export default function ExerciseCard({ workout, exercise, exercises, chosenExercise, setChosenExercise }: ExerciseCardProps) {
	const completed = useMemo(() => {
		return exercise.setsCompleted === exercise.sets;
	}, [exercise]);

	return (
		<NavLink
			to={`/dashboard/${workout.name}/${exercise.name.replace(" ", "").toLowerCase()}`}
			state={{ workout: workout, exercises: exercises }}
			key={exercise.name}
			className={`text-lg font-bold ${completed ? "opacity-20 cursor-default" : "hover:bg-accent hover:text-snow-white"}  ${
				chosenExercise && chosenExercise.name === exercise.name ? "bg-primary text-snow-white" : ""
			} py-2 px-4 rounded-lg hover-css shadow-md`}
			onClick={() => !completed && setChosenExercise(exercise)}
		>
			{exercise.name.toUpperCase()}
		</NavLink>
	);
}
