export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3456/satisfaction");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postNewData = async (data) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch("http://localhost:3456/satisfaction", options);
    if (!response.ok) {
      throw new Error("Failed to post data");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
