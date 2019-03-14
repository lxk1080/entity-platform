<template>
  <div class="recruitment-list">
    <div class="header">
      <div class="header-left">
        <span>招聘类型：</span>
        <Select v-model="recruitType" style="width: 100px">
          <Option v-for="(item, i) in recruitTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
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
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" :style="getOpertionBtnTextStyle(row.recruitStatus)" @click="toggleStatus(row)">
            {{ getOpertionBtnText(row.recruitStatus) }}
          </Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="deleteSingle(row[idName])">删除</Button>
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
  import RecruitmentListApis from 'api/recruitmentListApis';
  import { tableMixin } from 'common/js/mixins';
  import { formatDate } from 'common/js/utils';
  import { colors } from 'common/js/constants';

  // 用来获取vue实例供外部使用
  let self = null;

  const recruitTypeList = [
    { id: 1, name: '实习招聘', color: colors.info },
    { id: 2, name: '兼职招聘', color: colors.success },
  ];

  const recruitStatusList = [
    { id: 1, name: '招聘中', color: colors.success, operationText: '暂停', operationId: 2 },
    { id: 2, name: '暂停中', color: colors.error, operationText: '开始', operationId: 1 },
    { id: 3, name: '已结束', color: colors.info, operationText: '操作' },
  ];

  const searchTypeList = [
    { id: 1, name: '发布人' },
    { id: 2, name: '岗位标题' },
    { id: 3, name: '岗位类型' },
    { id: 4, name: '招聘周期' },
    { id: 5, name: '发布时间' },
    { id: 6, name: '状态' },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '岗位标题',
      key: 'positionName',
    },
    {
      title: '岗位类型',
      key: 'recruitType',
      render: (h, params) => self.renderText(h, params, recruitTypeList, 'recruitType'),
    },
    {
      title: '发布人',
      key: 'principalName',
    },
    {
      title: '投递人数',
      key: 'countRecruit',
    },
    {
      title: '状态',
      key: 'recruitStatus',
      render: (h, params) => self.renderText(h, params, recruitStatusList, 'recruitStatus'),
    },
    {
      title: '发布时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
    },
    {
      title: '招聘周期',
      key: 'onTime',
      render: (h, params) => h('span', formatDate(new Date(params.row.onTime), 'yyyy-MM-dd')),
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
  ];

  const vm = {
    mixins: [tableMixin],

    data: () => ({
      apis: RecruitmentListApis,
      idName: 'positionId',
      recruitType: recruitTypeList[0].id,
      recruitTypeList,
      searchType: searchTypeList[0].id,
      searchTypeList,
      columns,
    }),

    computed: {
      getOpertionBtnTextStyle: () => status => ({
        marginRight: '10px',
        visibility: status === 3 ? 'hidden' : 'visible',
      }),
      getOpertionBtnText: () => status => recruitStatusList.find(item => item.id === status).operationText,
    },

    created() {
      self = this;
    },

    mounted() {
      this.getData();
    },

    methods: {
      getData() {
        const data = this.transformArgs([
          'pageSize',
          'pageNum',
          'recruitType',
          'searchType',
          'keyWords',
          'registerStartTime',
          'registerEndTime',
          'recruitStartTime',
          'recruitEndTime',
        ]);

        this.getDataByCommFunc(data);
      },

      search() {

      },

      toggleStatus(row) {
        const { operationId } = recruitStatusList.find(item => item.id === row.recruitStatus);
        this.apis.toggleStatus({ recruitStatus: operationId, [this.idName]: row[this.idName] }).then(this.callback);
      },

      entryDetail() {

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
