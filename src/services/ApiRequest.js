import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  headers: {
    'X-RapidAPI-Key': 'ea5533f125msh7381b88297d175fp1bdaf6jsn100496398d91',
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
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
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: 500,
      data: { status: "error", message: error.message }
    };
  }
};

export { fetch };
