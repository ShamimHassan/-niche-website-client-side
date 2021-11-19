import { useContext } from "react"
import { AuthContext } from "../../contex/AuthProvider/AuthProvider"


const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;