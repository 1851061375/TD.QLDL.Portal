import { createAsyncThunk } from "@reduxjs/toolkit";
import { coCauToChucService } from "../services";
import { IError, IPaginationResponse, IPickSearch, IOmitUpdate, IResult, ISoftDelete } from "../../../models";
import { ICoCauToChuc } from "../models";


export const SearchCoCauToChuc = createAsyncThunk
    <IPaginationResponse<ICoCauToChuc[]>, IPickSearch<ICoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active">, { rejectValue: IError }>("SearchCoCauToChuc", async (params, thunkApi) => {
        try {
            const res = await coCauToChucService.Search(params)
            return res?.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error as IError)
        }
    })

export const GetCoCauToChuc = createAsyncThunk<IResult<ICoCauToChuc>, string, { rejectValue: IError }>("GetCoCauToChuc", async (id, thunkApi) => {
    try {
        const res = await coCauToChucService.Get(id)
        return res?.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const UpdateCoCauToChuc = createAsyncThunk("UpdateCoCauToChuc", async (data: IOmitUpdate<ICoCauToChuc>, thunkApi) => {
    try {
        const res = await coCauToChucService.Update(data)
        if (res.status == 200) {
            thunkApi.dispatch(SearchCoCauToChuc({pageNumber:1, pageSize: 10000, reFetch: true }))
            thunkApi.dispatch(GetCoCauToChuc(data.id as string))
        }
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const AddCoCauToChuc = createAsyncThunk("AddCoCauToChuc", async (data: ICoCauToChuc, thunkApi) => {
    try {
        const res = await coCauToChucService.Create(data)
        if (res.status == 201) {
            thunkApi.dispatch(SearchCoCauToChuc({pageNumber:1, pageSize: 10000, reFetch: true }))
        }
        return res?.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
export const DeleteCoCauToChuc = createAsyncThunk("DeleteCoCauToChuc", async (params: ISoftDelete, thunkApi) => {
    try {
        const res = await coCauToChucService.Delete(params)
        if (res.status === 200) {
            thunkApi.dispatch(SearchCoCauToChuc({ reFetch: true }))
        }
        return res?.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})