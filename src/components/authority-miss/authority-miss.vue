<template>
  <div class="authority-miss">
    对比起，您当前没有查看的权限！！！
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .authority-miss
    page-base()
    color red
</style>
