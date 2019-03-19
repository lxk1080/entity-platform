<template>
  <div class="banner-container">
    <div class="header">
      <Button @click="entryPage(banner.operationPath, 0, { type: operations.add.id })">{{ banner.addTitle }}</Button>
    </div>
    <div class="table-list">
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="icon">
          <Avatar class="avatar" shape="square" size="large" :src="row.imageUrl || 'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
        </template>
        <template slot-scope="{ row }" slot="sort">
          <Input class="list-input" v-model="row.sortIndex" style="width: 50px" />
        </template>
        <template slot-scope="{ row }" slot="operation">
          <Button size="small" style="margin-right: 5px" @click="entryPage(banner.operationPath, row[idName], { type: operations.edit.id })">编辑</Button>
          <Button type="error" size="small" @click="deleteSingle(row[idName])">删除</Button>
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
  import BannerApis from 'api/bannerApis';
  import { formatDate } from 'common/js/utils';
  import { tableMixin } from 'common/js/mixins';
  import { operations, bannerTypes } from 'common/js/constants';
  import { banners } from './constants';

  let self = null;

  const getColumns = (banner) => {
    if ([banners.sites.id, banners.applets.id].includes(banner.id)) {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '海报名称',
          key: 'bannerTitle',
        },
        {
          title: '海报',
          width: 250,
          align: 'center',
          key: 'imageUrl',
          slot: 'icon',
        },
        {
          title: '添加时间',
          key: 'createdDate',
          render: (h, params) => h('span', formatDate(new Date(params.row.createdDate), 'yyyy-MM-dd')),
        },
        {
          title: '排序',
          key: 'sortIndex',
          align: 'center',
          slot: 'sort',
        },
        {
          title: '操作',
          width: 200,
          align: 'center',
          slot: 'operation',
        },
      ];
    }

    if ([banners.homeM.id, banners.homeB.id].includes(banner.id)) {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '广告图',
          key: 'imageUrl',
          width: 250,
          align: 'center',
          slot: 'icon',
        },
        {
          title: '标题',
          key: 'bannerTitle',
        },
        {
          title: '广告类型',
          key: 'bannerType',
          render: (h, params) => self.renderText(h, params, bannerTypes, 'bannerType'),
        },
        {
          title: '访问量',
          key: 'visitCount',
        },
        {
          title: '展示时间',
          key: 'endDate',
          render: (h, params) => self.renderTime(h, params, 'endDate', '长期展示', 'isLongShow'),
        },
        {
          title: '排序',
          key: 'sortIndex',
          align: 'center',
          slot: 'sort',
        },
        {
          title: '操作',
          width: 200,
          align: 'center',
          slot: 'operation',
        },
      ];
    }
  };

  export default {
    mixins: [tableMixin],

    props: {
      banner: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        apis: BannerApis,
        idName: 'bannerId',
        banners,
        operations,
        bannerLocation: this.banner.id,
        columns: getColumns(this.banner),
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
          'bannerLocation',
        ]);

        this.getDataByCommFunc(data);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .banner-container
    page-base()
    .avatar
      margin 10px 0
      width 210px
      height 90px
    .list-input
      input
        text-align center
</style>
