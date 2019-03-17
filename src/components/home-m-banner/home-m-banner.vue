<template>
  <div class="home-m-banner">
    <v-banner :banner="banners.homeM" />
  </div>
</template>

<script type="text/ecmascript-6">
  import Banner from 'components/a-common-comps/banner/banner';
  import { banners } from 'components/a-common-comps/banner/constants';

  export default {
    data() {
      return {
        banners,
      };
    },

    components: {
      'v-banner': Banner,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-m-banner
    width 100%
    height 100%
</style>
