<template>
  <div class="recruitment-list">
    <div class="header">
      <div class="header-left">
        <span>招聘类型：</span>
        <Select v-model="recruitmentType" style="width: 100px">
          <Option v-for="(type, i) in recruitmentTypeList" :value="type" :key="i">{{ type }}</Option>
        </Select>
        <span style="margin-left: 20px">选择筛选条件：</span>
        <Select v-model="filterCondition" style="width: 100px">
          <Option v-for="(condition, i) in filterConditionList" :value="condition" :key="i">{{ condition }}</Option>
        </Select>
        <Input v-model="searchValue" placeholder="Enter something..." style="width: 200px" />
      </div>
      <div class="header-right">
        <Button type="primary" @click="search">立即检索</Button>
      </div>
    </div>
    <div class="table-list">
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row, column, index }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="pause()">暂停</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="deleteSingle()">删除</Button>
          <Button type="warning" size="small" @click="entryDetail()">详情</Button>
        </template>
      </Table>
    </div>
    <div class="opertions">
      <div class="opertions-left">
        <Button @click="handleSelectAll(true)">设置全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Button @click="exportData">导出</Button>
        <Button @click="deleteSelected">删除</Button>
      </div>
      <div class="opertions-right">
        <Page
          :current="currentPage"
          :total="total"
          :page-size="pageSize"
          @on-change="onPageChange"
          show-total
        />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { tableMixin } from 'common/js/mixins';

  const recruitmentTypeList = ['实习招聘', '兼职招聘'];
  const filterConditionList = ['发布人', '岗位标题', '岗位类型', '招聘周期', '发布时间', '状态'];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '岗位标题',
      key: 'username',
    },
    {
      title: '岗位类型',
      key: 'username',
    },
    {
      title: '发布人',
      key: 'username',
    },
    {
      title: '投递人数',
      key: 'username',
    },
    {
      title: '状态',
      key: 'username',
    },
    {
      title: '发布时间',
      key: 'username',
    },
    {
      title: '招聘周期',
      key: 'username',
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      alot: 'operation',
    },
  ];

  const vm = {
    mixins: [tableMixin],

    data: () => ({
      recruitmentType: recruitmentTypeList[0],
      recruitmentTypeList,
      filterCondition: filterConditionList[0],
      filterConditionList,
      searchValue: '',
      columns,
    }),

    methods: {
      search() {

      },

      pause() {

      },

      deleteSingle() {

      },

      entryDetail() {

      },

      deleteSelected() {

      },
    },
  };

  export default vm;
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recruitment-list
    width 100%
    .header
      display flex
      justify-content space-between
    .table-list
      margin-top 20px
    .opertions
      display flex
      justify-content space-between
      margin-top 20px
      margin-bottom 20px
</style>
