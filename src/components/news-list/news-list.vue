<template>
  <div class="news-list">
    <div class="header">
      <div class="header-left">
        <Button @click="addData">新增文章</Button>
        <span style="margin-left: 20px">选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
      </div>
      <div class="header-right">
        <Button type="primary" @click="search">立即检索</Button>
      </div>
    </div>
    <div class="table-list">
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="sort">
          <Input class="list-input" v-model="row.sortIndex" style="width: 50px" />
        </template>
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="updateData">编辑</Button>
          <Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>
        </template>
      </Table>
    </div>
    <v-opertions
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="total"
      @handleSelectAll="handleSelectAll"
      @exportData="exportData"
      @deleteSelected="deleteSelected"
      @onPageChange="onPageChange"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  import NewsListApis from 'api/newsListApis';
  import { formatDate } from 'common/js/utils';
  import { tableMixin } from 'common/js/mixins';

  const searchTypeList = [
    { id: 1, name: '标题' },
    { id: 2, name: '状态' },
    { id: 3, name: '发布时间' },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '标题',
      key: 'newsTitle',
    },
    {
      title: '状态',
      key: 'activated',
    },
    {
      title: '发布时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
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

    data() {
      return {
        apis: NewsListApis,
        idName: 'newsId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        columns,
      };
    },

    methods: {
      getData() {
        const data = this.transformArgs([
          'pageSize',
          'pageNum',
          'searchType',
          'keyWords',
        ]);

        this.getDataByCommFunc(data);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .news-list
    page-base()
    .list-input
      input
        text-align center
</style>
