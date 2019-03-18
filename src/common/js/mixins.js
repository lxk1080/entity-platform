// import { mapGetters, mapMutations, mapActions } from 'vuex';
import Opertions from 'base/opertions/opertions';
import Qs from 'qs';
import { ERR_OK } from 'api/common';
import { operations } from 'common/js/constants';
import { formatDate } from 'common/js/utils';

const theadHeight = 40;

export const tableMixin = {
  data() {
    return {
      tableHeight: 0,
      selectedRowIds: [],
      pageNum: 1,
      pageSize: 10,
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
      if (!this.$refs.table) return;

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
          color: item.color || 'initial',
        },
      }, item.name);
    },

    renderTime(h, params, field, defaultText = '') {
      if (!params.row[field]) {
        return h('span', defaultText);
      }
      return h('span', `至 ${formatDate(new Date(params.row[field]), 'yyyy-MM-dd')}`);
    },

    entryPage(name, id, query) {
      let result = `/${name}/${id}`;

      if (query && typeof query === 'object') {
        result = `${result}?${Qs.stringify(query)}`;
      }

      this.$router.push(result);
    },
  },

  components: {
    'v-opertions': Opertions,
  },
};

export const detailMixin = {
  data() {
    return {
      data: {},
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.apis.getDetailData({ [this.idName]: this.$route.params.id }).then(res => {
        if (res.code === ERR_OK) {
          this.data = res.result;

          Object.keys(this.data).forEach(key => {
            if (this.data[key] === null || this.data[key] === void 0) {
              this.data[key] = '';
            }
          });

          // 如果是添加的操作，获取所有的字段后，都将值置为空
          if (this.operstionType.id === operations.add.id) {
            Object.keys(this.data).map(key => {
              this.data[key] = '';
            });
          }
        }
      });
    },

    onReturn(rePath) {
      if (rePath) {
        this.$router.push(rePath);
        return;
      }

      this.$router.back();
    },

    onAdd() {
      this.apis.addData(this.data).then(this.callback);
    },

    async onUpdate() {
      await this.apis.updateData(this.data).then(this.callback);
      this.getData();
    },

    callback(res) {
      if (res.code !== ERR_OK) {
        this.$Message.error(res.message);
        return;
      }

      this.$Message.success(res.message);
    },
  },
};

export const formMixin = {
  computed: {
    getDate() {
      return (dateString) => {
        if (!dateString) return '';

        if (typeof dateString === 'number') {
          return new Date(dateString);
        }

        const times = dateString.split(',');

        if (times.length === 1) {
          return new Date(...times);
        }

        return times.reduce((prev, cur) => [...prev, new Date(cur)], []);
      };
    },
  },

  methods: {
    onDateRangeChange(formatDate, ...rest) {
      let value = '';
      const len = rest.length;

      // 单个时间
      if (typeof formatDate === 'string') {
        value = new Date(formatDate).getTime();
      }

      // 时间段
      if (Array.isArray(formatDate) && formatDate[0] && formatDate[1]) {
        value = formatDate.join(',');
      }

      if (len === 1) {
        this[rest[0]] = value;
      }

      if (len === 2) {
        this[rest[0]][rest[1]] = value;
      }
    },
  },
};
