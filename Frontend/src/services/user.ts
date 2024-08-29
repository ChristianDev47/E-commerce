import {
  CreateUser,
  EditPasswordType,
  EditUserAddress,
  EditUserType,
  LoginType,
  UserPhoneNumberEdit,
} from "../types/user";
import Cookies from "js-cookie";
const API = "https://ecommerce-api-k49h.onrender.com";

export async function LoginUser({ login }: { login: LoginType }) {
  try {
    const response = await fetch(`${API}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
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

export async function Logout({ refresh_token }: { refresh_token: object }) {
  try {
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 2000));
    await fetch(`${API}/api/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("Authorization")}`,
      },

      credentials: "include",
      body: JSON.stringify(refresh_token),
    });
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch logout.");
  }
}

export async function CreateAcount({ user }: { user: CreateUser }) {
  try {
    const response = await fetch(`${API}/api/v1/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

export async function findUser({ id }: { id?: number }) {
  const response = await fetch(`${API}/api/v1/users/${id}`);
  const data = await response.json();
  return data;
}

export async function updateUser({
  id,
  newData,
}: {
  id?: number;
  newData: EditUserType;
}) {
  try {
    const response = await fetch(`${API}/api/v1/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function CreateAccountPhoneNumber({
  user,
}: {
  user: UserPhoneNumberEdit;
}) {
  try {
    const response = await fetch(`${API}/api/v1/user-phone-numbers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

export async function UpdateUserPassword({
  passwordData,
}: {
  passwordData: EditPasswordType;
}) {
  try {
    const response = await fetch(`${API}/api/v1/user-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
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

export async function AddAddressUser({
  Address,
}: {
  Address: EditUserAddress;
}) {
  try {
    const response = await fetch(`${API}/api/v1/user-addresses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Address),
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

export async function UpdateAddressUser({
  id,
  newData,
}: {
  id?: number;
  newData: EditUserAddress;
}) {
  try {
    const response = await fetch(`${API}/api/v1/user-addresses/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function DeleteAddressUser({ id }: { id: number }) {
  try {
    const response = await fetch(`${API}/api/v1/user-addresses/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return { success: true, message: "Address deleted successfully" };
    } else {
      const errorData = await response.json();
      throw new Error(
        `Error deleting address: ${errorData.detail || response.statusText}`
      );
    }
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to delete address.");
  }
}
