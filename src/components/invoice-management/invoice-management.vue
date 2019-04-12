<template>
  <div class="invoice-management">
    <div class="header">
      <div class="header-left">
        <span>选择筛选条件：</span>
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
        <Input v-if="searchType === 1" v-model="keyWords" placeholder="Enter something..." style="width: 200px" />
        <Select v-if="searchType === 2" v-model="keyWords" style="width: 100px" @on-change="onInvoiceTypeChange">
          <Option v-for="(item, i) in invoiceTypes" :value="item.id" :key="i">{{ item.name }}</Option>
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
          <Input class="list-input" v-model="row.sortIndex" style="width: 50px" @on-blur="onSortBlur(row[idName], row.sortIndex)" />
        </template>
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage('invoice-detail', row[idName])">详情</Button>
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
  import InvoiceManagementApis from 'api/invoiceManagementApis';
  import { tableMixin, formMixin } from 'common/js/mixins';
  import { formatDate } from 'common/js/utils';
  import { invoiceStatusType, colors } from 'common/js/constants';

  let self = null;

  const searchTypeList = [
    { id: 1, name: '企业名称' },
    { id: 2, name: '发票类型' },
    { id: 3, name: '提交时间' },
  ];

  const invoiceTypes = [
    { id: 1, name: '专票', color: colors.success },
    { id: 2, name: '电子发票', color: colors.info },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '申请企业',
      key: 'companyName',
    },
    {
      title: '开票金额',
      key: 'invoiceMoney',
    },
    {
      title: '发票类型',
      key: 'invoiceType',
      render: (h, params) => self.renderText(h, params, invoiceTypes, 'invoiceType'),
    },
    {
      title: '提交时间',
      key: 'createdDate',
      render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
    },
    {
      title: '发票状态',
      key: 'invoiceStatus',
      render: (h, params) => self.renderText(h, params, invoiceStatusType, 'invoiceStatus'),
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
        apis: InvoiceManagementApis,
        idName: 'invoiceId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        invoiceTypes,
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

      onInvoiceTypeChange() {
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

  .invoice-management
    page-base()
</style>
