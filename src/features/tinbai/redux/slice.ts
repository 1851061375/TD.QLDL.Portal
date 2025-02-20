import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ITinBai } from "../models";
import { AddTinBai, DeleteTinBai, GetTinBai, SearchTinBai, UpdateTinBai } from "./action";
import {toast} from 'react-toastify'

export interface ITinBaiState extends ExtendedState<ITinBai>{

}

const initialState : ITinBaiState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "tinbai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchTinBai.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetTinBai.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTinBai.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateTinBai.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteTinBai.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addMatcher(isPending(SearchTinBai, GetTinBai, AddTinBai, UpdateTinBai, DeleteTinBai), (state) => {
                state.loading = true
            })
            // .addMatcher(isRejectedWithValue(SearchTinBai, GetTinBai, AddTinBai, UpdateTinBai, DeleteTinBai), (state, action) => {
            //     toast.error(action.error.message)
            //     state.loading = false
            // })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer