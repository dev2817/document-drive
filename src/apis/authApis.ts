import axios from "axios"
import { CheckUserData, CompleteProfileInput, GoogleSignData, UserForgotPassword, UserOtpVerify, UserResendOtp, UserResetPassword, UserSignInData, UserSignUpData } from "@/types/types";

const baseUrl = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL;

export const authApi = {
    signUp: async (data: UserSignUpData) => {
        return await axios.post(`${baseUrl}/signUp`, data);
    },
    signIn: async (data: UserSignInData) => {
        return await axios.post(`${baseUrl}/signIn`, data)
    },
    verifyOtp: async (data: UserOtpVerify) => {
        return await axios.post(`${baseUrl}/otpVerify`, data)
    },
    resentOtp: async (data: UserResendOtp) => {
        return await axios.post(`${baseUrl}/resendOtp`, data)
    },
    forgotPassword: async (data: UserForgotPassword) => {
        return await axios.post(`${baseUrl}/forgotPassword`, data)
    },
    resetPassword: async (data: UserResetPassword) => {
        return await axios.post(`${baseUrl}/resetPassword`, data)
    },
    checkUserData: async (data: CheckUserData) => {
        return await axios.post(`${baseUrl}/checkUserData`, data)
    },
    signWithGoogle: async (data: GoogleSignData) => {
        return await axios.post(`${baseUrl}/signWithGoogle`, data);
    },
    completeProfile: async (data: CompleteProfileInput) => {
        return await axios.post(`${baseUrl}/completeProfile`, data);
    },
    checkToken: async () => {
        return await axios.get(`${baseUrl}/checkToken`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authtoken')}`
            }
        })
    },
    getUserById: async (userId: string) => {
        return await axios.get(`${baseUrl}/getUserById/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authtoken')}`
            }
        })
    },
}