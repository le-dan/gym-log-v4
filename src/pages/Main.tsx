import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2d336b",
		},
		secondary: {
			main: "#f44336",
		},
	},
});

export default function Main() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App bg-snow-white-dark flex">
				<Sidebar />
				{/* Main Board */}
				<div className="h-full w-full px-30 py-15 opacity-100 flex flex-col justify-center items-center gap-4 text-black">
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}
