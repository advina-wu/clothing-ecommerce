import { signInWithGooglePopup , createUserDocumentFromAuth} from '../../utils/firebase.utils'; 

const SignIn = () => {
    const logGoogleUser = async () => {
        // use the signInWithGooglePopup to ask the users to signin with google
        const { user } = await signInWithGooglePopup();
        console.log(user);
        // call the method using the user who jsut signed in.
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>

    )

}

export default SignIn;