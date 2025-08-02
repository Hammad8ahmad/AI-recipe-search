import { createContext, useReducer, ReactNode, Dispatch, useEffect } from "react";

type AuthAction = 
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" };


type User = any;

interface AuthState {
  user: User | null;
}

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {


    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null;
    if(user){
        dispatch({type:"LOGIN",payload:user})
    }

  },[])


  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
