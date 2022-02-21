<script>
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";

export default {
  name: "DetailPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const forecast = computed(() => store.getters.weatherForecast.daily);
    store.dispatch("loadingStatus", true);

    store
      .dispatch("getCityDetail", route.params.city)
      .then(() => {
        store.dispatch(
          "getWeatherForecast",
          `${localStorage.cityLat}/${localStorage.cityLon}`
        );
        store.dispatch("getBgUrl", route.params.city).finally(() => {
          store.dispatch("loadingStatus", false);
        });
      })
      .catch(() => {
        router.push("/");
      });
    return {
      forecast,
      moment,
    };
  },
};
</script>
<template>
  <div class="forecast">
    <h3 class="forecast-title">Weekly Forecast</h3>
    <div class="forecast-item forecast-heading">
      <div class="forecast-item--day">Day</div>
      <div>Mood</div>
      <div class="forecast-item--minmax">Min / Max</div>
      <div>Feels</div>
      <div>Humidity</div>
    </div>

    <div class="forecast-item" v-for="(city, index) in forecast" :key="index">
      <template v-if="index < 7">
        <div class="forecast-item--day">
          {{ moment.unix(city.dt).format("ddd") }}
        </div>
        <div>
          <img
            class="forecast--icon"
            :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
          />
        </div>
        <div class="forecast-item--minmax">
          {{ Math.round(city.temp.min) + " / " + Math.round(city.temp.max) }}
        </div>
        <div>{{ Math.round(city.feels_like.day) }}</div>
        <div>{{ city.humidity }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.forecast {
  &-title {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 16px;
    color: $activeColor;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(#fff, 0.3);
  }
  &-item {
    @include flex(space-between, center);
    padding: 6px 0px;
    color: $colorWhite;
    & > div {
      width: 15%;
      text-align: center;
    }
    &--day {
      text-align: left !important;
      color: $activeColor;
      font-weight: 600;
    }
    &--minmax {
      width: 30% !important;
    }
  }
  &-heading {
    color: $activeColor;
  }
  &--icon {
    width: 40px;
    height: auto;
    margin: -5px -3px -8px;
  }
}
</style>
