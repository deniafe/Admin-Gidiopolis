// "use client";
import React, { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    User,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { Spinner } from '@/components/global/Loading';
import { getDocument } from '@/firebase/firestore/get_data';

const auth = getAuth(firebase_app);

interface AuthContextValue {
    user: User | null;
}

export const AuthContext = React.createContext<AuthContextValue>({ user: null });

export const useAuthContext = (): AuthContextValue => React.useContext(AuthContext);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log('Auth has just changed', user)
            if (user) {
               const result = await getDocument('users', user.uid)
               const data = result?.data
               const error = data?.error

               if (error) {
                 return setLoading(false)
               }
               setUser({...user, displayName: data?.displayName})

            } else {
                setUser(null);
            }
            setLoading(false);
        });

        console.log('This is the user', user)

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? 
            <div
             className="text-my-primary"
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
             >
                <Spinner />
             </div>
             : 
            children}
        </AuthContext.Provider>
    );
};
