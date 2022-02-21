import { createStore } from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";
import * as getters from "./getters.js";

const store = createStore({
  state: {
    cityList: localStorage.cityList
      ? JSON.parse(localStorage.cityList)
      : ["Amsterdam", "Istanbul", "London", "Paris", "Rome"],
    cityDetail: {},
    bgUrl: "",
    loading: true,
    weatherForecast: {},
    menuStatus: false,
  },
  getters,
  mutations,
  actions,
});

export default store;
