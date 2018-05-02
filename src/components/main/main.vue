<template>
  <div id='app'>
    <h1>Hello world with Vue</h1>
  </div>
</template>

<script>
let firstScreen = false

export default {
  name: 'app',
  // 如果需要加载接口数据，可以换成updated
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
