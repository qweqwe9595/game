<template>
  <div
    class="move1"
    @click="hitMonster"
  >
    <p class="animal-name">{{animal.name}}</p>
    <img
      class="monster"
      :src="animal.img"
      alt=""
    >
  </div>
</template>


<script >
export default {
  props: ["animal"],
  data: () => ({
    speed: 10,
    direction: 1,
    delay: Math.random() * 2000,
  }),

  methods: {
    move() {
      let id = null;
      clearInterval(id);
      id = setInterval(this.frame, this.delay);
    },
    frame(id) {
      let pos = 0;
      if (pos > 100) {
        clearInterval(id);
      } else {
        let height = window.innerHeight;
        let width = window.innerHeight;
        let randomHeight = Math.random() * height;
        let randomWidth = Math.random() * width;
        if (randomHeight >= height + 50 || randomWidth >= width + 50) {
          return;
        }

        this.$el.style.top = randomHeight - 100 + "px";
        this.$el.style.left = randomWidth - 100 + "px";
        pos++;
      }
    },
    hitMonster() {
      this.$emit("hitMonster");
    },
  },
  mounted() {
    let random = Math.random() * 55;
    let random2 = Math.random() * 55;
    this.$el.style.top = random + "%";
    this.$el.style.left = random2 + "%";
    let randomTransition = Math.floor(Math.random() * 3 + 1);
    this.$el.className = `move${randomTransition}`;
    this.move();
  },
};
</script>



<style scoped>
.move1 {
  position: absolute;
  width: 100px;
  transition: all 2s ease-in-out;
}
.move2 {
  position: absolute;
  width: 100px;
  transition: all 2s ease-in-out;
}
.move3 {
  position: absolute;
  width: 100px;
  transition: all 2s ease-in-out;
}
.animal-name {
  text-align: center;
  font: bold;
  color: white;
  font-size: 20px;
}
.monster {
  width: 100px;
  height: 100px;
}
</style>
