import { useState } from "react"
import { newDefaultUserContextState } from "../../contexts/userContext";


const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(newDefaultUserContextState());
    return <userContext.Provider value={{userInfo, setUserInfo}}>
        {children}
    </userContext.Provider>
}

export default UserProvider;
