export const formatDate = (date: Date) => {
  const formattedDate = new Date(date);
  const newDate = `${formattedDate.getDate()} de ${formattedDate.toLocaleString(
    "es",
    { month: "short" }
  )}.`;
  return newDate;
};

export const formatNormalDate = (date: Date) => {
  const formattedDate = new Date(date);
  return `${formattedDate.getDate()} de ${formattedDate.toLocaleString("es", {
    month: "short",
  })}. ${formattedDate.getFullYear()}`;
};

export const formatFinalDate = (date: Date) => {
  const finalDate = new Date(date);
  finalDate.setDate(finalDate.getDate() + 7);
  const formattedDate = new Date(finalDate);
  return `${formattedDate.getDate()} de ${formattedDate.toLocaleString("es", {
    month: "short",
  })}. ${formattedDate.getFullYear()}`;
};

export function validateDueDate(date: string) {
  const myDate = new Date();
  const [mesStr, añoStr] = date.split("/");
  const fechaDada = new Date(parseInt(añoStr, 10), parseInt(mesStr, 10) - 1, 1);
  return fechaDada > myDate;
}
