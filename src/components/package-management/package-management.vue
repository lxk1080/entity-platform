<template>
  <div class="package-management">
    <div class="header">
      <div class="header-left">
        <Button @click="entryPage('package-operation', 0, { type: operations.add.id } )">新增套餐</Button>
      </div>
    </div>
    <div class="table-list">
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('package-operation', row[idName], { type: operations.edit.id })">编辑</Button>
          <Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>
        </template>
      </Table>
    </div>
    <v-opertions
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      :showExport="false"
      @handleSelectAll="handleSelectAll"
      @exportData="exportData"
      @deleteSelected="deleteSelected"
      @onPageChange="onPageChange"
    />
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import PackageManagementApis from 'api/packageManagementApis';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '套餐名称',
      key: 'mealName',
    },
    {
      title: '价格（元）',
      key: 'mealPrice',
    },
    {
      title: '报名单数量（份）',
      key: 'entryNum',
    },
    {
      title: '购买数量',
      key: 'countMeal',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
  ];

  export default {
    mixins: [tableMixin, formMixin],

    data() {
      return {
        apis: PackageManagementApis,
        idName: 'combinedMealId',
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

  .package-management
    page-base()
</style>
