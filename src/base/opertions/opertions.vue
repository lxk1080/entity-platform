<template>
  <div class="opertions-container">
    <div class="opertions-left">
      <Button @click="handleSelectAll(true)">设置全选</Button>
      <Button @click="handleSelectAll(false)">取消全选</Button>
      <Button @click="exportData('data')" v-if="showExport">导出</Button>
      <Button @click="deleteSelected">删除</Button>
      <Button v-if="showActiveBtn" @click="onActiveClick(true)">锁定</Button>
      <Button v-if="showActiveBtn" @click="onActiveClick(false)">解锁</Button>
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
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      pageNum: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        default: 0,
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      showActiveBtn: {
        type: Boolean,
        default: false,
      },
      showExport: {
        type: Boolean,
        default: true,
      },
    },

    methods: {
      handleSelectAll(toggle) {
        this.$emit('handleSelectAll', toggle);
      },

      exportData(name) {
        this.$emit('exportData', name);
      },

      deleteSelected() {
        this.$emit('deleteSelected');
      },

      onPageChange(page) {
        this.$emit('onPageChange', page);
      },

      onActiveClick(toggle) {
        this.$emit('onActiveClick', toggle);
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .opertions-container
    display flex
    justify-content space-between
    margin-top 20px
    margin-bottom 20px
</style>
