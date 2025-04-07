interface DayCellProps {
	dayFullname: string; // monday, tuesday, ...
	dayNumber: string; // 1, 2, ...
	isToday?: boolean;
}

export default function DayCell({ dayFullname: day, dayNumber: dayNumber, isToday }: DayCellProps) {
	return (
		<div
			className={`flex-1 font-bold text-snow-white flex flex-col w-30 p-3 items-center justify-center rounded-lg ${
				isToday ? "current-day hover:shadow-lg hover:shadow-accent" : "bg-accent/10"
			}   duration-300 ease-in-out h-full shadow-black select-none box-border`}
		>
			<span className="text-2xl">{day.substring(0, 3).toUpperCase()}</span>
			<span className="text-2xl font-light">{dayNumber}</span>
		</div>
	);
}
