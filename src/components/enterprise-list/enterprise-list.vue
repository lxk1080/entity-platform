<template>
  <div class="enterprise-list">
    <div class="header">
      <div class="header-left">
        <Select v-model="searchType" style="width: 100px">
          <Option v-for="(item, i) in searchTypeList" :value="item.value" :key="i">{{ item.label }}</Option>
        </Select>
        <Input v-model="searchValue" placeholder="Enter something..." style="width: 200px" />
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
  import EnterpriseListApis from 'api/enterpriseListApis';
  import { ERR_OK } from 'api/common';
  import { tableMixin } from 'common/js/mixins';

  const successColor = '#19be6b';
  const errorColor = '#ed4014';
  const warnColor = '#ff9900';

  // 用来获取vue实例供外部使用
  let self = null;

  const activatedMap = {
    1: {
      text: '已通过',
      color: successColor,
    },
    2: {
      text: '未通过',
      color: errorColor,
    },
    3: {
      text: '待审核',
      color: warnColor,
    },
  };

  const searchTypeList = [
    {
      value: 1,
      label: '账户名',
    },
    {
      value: 2,
      label: '姓名',
    },
    {
      value: 3,
      label: '公司名称',
    },
    {
      value: 4,
      label: '套餐',
    },
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
      render: (h, params) => {
        const { text, color } = activatedMap[params.row.activated];
        return h('span', {
          style: {
            color,
          },
        }, text);
      },
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
                self.deleteSingle(params.row.enterpriseId);
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
                self.entryDetail(params.row.enterpriseId);
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
        tableHeight: -1,
        searchTypeList,
        searchType: searchTypeList[0].value,
        searchValue: '',
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
      setTableHeight() {
        const currentHeight = this.$refs.table.$el.offsetHeight;

        const otherHeight = 60 + 20 + 32 + 20 + 20 + 32 + 20 + 20;
        const maxHeight = document.documentElement.clientHeight - otherHeight;

        if (currentHeight > maxHeight) {
          this.tableHeight = maxHeight;
        }
      },

      getData() {
        const data = {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          keyWords: this.searchValue,
          searchType: this.searchType,
        };

        EnterpriseListApis.getEnterPriseList(data).then(res => {
          if (res.code !== ERR_OK) {
            this.$Message.error(res.message);
            return;
          }

          this.tableData = res.result;
          this.total = res.total;

          this.$nextTick(function() {
            // 固定表头
            // this.setTableHeight();
          });
        });
      },

      search() {
        this.currentPage = 1;
        this.getData();
      },

      deleteSingle(enterpriseId) {
        EnterpriseListApis.deleteSingleData({ enterpriseId }).then(this.successCallback);
      },

      deleteSelected() {
        const data = new URLSearchParams();
        this.selectedRowIds.map(id => data.append('ids', id));

        EnterpriseListApis.deleteMulData(data).then(this.successCallback);
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
