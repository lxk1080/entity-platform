// import { mapGetters, mapMutations, mapActions } from 'vuex';
import Opertions from 'base/opertions/opertions';
import { ERR_OK } from 'api/common';

const theadHeight = 40;

export const tableMixin = {
  data() {
    return {
      tableHeight: 0,
      selectedRowIds: [],
      pageNum: 1,
      pageSize: 20,
      keyWords: '',
      total: 0,
      tableData: [],
    };
  },

  mounted() {
    this.changeHeaderFirstText('选中');
    this.getData();
  },

  methods: {
    getDataByCommFunc(data) {
      this.apis.getList(data).then(res => {
        if (res.code !== ERR_OK) {
          this.$Message.error(res.message);
          return;
        }

        this.tableData = res.result;
        this.total = res.total;

        this.$nextTick(function() {
          // 固定表头，如果otherHeight不同，需要在引用组件中重写该函数
          this.setTableHeight();
        });
      });
    },

    setTableHeight() {
      const otherHeight = 60 + 20 + 32 + 20 + 20 + 32 + 20 + 25;
      this.setTableHeightByCommFunc(otherHeight);
    },

    setTableHeightByCommFunc(otherHeight) {
      const currentHeight = this.$refs.table.$el.getElementsByTagName('tbody')[0].offsetHeight + theadHeight;
      const maxHeight = document.documentElement.clientHeight - otherHeight;

      if (currentHeight > maxHeight) {
        this.tableHeight = maxHeight;
        return;
      }

      this.tableHeight = 0;
    },

    transformArgs(args) {
      const result = {};
      for (let i = 0; i < args.length; i++) {
        result[args[i]] = this[args[i]];
      }
      return result;
    },

    onSelectionChange(selection) {
      this.selectedRowIds = selection.reduce((prev, cur) => [...prev, cur[this.idName]], []);
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
      this.pageNum = page;
      this.getData();
    },

    search() {
      this.pageNum = 1;
      this.getData();
    },

    deleteSingle(idValue) {
      this.apis.deleteSingleData({ [this.idName]: idValue }).then(this.errorCallback);
    },

    deleteSelected() {
      this.apis.deleteMulData(this.selectedRowIds, 'id').then(this.errorCallback);
    },

    successCallback(res) {
      if (res.code === ERR_OK) {
        this.$Message.success(res.message);
        this.getData();
      }
      return res.code === ERR_OK;
    },

    errorCallback(res) {
      if (res.code !== ERR_OK) {
        this.$Message.error(res.message);
        return;
      }
      this.getData();
    },

    callback(res) {
      !this.successCallback(res) && this.errorCallback(res);
    },

    renderText(h, params, list, field) {
      const item = list.find(item => item.id === params.row[field]);
      if (!item) return null;
      return h('span', {
        style: {
          color: item.color,
        },
      }, item.name);
    },
  },

  components: {
    'v-opertions': Opertions,
  },
};

export const detailMixin = {
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.apis.getDetailData({ [this.idName]: this.$route.params.id }).then(res => {
        if (res.code === ERR_OK) {
          this.data = res.result;
        }
      });
    },
  },
};
