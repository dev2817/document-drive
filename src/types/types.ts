export type UserIdState = {
    userId: string
}

export type UserDataState = {
    id: string,
    email: string,
    name: string,
    profileImage: string,
    username: string,
    isActive: boolean,
}

export type UserSignInData = {
    name: string;
    password: string;
    projectCode: string;
    ip: string
}

export type UserSignUpData = {
    name: string,
    username: string,
    email: string,
    mobile: string,
    password: string,
    roles: string[],
    projectCode: string
}

export type UserOtpVerify = {
    otp: string,
    name: string,
    verify: boolean,
    forgotPassword: boolean,
    projectCode: string,
    ip: string
}

export type UserResendOtp = {
    name: string
}

export type UserForgotPassword = {
    name: string
}

export type UserResetPassword = {
    name: string,
    password: string
}

export type CheckUserData = {
    username?: string;
    email?: string;
    mobile?: string;
}

export type GoogleSignData = {
    googleUid: string;
    name: string;
    email: string;
    profileImage?: string;
    roles: string[];
    projectCode: string;
    ip: string;
}

export type CompleteProfileInput = {
    email: string;
    username: string;
    ip: string;
    projectCode: string;
}

export type TTextBox = {
    type: string;
    name: string;
    label?: string;
    value: any;
    disabled?: boolean;
    error?: boolean;
    onChange: (e: any) => void;
}

export type TButton = {
    name: string;
    onClick: () => void;
}

export type OtpInputProps = {
    length: number;
    onChange: (otp: string) => void;
}

export type UserSignUp = {
    name: string,
    username: string,
    email: string,
    mobile: string,
    password: string,
}

export type UserSignIn = {
    name: string;
    password: string;
}