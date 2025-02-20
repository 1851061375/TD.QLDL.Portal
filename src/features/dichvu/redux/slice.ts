import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IDichVu } from "../models";
import { AddDichVu, DeleteDichVu, GetDichVu, SearchDichVu, UpdateDichVu } from "./action";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDichVuState extends ExtendedState<IDichVu>{

}

const initialState : IDichVuState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "dichvu",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDichVu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetDichVu.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDichVu.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDichVu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDichVu.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addMatcher(isPending(SearchDichVu, GetDichVu, AddDichVu, UpdateDichVu, DeleteDichVu), (state) => {
                state.loading = true
            })
            // .addMatcher(isRejectedWithValue(SearchDichVu, GetDichVu, AddDichVu, UpdateDichVu, DeleteDichVu), (state, action) => {
            //     toast.error(action.error.message)
            //     state.loading = false
            // })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer