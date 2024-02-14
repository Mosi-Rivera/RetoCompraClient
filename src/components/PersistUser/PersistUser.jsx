import { useContext, useEffect, useState } from "react"
import {whoAmI} from "../../api/authRoutes"
import userContext from "../../contexts/userContext"
const PersistUser = ({children}) => {
    const {userInfo, setUserInfo} = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => console.log(userInfo), [userInfo]);
    useEffect(() => {
        const getUser = async () => {
            try {
                const {user} = await whoAmI();
                console.log(user);
                setUserInfo({
                    isAuthenticated: true,
                    user
                });
            } catch (error) {
               console.log(error); 
            }
            finally
            {
                setIsLoading(false);
            }
        }
        console.log(isLoading);
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
