import { initializeApp} from 'firebase/app'
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
import { get } from 'react-hook-form';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTktpNiAoMe8agYvK7dKZc501EvCgEkwM",
  authDomain: "crown-clothing-db-97357.firebaseapp.com",
  projectId: "crown-clothing-db-97357",
  storageBucket: "crown-clothing-db-97357.appspot.com",
  messagingSenderId: "170754268036",
  appId: "1:170754268036:web:8bbfdcd618e8d8eb751bd1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// a class that create new Google credential with an access code, or use the provider to trigger user authentication flows
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

// should always have only one authentication method for one application
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// create a database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    // check if we already have existing document reference
    // arguments: (database, collection, identifier: uid=Unique ID Identifier)
    // Google generates a document reference for us even if I dont have a one in our db.
    // Reason: reference points to a unique point in the db that doesn't have any stuff there so Google thought theres no harm overwriting it
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    // checks whether the reference actually exists in the db
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()){
        // create user data
        const { displayName, email } = userAuth;
        const createAt = new Date();
        
        try{
            // set the document "userDocRef" with the objects in the {}
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error){
            console.log('error creating the user' , error.message)
        }
    }
    return userDocRef;
}
