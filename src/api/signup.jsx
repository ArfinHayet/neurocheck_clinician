
import { domain } from "../../credentials";

const sendOtp = async (obj) => {
  // ////console.log("hello series", obj);

  const response = await fetch(`${domain}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  //console.log("data", data);

  return data;
};



const verift_otp = async (obj) => {
  // ////console.log("hello series", obj);

  const response = await fetch(`${domain}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  //console.log("data", data);

  return data;
};


const signupuser = async (obj) => {
  // ////console.log("hello series", obj);

  const response = await fetch(`${domain}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  //console.log("data", data);

  return data;
};
const loginuser = async (obj) => {
  // ////console.log("hello series", obj);

  const response = await fetch(`${domain}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  //console.log("data", data);

  return data;
};

const resetPasswordByEmail = async (obj) => {
  const response = await fetch(`${domain}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  return data;
};


// const deleteSeries = async (obj) => {
//   const response = await fetch(`${domain}/api/series`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(obj),
//   });

//   const data = await response.json();
//   return data;
// };

export { sendOtp, verift_otp , signupuser , loginuser, resetPasswordByEmail };
