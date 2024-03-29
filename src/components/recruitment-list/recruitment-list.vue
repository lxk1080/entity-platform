<template>
  <div class="recruitment-list">
    <div class="header">
      <div class="header-left">
        <span>招聘类型：</span>
        <Select v-model="recruitType" style="width: 100px">
          <Option :value="0">全部</Option>
          <Option v-for="(item, i) in recruitTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <span style="margin-left: 20px">选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <!--搜索框-->
        <Input v-show="search_1.includes(searchType)" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <!--日期选择-->
        <DatePicker
          v-if="search_2.includes(searchType)"
          :value="getDate(keyWords)"
          type="daterange"
          format="yyyy-MM-dd"
          placement="bottom-start"
          placeholder="选择日期..."
          style="width: 200px"
          @on-change="(format) => onDateRangeChange(format, 'keyWords')"
        />
        <Select v-if="search_3.includes(searchType)" v-model="keyWords" style="width: 100px" @on-change="onSearch3Change">
          <Option v-for="(item, i) in recruitStatusList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
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
          <Button type="warning" size="small" @click="entryPage('recruitment-detail', row[idName], { type: row.recruitType })">详情</Button>
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
  import { recruitTypeList, recruitStatusList, searchTypeList } from 'common/js/constants';

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
      render: (h, params) => self.renderTime(h, params, 'onTime', '长期招聘', 'isLongTerm'),
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
      recruitType: 0,
      searchTypeList,
      searchType: searchTypeList[0].id,
      search_1: [1, 2], // 筛选类型为 发布人 和 岗位标题
      search_2: [3, 4], // 筛选类型为 招聘周期 和 发布时间
      search_3: [5], // 筛选类型为 状态
      recruitStatusList,
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

      onSearch3Change() {
        this.getData();
      },
    },

    watch: {
      recruitType() {
        this.getData();
      },

      searchType(newValue, oldValue) {
        let oldSearch = '';
        if (this.search_1.includes(oldValue)) {
          oldSearch = this.search_1;
        }
        if (this.search_2.includes(oldValue)) {
          oldSearch = this.search_2;
        }
        if (this.search_3.includes(oldValue)) {
          oldSearch = this.search_3;
        }
        if (!oldSearch.includes(newValue)) {
          this.keyWords = '';
        }
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .recruitment-list
    page-base()
</style>
