// import { mapGetters, mapMutations, mapActions } from 'vuex'
import { ERR_OK } from 'api/common';

export const tableMixin = {
  data() {
    return {
      selectedRowIds: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },

  mounted() {
    this.changeHeaderFirstText('选中');
  },

  methods: {
    onSelectionChange(selection) {
      this.selectedRowIds = selection.reduce((prev, cur) => [...prev, cur.enterpriseId], []);
    },

    changeHeaderFirstText(text) {
      document.querySelector('.ivu-table-wrapper .ivu-table-cell-with-selection').innerHTML = text;
    },

    handleSelectAll(status) {
      this.$refs.table.selectAll(status);
    },

    exportData(name) {
      this.$refs.table.exportCsv({
        filename: name,
      });
    },

    onPageChange(page) {
      this.currentPage = page;
      this.getData();
    },

    successCallback(res) {
      if (res.code === ERR_OK) {
        this.$Message.success(res.message);
        this.getData();
      }
    },
  },
};
