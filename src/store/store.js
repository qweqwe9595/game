import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    money: 200,
    attackPower: 50,
    animals: [],
  },

  getters: {
    animals: (state) => state.animals,
    money: (state) => state.money,
    animalsLength: (state) => state.animals.length,
  },
  mutations: {
    addChicken(state, name) {
      state.money -= 200;
      state.animals.push({
        id: Date.now(),
        name,
        img: "../../chicken-strip.gif",
      });
    },
    addMoney(state, money) {
      state.money += money;
    },
    killChicken(state, AnimalName) {
      console.log(AnimalName);
      state.animals = state.animals.filter((item) => item.id != AnimalName);
    },
  },
});

export default store;
