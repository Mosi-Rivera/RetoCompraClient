const { createContext } = require("react");

export const newDefaultUserContextState = () => ({
	isAuthenticated: false,
	user: {
		firstName: '',
		lastName: '',
		email: '',
		role: ''
	}
})

const userContext = createContext(newDefaultUserContextState());

export default userContext;
