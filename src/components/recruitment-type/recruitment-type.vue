<template>
  <div class="recruitment-type">
    <!--<div class="header">
      <Button @click="entryPage('recruitment-operation', 0, { type: operations.add.id })">新建账户</Button>
    </div>-->
    <div class="table-list">
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="icon">
          <Avatar class="avatar" size="large" :src="row.professionIcon || 'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
        </template>
        <template slot-scope="{ row }" slot="sort">
          <Input class="list-input" v-model="row.sortIndex" style="width: 50px" @on-blur="onSortBlur(row[idName], row.sortIndex)" />
        </template>
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('recruitment-operation', row[idName], { type: operations.edit.id })">编辑</Button>
          <!--<Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>-->
        </template>
      </Table>
    </div>
    <v-opertions
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      :showExport="false"
      :showDelete="false"
      @handleSelectAll="handleSelectAll"
      @exportData="exportData"
      @deleteSelected="deleteSelected"
      @onPageChange="onPageChange"
    />
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import recruitmentTypeApis from 'api/recruitmentTypeApis';
  import { tableMixin } from 'common/js/mixins';
  import { operations, recruitTypeList } from 'common/js/constants';

  let self = null;

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '图标',
      key: 'professionIcon',
      align: 'center',
      slot: 'icon',
    },
    {
      title: '名称',
      key: 'professionName',
    },
    {
      title: '所属分类',
      key: 'recruitType',
      render: (h, params) => self.renderText(h, params, recruitTypeList, 'recruitType'),
    },
    {
      title: '排序',
      key: 'sortIndex',
      align: 'center',
      slot: 'sort',
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
        apis: recruitmentTypeApis,
        idName: 'professionId',
        recruitTypeList,
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

  .recruitment-type
    page-base()
</style>
