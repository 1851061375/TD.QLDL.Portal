import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services";
import { ICredential, IError, ILogin } from "../../../models";
import { GetUser } from "../../user/redux/Actions";

export const GetToken = createAsyncThunk
<ICredential, ILogin, {rejectValue: IError}>("GetToken", async (params, thunkApi) => {
    try {
        const res = await authService.GetToken(params)
        if(res.status === 200 && res.data){ // fake api response with status 201
            thunkApi.dispatch(GetUser({token: res.data.token}))
        } 
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})

export const RefreshToken = createAsyncThunk
<ICredential, Omit<ICredential, "refreshTokenExpiryTime">, {rejectValue: IError}>("RefreshToken", async (params, thunkApi) => {
    try {
        const res = await authService.RefreshToken(params)
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error as IError)
    }
})