<template>
  <div class="move1">
    <p class="animal-name">{{animal.name}}</p>
    <img
      :id="animal.id"
      class="chicken"
      :src="animal.img"
      alt=""
    >
  </div>
</template>


<script >
export default {
  props: ["animal"],
  data: () => ({
    delay: Math.random() * 3000 + 500,
    pos: 0,
    id: null,
  }),

  methods: {
    move() {
      clearInterval(this.id);
      this.id = setInterval(this.frame, this.delay);
    },
    frame(id) {
      if (this.pos > 100) {
        clearInterval(id);
      } else {
        let height = window.innerHeight;
        let width = window.innerHeight;
        let randomHeight = Math.random() * height;
        let randomWidth = Math.random() * width;
        let position = this.$el.getBoundingClientRect();
        if (position.y + randomHeight < height - 25) {
          this.$el.style.top = randomHeight + "px";
        }
        if (position.x + randomWidth < width - 25) {
          this.$el.style.left = randomWidth + "px";
        }
      }
    },
  },
  mounted() {
    this.$el.style.top = "0";
    this.$el.style.left = "0";
    let randomTransition = Math.floor(Math.random() * 3 + 1);
    this.$el.className = `move${randomTransition}`;
    this.move();
  },
  unmounted() {
    clearInterval(this.id);
  },
};
</script>



<style scoped>
.move1 {
  position: absolute;
  width: 50px;
  transition: all 5s ease-in-out;
  top: 0;
  left: 0;
}
.move2 {
  position: absolute;
  width: 50px;
  transition: all 1s ease-in-out;
  top: 0;
  left: 0;
}
.move3 {
  position: absolute;
  width: 50px;
  transition: all 3s ease-in-out;
  top: 0;
  left: 0;
}
.animal-name {
  text-align: center;
  font: bold;
  color: white;
  font-size: 20px;
}
.chicken {
  width: 50px;
  height: 50px;
}
</style>
