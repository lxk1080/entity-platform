<template>
  <div class="news-list">
    <div class="header">
      <div class="header-left">
        <Button @click="entryPage('news-operation', 0, { type: operations.add.id } )">新增文章</Button>
        <span style="margin-left: 20px">选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-if="searchType === 1" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <Select v-if="searchType === 2" v-model="keyWords" style="width: 100px">
          <Option v-for="(item, i) in releaselist" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <DatePicker
          v-if="searchType === 3"
          :value="getDate(keyWords)"
          type="daterange"
          format="yyyy-MM-dd"
          placement="bottom-start"
          placeholder="选择日期..."
          style="width: 200px"
          @on-change="(format) => onDateRangeChange(format, 'keyWords')"
        />
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
          <Button size="small" style="margin-right: 5px" @click="entryPage('news-operation', row[idName], { type: operations.edit.id })">编辑</Button>
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
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
  import NewsListApis from 'api/newsListApis';
  import { formatDate } from 'common/js/utils';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { operations, colors } from 'common/js/constants';

  let self = null;

  const searchTypeList = [
    { id: 1, name: '标题' },
    { id: 2, name: '状态' },
    { id: 3, name: '发布时间' },
  ];

  const releaselist = [
    { id: 1, name: '已发布', color: colors.success },
    { id: 2, name: '未发布', color: colors.warn },
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
      key: 'releaseStatus',
      render: (h, params) => self.renderText(h, params, releaselist, 'releaseStatus'),
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
    mixins: [tableMixin, formMixin],

    data() {
      return {
        apis: NewsListApis,
        idName: 'newsId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        operations,
        releaselist,
        columns,
      };
    },

    created() {
      self = this;
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

    watch: {
      searchType() {
        this.keyWords = '';
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
