<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import IconFav from "./icons/IcFavorite.vue";
import IconCalendar from "./icons/IcCalendar.vue";
import { createToaster } from "@meforma/vue-toaster";
import { RouterLink } from "vue-router";
const toaster = createToaster({
  position: "top",
  max: 2,
  pauseOnHover: false,
});

export default {
  name: "CitiesList",
  components: {
    IconCalendar,
    IconFav,
    RouterLink,
  },
  setup() {
    const store = useStore();
    const search = ref("");
    const validate = ref(false);
    const cities = computed(() => store.getters.cityList);
    const checkCity = (name) => name === store.getters.cityDetail.name;
    const addFav = () => {
      if (!store.getters.cityList.some(checkCity)) {
        store.dispatch("setCityList", store.getters.cityDetail.name);
        toaster.success(`City added to favorite`);
      } else {
        toaster.warning(`City available in favorites!`);
      }
    };
    const getWeatherInfo = (e) => {
      if (
        store.getters.cityDetail.name.toLowerCase() !==
        e.target.innerHTML.toLowerCase()
      ) {
        store.dispatch("loadingStatus", true);
        store
          .dispatch("getCityDetail", e.target.innerHTML)
          .then(() => {
            store.state.menuStatus = false;
            store.dispatch("getBgUrl", e.target.innerHTML).finally(() => {
              store.dispatch("loadingStatus", false);
            });
          })
          .catch(() => {
            store.dispatch("loadingStatus", false);
          });
      }
    };
    const submit = () => {
      if (
        store.getters.cityDetail.name.toLowerCase() !==
          search.value.toLowerCase() &&
        search.value !== ""
      ) {
        store.dispatch("loadingStatus", true);
        store
          .dispatch("getCityDetail", search.value)
          .then(() => {
            store.state.menuStatus = false;
            store.dispatch("getBgUrl", search.value).finally(() => {
              validate.value = false;
              store.dispatch("loadingStatus", false);
            });
          })
          .catch(() => {
            validate.value = true;
            store.dispatch("loadingStatus", false);
          })
          .finally(() => (search.value = ""));
      }
    };

    return {
      search,
      validate,
      cities,
      addFav,
      getWeatherInfo,
      submit,
    };
  },
};
</script>

<template>
  <div></div>
  <div class="cities__search">
    <input
      class="cities__search-input"
      type="text"
      placeholder="Another location"
      v-model="search"
      v-on:keyup.enter="submit"
      :class="{ error: validate }"
    />
    <div class="cities__search-validate" v-if="validate">
      Enter a valid city name
    </div>
  </div>
  <div class="cities__list">
    <h3 class="cities__list-title">
      Favorite Cities
      <span
        @click="addFav"
        class="cities__list-title--icon"
        title="Add to Favorite"
      >
        <IconFav />
      </span>
    </h3>
    <div class="cities__list-name" v-for="(city, i) in cities" :key="i">
      <h4 @click="getWeatherInfo">{{ city }}</h4>
      <RouterLink
        :to="'/detail/' + city.toLowerCase()"
        class="cities__list-calendar"
      >
        <IconCalendar />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.cities {
  &__search {
    position: relative;
    &-input {
      background: none;
      border: 0;
      border-bottom: 1px solid rgba(#fff, 0.3);
      color: $activeColor;
      padding: 10px 0px 8px 0px;
      outline: none;
      width: 100%;
      font-size: 16px;
      transition: 0.4s;
      &::placeholder {
        color: $colorWhite;
      }
      &:hover {
        border-color: $colorWhite;
      }
      &.error {
        border-color: $error;
      }
    }
    &-validate {
      position: absolute;
      top: 40px;
      font-size: 10px;
      left: 0;
      color: $error;
    }
  }
  &__list {
    margin-top: 30px;
    &-title {
      @include flex(space-between, center);
      height: 18px;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 16px;
      color: $activeColor;
      &--icon {
        cursor: pointer;
        margin-right: -2px;
        svg {
          width: 26px;
          fill: $colorWhite;
        }
      }
    }
    &-name {
      @include flex(space-between, center);
      padding: 6px 0px;
      h4 {
        font-size: 16px;
        cursor: pointer;
        color: $colorWhite;
        transition: 0.4s;
        &:hover {
          color: $activeColor;
        }
      }
    }
    &-calendar {
      cursor: pointer;
      svg {
        fill: $colorWhite;
        width: 22px;
        transition: fill 0.3s;
        &:hover {
          fill: $activeColor;
        }
      }
    }
  }
}
</style>
