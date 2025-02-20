import { IBaseExt} from "../../../models/basemodel";

export interface ICredential {
    refreshToken: string,
    refreshTokenExpiryTime: string,
    token: string,
}

export interface ILogin {
    username: string,
    password: string,
}

export interface IForgotPassword extends ILogin{
    confirmPassword: string,
}