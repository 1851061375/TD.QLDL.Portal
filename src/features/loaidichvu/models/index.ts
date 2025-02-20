import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";

export interface ILoaiDichVu extends IBaseExt{
    tenLoaiDichVu: string,
    thuTu: number,
    linkType?: "chi-tiet" | "hien-tai",
    imageUrl: string | null,
    linkTo?: string
}

export interface ISearchLoaiDichVu extends IBasePagination, IPickSearch<ILoaiDichVu, "tenLoaiDichVu">{
    
}