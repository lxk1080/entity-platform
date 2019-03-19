<template>
  <div class="home-m-operation">
    <banner-operation-34 :banner="banners.homeM" />
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

  .home-m-operation
    width 100%
    height 100%
</style>
