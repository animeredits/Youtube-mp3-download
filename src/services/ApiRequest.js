import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API,
    'X-RapidAPI-Host': import.meta.env.VITE_HOST 
  }
};

const fetch = async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid video ID");
    }

    const response = await axios.request({
      ...requestOptions,
      params: { id }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      status: 500,
      data: { status: "error", message: error.message }
    };
  }
};

export { fetch };
