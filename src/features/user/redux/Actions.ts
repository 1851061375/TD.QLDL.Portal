import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services";
import { ICredential, IError, ILogin, IPaginationResponse, IPickSearch, IResult } from "../../../models";
import { IUser } from "../models";


export const GetUser = createAsyncThunk
<IUser, Pick<ICredential, "token">, {rejectValue : IError}>("GetUser", async (params, thunkApi) => {
    try {
        const res = await userService.GetUser(params)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const SearchUser = createAsyncThunk
<IPaginationResponse<IUser[]>, IPickSearch<IUser>, {rejectValue : IError}>("SearchUser", async (params, thunkApi) => {
    try {
        const res = await userService.Search(params)
        
        return res.data;

    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const GetUserById = createAsyncThunk
<IResult<IUser>, string, {rejectValue : IError}>("GetUserById", async (id, thunkApi) => {
    try {
        const res = await userService.Get(id)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})
