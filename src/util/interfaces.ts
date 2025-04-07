export enum Muscle {
	BICEPS = "BICEPS",
	TRICEPS = "TRICEPS",
	CHEST = "CHEST",
	SHOULDERS = "SHOULDERS",
	BACK = "BACK",
	QUADRICEPS = "QUADRICEPS",
	HAMSTRINGS = "HAMSTRINGS",
	CALVES = "CALVES",
	ABDOMINALS = "ABDOMINALS",
}

export enum ActivityLevel {
	NO_EXERCISE = "NO EXERCISE",
	SEDENTARY = "SEDENTARY",
	MODERATE = "MODERATE",
	INTERMEDIATE = "INTERMEDIATE",
}

export interface Exercise {
	name: string;
	reps: number;
	sets: number;
	musclesWorked: Muscle[];
	notes: string;
	setsCompleted: number;
}

export interface WorkoutInterface {
	name: string;
	exercises: Exercise[];
	intensity: number;
	elapsedMin: number;
	elapsedSec: number;
	completionDate?: string;
	done: boolean;
}

export interface User {
	fullName: string;
	nickname: string;
	email: string;
	activityLevel: ActivityLevel;
	height: string;
	weight: string;
}
