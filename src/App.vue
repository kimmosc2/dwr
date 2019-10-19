<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <LeftBar v-if="name!==''"></LeftBar>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import LeftBar from '@/components/LeftBar'

export default {
  name: 'app',
  data () {
    return {
      name: this.$store.state.names
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.names
    }
  },
  watch: {
    isLogin: function (val) {
      this.name = val
    }
  },
  components: {
    HeaderBar,
    LeftBar
  }
}
</script>

<style>
  body, html {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    min-width: 1200px;
  }
</style>
