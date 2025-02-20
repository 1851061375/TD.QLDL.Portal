import {combineReducers} from 'redux';
import authReducer from '../../features/auth/redux/Slice'
import userReducer from '../../features/user/redux/Slice'
import dichVuReducer from '../../features/dichvu/redux/slice'
import loaiDichVuReducer from '../../features/loaidichvu/redux/slice'
import tinBaiReducer from '../../features/tinbai/redux/slice'
import kieuNoiDungReducer from '../../features/kieunoidung/redux/slice'
import coCauToChucReducer from '../../features/cocautochuc/redux/slice'

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    dichvu: dichVuReducer,
    loaidichvu: loaiDichVuReducer,
    tinbai: tinBaiReducer,
    kieunoidung:kieuNoiDungReducer,
    cocautochuc: coCauToChucReducer,
})
