<template>
  <div class="activity-list">
    <div class="header">
      <div class="header-left">
        <Button @click="entryPage('activity-operation', 0, { type: operations.add.id } )">新增活动</Button>
        <span style="margin-left: 20px">选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-if="searchType === 1" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <DatePicker
          v-if="searchType === 2"
          :value="getDate(keyWords)"
          type="daterange"
          format="yyyy-MM-dd"
          placement="bottom-start"
          placeholder="选择日期..."
          style="width: 200px"
          @on-change="(format) => onDateRangeChange(format, 'keyWords')"
        />
        <Select v-if="searchType === 3" v-model="keyWords" style="width: 100px" @on-change="onSearchChange">
          <Option v-for="(item, i) in activateds" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="header-right">
        <Button type="primary" @click="search">立即检索</Button>
      </div>
    </div>
    <div class="table-list">
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="enrollList">
          <div class="btn-a" size="small" @click="entryPage('enroll-list', row[idName])">点击查看</div>
        </template>
        <!--<template slot-scope="{ row }" slot="sort">
          <Input class="list-input" v-model="row.sortIndex" style="width: 50px" @on-blur="onSortBlur(row[idName], row.sortIndex)" />
        </template>-->
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('activity-operation', row[idName], { type: operations.edit.id })">编辑</Button>
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
  import ActivityListApis from 'api/activityListApis';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { formatDate } from 'common/js/utils';
  import { operations } from 'common/js/constants';

  // 用来获取vue实例供外部使用
  let self = null;

  const searchTypeList = [
    { id: 1, name: '活动标题' },
    { id: 2, name: '发布时间' },
    { id: 3, name: '状态' },
  ];

  const activateds = [
    { id: 1, name: '已发布' },
    { id: 2, name: '未发布' },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '活动标题',
      key: 'activityTitle',
    },
    {
      title: '发布时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
    },
    {
      title: '状态',
      key: 'activated',
      render: (h, params) => self.renderText(h, params, activateds, 'activated'),
    },
    {
      title: '发布人',
      key: 'adminName',
    },
    {
      title: '报名列表',
      width: 200,
      align: 'center',
      slot: 'enrollList',
    },
    /*{
      title: '排序',
      key: 'sortIndex',
      align: 'center',
      slot: 'sort',
    },*/
    {
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
  ];

  export default {
    mixins: [tableMixin, formMixin],

    data: () => ({
      apis: ActivityListApis,
      idName: 'activityId',
      operations,
      searchTypeList,
      activateds,
      searchType: searchTypeList[0].id,
      columns,
    }),

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

      onSearchChange() {
        this.getData();
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
  @import "~common/stylus/variable";

  .activity-list
    page-base()
    .list-input
      input
        text-align center
    .btn-a
      color: $tag-a
      cursor pointer
      &:hover
        color $tag-a-hover
</style>
