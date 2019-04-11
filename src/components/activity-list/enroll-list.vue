<template>
  <div class="enroll-list">
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
    <Button size="large" @click="onReturn">返回</Button>
  </div>
</template>

<script type="text/ecmascript-6">
  import ActivityListApis from 'api/activityListApis';
  import { tableMixin, detailMixin } from 'common/js/mixins';
  import { ERR_OK } from 'api/common';
  import { formatDate } from 'common/js/utils';
  import { genders } from 'common/js/constants';

  let self = null;

  const educations = [
    { id: 1, name: '高中' },
    { id: 2, name: '中专/技校' },
    { id: 3, name: '大专' },
    { id: 4, name: '本科' },
    { id: 5, name: '硕士' },
    { id: 6, name: '博士' },
  ];

  const columns = [
    {
      title: '真实姓名',
      key: 'realName',
    },
    {
      title: '性别',
      key: 'gender',
      render: (h, params) => self.renderText(h, params, genders, 'gender'),
    },
    {
      title: '学校',
      key: 'school',
    },
    {
      title: '手机号',
      key: 'mobile',
    },
    {
      title: '学历',
      key: 'education',
      render: (h, params) => self.renderText(h, params, educations, 'education'),
    },
    {
      title: '微信',
      key: 'wechat',
    },
    {
      title: 'QQ',
      key: 'qq',
    },
    {
      title: '报名时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
    },
  ];

  export default {
    mixins: [tableMixin, detailMixin],

    data() {
      return {
        apis: ActivityListApis,
        idName: 'activityId',
        columns,
        tableData: [],
      };
    },

    created() {
      self = this;

      // 筛选显示的列
      this.filterColumn();
    },

    methods: {
      getData() {
        this.apis.getEnrollList({ pageSize: 10, pageNum: 1, activityId: this.$route.params.id }).then(res => {
          if (res.code === ERR_OK) {
            this.tableData = res.result;
          }
        });
      },

      filterColumn() {
        this.apis.getDetailData({ [this.idName]: this.$route.params.id }).then(res => {
          if (res.code === ERR_OK) {
            const showColumn = res.result.showColumn.split(',');
            this.columns = this.columns.filter(column => showColumn.includes(column.key));
          }
        });
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .enroll-list
    layout-absolute()
</style>
