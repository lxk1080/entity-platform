<template>
  <div class="authority-management">
    <div class="table-list">
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('authority-operation', row[idName], { type: operations.edit.id })">编辑</Button>
        </template>
      </Table>
    </div>
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import AuthorityApis from 'api/AuthorityApis';
  import { tableMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';

  const columns = [
    {
      title: '角色',
      key: 'roleName',
      align: 'center',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
  ];

  export default {
    mixins: [tableMixin],

    data() {
      return {
        apis: AuthorityApis,
        idName: 'roleId',
        operations,
        columns,
      };
    },

    methods: {
      getData() {
        const data = this.transformArgs([
          'pageSize',
          'pageNum',
        ]);

        this.getDataByCommFunc(data);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .authority-management
    page-base()
</style>
