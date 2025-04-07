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
		<div className="flex gap-10">
			{/* <span className=" text-6xl md:text-4xl text-primary font-bold">{currentDay.format("ddd").toUpperCase() + currentDay.format("DD")}</span> */}
			<div className="rainbow-box font-bold text-6xl md:text-3xl text-snow-white p-0.5 shadow-lg rounded-lg">
				<div className="bg-primary w-full rounded-lg p-2">{workout && workout.name.toUpperCase()}</div>
			</div>
		</div>
	);
}
