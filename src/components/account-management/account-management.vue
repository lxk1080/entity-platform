<template>
  <div class="account-management">
    <div class="header">
      <Button @click="entryPage('account-operation', 0, { type: operations.add.id })">新建账户</Button>
    </div>
    <div class="table-list">
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('account-operation', row[idName], { type: operations.edit.id })">编辑</Button>
          <Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>
        </template>
      </Table>
    </div>
    <v-opertions
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      :showActiveBtn="true"
      @handleSelectAll="handleSelectAll"
      @exportData="exportData"
      @deleteSelected="deleteSelected"
      @onPageChange="onPageChange"
      @onActiveClick="onActiveClick"
    />
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import AccountListApis from 'api/accountManagementApis';
  import { tableMixin } from 'common/js/mixins';
  import { operations, colors } from 'common/js/constants';
  import { formatDate } from 'common/js/utils';

  let self = null;

  const userStatus = [
    { id: 1, name: '正常', color: colors.info },
    { id: 2, name: '锁定', color: colors.error },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '用户名',
      key: 'username',
    },
    {
      title: '角色',
      key: 'roleName',
      render: (h, params) => h('span', params.row.roleName || '超级管理员'),
    },
    {
      title: '状态',
      key: 'activated',
      render: (h, params) => self.renderText(h, params, userStatus, 'activated'),
    },
    {
      title: '创建时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
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

    created() {
      self = this;
    },

    data() {
      return {
        apis: AccountListApis,
        idName: 'adminId',
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

      onActiveClick(toggle) {
        this.apis.updateActiveds(this.selectedRowIds, 'id', { activated: toggle ? 2 : 1 }).then(this.errorCallback);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .account-management
    page-base()
    .list-input
      input
        text-align center
</style>
