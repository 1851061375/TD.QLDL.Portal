import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential } from "../../../models";
import { GetToken, RefreshToken } from "./Actions";

export interface IAuthState extends ExtendedState<ICredential>{
}

const initialState: IAuthState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(GetToken.pending, (state) => {
            state.loading = true
        })
        .addCase(GetToken.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        .addCase(GetToken.rejected, (state, action) => {
            state.error = action.payload?.message
            state.loading = false
        })
        .addCase(RefreshToken.fulfilled, (state, action) => {
            state.data = action.payload
        })
        // .addCase(GetUser.pending, (state) => {
        //     state.loading = true
        // })
        // .addCase(GetUser.fulfilled, (state, action) => {
        //     state.user = action.payload
        //     state.loading = false
        // })
        // .addCase(GetUser.rejected, (state, action) => {
        //     state.error = action.payload?.message
        //     state.loading = false
        // })
    }
})


export default Slice.reducer

export const {resetData} = Slice.actions;