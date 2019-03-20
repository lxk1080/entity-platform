<template>
  <div class="data-statistics">
    <Row :gutter="20">
      <i-col :xs="6" :md="6" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style" />
          <p class="card-text">{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px">
        <Card shadow>
          <RadioGroup @on-change="() => {}">
            <Radio label="1">{{ '本周' }}</Radio>
            <Radio label="2">{{ '月份' }}</Radio>
            <Radio label="3">{{ '年份' }}</Radio>
          </RadioGroup>
          <Select value="1" style="width: 200px">
            <Option value="1">{{ '全部类型' }}</Option>
            <Option value="2">{{ '家庭教育' }}</Option>
          </Select>
          <div ref="postDom" style="height: 400px" />
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px">
        <Card shadow>
          <RadioGroup @on-change="() => {}">
            <Radio label="1">{{ '本周' }}</Radio>
            <Radio label="2">{{ '月份' }}</Radio>
            <Radio label="3">{{ '年份' }}</Radio>
          </RadioGroup>
          <Select value="1" style="width: 200px">
            <Option value="1">{{ '全部类型' }}</Option>
            <Option value="2">{{ '家庭教育' }}</Option>
          </Select>
          <div ref="orderDom" style="height: 400px" />
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  import DataStatisticsApis from 'api/dataStatisticsApis';
  import { ERR_OK } from 'api/common';
  import { colors } from 'common/js/constants';
  import InforCard from 'base/infor-card';
  import CountTo from 'base/count-to';
  import echarts from 'echarts';
  import tdTheme from 'base/charts/theme.json';
  import { on, off } from 'common/js/tools';

  echarts.registerTheme('tdTheme', tdTheme);

  const inforCardData = [
    { title: '总企业数量', icon: 'ios-heart', count: 0, color: colors.info, key: 'enterprisTotal' },
    { title: '总招聘岗位数量', icon: 'md-build', count: 0, color: colors.success, key: 'recruitTotal' },
    { title: '总投递简历数量', icon: 'md-clipboard', count: 0, color: colors.warn, key: 'positionTotal' },
    { title: '总小程序用户数量', icon: 'md-person', count: 0, color: colors.error, key: 'userTotal' },
    { title: '今日新增企业数量', icon: 'md-add-circle', count: 0, color: colors.info, key: 'todayEnterprisNum' },
    { title: '今日发布岗位数量', icon: 'md-add-circle', count: 0, color: colors.success, key: 'todayrecruitNum' },
    { title: '今日投递简历数量', icon: 'md-add-circle', count: 0, color: colors.warn, key: 'todayPositionNum' },
    { title: '今日小程序用户量', icon: 'md-person-add', count: 0, color: colors.error, key: 'todayUserNum' },
  ];

  const barData = {
    Mon: 13253,
    Tue: 34235,
    Wed: 26321,
    Thu: 12340,
    Fri: 24643,
    Sat: 1322,
    Sun: 1324,
  };

  export default {
    data() {
      return {
        apis: DataStatisticsApis,
        inforCardData,
        barData,
        postDom: null,
        orderDom: null,
      };
    },

    created() {
      this.apis.getStatisticData().then(res => {
        if (res.code === ERR_OK) {
          for (let [key, value] of Object.entries(res.result)) {
            this.inforCardData.find(v => v.key === key).count = value;
          }
          return;
        }
        this.$Message.error(res.message);
      });
    },

    mounted() {
      this.$nextTick(() => {
        this.initPostCharts();
        this.initOrderCharts();
        on(window, 'resize', this.resize);
      });
    },

    methods: {
      initPostCharts() {
        const xAxisData = Object.keys(this.barData);
        const seriesData = Object.values(this.barData);
        const option = {
          title: {
            text: '岗位发布统计',
            x: 'center',
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'day',
              data: seriesData,
              type: 'bar',
            },
          ],
        };
        this.postDom = echarts.init(this.$refs.postDom, 'tdTheme');
        this.postDom.setOption(option);
      },

      initOrderCharts() {
        const xAxisData = Object.keys(this.barData);
        const seriesData = Object.values(this.barData);
        const option = {
          color: colors.success,
          title: {
            text: '订单统计',
            x: 'center',
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'day',
              data: seriesData,
              type: 'bar',
            },
          ],
        };
        this.orderDom = echarts.init(this.$refs.orderDom, 'tdTheme');
        this.orderDom.setOption(option);
      },

      resize () {
        this.postDom.resize();
      },
    },

    components: {
      InforCard,
      CountTo,
    },

    beforeDestroy () {
      off(window, 'resize', this.resize);
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";
  @import "~common/stylus/variable";

  .data-statistics
    page-base()
    .count-style
      font-size 50px
    .card-text
      margin 6px 0
</style>
