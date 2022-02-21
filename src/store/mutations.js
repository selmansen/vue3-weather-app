export const SET_CITY_LIST = (state, payload) => {
  state.cityList.unshift(payload);
  state.cityList.splice(-1);
  localStorage.setItem("cityList", JSON.stringify(state.cityList));
};
export const GET_CITY_DETAIL = (state, payload) => {
  state.cityDetail = payload;
  localStorage.setItem("cityLon", payload.coord.lon);
  localStorage.setItem("cityLat", payload.coord.lat);
  localStorage.setItem("cityDetail", payload.name);
};
export const GET_BG = (state, payload) => {
  state.bgUrl = payload;
  localStorage.setItem("cityBgUrl", payload);
};
export const SET_LOADING = (state, payload) => {
  state.loading = payload;
};
export const GET_FORECAST = (state, payload) => {
  state.weatherForecast = payload;
};
