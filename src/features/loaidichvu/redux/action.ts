import { createAsyncThunk } from "@reduxjs/toolkit";
import { loaiDichVuApi } from "../services";
import { IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { ILoaiDichVu } from "../models";

export const SearchLoaiDichVu = createAsyncThunk<IPaginationResponse<ILoaiDichVu[]>, IPickSearch<ILoaiDichVu, "tenLoaiDichVu">>("SearchLoaiDichVu", async (params, thunkApi) => {
    try{
        const res = await loaiDichVuApi.Search(params)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetLoaiDichVu = createAsyncThunk<IResult<ILoaiDichVu>, string>("GetLoaiDichVu", async (id, thunkApi) => {
    try{
        const res = await loaiDichVuApi.Get(id)
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const AddLoaiDichVu = createAsyncThunk("AddLoaiDichVu", async (data : ILoaiDichVu, thunkApi) => {
    try {
        const res = await loaiDichVuApi.Create(data)
        if(res.status === 201){
            thunkApi.dispatch(SearchLoaiDichVu({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const UpdateLoaiDichVu = createAsyncThunk("UpdateLoaiDichVu", async (data : IOmitUpdate<ILoaiDichVu>, thunkApi) => {
    try {
        const res = await loaiDichVuApi.Update(data)
        if(res.status === 200){
            thunkApi.dispatch(SearchLoaiDichVu({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteLoaiDichVu = createAsyncThunk("DeleteLoaiDichVu", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await loaiDichVuApi.Delete(params)
        if(res.status === 200){
            thunkApi.dispatch(SearchLoaiDichVu({reFetch: true}))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
