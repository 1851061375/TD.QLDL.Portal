import React from 'react'
import ReactDOM from 'react-dom/client'
import "./lib/antd/scss/customAntdStyle.scss"
import "./assets/sass/styles.scss"
import 'react-toastify/dist/ReactToastify.css';
import 'react-splitter-layout/lib/index.css';
import "formiojs/dist/formio.full.css";
import "bootstrap/dist/css/bootstrap.min.css"
import 'reactflow/dist/style.css';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { router } from './routers/router.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './lib/redux/Store.ts';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/vi';
import locale from 'antd/lib/locale/vi_VN';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </PersistGate>
      </ConfigProvider>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  </>,
)
