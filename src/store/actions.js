import axios from "axios";

const config = {
  weather: {
    url: "https://api.openweathermap.org/data/2.5/",
    apikey: "fa992d2e35242c834a1d8d8f2fa2402e",
    lang: "en",
    units: "metric",
  },
  unsplash: {
    url: "https://api.unsplash.com/search/photos?",
    apikey: "Kuy44fFrY0dKp8W6kE-yERu4zDB8adwpgwznhx72Z1c",
    orientation: "landscape",
    page: "1",
    per_page: "1",
  },
};
export const setCityList = ({ commit }, payload) => {
  commit("SET_CITY_LIST", payload);
};
export const getCityDetail = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${config.weather.url}weather?q=${payload}&appid=${config.weather.apikey}&lang=${config.weather.lang}&units=${config.weather.units}`
      )
      .then((response) => {
        resolve(response);
        commit("GET_CITY_DETAIL", response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getBgUrl = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${config.unsplash.url}query=${payload}&page=${config.unsplash.page}&per_page=${config.unsplash.per_page}&orientation=${config.unsplash.orientation}&client_id=${config.unsplash.apikey}`
      )
      .then((response) => {
        resolve(response);
        commit("GET_BG", response.data.results[0].urls.regular);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const loadingStatus = ({ commit }, payload) => {
  commit("SET_LOADING", payload);
};
export const getWeatherForecast = ({ commit }, payload ) => {
  const coord = payload.split("/")
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${config.weather.url}onecall?lat=${coord[0]}&lon=${coord[1]}&appid=${config.weather.apikey}&lang=${config.weather.lang}&units=${config.weather.units}&exclude=hourly,minutely`
      )
      .then((response) => {
        resolve(response);
        commit("GET_FORECAST", response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
