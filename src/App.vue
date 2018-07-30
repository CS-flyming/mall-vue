<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/header/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>
<style scoped>
#app {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

