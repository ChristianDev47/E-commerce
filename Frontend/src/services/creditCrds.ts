type CardType =
  | "Visa"
  | "MasterCard"
  | "Discover"
  | "American Express"
  | "Unknown";

export const detectCardType = (cardNumber: string): CardType => {
  // Elimina cualquier espacio en blanco
  const trimmedCardNumber = cardNumber.replace(/\s/g, "");
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(trimmedCardNumber)) {
    return "Visa";
  } else if (/^5[1-5][0-9]{14}$/.test(trimmedCardNumber)) {
    return "MasterCard";
  } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(trimmedCardNumber)) {
    return "Discover";
  } else if (/^3[47][0-9]{13}$/.test(trimmedCardNumber)) {
    return "American Express";
  } else {
    return "Unknown";
  }
};
