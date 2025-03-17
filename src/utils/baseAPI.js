import axios from "axios";

// export const API_URL = process.env.REACT_APP_API_URL;
// export const API_VERSION = process.env.REACT_APP_API_VERSION;
// export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
// export const GATEWAY_TOKEN = process.env.REACT_APP_GATEWAY_TOKEN;

// export const HOST_API = `${API_URL}/api/v1/`;
// export const FILE_URL = `${process.env.REACT_APP_FILE_URL}/api/v1/attachments/minio/`;

export const API_URL =
  "https://csdlvhttdl.dienbien.gov.vn/_layouts/15/td.qldl.service/WCFService.svc/portal/";
const jwtToken = localStorage.getItem("token");

export const requestGET = async (URL, params) => {
  console.log("requestGET", URL, jwtToken);
  try {
    const res = await axios.get(`${API_URL}/${URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      params: {
        ...params,
      },
    });
    return res?.data;
  } catch (error) {
    return null;
  }
};

export const requestPUT2 = async (URL, data) => {
  try {
    // console.log(data);
    const res = await axios.put(
      `${API_URL}/${URL}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const requestPOST2 = async (URL, data, config = {}) => {
  try {
    // console.log(data);
    const res = await axios.post(
      `${API_URL}/${URL}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwtToken,
        },
        ...config,
      }
    );
    return res;
  } catch (error) {
    return null;
  }
};

export const requestPOST = async (URL, data) => {
  try {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res?.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST_NEW = async (URL, data) => {
  try {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestPUT_NEW = async (URL, data) => {
  try {
    const res = await axios({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestDOWNLOADFILE = async (URL, data) => {
  try {
    const res = await axios({
      method: "POST",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const requestPUT = async (URL, data) => {
  try {
    const res = await axios({
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res?.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE = async (url, data) => {
  try {
    const res = await axios.delete(`${API_URL}/${url}`, { data });

    return res?.data;
  } catch (error) {
    return null;
  }
};
