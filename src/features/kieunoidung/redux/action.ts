import { createAsyncThunk } from "@reduxjs/toolkit";
import { KieuNoiDungService, kieuNoiDungService } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { IKieuNoiDung, ISearchKieuNoiDung } from "../models";


export const SearchKieuNoiDung = createAsyncThunk
    <IPaginationResponse<IKieuNoiDung[]>, IPickSearch<IKieuNoiDung, "tenNoiDung">, { rejectValue: IError }>("SearchKieuNoiDung", async (params, thunkApi) => {
        try {
            const res = await kieuNoiDungService.Search(params)
            return res?.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetKieuNoiDung = createAsyncThunk<IResult<IKieuNoiDung>, string, { rejectValue: IError }>("GetKieuNoiDung", async (id, thunkApi) => {
    try {
        const res = await kieuNoiDungService.Get(id)
        return res?.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const UpdateKieuNoiDung = createAsyncThunk("UpdateKieuNoiDung", async (data: IOmitUpdate<IKieuNoiDung>, thunkApi) => {
    try {
        const res = await kieuNoiDungService.Update(data)
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const AddKieuNoiDung = createAsyncThunk("AddKieuNoiDung", async (data: IKieuNoiDung, thunkApi) => {
    try {
        const res = await kieuNoiDungService.Create(data)
        if (res.status == 201) {
            thunkApi.dispatch(SearchKieuNoiDung({ reFetch: true }))
        }
        return res?.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const DeleteKieuNoiDung = createAsyncThunk("DeleteKieuNoiDung", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await kieuNoiDungService.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchKieuNoiDung({ reFetch: true }))
        }
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 