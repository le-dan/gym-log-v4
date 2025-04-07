import { Dumbbell, House, User } from "lucide-react";
import { UserRound } from "lucide-react";
import { History } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchData } from "../util/util";
import { motion } from "motion/react";

export default function Sidebar() {
	const [fullName, setFullname] = useState<String>();
	// fetch user information on initial load
	useEffect(() => {
		fetchData("UserInformation").then((res: any) => {
			if (res) {
				setFullname(res.fullName);
			}
		});
	}, []);
	const defSidebarStyle =
		"flex items-center gap-3 rounded-md p-2 hover-css hover:bg-accent text-xl font-light";
	return (
		<div className="shrink-0 w-50 h-full bg-primary pt-5 pb-5 px-4 flex justify-center flex-col gap-5 text-xl font-bold">
			<span className="w-full text-center mb-3 opacity-30 text-accent font-black">
				Jym Log
			</span>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
				className="flex flex-col items-center gap-5"
			>
				<NavLink
					to={"profile"}
					className="hover:scale-105 duration-200 ease-in-out bg-snow-white-dark shadow-md shadow-accent rounded-full h-20 w-20 text-6xl select-none text-primary flex items-center justify-center"
				>
					<User size={60} />
				</NavLink>
				<span className="min-h-[28px]">{fullName}</span>
			</motion.div>
			<div className="w-full h-[2px] bg-snow-white opacity-80 rounded-xl"></div>
			<div className="h-full flex flex-col gap-4">
				<NavLink
					to={"profile"}
					className={({ isActive }) =>
						isActive
							? "bg-accent " + defSidebarStyle
							: defSidebarStyle
					}
				>
					<UserRound size={25} />
					Profile
				</NavLink>
				<NavLink
					to={"dashboard"}
					className={({ isActive }) =>
						isActive
							? "bg-accent " + defSidebarStyle
							: defSidebarStyle
					}
				>
					<House size={25} />
					Dashboard
				</NavLink>
				<NavLink
					to={"workout"}
					className={({ isActive }) =>
						isActive
							? "bg-accent " + defSidebarStyle
							: defSidebarStyle
					}
				>
					<Dumbbell size={25} />
					Workouts
				</NavLink>
				<NavLink
					to={"history"}
					className={({ isActive }) =>
						isActive
							? "bg-accent " + defSidebarStyle
							: defSidebarStyle
					}
				>
					<History size={25} />
					History
				</NavLink>
				<NavLink
					to={"help"}
					className={({ isActive }) =>
						isActive
							? "bg-accent " + defSidebarStyle + " mt-auto"
							: defSidebarStyle + " mt-auto"
					}
				>
					<CircleHelp size={25} />
					Help
				</NavLink>
			</div>
		</div>
	);
}
