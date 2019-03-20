<template>
  <div class="home-b-operation">
    <banner-operation-34 :banner="banners.homeB" />
  </div>
</template>

<script type="text/ecmascript-6">
  import BannerOperation34 from 'components/a-common-comps/banner/banner-operation-34';
  import { banners } from 'components/a-common-comps/banner/constants';

  export default {
    data() {
      return {
        banners,
      };
    },

    components: {
      'banner-operation-34': BannerOperation34,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .home-b-operation
    position absolute
    top: 0
    left 0
    width 100%
    height 100%
</style>
