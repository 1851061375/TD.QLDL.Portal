import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddCoCauToChuc, DeleteCoCauToChuc, GetCoCauToChuc, SearchCoCauToChuc, UpdateCoCauToChuc } from "./crud";
import { ICoCauToChuc } from "../models";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
export interface ICoCauToChucState extends ExtendedState<ICoCauToChuc> {
}

const initialState: ICoCauToChucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "coCauToChuc",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchCoCauToChuc.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetCoCauToChuc.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddCoCauToChuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateCoCauToChuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteCoCauToChuc.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addMatcher(isPending(SearchCoCauToChuc, GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc), (state) => {
                state.loading = true
            })
            // .addMatcher(isRejectedWithValue(SearchCoCauToChuc, GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc), (state, action) => {
            //     toast.error(action.error.message)
            //     state.loading = false
            // })
    }
})


export default Slice.reducer

export const { resetData, resetDatas } = Slice.actions;