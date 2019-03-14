<template>
  <div class="enterprise-list">
    <div class="header">
      <div class="header-left">
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
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange" />
    </div>
    <div class="opertions">
      <div class="opertions-left">
        <Button @click="handleSelectAll(true)">设置全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
        <Button @click="exportData('data')">导出</Button>
        <Button @click="deleteSelected">删除</Button>
      </div>
      <div class="opertions-right">
        <Page
          :current="pageNum"
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
  import EnterpriseListApis from 'api/enterpriseListApis';
  import { tableMixin } from 'common/js/mixins';
  import { colors } from 'common/js/constants';

  // 用来获取vue实例供外部使用
  let self = null;

  const activatedList = [
    { id: 1, name: '已通过', color: colors.success },
    { id: 2, name: '未通过', color: colors.error },
    { id: 3, name: '待审核', color: colors.warn },
  ];

  const searchTypeList = [
    { id: 1, name: '账户名' },
    { id: 2, name: '姓名' },
    { id: 3, name: '公司名称' },
    { id: 4, name: '套餐' },
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
                self.entryDetail(params.row[self.idName]);
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
      };
    },

    created() {
      self = this;
    },

    mounted() {
      this.getData();
    },

    methods: {
      getData() {
        const data = this.transformArgs(['pageSize', 'pageNum', 'keyWords', 'searchType']);
        this.getDataByCommFunc(data);
      },

      setTableHeight() {
        const otherHeight = 60 + 20 + 32 + 20 + 20 + 32 + 20 + 20;
        this.setTableHeightByCommFunc(otherHeight);
      },

      entryDetail(enterpriseId) {
        this.$router.push(`/enterprise-detail/${enterpriseId}`);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .enterprise-list
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
