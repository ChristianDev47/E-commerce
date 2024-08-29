import Cookies from "js-cookie";
const API = "https://ecommerce-api-k49h.onrender.com";

export const getOrders = async () => {
  const res = await fetch(`${API}/api/v1/orders/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("Authorization")}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data.results;
};

export async function CreateOrder({ order }: { order: Order }) {
  try {
    const response = await fetch(`${API}/api/v1/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
      credentials: "include",
      body: JSON.stringify(order),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function updateOrder({
  id,
  newData,
}: {
  id?: number;
  newData: Order;
}) {
  try {
    const response = await fetch(`${API}/api/v1/orders/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
      credentials: "include",
      body: JSON.stringify(newData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
