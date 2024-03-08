import { useContext, useEffect, useState } from "react"
import {whoAmI} from "../../api/authRoutes"
import userContext, { newDefaultUserContextState } from "../../contexts/userContext"
const PersistUser = ({children}) => {
    const {userInfo, setUserInfo} = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            try {
                const {user} = await whoAmI();
                setUserInfo({
                    isAuthenticated: true,
                    user
                });
            } catch (error) {
                setUserInfo(newDefaultUserContextState());
               console.log(error); 
            }
            finally
            {
                setIsLoading(false);
            }
        }
        if (!isLoading) {
            setIsLoading(true);
            getUser();
        }
    }, []);
    if (isLoading)
        <></>//CAN JUST show anything
    return children;

}

export default PersistUser;
