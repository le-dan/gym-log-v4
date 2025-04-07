import { Exercise, WorkoutInterface } from "../../../util/interfaces";
import ExerciseCard from "./ExerciseCard";

interface ExerciseListProps {
	workout: WorkoutInterface;
	exercises: Exercise[];
	chosenExercise: Exercise | undefined;
	setChosenExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>;
}

export default function ExerciseList({ workout, exercises, chosenExercise, setChosenExercise }: ExerciseListProps) {
	const renderExercises = () => {
		const exerciseElements = exercises.map((exercise) => {
			return (
				<ExerciseCard
					key={exercise.name}
					workout={workout}
					exercise={exercise}
					exercises={exercises}
					chosenExercise={chosenExercise}
					setChosenExercise={setChosenExercise}
				/>
			);
		});
		return exerciseElements;
	};
	return <div className="h-full w-1/5 p-5 flex flex-col gap-4 shrink-0 inset-shadow-primary/50 inset-shadow-sm rounded-lg">{renderExercises()}</div>;
}
