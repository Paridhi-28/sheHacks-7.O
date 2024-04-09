import axios from "./axios";

export const TPCDataY = async (req) => {
  const getTPCDataURL = "api/data/TPCPerY";
  const cookies = req.cookies.refresh_jwt;
  try {
    const response = await axios.get(getTPCDataURL, {
      withCredentials: true,
      headers: {
        cookies: cookies,
      },
    }); // Update the API endpoint
    const crimeData = response.data;
    // console.log(crimeData)
    return crimeData;
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        crimeData: [],
      },
    };
  }
};

export const CrimesPerYearByCategory = async (req) => {
  const getCrimesPerYearByCategory = "api/data/TPCPerYearByCategory";
  const cookies = req.cookies.refresh_jwt;
  try {
    const response = await axios.get(getCrimesPerYearByCategory, {
      withCredentials: true,
      headers: {
        cookies: cookies,
      },
    }); // Update the API endpoint
    const crimeData = response.data;
    // console.log(crimeData)
    return crimeData;
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        crimeData: [],
      },
    };
  }
};

export default { TPCDataY, CrimesPerYearByCategory };
