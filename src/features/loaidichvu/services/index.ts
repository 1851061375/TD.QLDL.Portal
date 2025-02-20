import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IBaseExt, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { ILoaiDichVu } from "../models";
import { BaseApi, ICrud } from "../../../services";

class LoaiDichVuService extends BaseApi implements ICrud<ILoaiDichVu>{
    constructor() {
        super("loaidichvus")
    }
    Search(_params: IPickSearch<ILoaiDichVu, "tenLoaiDichVu">): AxiosResponseWrapper<IPaginationResponse<ILoaiDichVu[]>> {
        return axiosInstance.get(this._urlSuffix, {params: _params})
    }
    Get(_id: string): AxiosResponseWrapper<IResult<ILoaiDichVu>> {
        return axiosInstance.get(this._urlSuffix + "/" + _id)
    }
    Create(_data: Partial<Omit<ILoaiDichVu, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, _data)
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        return axiosInstance.delete(this._urlSuffix + "/" + _params.id, {data: {forceDelete: _params.forceDelete}})
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<ILoaiDichVu>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + _params.id, _params.data)
    }

}

export const loaiDichVuApi = new LoaiDichVuService()