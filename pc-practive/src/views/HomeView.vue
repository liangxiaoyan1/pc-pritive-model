<template>
  <div class="home">
    <el-button type="danger">{{ msg }}</el-button>
    <img alt="Vue logo"
         src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      msg: "这是一个测试element-ui",
    }
  },
}
</script>
