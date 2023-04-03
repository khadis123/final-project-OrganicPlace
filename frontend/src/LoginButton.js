import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const {LoginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => LoginWithRedirect}>Sign In</button>
        )
    )
}

export default LoginButton;
