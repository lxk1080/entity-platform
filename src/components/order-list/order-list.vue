<template>
  <div class="order-list">
    <div class="header">
      <div class="header-left">
        <span>选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-if="searchType === 1" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <Select v-if="searchType === 2" v-model="keyWords" style="width: 100px" @on-change="onMealChange">
          <Option v-for="(item, i) in mealList" :value="item.combinedMealId" :key="i">{{ item.mealName }}</Option>
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
        <template slot-scope="{ row }" slot="operation">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderListApis from 'api/orderListApis';
  import DataStatisticsApis from 'api/dataStatisticsApis';
  import { colors } from 'common/js/constants';
  import { formatDate } from 'common/js/utils';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { ERR_OK } from 'api/common';

  let self = null;

  const searchTypeList = [
    { id: 1, name: '用户名称' },
    { id: 2, name: '套餐类型' },
    { id: 3, name: '购买时间' },
  ];

  const orderStatusList = [
    { id: 1, name: '待支付', color: colors.info },
    { id: 2, name: '已完成', color: colors.success },
    { id: 3, name: '已取消', color: colors.error },
  ];

  const isInvoiceList = [
    { id: 1, name: '是', color: colors.success },
    { id: 2, name: '否', color: colors.error },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '订单号',
      key: 'orderCode',
    },
    {
      title: '状态',
      key: 'orderStatus',
      render: (h, params) => self.renderText(h, params, orderStatusList, 'orderStatus'),
    },
    {
      title: '已开发票',
      key: 'isInvoice',
      render: (h, params) => self.renderText(h, params, isInvoiceList, 'isInvoice'),
    },
    {
      title: '用户名称',
      key: 'companyName',
    },
    {
      title: '套餐类型',
      key: 'mealName',
    },
    {
      title: '购买时间',
      key: 'payTime',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
    },
    {
      title: '订单金额',
      key: 'money',
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
        apis: OrderListApis,
        idName: 'orderId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        mealList: [],
        columns,
      };
    },

    created() {
      self = this;

      // 获取套餐列表
      DataStatisticsApis.getMealList({ pageNum: 1, pageSize: 100 }).then(res => {
        if (res.code === ERR_OK) {
          this.mealList = res.result;
          return;
        }
        this.$Message.error(res.message);
      });
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

      onMealChange() {
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

  .order-list
    page-base()
</style>
