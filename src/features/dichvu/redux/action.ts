import { createAsyncThunk } from "@reduxjs/toolkit";
import { dichVuApi } from "../services";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";
import { IDichVu } from "../models";

export const SearchDichVu =
    createAsyncThunk<IPaginationResponse<IDichVu[]>, IPickSearch<IDichVu, "tenDichVu" | "tomTat" | "loaiDichVuId">>("SearchDichVu", async (params, thunkApi) => {
        try {
            const res = await dichVuApi.Search(params)
            return res?.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const GetDichVu =
    createAsyncThunk<IResult<IDichVu>, string>("GetDichVu", async (id, thunkApi) => {
        try {
            const res = await dichVuApi.Get(id);
            return res?.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDichVu = createAsyncThunk("AddDichVu", async (data: IDichVu, thunkApi) => {
    try {
        const res = await dichVuApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDichVu({ reFetch: true }))
        }
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDichVu = createAsyncThunk("UpdateDichVu", async (data: IOmitUpdate<IDichVu>, thunkApi) => {
    try {
        const res = await dichVuApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDichVu({ reFetch: true }))
        }
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDichVu = createAsyncThunk("DeleteDichVu", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await dichVuApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDichVu({ reFetch: true }))
        }
        return res?.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 