import { Check } from "lucide-react";
import { useState } from "react";
import { Exercise } from "../../../util/interfaces";

interface SetCardProps {
	exerciseName: string;
	exercises: Exercise[];
	setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

export default function SetCard({
	exerciseName,
	exercises,
	setExercises,
}: SetCardProps) {
	const [completed, setCompleted] = useState(false);
	const exerciseIndex = exercises.findIndex((e) => e.name === exerciseName);
	function handleCardClick() {
		setExercises((prevExercises) => {
			return prevExercises.map((exercise) =>
				exercise.name === exerciseName
					? {
							...exercise,
							["setsCompleted"]: !completed
								? exercise.setsCompleted + 1
								: exercise.setsCompleted - 1,
					  }
					: exercise
			);
		});
		setCompleted(!completed);
	}

	return exercises ? (
		<div
			className={`w-[95%] bg-snow-white-dark shadow-md rounded-lg flex hover:scale-102 hover-css duration-100
            ${completed ? "hidden cursor-none" : ""}
            `}
			onClick={handleCardClick}
		>
			<div className="py-3 px-3 font-bold">
				{exercises[exerciseIndex].reps} reps
			</div>
			<div className="bg-primary ml-auto rounded-r-lg text-snow-white px-3 flex items-center justify-center">
				<Check size={30} />
			</div>
		</div>
	) : (
		<></>
	);
}
