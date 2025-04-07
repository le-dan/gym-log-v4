import { WorkoutInterface } from "./interfaces";
import db from "local-db-storage";

export function aggregateMuscles(workout: WorkoutInterface) {
	return [
		...new Set(
			workout.exercises.flatMap((exercise) => {
				return exercise.musclesWorked;
			})
		),
	];
}

export async function fetchData<Type>(dbName: string) {
	return await db.getItem<Type>(dbName);
}
