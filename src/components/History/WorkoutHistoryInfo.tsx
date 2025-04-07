import { useParams } from "react-router";
import { WorkoutInterface } from "../../util/interfaces";
import WorkoutComplete from "../Dashboard/WorkoutComplete";
import { useEffect, useState } from "react";
import { fetchData } from "../../util/util";

export default function WorkoutHistoryInfo() {
	const { completionDate } = useParams();

	const [workoutHistory, setWorkoutHistory] = useState<WorkoutInterface[]>();

	useEffect(() => {
		fetchData<WorkoutInterface[]>("WorkoutHistory").then((res) => {
			setWorkoutHistory(res);
		});
	}, []);

	const workout: WorkoutInterface | undefined = workoutHistory?.find((w) => {
		return w.completionDate?.toLowerCase() === completionDate;
	});

	return <WorkoutComplete workout={workout} archive />;
}
