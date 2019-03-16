<template>
  <div class="recruitment-detail">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">兼职基本信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>岗位标题：</span>
            <Input v-model="data.positionName" placeholder="Enter something..." style="width: 150px" />
          </div>
          <div class="row-item">
            <span>接收报名人数：</span>
            <Input v-model="data.recruitNum" placeholder="Enter something..." style="width: 100px" />
          </div>
          <div class="row-item">
            <span>状态：</span>
            <Select v-model="data.recruitStatus" style="width: 100px">
              <Option v-for="(item, i) in recruitStatusList" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>工作内容：</span>
            <Input v-model="data.work" class="textarea" type="textarea" style="width: 600px" :autosize="autosize" placeholder="Enter something..." />
          </div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">薪资报酬</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>基本薪资：</span>
            <Input v-model="data.remuneration" placeholder="Enter something..." style="width: 200px" /> 元
          </div>
          <div class="row-item">
            <Select v-model="data.remunerationUnit" style="width: 100px">
              <Option v-for="(item, i) in getRemunerationUnits" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>结算方式：</span>
            <Select v-model="data.clearingType" style="width: 100px">
              <Option v-for="(item, i) in getClearingTypes" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　提成：</span>
            <Input v-model="data.royaltyRate" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　福利：</span>
            <AutoComplete v-model="data.accommodation" :data="accommodations" placeholder="在这里输入..." style="width: 200px" />
          </div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">工作信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>工作日期：</span>
            <RadioGroup v-model="data.workDateType" @on-change="onRadioChangeForWorkDate">
              <Radio v-for="item in Object.values(workDateTypes)" :label="item.id" :key="item.id">{{ item.name }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span style="visibility: hidden">作为空格：</span>
            <Select v-show="data.workDateType === workDateTypes.noAssign.id" v-model="data.workDate" style="width: 200px">
              <Option v-for="(item, i) in workDateTypes.noAssign.children" :value="item.name" :key="i">{{ item.name }}</Option>
            </Select>
            <DatePicker
              v-show="data.workDateType === workDateTypes.assign.id"
              :value="getDate(data.workDate)"
              type="daterange"
              format="yyyy/MM/dd"
              placement="bottom-start"
              placeholder="选择日期..."
              style="width: 200px"
              @on-change="(format) => onDateRangeChange(format, 'data', 'workDate')"
            />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import RecruitmentListApis from 'api/recruitmentListApis';
  import { detailMixin, formMixin } from 'common/js/mixins';
  import { recruitTypeList, recruitStatusList, accommodations, workDateTypes } from './constants';

  export default {
    mixins: [detailMixin, formMixin],

    data() {
      return {
        apis: RecruitmentListApis,
        idName: 'positionId',
        recruitStatusList,
        accommodations,
        workDateTypes,
        autosize: {
          minRows: 5,
          maxRows: 10,
        },
        // tmp
        data: {
          workDateType: '',
        },
      };
    },

    computed: {
      getRemunerationUnits() {
        return recruitTypeList.find(item => item.id === parseInt(this.$route.query.type)).remunerationUnits;
      },

      getClearingTypes() {
        return recruitTypeList.find(item => item.id === parseInt(this.$route.query.type)).clearingTypes;
      },
    },

    methods: {
      onRadioChangeForWorkDate() {
        this.data.workDate = '';
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .recruitment-detail
    layout-absolute()
    .card
      margin-bottom 10px
      .card-title
        .title-text
          font-size 18px
          font-weight 600
      .card-content
        .content-row
          display flex
          margin-bottom 20px
          .row-item
            margin-right 30px
            .textarea
              vertical-align text-top
</style>
