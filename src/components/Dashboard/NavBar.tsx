import dayjs from "dayjs";
import DayCell from "./DayCell";
import React from "react";

const currentDay = dayjs();
function createDaysOfWeek() {
	const daysOfWeek = [];
	for (let i = 0; i < currentDay.day(); i++) {
		const day = dayjs().day(i);
		daysOfWeek.push({ day: day });
	}
	daysOfWeek.push({ day: currentDay });
	for (let i = currentDay.day() + 1; i < 7; i++) {
		const day = dayjs().day(i);
		daysOfWeek.push({ day: day });
	}

	return daysOfWeek;
}

const renderDays = () => {
	const daysOfWeek = createDaysOfWeek();
	return daysOfWeek.map((dayjs, id) => {
		return (
			<React.Fragment key={id}>
				<div className="h-full w-[2px] bg-snow-white opacity-80 rounded-xl"></div>
				<DayCell
					isToday={dayjs.day.day() === currentDay.day()}
					dayFullname={dayjs.day.format("dddd")}
					dayNumber={dayjs.day.format("DD")}
					key={id}
				/>
			</React.Fragment>
		);
	});
};

export default function NavBar() {
	// 0-6, 6 saturday, (6+1)%7 = 0 sunday, (6+7)=13%7 =
	return (
		<div className="h-32 p-3 w-max flex basis-1 gap-4 bg-primary rounded-lg shadow-xl">
			{renderDays()}
			<div className="h-full w-[2px] bg-snow-white opacity-80 rounded-xl"></div>
		</div>
	);
}
