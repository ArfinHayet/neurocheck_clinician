import { domain } from "../../credentials";

const addClinicianAvailabilty = async (obj) => {
  const response = await fetch(`${domain}/availabilities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  return data;
};

const getCinicianAvailabilityById = async (userId) => {
  const response = await fetch(`${domain}/availabilities?userId=${userId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const addClinicianLeave = async (obj) => {
  const response = await fetch(`${domain}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(obj),
  });

  const data = await response.json();
  return data;
};

const getLeavesById = async (userId) => {
  const response = await fetch(`${domain}/leaves?userId=${userId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

const getBillingInfo = async () => {
  const response = await fetch(`${domain}/payment/products`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
};

export {
  addClinicianAvailabilty,
  addClinicianLeave,
  getLeavesById,
  getBillingInfo,
  getCinicianAvailabilityById,
};
