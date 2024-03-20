import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import userContext from "../src/contexts/userContext"

const LoggedInGuard = () => {
	const {userInfo} = useContext(userContext);
	if (!userInfo.isAuthenticated)
		return <Navigate to={'/'}/>
	return <Outlet/>
}

export default LoggedInGuard;
