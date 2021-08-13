import { io } from "socket.io-client";
import user from "../helpers/user";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
	auth: {
		token: user.getAuthToken() || "",
	},
});

socket.on("connection", () => {
	console.log(`Socket connection established #${socket.id}`);
});

socket.on("disconnect", (reason) => {
	if (reason === "io server disconnect") {
		return socket.connect();
	}
	console.log(`Socket connection closed #${reason}`);
});

export default socket;
