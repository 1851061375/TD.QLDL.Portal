import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential } from "../../../models";
import { GetUser } from "./Actions";
import { IUser } from "../models";

export interface IAuthState extends ExtendedState<IUser>{
}

const initialState: IAuthState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetUser.pending, (state) => {
            state.loading = true
        })
        .addCase(GetUser.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        .addCase(GetUser.rejected, (state, action) => {
            state.error = action.payload?.message
            state.loading = false
        })
    }
})


export default Slice.reducer

export const {resetData} = Slice.actions;