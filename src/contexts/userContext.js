import { createContext } from "react";
const defaultState = {
	isAuthenticated: false,
	user: {
		firstName: '',
		lastName: '',
		email: '',
		role: ''
	}
}

export const newDefaultUserContextState = (useStorage = false) => {
	if (useStorage) {
		let user = localStorage.getItem("user");
		if (user) {
			user = JSON.parse(user);
			return {
				isAuthenticated: true,
				user
			}
		}
	}
	return defaultState;
}

const userContext = createContext(newDefaultUserContextState(true));

export default userContext;
