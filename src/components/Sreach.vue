<template>
  <div>
    <div class="container">
      <i-input v-model="sreachData"  size="large" class="sreach" @on-enter="sreach" placeholder="输入你想查找的商品">
        <Button slot="prepend" icon="ios-search" @click="sreach">搜索</Button>
      </i-input>
      <!-- <Tag v-for="(item, index) in promotionTags" :key="index" closable  @on-close="closeTags(index)"><span @click="selectTags(index)">{{item}}</span></Tag> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Sreach",
  data() {
    return {
      sreachData: "",
      promotionTags: [
        "买2免1",
        "领200神券",
        "199减100",
        "母婴5折抢",
        "充100送20"
      ]
    };
  },
  methods: {
    closeTags(index) {
      this.promotionTags.splice(index, 1);
    },
    selectTags(index) {
      this.sreachData = this.promotionTags[index];
    },
    sreach() {
      this.$router.push({
        path: "/goodsList",
        query: { sreachItem: this.sreachData, ...this.$route.query }
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 900px;
}
.sreach {
  margin: 5px 0px;
}
</style>
<style>
.sreach input {
  background-color: #33bbff;
  color: #fff;
}
.sreach input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #fff;
}
.sreach input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}
.sreach input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
.sreach input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #fff;
}
</style>

