<template>
  <div class="enterprise-list">
    <div class="header">
      <div class="header-left">
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <span style="margin-left: 20px; font-size: 12px">实名认证状态：</span>
        <Select v-model="authStatus" style="width: 100px">
          <Option v-for="(item, i) in authStatusList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <span style="margin-left: 20px; font-size: 12px">企业认证状态：</span>
        <Select v-model="activated" style="width: 100px">
          <Option v-for="(item, i) in activatedList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="header-right">
        <Button type="primary" @click="search">立即检索</Button>
      </div>
    </div>
    <div class="table-list">
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange" />
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
  import EnterpriseListApis from 'api/enterpriseListApis';
  import { tableMixin } from 'common/js/mixins';
  import { colors } from 'common/js/constants';

  // 用来获取vue实例供外部使用
  let self = null;

  const authStatusList = [
    { id: 0, name: '全部', color: colors.success },
    { id: 1, name: '已实名', color: colors.error },
    { id: 2, name: '未实名', color: colors.warn },
  ];

  const activatedList = [
    { id: 0, name: '全部', color: colors.success },
    { id: 1, name: '已通过', color: colors.success },
    { id: 2, name: '未通过', color: colors.error },
    { id: 3, name: '待审核', color: colors.warn },
  ];

  const searchTypeList = [
    { id: 1, name: '账户名' },
    { id: 2, name: '姓名' },
    { id: 3, name: '公司名称' },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '账户名',
      key: 'username',
    },
    {
      title: '姓名',
      key: 'principalName',
    },
    {
      title: '公司名称',
      key: 'companyName',
    },
    {
      title: '发布岗位数',
      key: 'countPosition',
    },
    {
      title: '简历数量',
      key: 'countRecruit',
    },
    {
      title: '审核状态',
      key: 'activated',
      render: (h, params) => self.renderText(h, params, activatedList, 'activated'),
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      render: (h, params) => (
        h('div', [
          h('Button', {
            props: {
              type: 'error',
              size: 'small',
            },
            style: {
              marginRight: '5px',
            },
            on: {
              click() {
                self.deleteSingle(params.row[self.idName]);
              },
            },
          }, '删除'),

          h('Button', {
            props: {
              type: 'warning',
              size: 'small',
            },
            on: {
              click() {
                self.entryPage('enterprise-detail', params.row[self.idName]);
              },
            },
          }, '详情'),
        ])
      ),
    },
  ];

  export default {
    mixins: [tableMixin],

    data() {
      return {
        apis: EnterpriseListApis,
        idName: 'enterpriseId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        columns,
        authStatusList,
        authStatus: authStatusList[0].id,
        activatedList,
        activated: activatedList[0].id,
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
          'keyWords',
          'searchType',
          'authStatus',
          'activated',
        ]);

        this.getDataByCommFunc(data);
      },
    },

    watch: {
      authStatus() {
        this.getData();
      },

      activated() {
        this.getData();
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .enterprise-list
    page-base()
</style>
