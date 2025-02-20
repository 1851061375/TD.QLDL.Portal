import { createAsyncThunk } from "@reduxjs/toolkit";
import { tinBaiApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ITinBai } from "../models";
import { RootState } from "../../../lib/redux/Store";

export const SearchTinBai =
    createAsyncThunk<IPaginationResponse<ITinBai[]>, IPickSearch<ITinBai, "tieuDe" | "ngayBanHanh" | "ngayKetThuc" | "trichYeu" | "kenhTinId" | "trangThaiId" | "tinNoiBat">>("SearchTinBai", async (params, thunkApi) => {
        try {
            const res = await tinBaiApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetTinBai =
    createAsyncThunk<IResult<ITinBai>, string>("GetTinBai", async (id, thunkApi) => {
        try {
            const res = await tinBaiApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddTinBai = createAsyncThunk<any, ITinBai, {state: RootState}>("AddTinBai", async (data: ITinBai, thunkApi) => {
    try {
        const res = await tinBaiApi.Create(data);
        if (res.status === 201) {
            // const kenhTin = thunkApi.getState().kenhtin.data
            thunkApi.dispatch(SearchTinBai({ pageNumber: 1, pageSize:10, reFetch:true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateTinBai = createAsyncThunk("UpdateTinBai", async (data: IOmitUpdate<ITinBai>, thunkApi) => {
    try {
        const res = await tinBaiApi.Update(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteTinBai = createAsyncThunk("DeleteTinBai", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await tinBaiApi.Delete(data);
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 