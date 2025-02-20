import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IBaseExt, IOmitUpdate, IPaginationResponse, IResult, ISoftDelete } from "../../../models";
import { ITinBai } from "../models";
import { BaseApi, ICrud } from "../../../services";

class TinBaiService extends BaseApi implements ICrud<ITinBai>{
    constructor() {
        super("tinbais")
    }
    Search(_params: IPickSearch<ITinBai, "tieuDe" | "ngayBanHanh" | "ngayKetThuc" | "trichYeu" | "kenhTinId" | "trangThaiId" | "tinNoiBat">): AxiosResponseWrapper<IPaginationResponse<ITinBai[]>> {
        return axiosInstance.get(this._urlSuffix, { params: _params })
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ITinBai>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id);
    }
    Create(_data: Partial<Omit<ITinBai, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, { data: { forceDelete: _params.forceDelete } })
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ITinBai>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }
}

export const tinBaiApi = new TinBaiService()