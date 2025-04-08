import { Exercise, WorkoutInterface } from "../../util/interfaces";
import { useBlocker, useNavigate } from "react-router";
import db from "local-db-storage";
import { useEffect, useMemo, useState } from "react";
import Select from "@mui/material/Select";
import { Muscle } from "../../util/interfaces";
import { MenuItem, Modal } from "@mui/material";
import ExerciseAccordion from "./ExerciseAccordion";
import { AnimatePresence, delay, motion } from "motion/react";
import { PartyPopper } from "lucide-react";
export default function CreateWorkout() {
	const styles = {
		select: {
			".MuiOutlinedInput-notchedOutline": {
				borderColor: "var(--color-primary)",
				borderRadius: "0",
			},
			height: "46px",
			color: "var(--color-primary)",
		},
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [exerciseAdded, setExerciseAdded] = useState(false);
	const [workoutName, setWorkoutName] = useState("");
	const [created, setCreated] = useState(false);
	// New exercise states
	const [exerciseName, setExerciseName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [muscles, setMuscles] = useState<Muscle[]>([]);
	const [notes, setNotes] = useState("");

	const [exercises, setExercises] = useState<Exercise[]>([]);
	const isActive = useMemo(() => (exercises.length > 0 || workoutName.length > 0) && !created, [exercises, workoutName, created]);
	const navigate = useNavigate();

	const blocker = useBlocker(isActive);

	useEffect(() => {
		if (blocker.state === "blocked") {
			setModalOpen(true);
		}
	}, [blocker]);

	async function handleCreateButton() {
		setCreated(true);
		let workoutDB: WorkoutInterface[] | undefined = await db.getItem("WorkoutsDB");
		if (workoutDB === undefined) {
			workoutDB = [];
		}
		let workout: WorkoutInterface = {
			name: workoutName,
			exercises: exercises,
			intensity: 0,
			elapsedMin: 0,
			elapsedSec: 0,
			done: false,
		};
		workoutDB.push(workout);
		await db.setItem("WorkoutsDB", workoutDB).then(() => {
			navigate("/workout");
		});
	}

	function handleAddExercise() {
		const newExercise: Exercise = {
			name: exerciseName,
			reps: reps,
			sets: sets,
			musclesWorked: muscles,
			notes: notes,
			setsCompleted: 0,
		};
		setExercises([...exercises, newExercise]);

		setExerciseAdded(true);
		delay(() => {
			setExerciseName("");
			setSets(0);
			setReps(0);
			setMuscles([]);
			setNotes("");
			setExerciseAdded(false);
		}, 2000);
	}

	return (
		<div className="h-full w-full flex flex-col lg:flex-row text-primary border-primary items-center justify-center gap-10 lg:gap-50 py-10 lg:py-20">
			<form className="flex flex-col h-full w-full lg:w-1/3 gap-6 lg:gap-10 shrink-0 overflow-y-auto items-center bg-snow-white p-6 lg:p-10 rounded-2xl shadow-2xl shadow-primary">
				<h1 className="text-2xl lg:text-4xl font-semibold text-center">Create a New Workout</h1>
				<label className="text-lg lg:text-xl w-full flex flex-col gap-2 lg:gap-4">
					Workout Name
					<input
						id="nameInput"
						type="text"
						className="border p-2 w-full"
						autoComplete="off"
						placeholder="Enter workout name"
						value={workoutName}
						onChange={(e) => setWorkoutName(e.target.value)}
					/>
				</label>
				<AnimatePresence mode="wait">
					{!exerciseAdded ? (
						<motion.div
							key="add-exercise-form"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="flex flex-col gap-4 lg:gap-6 w-full h-full"
						>
							<div className="flex justify-between items-center">
								<h2 className="text-lg lg:text-xl">Add Exercise</h2>
								<button
									type="button"
									className="bg-primary text-white p-1 w-24 lg:w-30 rounded-md hover-css hover:bg-accent disabled:opacity-50 disabled:pointer-events-none"
									disabled={!exerciseName || sets <= 0 || reps <= 0 || muscles.length === 0}
									onClick={() => {
										handleAddExercise();
									}}
								>
									Add
								</button>
							</div>
							<div className="flex flex-col items-center gap-6 lg:gap-8">
								<div className="flex flex-col w-full gap-2 lg:gap-4 border p-4">
									<label className="text-base lg:text-lg">
										Exercise Name
										<input
											id="exerciseNameInput"
											type="text"
											className="border p-2 w-full"
											placeholder="Enter exercise name"
											autoComplete="off"
											value={exerciseName}
											onChange={(e) => setExerciseName(e.target.value)}
										/>
									</label>
									<div className="flex flex-col lg:flex-row gap-4 justify-evenly">
										<label className="text-base lg:text-lg w-full">
											Sets
											<input
												id="setsInput"
												type="number"
												className="border p-2 w-full"
												placeholder="Enter number of sets"
												value={sets}
												onChange={(e) => setSets(Number.parseInt(e.target.value))}
											/>
										</label>
										<label className="text-base lg:text-lg w-full">
											Repetitions
											<input
												id="repsInput"
												type="number"
												className="border p-2 w-full"
												placeholder="Enter number of reps"
												value={reps}
												onChange={(e) => {
													setReps(Number.parseInt(e.target.value));
												}}
											/>
										</label>
									</div>
									<label className="text-base lg:text-lg">
										Muscles Worked
										<Select
											multiple
											sx={styles.select}
											className="w-full"
											value={muscles}
											displayEmpty
											onChange={(e) => setMuscles(e.target.value as Muscle[])}
											renderValue={(selected) => {
												if (selected.length === 0) {
													return <em>Select muscle(s) worked</em>;
												}
												return selected.join(", ");
											}}
										>
											<MenuItem disabled value="">
												<em>Select muscle(s) worked</em>
											</MenuItem>
											{Object.keys(Muscle).map((muscle) => {
												return (
													<MenuItem key={muscle} value={muscle}>
														<input
															type="checkbox"
															checked={muscles.includes(muscle as Muscle)}
															onChange={() => {
																if (muscles.includes(muscle as Muscle)) {
																	setMuscles(muscles.filter((m) => m !== muscle));
																} else {
																	setMuscles([...muscles, muscle as Muscle]);
																}
															}}
															style={{ marginRight: "8px" }}
														/>
														{muscle}
													</MenuItem>
												);
											})}
										</Select>
									</label>
									<label className="text-base lg:text-lg">
										Notes
										<input
											id="notesInput"
											type="text"
											className="border p-2 w-full"
											placeholder="Enter notes"
											autoComplete="off"
											value={notes}
											onChange={(e) => {
												setNotes(e.target.value);
											}}
										/>
									</label>
								</div>
							</div>
						</motion.div>
					) : (
						<motion.div
							key="added-success"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							transition={{ duration: 0.75, type: "spring", bounce: 0.4 }}
							className="w-full h-full flex flex-col gap-6 lg:gap-10 text-2xl lg:text-3xl font-semibold justify-center items-center"
						>
							<PartyPopper size={100}/>
							Exercise Added
						</motion.div>
					)}
				</AnimatePresence>
				<button
					className="bg-primary text-white p-2 hover:bg-accent hover-css rounded-md w-full lg:w-50 disabled:opacity-50 disabled:pointer-events-none mt-auto"
					disabled={exercises.length === 0}
					onClick={async (e) => {
						e.preventDefault();
						handleCreateButton();
					}}
				>
					Create
				</button>
			</form>
			{exercises.length > 0 ? (
				<motion.div
					className="h-full w-full lg:w-2/5 flex flex-col gap-6 lg:gap-10 bg-snow-white p-6 lg:p-10 rounded-2xl shadow-2xl shadow-primary"
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", bounce: 0.2 }}
				>
					<span className="text-2xl lg:text-4xl w-full text-center font-semibold">Exercises</span>
					<div className="flex flex-col overflow-y-auto gap-3 p-5">
						{exercises?.map((exercise) => {
							return (
								<ExerciseAccordion key={exercise.name} exercise={exercise} exercisesList={exercises} setExercises={setExercises} />
							);
						})}
					</div>
				</motion.div>
			) : null}

			<Modal open={modalOpen} disableAutoFocus className="flex items-center justify-center text-primary text-center">
				<div className="bg-snow-white w-3/4 lg:w-1/4 h-1/3 lg:h-1/4 rounded-3xl p-6 lg:p-10 text-2xl lg:text-4xl font-semibold flex flex-col">
					Are you sure you want to exit without saving?
					<div className="mt-auto w-full flex gap-6 lg:gap-10 justify-center text-lg lg:text-xl font-semibold">
						<button
							onClick={() => blocker.proceed && blocker.proceed()}
							className="hover-css bg-primary text-snow-white rounded-lg px-3 py-2 hover:bg-accent"
						>
							Confirm
						</button>
						<button
							onClick={() => setModalOpen(false)}
							className="hover-css border-primary border-2 text-primary rounded-lg px-3 py-2 hover:border-accent hover:text-accent"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
