import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	IconButton,
	Box,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	SelectChangeEvent,
} from "@mui/material";
import { Check, ChevronDown, Pencil, Trash } from "lucide-react";
import { Exercise, Muscle } from "../../util/interfaces";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ExerciseAccordionProps {
	exercise: Exercise;
	exercisesList: Exercise[];
	setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

export default function ExerciseAccordion({ exercise, exercisesList, setExercises }: ExerciseAccordionProps) {
	const styles = {
		accordion: {
			".MuiAccordion-heading": {},
			backgroundColor: "var(--color-snow-white)",
			color: "var(--color-primary)",
		},
	};

	const [openAccordion, setOpenAccordion] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const [exerciseForm, setExerciseForm] = useState<Exercise>(exercise);

	function handleEdit() {
		if (!openAccordion) {
			setOpenAccordion(!openAccordion);
		}

		// Save edits
		if (editMode) {
			const newExerciseList = exercisesList.map((e) => (e.name == exercise.name ? exerciseForm : e));
			setExercises(newExerciseList);
		}

		setEditMode(!editMode);
	}

	function handleDelete() {
		const newExerciseList = exercisesList.filter((e) => e.name !== exercise.name);
		setExercises(newExerciseList);
	}

	function handleInputChange(e: SelectChangeEvent<any> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		setExerciseForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	return (
		<Accordion key={exercise.name} sx={styles.accordion} className="px-5" expanded={openAccordion}>
			<Box sx={{ display: "flex" }}>
				<AccordionSummary
					onClick={() => setOpenAccordion(!openAccordion)}
					expandIcon={<ChevronDown />}
					className="font-semibold text-primary text-2xl"
				>
					{exercise.name}
				</AccordionSummary>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<AnimatePresence>
						<IconButton className="h-fit" onClick={() => handleEdit()}>
							{editMode && (
								<motion.div
									key="check"
									initial={{ opacity: 0, scale: 0 }}
									exit={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, type: "spring" }}
								>
									<Check className="text-primary" />
								</motion.div>
							)}
							{!editMode && (
								<motion.div
									key="pencil"
									initial={{ opacity: 0, scale: 0 }}
									exit={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, type: "spring" }}
								>
									<Pencil className="text-primary" />
								</motion.div>
							)}
						</IconButton>
					</AnimatePresence>
					<IconButton className="h-fit" onClick={() => handleDelete()}>
						<Trash className="text-red-400" />
					</IconButton>
				</Box>
			</Box>
			<AccordionDetails sx={{ padding: 3 }} className="text-text flex flex-col gap-8">
				<Typography component={"div"} className="flex text-xl gap-3 text-primary justify-center items-center">
					<TextField
						fullWidth
						color="primary"
						size="small"
						name="name"
						label="Exercise Name"
						variant="outlined"
						value={exerciseForm.name}
						onChange={(e) => handleInputChange(e)}
						disabled={!editMode}
					/>
				</Typography>
				<Typography component={"div"} className="flex text-xl gap-3 text-primary justify-center items-center">
					<TextField
						color="primary"
						size="small"
						name="sets"
						label="Sets"
						variant="outlined"
						value={exerciseForm.sets}
						onChange={(e) => handleInputChange(e)}
						disabled={!editMode}
					/>
					x
					<TextField
						color="primary"
						size="small"
						label="Repetitions"
						variant="outlined"
						name="reps"
						value={exerciseForm.reps}
						onChange={(e) => handleInputChange(e)}
						disabled={!editMode}
					/>
				</Typography>
				<Typography component={"div"} className="flex flex-col">
					<FormControl>
						<InputLabel id="muscles-worked-label" disabled={!editMode}>
							<em>Select muscle(s) worked</em>
						</InputLabel>
						<Select
							multiple
							size="small"
							className="w-full"
							labelId="muscles-worked-label"
							label="Select muscle(s) worked"
							name="musclesWorked"
							value={exerciseForm.musclesWorked}
							disabled={!editMode}
							onChange={(e) => handleInputChange(e)}
						>
							{Object.keys(Muscle).map((muscle) => {
								return (
									<MenuItem key={muscle} value={muscle}>
										{muscle}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Typography>
				<Typography component={"div"} className="flex flex-col">
					<TextField
						fullWidth
						className="w-23"
						color="primary"
						size="small"
						name="notes"
						label="Notes"
						variant="outlined"
						value={exerciseForm.notes}
						onChange={(e) => handleInputChange(e)}
						disabled={!editMode}
					/>
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
