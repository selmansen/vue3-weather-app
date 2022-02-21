<script>
import { useStore } from "vuex";
import { RouterView } from "vue-router";
import { computed } from "vue";
import moment from "moment";

export default {
  name: "App",
  components: {
    RouterView,
  },
  setup() {
    const store = useStore();
    const logo = "Weather App";
    const menuStatus = computed(() => store.getters.menuStatus);
    const loading = computed(() => store.getters.loading);
    const cityBgUrl = computed(
      () => store.getters.bgUrl || localStorage.cityBgUrl
    );
    const city = computed(() => store.getters.cityDetail);
    const dateMoment = computed(() =>
      moment.unix(city.value.dt).format("H:mm - dddd, DD MMM YY")
    );
    const handleMenu = () => (store.state.menuStatus = !store.state.menuStatus);

    store.dispatch(
      "getCityDetail",
      localStorage.cityDetail || store.state.cityList[0]
    );
    if (localStorage.cityBgUrl) {
      setTimeout(() => {
        store.dispatch("loadingStatus", false);
      }, 1500);
    } else {
      store.dispatch("getBgUrl", store.state.cityList[0]).finally(() => {
        setTimeout(() => {
          store.dispatch("loadingStatus", false);
        }, 1500);
      });
    }

    return {
      logo,
      menuStatus,
      handleMenu,
      city,
      cityBgUrl,
      dateMoment,
      loading,
    };
  },
};
</script>

<template>
  <Transition><div v-if="loading" class="loading"></div></Transition>
  <header>
    <div class="container">
      <h1>
        <a href="/" class="logo">{{ logo }}</a>
      </h1>
      <div :class="{ active: menuStatus }" @click="handleMenu" class="menu">
        <i></i>
      </div>
    </div>
  </header>
  <main :style="{ 'background-image': 'url(' + cityBgUrl + ')' }">
    <div class="container">
      <div class="city">
        <div class="city-temp" v-if="city.main">
          {{ `${Math.round(city.main.temp)}` }}
        </div>
        <div>
          <h2 class="city-name">{{ city.name }}</h2>
          <h3>{{ dateMoment }}</h3>
        </div>
        <div class="city-weather">
          <img
            v-if="city.weather"
            class="icon"
            :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
            width="100"
            height="100"
          />
          <h4 v-if="city.weather">{{ city.weather[0].description }}</h4>
        </div>
      </div>
    </div>
    <div :class="{ active: menuStatus }" class="cities">
      <div class="cities-scroll">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "@/assets/variables.scss";
@import "@/assets/base.scss";

.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background: url("@/assets/images/loading.gif") no-repeat center center #33495f;
  background-size: 500px;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 100px;
  @include flex(space-between, center);
  @media screen and(max-width :$container_xl) {
    .container {
      max-width: 100%;
    }
  }
}
.logo {
  @include flex(null, center);
  color: #fff;
  font-size: 30px;
  letter-spacing: -1px;
  font-weight: 700;
}
.menu {
  @media (max-width: $container_xl) {
    cursor: pointer;
    height: 10px;
    padding: 17px 15px;
    position: relative;
    width: 30px;
    z-index: 100;
    &:before,
    &:after,
    i {
      background: #fff;
      content: "";
      height: 2px;
      position: absolute;
      right: 0;
      top: 16px;
      transition: 0.4s;
      width: 25px;
    }
    &:before {
      top: 8px;
    }
    &:after {
      top: 24px;
    }
    i {
      width: 21px;
    }
    &.active {
      i {
        width: 0;
      }
      &:before {
        transform: rotate(225deg);
        top: 16px;
      }
      &:after {
        transform: rotate(-225deg);
        top: 16px;
      }
    }
  }
}

main {
  min-height: 100vh;
  display: flex;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center 25%;
  background-size: cover;
  transition: background 0.4s;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    background: -webkit-linear-gradient(#34495f, transparent);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    @media screen and(max-width: $container_xl) {
      background: -webkit-linear-gradient(#34495f, rgb(0 0 0 / 25%));
    }
  }
}
.container {
  @include flex(space-between, flex-start);
}

.city {
  @include flex(null, center);
  padding: 150px 0 0;
  @media screen and(max-width:$container_xl) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  & > div {
    margin-right: 20px;
    @media screen and(max-width:$container_xl) {
      margin-right: 0px;
    }
  }
  &-temp {
    font-size: 120px;
    font-weight: 700;
    letter-spacing: -8px;
    &:after {
      content: "°";
      font-size: 80px;
      font-weight: 400;
      vertical-align: top;
    }
  }
  &-name {
    font-size: 40px;
    margin-bottom: 5px;
  }
  &-weather {
    @media screen and(max-width:$container_xl) {
      margin-top: 20px;
    }
    img {
      margin-top: -31px;
      margin-bottom: -20px;
    }
    h4 {
      text-align: center;
      text-transform: capitalize;
    }
  }
}
.cities {
  position: absolute;
  max-width: 500px;
  width: 100%;
  right: 0;
  z-index: 11;
  height: 100%;
  min-height: 391px;
  padding: 30px;
  background: rgba(32, 46, 60, 0.7);
  backdrop-filter: blur(10px);
  transition: max-width 0.4s, transform 0.4s;
  @media screen and(max-width:$container_xl) {
    transform: translateX(100%);
    background: rgba(32, 46, 60, 0.9);
    padding: 100px 0px 15px;
    z-index: 5;
    &.active {
      transform: translateX(0);
    }
  }
  @media screen and(max-width:$container_md){
    max-width: 100%;
  }

  &-scroll {
    height: 100%;
    overflow-x: auto;
    padding: 0 15px;
    /* width */
    &::-webkit-scrollbar {
      width: 7px;
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #18212b;
      transition: background 0.4s;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #33495f;
    }
  }
}

.v-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
