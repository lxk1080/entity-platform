<template>
  <div class="sites-operation">
    <banner-operation-12 :banner="banners.sites" />
  </div>
</template>

<script type="text/ecmascript-6">
  import BannerOperation12 from 'components/a-common-comps/banner/banner-operation-12';
  import { banners } from 'components/a-common-comps/banner/constants';

  export default {
    data() {
      return {
        banners,
      };
    },

    components: {
      'banner-operation-12': BannerOperation12,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .sites-operation
    position absolute
    top: 0
    left 0
    width 100%
    height 100%
</style>
