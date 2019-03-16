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
        <!--搜索框-->
        <Input v-show="!speicalSearchTypes.includes(searchType)" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <!--日期选择-->
        <DatePicker
          v-show="speicalSearchTypes.includes(searchType)"
          :value="getDate(keyWords)"
          type="daterange"
          format="yyyy/MM/dd"
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
      <Table border ref="table" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" :style="getOpertionBtnTextStyle(row.recruitStatus)" @click="toggleStatus(row)">
            {{ getOpertionBtnText(row.recruitStatus) }}
          </Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="deleteSingle(row[idName])">删除</Button>
          <Button type="warning" size="small" @click="entryDetail(row[idName], row.recruitType)">详情</Button>
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
  import RecruitmentListApis from 'api/recruitmentListApis';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { formatDate } from 'common/js/utils';
  import { recruitTypeList, recruitStatusList, searchTypeList } from './constants';

  // 用来获取vue实例供外部使用
  let self = null;

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
      render: (h, params) => {
        if (!params.row.onTime) {
          return h('span', '长期招聘');
        }
        return h('span', `至 ${formatDate(new Date(params.row.onTime), 'yyyy-MM-dd')}`);
      },
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

    data: () => ({
      apis: RecruitmentListApis,
      idName: 'positionId',
      recruitTypeList,
      recruitType: recruitTypeList[0].id,
      searchTypeList,
      searchType: searchTypeList[0].id,
      speicalSearchTypes: [4, 5],
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

    methods: {
      getData() {
        const data = this.transformArgs([
          'pageSize',
          'pageNum',
          'recruitType',
          'searchType',
          'keyWords',
        ]);

        this.getDataByCommFunc(data);
      },

      toggleStatus(row) {
        const { operationId } = recruitStatusList.find(item => item.id === row.recruitStatus);
        this.apis.toggleStatus({ recruitStatus: operationId, [this.idName]: row[this.idName] }).then(this.callback);
      },

      entryDetail(positionId, type) {
        this.$router.push(`/recruitment-detail/${positionId}?type=${type}`);
      },
    },

    watch: {
      recruitType() {
        this.getData();
      },

      searchType(newValue, oldValue) {
        if (!this.speicalSearchTypes) return;

        if (!this.speicalSearchTypes.includes(newValue) && this.speicalSearchTypes.includes(oldValue)) {
          this.keyWords = '';
        }

        if (this.speicalSearchTypes.includes(newValue) && !this.speicalSearchTypes.includes(oldValue)) {
          this.keyWords = '';
        }
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recruitment-list
    position relative
    width 100%
    height 100%
    padding 20px
    .header
      display flex
      justify-content space-between
    .table-list
      margin-top 20px
</style>
