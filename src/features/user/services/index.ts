import axios from "axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import {IBaseExt, ICredential, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IUser } from "../models";
import axiosInstance from "@/lib/axios";
import { BaseApi, ICrud } from "../../../services";
class UserService extends BaseApi implements ICrud<IUser>{
    constructor() {
        super("personal/profile")
    }
    Search(params: IPickSearch<IUser>): AxiosResponseWrapper<IPaginationResponse<IUser[]>> {
        return axiosInstance.post("/api/users/search", params)
    }
    Get(id: string): AxiosResponseWrapper<IResult<IUser>> {
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    Create(data: Partial<Omit<IUser, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(id: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + id)
    }
    Restore(id: string): AxiosResponseWrapper {
        return axiosInstance.patch(this._urlSuffix + "/" + id)
    }
    Update(params: IOmitUpdate<IUser>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + params.id, params.data)
    }
    GetUser(data: Pick<ICredential, "token">): AxiosResponseWrapper<IUser> {
        return axiosInstance.get(this._urlSuffix, {headers:{
            Authorization: `Bearer ${data.token}`
        }})
    }
}

export const userService = new UserService();