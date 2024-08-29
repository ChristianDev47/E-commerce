export async function CountryCodes() {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/all?fields=name,idd,flags,altSpellings`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
