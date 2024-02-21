import { useState, useEffect } from "react"
import userContext, { newDefaultUserContextState } from "../../contexts/userContext";

const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(newDefaultUserContextState(true));
    useEffect(() => {
        if (!userInfo.isAuthenticated) {
            localStorage.removeItem('user');
        } else {
            localStorage.setItem('user', JSON.stringify(userInfo.user));
        }
    }, [ userInfo.isAuthenticated]);
    return <userContext.Provider value={{userInfo, setUserInfo}}>
        {children}
    </userContext.Provider>
}

export default UserProvider;
