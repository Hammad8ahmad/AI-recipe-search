import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const  useSignup = () => {
    interface signUpData{
    email:string,
    password:string
}

    const [error,setError] = useState<any>(null)
    const [isLoading,setIsLoading] = useState<any>(false)
    const {dispatch} = useAuthContext()

    const signup = async ({email,password}:signUpData) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:3000/api/user/signup",{
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

    return {signup,isLoading,error}

} 