import { useAuth } from "../../context/AuthContext";
import SignIn from "../../pages/signin/index";

const withProtected = (Component) => {
    const Protected = (props) => {
        const { currentUser } = useAuth();

        // If user is not logged in, return login component
        if (!currentUser) {
            return <SignIn />;
        } else {
            // If user is logged in, return original component
            return <Component {...props} />;
        }
    };

    console.log(Component.getInitialProps);

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Protected;
};

export default withProtected;
