import { Dumbbell, House, UserRound, History } from "lucide-react";

export default function Help() {
	return (
		<div className="h-full py-15 px-30 text-primary overflow-y-auto">
			<div className="text-7xl font-bold mb-25">Guide to JymLog</div>
			<div className="flex flex-col gap-20">
				<div className="text-4xl font-bold flex-col gap-5 flex">
					<div className="flex items-center gap-3">
						<UserRound size={40} />
						Profile
					</div>
					<h4 className="text-text text-3xl font-light">
						Contains meta information such as name, nickname, email, as well as health information such as height, activity level, and
						weight. To edit your information, press the Edit button to make changes. Once you are done, hit the save button to save all
						your modifications.
					</h4>
				</div>
				<div className="text-4xl font-bold flex-col gap-5 flex">
					<div className="flex items-center gap-3">
						<House size={40} />
						Dashboard
					</div>
					<h4 className="text-text text-3xl font-light">
						Where you start a workout for the day. When you load the dashboard, a list of workouts can be chosen. Once you choose a
						workout, the workout begins and you can start any exercise you would like. Each exercise comes with a number of sets and reps.
						Once you complete a set, you can press the set to signify that it is complete. Once you complete all of the sets, the next
						exercise is automatically displayed for you to complete next. There is also a pause and resume button to start and stop the
						workout at any time. Once all exercises are complete, you are finished! The completion screen will pop-up and will display how
						long the workout took and other revelant information.
					</h4>
				</div>
				<div className="text-4xl font-bold flex-col gap-5 flex">
					<div className="flex items-center gap-3">
						<Dumbbell size={40} />
						Workouts
					</div>
					<h4 className="text-text text-3xl font-light">
						Stores custom workouts that you can create with a list of exercises. To create a workout, press the 'create workout' button.
						This will take you to a form where you can provide the workout name, and a list of exercises associated with the workout. You
						can also remove workouts by pressing the red X button.
					</h4>
				</div>
				<div className="text-4xl font-bold flex-col gap-5 flex">
					<div className="flex items-center gap-3">
						<History size={40} />
						History
					</div>
					<h4 className="text-text text-3xl font-light">
						Contains a record of past workouts that you have completed. To see more information the recorded workout, press the workout to
						view an overview of revelant information.
					</h4>
				</div>
			</div>
		</div>
	);
}
