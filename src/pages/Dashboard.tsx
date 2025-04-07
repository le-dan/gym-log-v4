import { Outlet } from "react-router";

export default function Dashboard() {
	return (
		<div className="h-full flex flex-col items-center">
			<Outlet />
		</div>
	);
}
