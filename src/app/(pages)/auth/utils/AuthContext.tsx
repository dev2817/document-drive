"use client"

import { authApi } from '@/apis/authApis';
import { setUserData } from '@/features/userDataSlice';
import { selectUserId } from '@/features/userSlice';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

type AuthContextType = {
    projectCode: string;
    ipAddress: string;
    setIpAddress: (ipAddress: string) => void;
    projectRole: string[];
    successNavigate: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const projectCode: string = process.env.NEXT_PUBLIC_PROJECT_CODE as string;
    const projectRole: string[] = [process.env.NEXT_PUBLIC_PROJECT_ROLE as string];
    const successNavigateRoute: string = "/";
    const router = useRouter();
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);

    const [ipAddress, setIpAddress] = useState<string>('');

    const successNavigate = () => {
        router.push(successNavigateRoute)
    }

    const fetchIpAddress = () => {
        fetch('https://geolocation-db.com/json/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setIpAddress(data.IPv4);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    };

    const getUserData = async () => {
        try {
            const res = await authApi.getUserById(userId as string);
            if (res.data.success) {
                console.log(res.data.data);
                const userData = {
                    id: res.data.data._id,
                    email: res.data.data.email,
                    name: res.data.data.name,
                    profileImage: res.data.data.profileImage || "",
                    username: res.data.data.username || "",
                    isActive: res.data.data.isActive,
                }
                dispatch(setUserData(userData));
            }
            else {
                toast.error(res.data.message)
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        fetchIpAddress();
    }, []);

    useEffect(() => {
        userId && getUserData()
    }, [userId])
    return (
        <AuthContext.Provider value={{ projectCode, ipAddress, setIpAddress, projectRole, successNavigate }}>
            {children}
        </AuthContext.Provider>
    );
};
