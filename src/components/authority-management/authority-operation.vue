<template>
  <div class="authority-operation">
    <Tree :data="data" show-checkbox multiple />
  </div>
</template>

<script type="text/ecmascript-6">
  import AuthorityApis from 'api/AuthorityApis';

  export default {
    data() {
      return {
        apis: AuthorityApis,
        idName: 'roleId',
        data: [
          {
            title: 'parent-1',
            children: [
              { title: 'child-1-1' },
              { title: 'child-1-2' },
            ],
          },
          {
            title: 'parent-2',
            children: [

            ],
          },
        ],
      };
    },

    created() {
      this.apis.getAuthorityList({ pageSize: 1000, pageNum: 1 }).then(res => {
        // ...
      });
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .authority-operation
    layout-absolute()
    card-style()
</style>
