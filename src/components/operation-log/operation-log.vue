<template>
  <div class="operation-log">
    <div class="table-list">
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>
        </template>
      </Table>
    </div>
    <v-opertions
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
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
  import OperationLogApis from 'api/OperationLogApis';
  import { tableMixin } from 'common/js/mixins';
  import { formatDate } from 'common/js/utils';

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '操作用户',
      key: 'adminName',
    },
    {
      title: '操作内容',
      key: 'operation',
    },
    {
      title: '操作时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd hh:mm')),
    },
    /*
    {
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
    */
  ];

  export default {
    mixins: [tableMixin],

    data() {
      return {
        apis: OperationLogApis,
        idName: 'logId',
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

  .operation-log
    page-base()
</style>
