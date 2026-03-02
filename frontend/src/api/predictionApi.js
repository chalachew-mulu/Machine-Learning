const BASE_URL = import.meta.env.VITE_API_URL;

export const getPrediction = async (data) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
};