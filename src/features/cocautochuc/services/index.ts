import { ICoCauToChuc } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";
import { BaseApi, ICrud } from "../../../services";

class CoCauToChucService extends BaseApi implements ICrud<ICoCauToChuc>{
    constructor() {
        super("cocautochucs")
    }
    Search(_params: IPickSearch<ICoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active">): AxiosResponseWrapper<IPaginationResponse<ICoCauToChuc[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params});
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ICoCauToChuc>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<ICoCauToChuc, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix,_data)
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ICoCauToChuc>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const coCauToChucService= new CoCauToChucService()