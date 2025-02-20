import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import TrangChuWrapper from "@/features/portal/home";
import { primaryRoutes } from "@/services";
import { SanPhamLuHanhPage, SanPhamLuHanhDetail } from "@/features/SanPhamLuHanh";
import { DichVuLuHanhPage, DichVuLuHanhDetail } from "@/features/DichVuLuHanh";
import { DoanhNghiepLuHanhPage, DoanhNghiepLuHanhDetail } from "@/features/DoanhNghiepLuHanh";
import { CoSoLuuTruPage, CoSoLuuTruDetail } from "@/features/CoSoLuuTru";
import { CuaHangLuuNiemPage, CuaHangLuuNiemDetail } from "@/features/CuaHangLuuNiem";
import { DanhLamThangCanhPage, DanhLamThangCanhDetail } from "@/features/DanhLamThangCanh";
import { DiTichLichSuPage, DiTichLichSuDetail } from "@/features/DiTichLichSu";
import { KhuDiemDuLichPage, KhuDiemDuLichDetail } from "@/features/KhuDiemDuLich";
import { HuongDanVienPage, HuongDanVienDetail } from "@/features/HuongDanVien";
import { SanPhamDuLichPage, SanPhamDuLichDetail } from "@/features/SanPhamDuLich";
import { KhaoSatTrucTuyenPage, KhaoSatTrucTuyenDetail, PhieuTraLoiDetail } from "@/features/KhaoSatTrucTuyen";
import { QuyHoachDuLichPage, QuyHoachDuLichDetail } from "@/features/QuyHoachDuLich";

const routes = [
  { path: primaryRoutes.portal.home.path, element: <TrangChuWrapper />, },
  // #region Sản phẩm du lich
  { path: primaryRoutes.portal.chitietsanphamdulich.path, element: <SanPhamDuLichDetail /> },
  { path: primaryRoutes.portal.sanphamdulich.path, element: <SanPhamDuLichPage /> },
  // #endregion
  // #region Tài nguyên du lịch
  { path: primaryRoutes.portal.chitiethuongdanvien.path, element: <HuongDanVienDetail /> },
  { path: primaryRoutes.portal.huongdanvien.path, element: <HuongDanVienPage /> },
  // #endregion
  // #region Tài nguyên du lịch
  { path: primaryRoutes.portal.chitietkhudiemdulich.path, element: <KhuDiemDuLichDetail /> },
  { path: primaryRoutes.portal.khudiemdulich.path, element: <KhuDiemDuLichPage /> },
  { path: primaryRoutes.portal.chitietditichlichsu.path, element: <DiTichLichSuDetail /> },
  { path: primaryRoutes.portal.ditichlichsu.path, element: <DiTichLichSuPage /> },
  { path: primaryRoutes.portal.chitietdanhlamthangcanh.path, element: <DanhLamThangCanhDetail /> },
  { path: primaryRoutes.portal.danhlamthangcanh.path, element: <DanhLamThangCanhPage /> },
  { path: primaryRoutes.portal.chitietcuahangluuniem.path, element: <CuaHangLuuNiemDetail /> },
  { path: primaryRoutes.portal.cuahangluuniem.path, element: <CuaHangLuuNiemPage /> },
  { path: primaryRoutes.portal.chitietcosoluutru.path, element: <CoSoLuuTruDetail /> },
  { path: primaryRoutes.portal.cosoluutru.path, element: <CoSoLuuTruPage /> },
  // #endregion
  // #region Doanh nghiệp lữ hành
  { path: primaryRoutes.portal.chitietdoanhnghiep.path, element: <DoanhNghiepLuHanhDetail /> },
  { path: primaryRoutes.portal.doanhnghiep.path, element: <DoanhNghiepLuHanhPage /> },
  { path: primaryRoutes.portal.chitietsanpham.path, element: <SanPhamLuHanhDetail /> },
  { path: primaryRoutes.portal.sanpham.path, element: <SanPhamLuHanhPage /> },
  { path: primaryRoutes.portal.chitietdichvu.path, element: <DichVuLuHanhDetail /> },
  { path: primaryRoutes.portal.dichvu.path, element: <DichVuLuHanhPage /> },

  { path: primaryRoutes.portal.chitietkhaosattructuyen.path, element: <KhaoSatTrucTuyenDetail /> },
  { path: primaryRoutes.portal.khaosattructuyen.path, element: <KhaoSatTrucTuyenPage /> },

  { path: primaryRoutes.portal.chitietquyhoachdulich.path, element: <QuyHoachDuLichDetail /> },
  { path: primaryRoutes.portal.quyhoachdulich.path, element: <QuyHoachDuLichPage /> },

  { path: primaryRoutes.portal.chitietphieutraloi.path, element: <PhieuTraLoiDetail /> },
  // #endregion
];

export const portalRoutes: RouteObject[] = routes.map(route => ({ path: route.path, element: route.element }));
