<template>
  <div class="my-container">
    <span class="money">${{money}}</span>
    <div class="store-container">
      <div
        class="store-chicken"
        @click="buy"
      ><img
          src="../../public/chicken-strip.gif"
          alt=""
        >200$</div>

    </div>
    <objectComponentVue
      v-for="(animal) in animals"
      :key="animal.id"
      :animal="animal"
    />
    <monsterComponentVue
      :animal="monster"
      v-if="monsterAttack"
      @hitMonster="hitMonster"
    />
  </div>

</template>

<script >
import objectComponentVue from "@/component/objectComponent.vue";
import monsterComponentVue from "@/component/monsterComponent.vue";
import { mapGetters } from "vuex";
import store from "@/store/store";

export default {
  data: () => ({
    monsterAttack: false,
    monster: {
      name: "monster",
      heal: 100,
      img: "../../monster.gif",
      money: 10,
    },
    createMonster: null,
    castOut: null,
  }),
  watch: {
    monsterHealth(value) {
      if (value <= 0 && !isNaN(value)) {
        this.monsterAttack = false;
        store.commit("addMoney", this.monster.money);
      }
    },
    animalsLength(value) {
      if (value == 5) {
        alert("win");
      }
    },
  },
  computed: {
    ...mapGetters(["animals", "money", "animalsLength"]),
    monsterHealth() {
      return this.monster.heal;
    },
  },
  methods: {
    hitMonster() {
      this.monster.heal -= store.state.attackPower;
    },
    buy() {
      if (store.state.money < 200) return;
      if (this.animals.filter((item) => item.id == Date.now()).length) return;
      store.commit("addChicken", `chicken${this.animals.length + 1}`);
    },
  },
  mounted() {
    setInterval(() => {
      this.monster.heal = 100;
      this.monsterAttack = true;
    }, 5000);

    this.castOut = setInterval(() => {
      store.commit("addMoney", 50 * this.animalsLength);
    }, 5000);

    this.createMonster = setInterval(function () {
      var monsterObject = document.querySelectorAll(".monster")[0];
      if (!monsterObject) return;
      var monsterHitBox = monsterObject.getBoundingClientRect();
      var animalObject = document.querySelectorAll(".chicken");
      var carRightBound;

      for (var a = 0; a < animalObject.length; a++) {
        carRightBound = animalObject[a].getBoundingClientRect();
        if (
          monsterHitBox.x > carRightBound.x - monsterHitBox.width &&
          monsterHitBox.x < carRightBound.x + carRightBound.width &&
          monsterHitBox.y > carRightBound.y - monsterHitBox.height &&
          monsterHitBox.y < carRightBound.y + carRightBound.height
        ) {
          store.commit("killChicken", animalObject[a].id);
        }
      }
    }, 50);
  },

  unmounted() {
    clearInterval(this.castOut);
    clearInterval(this.createMonster);
  },
  components: { objectComponentVue, monsterComponentVue },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.my-container {
  width: 100vw;
  height: 100vh;
  background: url("../../public/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.money {
  display: block;
  font-size: 30px;
  color: white;
  transform: translate(10px, 10px);
}
.store-chicken {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 100px;
  font-size: 20px;
  color: white;
  cursor: pointer;
}
.store-chicken > img {
  width: 100%;
  height: 100%;
}
</style>