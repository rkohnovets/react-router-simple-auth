import * as React from "react";
import { fakeAuthProvider } from "./FakeAuthProvider";

interface AuthContextType {
    user: any;
    // коллбэк - например, редирект на какую-то страницу
    // (функция navigate, получаемая с помощью хука useNavigate)
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
  
let AuthContext = React.createContext<AuthContextType>(null!);
  
function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);
    
    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    };
  
    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// хук для более удобного получения инфы о пользователе 
// (хотя хз, по моему хуйня, так как все равно одна строка)
function useAuth() {
    return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth }