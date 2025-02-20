import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILoaiDichVu } from "../models";
import { AddLoaiDichVu, DeleteLoaiDichVu, GetLoaiDichVu, SearchLoaiDichVu, UpdateLoaiDichVu } from "./action";
import {toast} from 'react-toastify'
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ILoaiDichVuState extends ExtendedState<ILoaiDichVu>{

}

const initialState : ILoaiDichVuState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "loaidichvu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchLoaiDichVu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetLoaiDichVu.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddLoaiDichVu.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateLoaiDichVu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteLoaiDichVu.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addMatcher(isPending(SearchLoaiDichVu, GetLoaiDichVu, AddLoaiDichVu, UpdateLoaiDichVu, DeleteLoaiDichVu), (state) => {
                state.loading = true
            })
            // .addMatcher(isRejectedWithValue(SearchLoaiDichVu, GetLoaiDichVu, AddLoaiDichVu, UpdateLoaiDichVu, DeleteLoaiDichVu), (state, action) => {
            //     toast.error(action.error.message)
            //     state.loading = false
            // })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer