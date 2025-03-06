import axios from "axios";

export const ORIGIN_API_URL = import.meta.env.VITE_APP_API_URL;
export const API_VERSION = import.meta.env.VITE_APP_API_VERSION;

// export const HOST_API = `${API_URL}/api/v1/`;
// export const FILE_URL = `${process.env.REACT_APP_FILE_URL}/api/v1/attachments/minio/`;

export const API_URL = `${ORIGIN_API_URL}/openapi`;

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

// Lấy token
const jwtToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDA3Mjk5MzgsImV4cCI6MjA1NjI2MjczOCwic3ViIjpudWxsLCJoYXNocHdkIjoiaVhKWmY0MEJFUlViNUgrQnhuUXlsUT09IiwiY29udGV4dCI6eyJ1c2VyIjp7InVzZXJOYW1lIjoiZGVtbyIsImRpc3BsYXlOYW1lIjpudWxsfX19.7Ula0a-QpOownf6KgAcN24B79cJlx4lQTwBnclbUwMU";

export const requestGET = async (URL, params) => {
  console.log("requestGET -> URL", URL);
  console.log("requestGET -> params", params);
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
    return res.data;
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

    return res.data;
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

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE = async (url, data) => {
  try {
    const res = await axios.delete(`${API_URL}/${url}`, { data });

    return res.data;
  } catch (error) {
    return null;
  }
};
