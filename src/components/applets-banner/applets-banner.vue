<template>
  <div class="applets-banner">
    <v-banner :banner="banners.applets" />
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
  .applets-banner
    width 100%
    height 100%
</style>
