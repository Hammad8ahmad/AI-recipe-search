import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const  useLogin = () => {
    interface loginData{
    email:string,
    password:string
}

    const [error,setError] = useState<any>(null)
    const [isLoading,setIsLoading] = useState<any>(false)
    const {dispatch} = useAuthContext()

    const login = async ({email,password}:loginData) => {

        setIsLoading(true)
        setError(null)
        const url = import.meta.env.VITE_PROD_URL + "/api";

        const response = await fetch(`${url}/user/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){

            // saving user to local storage
            localStorage.setItem("user",JSON.stringify(json))

            // update the auth context

            dispatch({type:"LOGIN",payload:json})
        }
    }

    return {login,isLoading,error}

} 