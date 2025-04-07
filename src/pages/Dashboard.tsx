import { Outlet } from "react-router";

export default function Dashboard() {
	return (
		<div className="h-full flex flex-col gap-5 items-center">
			<Outlet />
		</div>
	);
}
