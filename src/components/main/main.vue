<template>
  <div id='app'>
    <h1>Hello world with Vue</h1>
  </div>
</template>

<script>
let firstScreen = false

export default {
  name: 'app',
  mounted: () => {
    if (!firstScreen) {
      firstScreen = true
      window.performanceInfo.firstScreenTime = +new Date()
    }
  }
}
</script>

<style lang='scss'>
@import './main.scss'
</style>
