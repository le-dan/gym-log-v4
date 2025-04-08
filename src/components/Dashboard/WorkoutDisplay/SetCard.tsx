import { Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import { Exercise } from "../../../util/interfaces";

interface SetCardProps {
	exerciseName: string;
	exercises: Exercise[];
	setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

export default function SetCard({ exerciseName, exercises, setExercises }: SetCardProps) {
	const [completed, setCompleted] = useState(false);
	const exerciseIndex = exercises.findIndex((e) => e.name === exerciseName);
	function handleCardClick() {
		setExercises((prevExercises) => {
			return prevExercises.map((exercise) =>
				exercise.name === exerciseName
					? {
							...exercise,
							["setsCompleted"]: !completed ? exercise.setsCompleted + 1 : exercise.setsCompleted - 1,
					  }
					: exercise
			);
		});
		setCompleted(!completed);
	}

	return (
		<div
			className={`w-[30%] bg-snow-white shadow-sm shadow-accent rounded-lg flex hover:scale-101 hover-css duration-100
            ${completed ? "opacity-30" : ""}
            `}
			onClick={handleCardClick}
		>
			<div className="py-3 px-3 font-semibold w-full text-center">{exercises[exerciseIndex].reps} repetitions</div>
			<div className="bg-primary ml-auto rounded-r-lg text-snow-white px-3 flex items-center justify-center">
				{completed ? <SquareCheck size={30} /> : <Square size={30} />}
			</div>
		</div>
	);
}
