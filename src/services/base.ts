import { IBaseExt, IPaginationResponse, IOmitCreate, IOmitUpdate, IPickSearch, ICredential, IBasePagination, IResult, ISoftDelete } from "../models"
import { AxiosResponseWrapper } from '../lib/axios/typeHelper'
import { API_VERSION, } from "../data/constant";
import axiosInstance from "../lib/axios";
export type IUpdateService<TObj> = IOmitUpdate<TObj> & { id: string }
// weakly typed
export interface ICrud<TObj extends IBaseExt> {
    Search(_params: IPickSearch<TObj>): AxiosResponseWrapper<IPaginationResponse<TObj[]>>
    Get(_id: string): AxiosResponseWrapper<IResult<TObj>>
    Create(_data: IOmitCreate<TObj>): AxiosResponseWrapper
    Delete(_id: ISoftDelete): AxiosResponseWrapper
    Restore(_id: string): AxiosResponseWrapper
    Update(_params: IOmitUpdate<TObj>): AxiosResponseWrapper
}

export const apiEndpoints = {
    dichvus: "dichvus",
    kenhtins: "kenhtins",
    loaidichvus: "loaidichvus",
    cocautochucs: "cocautochucs",
    tokens: "tokens",
    tinbais: "tinbais",
    kieunoidungs: "kieunoidungs",
    "personal/profile": "personal/profile",
} as const
export const primaryRoutes = {
    admin: {
        root: "/admin/",
        dichVu: {
            root: "/admin/dich-vu"
        },
        coCauToChuc: {
            root: "/admin/co-cau-to-chuc"
        },
        loaiDichVu: {
            root: "/admin/loai-dich-vu"
        }
    },
    portal: {
        root: '/',
        home: {path: "/trang-chu", menuName: 'Trang chủ'},
        chitietdoanhnghiep: {path: '/don-vi-lu-hanh/doanh-nghiep/:id', menuName: 'Chi tiết doanh nghiệp'},
        doanhnghiep: {path: '/don-vi-lu-hanh/doanh-nghiep', menuName: 'Doanh nghiệp'},
        chitietsanpham: {path: '/don-vi-lu-hanh/san-pham/:id', menuName: 'Chi tiết sản phẩm'},
        sanpham: {path: '/don-vi-lu-hanh/san-pham', menuName: 'Sản phẩm'},
        chitietdichvu: {path: '/don-vi-lu-hanh/dich-vu/:id', menuName: 'Chi tiết dịch vụ'},
        dichvu: {path: '/don-vi-lu-hanh/dich-vu', menuName: 'Dịch vụ'},
        chitietcosoluutru: {path: '/tai-nguyen-du-lich/co-so-luu-tru/:id', menuName: 'Chi tiết cơ sở lưu trú'},
        cosoluutru: {path: '/tai-nguyen-du-lich/co-so-luu-tru', menuName: 'Cơ sở lưu trú'},
        chitietcuahangluuniem: {path: '/tai-nguyen-du-lich/cua-hang-luu-niem/:id', menuName: 'Chi tiết cửa hàng lưu niệm'},
        cuahangluuniem: {path: '/tai-nguyen-du-lich/cua-hang-luu-niem', menuName: 'Cửa hàng lưu niệm'},
        chitietdanhlamthangcanh: {path: '/tai-nguyen-du-lich/danh-lam-thang-canh/:id', menuName: 'Chi tiết danh lam thắng cảnh'},
        danhlamthangcanh: {path: '/tai-nguyen-du-lich/danh-lam-thang-canh', menuName: 'Tài nguyên du lịch'},
        chitietditichlichsu: {path: '/tai-nguyen-du-lich/di-tich-lich-su/:id', menuName: 'Chi tiết di tích lịch sử'},
        ditichlichsu: {path: '/tai-nguyen-du-lich/di-tich-lich-su', menuName: 'Di tích lịch sử'},
        chitietkhudiemdulich: {path: '/tai-nguyen-du-lich/khu-diem-du-lich/:id', menuName: 'Chi tiết khu diểm du lịch'},
        khudiemdulich: {path: '/tai-nguyen-du-lich/khu-diem-du-lich', menuName: 'Khu diểm du lịch'},
        chitiethuongdanvien: {path: '/huong-dan-vien/:id', menuName: 'Chi tiết hướng dẫn viên'},
        huongdanvien: {path: '/huong-dan-vien', menuName: 'Hướng dẫn viên'},
        chitietsanphamdulich: {path: '/san-pham-du-lich/:id', menuName: 'Chi tiết sản phẩm du lịch'},
        sanphamdulich: {path: '/san-pham-du-lich', menuName: 'Sản phẩm du lịch'},
        chitietkhaosattructuyen: {path: '/khac/khao-sat-truc-tuyen/:id', menuName: 'Chi tiết khảo sát trực tuyến'},
        khaosattructuyen: {path: '/khac/khao-sat-truc-tuyen', menuName: 'Khảo sát trực tuyến'},
        chitietquyhoachdulich: {path: '/khac/quy-hoach-du-lich/:id', menuName: 'Chi tiết quy hoạch du lịch'},
        quyhoachdulich: {path: '/khac/quy-hoach-du-lich', menuName: 'Quy hoạch du lịch'},
        chitietphieutraloi: {path: '/khac/phieu-tra-loi/:id', menuName: 'Chi tiết phiểu trả lời'},
    },

}
export type AppEndpoint = keyof typeof apiEndpoints
export class BaseApi {
    public readonly _urlSuffix: string
    constructor(endpoint: AppEndpoint, apiVersion: string = API_VERSION) {
        this._urlSuffix = apiVersion + endpoint
    }
}
