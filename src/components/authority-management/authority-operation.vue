<template>
  <div class="authority-operation">
    <div class="header">
      <div class="left">
        角色名：<Input v-model="roleName" placeholder="Enter something..." style="width: 200px" />
      </div>
    </div>
    <Tree class="tree" :data="data" show-checkbox multiple @on-check-change="onCheckChange" />
    <div class="footer">
      <Button @click="onReturn">返回</Button>
      <Button type="primary" @click="onUpdate">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import AuthorityApis from 'api/AuthorityApis';
  import { ERR_OK } from 'api/common';

  export default {
    data() {
      return {
        apis: AuthorityApis,
        idName: 'roleId',
        roleName: '',
        data: [],
        activeIds: '',
      };
    },

    async created() {
      await this.apis.getList({ pageSize: 100, pageNum: 1 }).then(res => {
        if (res.code === ERR_OK) {
          const curRole = res.result.find(item => item.roleId === parseInt(this.$route.params.id));
          this.roleName = curRole.roleName;
          this.activeIds = curRole.authorityIds;
        }
      });

      this.apis.getAuthorityList({ pageSize: 1000, pageNum: 1 }).then(res => {
        if (res.code === ERR_OK) {
          const result = res.result.slice(0, 7);

          result.forEach(item_1 => {
            item_1.title = item_1.description;
            item_1.children = item_1.childAuthorityList;
            this.check(item_1);

            item_1.children.forEach(item_2 => {
              item_2.title = item_2.description;
              item_2.children = item_2.childAuthorityList;
              this.check(item_2);

              if (Array.isArray(item_2.children)) {
                item_2.children.forEach(item_3 => {
                  item_3.title = item_3.description;
                  item_3.children = item_3.childAuthorityList;
                  this.check(item_3);
                });
              }
            });
          });

          this.data = result;
        }
      });
    },

    methods: {
      check(item) {
        if (this.activeIds.split(',').includes(item.authorityId + '')) {
          item.checked = true;
        }
      },

      onCheckChange(arr, cur) {
        this.activeIds = arr.map(item => item.authorityId).join(',');
      },

      onReturn() {
        this.$router.back();
      },

      onUpdate() {
        this.apis.updateAuthority({
          roleId: this.$route.params.id,
          roleName: this.roleName,
          authorityIds: this.activeIds,
        }).then(res => {
          if (res.code !== ERR_OK) {
            this.$Message.error(res.message);
            return;
          }

          this.$Message.success(res.message);
        });
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .authority-operation
    layout-absolute()
    card-style()
    .tree
      margin-top 30px
    .footer
      margin-top 30px
</style>
