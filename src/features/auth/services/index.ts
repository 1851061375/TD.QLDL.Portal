import axios from "axios";
import { BaseApi, ICrud } from "../../../services";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import {ICredential, ILogin } from "../../../models";
import { IAuthenticate } from "./interface";
import axiosInstance from "@/lib/axios";
class AuthService extends BaseApi implements IAuthenticate{
    constructor() {
        super("tokens", "/api/")
    }
    GetToken(data: ILogin): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix, data)
    }
    RefreshToken(data: Omit<ICredential, "refreshTokenExpiryTime">): AxiosResponseWrapper<ICredential> {
        return axiosInstance.post(this._urlSuffix + "/refresh", data)
    }
}

export const authService = new AuthService();