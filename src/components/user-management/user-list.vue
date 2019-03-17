<template>
  <div class="user-list">
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
      <Table border ref="table" :height="tableHeight" :columns="columns" :data="tableData" @on-selection-change="onSelectionChange">
        <template slot-scope="{ row }" slot="operation">
          <Button type="error" size="small" style="margin-right: 5px" @click="deleteSingle(row[idName])">删除</Button>
          <Button type="warning" size="small" @click="entryDetail('user', row[idName])">详情</Button>
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
  import UserListApis from 'api/userManagementApis';
  import { tableMixin } from 'common/js/mixins';

  const searchTypeList = [
    { id: 1, name: '微信昵称' },
    { id: 2, name: '真实姓名' },
    { id: 3, name: '学校' },
    { id: 4, name: '手机号' },
  ];

  const columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center',
    },
    {
      title: '微信昵称',
      key: 'nickName',
    },
    {
      title: '真实姓名',
      key: 'realName',
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
      title: '操作',
      width: 200,
      align: 'center',
      slot: 'operation',
    },
  ];

  export default {
    mixins: [tableMixin],

    data() {
      return {
        apis: UserListApis,
        idName: 'userId',
        searchTypeList,
        searchType: searchTypeList[0].id,
        columns,
      };
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
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user-list
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
