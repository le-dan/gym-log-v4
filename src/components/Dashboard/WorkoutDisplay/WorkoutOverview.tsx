import dayjs from "dayjs";
import { WorkoutInterface } from "../../../util/interfaces";
import { aggregateMuscles } from "../../../util/util";

const quote = require("inspirational-quotes");

interface WorkoutOverviewProps {
	currentDay: dayjs.Dayjs;
	workout: WorkoutInterface | undefined;
}

export default function WorkoutOverview({ currentDay, workout }: WorkoutOverviewProps) {
	return (
		<div className="flex flex-col gap-10 h-full">
			<span className=" text-6xl md:text-4xl text-primary font-bold">{currentDay.format("ddd").toUpperCase() + currentDay.format("DD")}</span>
			<div className="flex flex-col">
				<div className="font-bold text-2xl ">Today's Workout,</div>
				<div className="font-bold text-6xl md:text-4xl underline">{workout && workout.name.toUpperCase()}</div>
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-bold text-2xl">
					<span className="text-5xl md:text-3xl font-black underline">{workout && workout.exercises.length}</span> exercises to be done
				</span>
				<span className="font-bold text-2xl">
					<span className="text-5xl md:text-3xl font-black underline">{workout && aggregateMuscles(workout).length}</span> muscle groups worked
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="font-bold text-2xl">Message of the Day</span>
				<span className="text-lg w-[20rem]">{quote.getRandomQuote() as string}</span>
			</div>
		</div>
	);
}
