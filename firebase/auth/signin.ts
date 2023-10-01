import firebase_app from "../config"
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth"
import { successMessage } from "../success_message";
import { errorMessage } from "../error_message";

const auth = getAuth(firebase_app)

export async function signIn(email: string, password: string) {
    let result = null,
        error = null
    try {
        result = await signInWithEmailAndPassword(auth, email, password)
        successMessage("Authentication successful 🎉")
    } catch (e) {
        error = e
        errorMessage(e + "❌")
    }

    return { result, error }
}

export const signOutUser = async () => await signOut(auth)