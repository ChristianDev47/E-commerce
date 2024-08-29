import Cookies from "js-cookie";
import { CreatePaymentCardType } from "../types/paymentCard";
const API = "https://ecommerce-api-k49h.onrender.com";

export const getPaymentCards = async () => {
  const res = await fetch(`${API}/api/v1/payment_cards/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("Authorization")}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data.results;
};

export async function CreatePaymentCard({
  paymentCard,
}: {
  paymentCard: CreatePaymentCardType;
}) {
  try {
    const response = await fetch(`${API}/api/v1/payment_cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },
      credentials: "include",
      body: JSON.stringify(paymentCard),
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

export async function updatePaymentCard({
  id,
  newData,
}: {
  id?: number;
  newData: CreatePaymentCardType;
}) {
  try {
    const response = await fetch(`${API}/api/v1/payment_cards/${id}/`, {
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
