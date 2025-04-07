import { useEffect, useMemo, useState } from "react";
import { fetchData } from "../util/util";
import { ActivityLevel, User } from "../util/interfaces";
import db from "local-db-storage";

export default function Profile() {
	const [user, setUser] = useState<User>({
		fullName: "",
		nickname: "",
		email: "",
		activityLevel: ActivityLevel.NO_EXERCISE,
		weight: "",
		height: "",
	});
	const [inputUser, setInputUser] = useState<User>({
		fullName: "",
		nickname: "",
		email: "",
		activityLevel: ActivityLevel.NO_EXERCISE,
		weight: "",
		height: "",
	});

	const [editing, setEditing] = useState(false);

	const grayInput = useMemo(
		() => (editing ? "opacity-100" : "opacity-70"),
		[editing]
	);

	// fetch user information on initial load
	useEffect(() => {
		fetchData<User>("UserInformation").then((res) => {
			if (res) {
				setUser(res);
				setInputUser(res);
			}
		});
	}, []);

	async function handleButtonClick() {
		// when saving
		if (editing) {
			setUser(inputUser);
			await db.setItem("UserInformation", inputUser);
			console.log(inputUser, "save");
		}
		setEditing(!editing);
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setInputUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<div className="h-full p-5 pb-3 text-primary gap-10 flex flex-col">
			<div className="flex items-center gap-15">
				<div className="bg-snow-white-dark shadow-xl rounded-full h-35 w-35 flex items-center justify-center text-6xl select-none">
					{user?.fullName
						.split(" ")
						.map((n) => n[0])
						.join("")}
				</div>
				<span className="text-6xl font-semibold">{user?.fullName}</span>
			</div>
			<div
				className={`bg-snow-white h-full w-full shadow-xl rounded-2xl p-12 flex flex-wrap gap-10 content-start duration-300 ease-in-out ${
					editing ? "shadow-accent" : ""
				}`}
			>
				<div className="w-full flex">
					<button
						onClick={() => handleButtonClick()}
						className="ml-auto bg-primary text-snow-white rounded-md w-25 py-1 hover-css hover:bg-accent text-xl font-light"
					>
						{editing ? "Save" : "Edit"}
					</button>
				</div>
				<label className="text-lg flex flex-col gap-2 w-[45%] h-fit">
					Full Name
					<input
						type="text"
						name="fullName"
						value={inputUser?.fullName}
						className={`bg-input-box px-5 py-3 rounded-md ${grayInput}`}
						placeholder="John Doe"
						onChange={(e) => handleChange(e)}
						disabled={!editing}
					/>
				</label>
				<label className="text-lg flex flex-col gap-2 w-[45%] h-fit">
					Email Address
					<input
						type="text"
						name="email"
						value={inputUser?.email}
						className={`bg-input-box px-5 py-3 rounded-md ${grayInput}`}
						placeholder="johndoe@email.com"
						onChange={(e) => handleChange(e)}
						disabled={!editing}
					/>
				</label>
				<label className="text-lg flex flex-col gap-2 w-[45%] h-fit">
					Nickname
					<input
						type="text"
						name="nickname"
						value={inputUser?.nickname}
						className={`bg-input-box px-5 py-3 rounded-md ${grayInput}`}
						placeholder="Johnny"
						onChange={(e) => handleChange(e)}
						disabled={!editing}
					/>
				</label>
				<label className="text-lg flex flex-col gap-2 w-[45%] h-fit">
					Activity Level
					<select
						name="activityLevel"
						value={inputUser?.activityLevel}
						className={`h-[52px] bg-input-box px-5 py-3 ${grayInput}`}
						onChange={(e) => handleChange(e)}
						disabled={!editing}
					>
						<option value={ActivityLevel.NO_EXERCISE}>
							No Exercise
						</option>
						<option value={ActivityLevel.SEDENTARY}>
							Sedentary
						</option>
						<option value={ActivityLevel.MODERATE}>Moderate</option>
						<option value={ActivityLevel.INTERMEDIATE}>
							Intermediate
						</option>
					</select>
				</label>
				<label className="text-lg flex flex-col gap-2 w-[45%] h-fit">
					Height
					<input
						name="height"
						type="text"
						value={inputUser?.height}
						className={`bg-input-box px-5 py-3 rounded-md ${grayInput}`}
						placeholder="3'11"
						onChange={(e) => handleChange(e)}
						disabled={!editing}
					/>
				</label>{" "}
				<label className="text-lg flex flex-col gap-2 w-[50%] h-fit">
					Weight
					<div className="flex gap-5 items-center">
						<input
							name="weight"
							type="text"
							value={inputUser?.weight}
							className={`bg-input-box px-5 py-3 w-1/5 rounded-md ${grayInput}`}
							placeholder="350"
							onChange={(e) => handleChange(e)}
							disabled={!editing}
						/>{" "}
						lbs
					</div>
				</label>
			</div>
		</div>
	);
}
