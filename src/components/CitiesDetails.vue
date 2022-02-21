<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "CitiesDetail",
  setup() {
    const store = useStore();
    const title = "Weather Details";
    const cityDetail = computed(() => store.getters.cityDetail.main);

    return {
      title,
      cityDetail,
    };
  },
};
</script>

<template>
  <div class="cities__details">
    <h3 class="cities__details-title">{{ title }}</h3>
    <div
      class="cities__details-item"
      v-for="(value, name) in cityDetail"
      :key="name"
    >
      <div class="cities__details-info">{{ name.replace("_", " ") }}</div>
      <div class="cities__details-val">
        {{ Math.round(value) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.cities {
  &__details {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid rgba(#fff, 0.3);
    &-title {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 16px;
      color: $activeColor;
    }
    &-item {
      @include flex(space-between, center);
      padding: 10px 0px;
      color: $colorWhite;
      transition: 0.4s;
      text-transform: capitalize;
    }
  }
}
</style>
