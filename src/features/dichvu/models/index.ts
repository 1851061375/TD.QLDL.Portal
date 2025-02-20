import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
import { ILoaiDichVu } from "../../loaidichvu/models";

export interface IDichVu extends IBaseExt {
    tenDichVu: string,
    maDichVuCha: string,
    loaiDichVuId: string,
    loaiDichVu: ILoaiDichVu
    tomTat: string,
    imageUrl: string,
    noiDung: string,
    thuTu: string,
}

export interface ISearchDichVu extends IBasePagination, IBaseSearch, IPickSearch<IDichVu, "tenDichVu" | "tomTat" | "maDichVuCha">{
    
}