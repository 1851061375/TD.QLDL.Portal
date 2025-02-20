import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddKieuNoiDung, DeleteKieuNoiDung, GetKieuNoiDung, SearchKieuNoiDung, UpdateKieuNoiDung } from "./action";
import { IKieuNoiDung } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
export interface IKieuNoiDungState extends ExtendedState<IKieuNoiDung> {
}

const initialState: IKieuNoiDungState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "kieunoidung",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchKieuNoiDung.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetKieuNoiDung.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddKieuNoiDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateKieuNoiDung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteKieuNoiDung.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addMatcher(isPending(SearchKieuNoiDung, GetKieuNoiDung, AddKieuNoiDung, UpdateKieuNoiDung, DeleteKieuNoiDung), (state) => {
                state.loading = true
            })
            // .addMatcher(isRejectedWithValue(SearchKieuNoiDung, GetKieuNoiDung, AddKieuNoiDung, UpdateKieuNoiDung, DeleteKieuNoiDung), (state, action) => {
            //     toast.error(action.error.message)
            //     state.loading = false
            // })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;