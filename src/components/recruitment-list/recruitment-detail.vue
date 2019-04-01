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
          <div class="row-item" style="display: flex; align-items: center;">
            <span>推荐：</span>
            <Switchs v-model="data.activated" :trueValue="1" :falseValue="2" />
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
              <Option v-for="(item, i) in recruit.remunerationUnits" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>结算方式：</span>
            <Select v-model="data.clearingType" style="width: 100px">
              <Option v-for="(item, i) in recruit.clearingTypes" :value="item.id" :key="i">{{ item.name }}</Option>
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
            <RadioGroup v-model="data.workDateType" @on-change="onRadioChange('workDate')">
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
              v-if="data.workDateType === workDateTypes.assign.id"
              :value="getDate(data.workDate)"
              type="daterange"
              format="yyyy-MM-dd"
              placement="bottom-start"
              placeholder="选择日期..."
              style="width: 200px"
              @on-change="(format) => onDateRangeChange(format, 'data', 'workDate')"
            />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>工作时间：</span>
            <RadioGroup v-model="data.workTimeType" @on-change="onRadioChange('workTime')">
              <Radio v-for="item in Object.values(workTimeTypes)" :label="item.id" :key="item.id">{{ item.name }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="content-row" v-show="data.workTimeType === workTimeTypes.assign.id">
          <div class="row-item">
            <span style="visibility: hidden">作为空格：</span>
            <Input v-model="data.workTime" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>工作地点：</span>
            <Cascader :data="cities" :value="getRecruitCity(data.recruitCity)" @on-change="onCityChange" style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span style="visibility: hidden">作为空格：</span>
            <Input v-model="data.recruitAddress" placeholder="详细地址..." style="width: 400px" />
          </div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">附加要求</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>性别要求：</span>
            <RadioGroup v-model="data.genderRequire">
              <Radio v-for="item in genders" :label="item.id" :key="item.id">{{ item.name }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>学历要求：</span>
            <Select v-model="data.educationRequire" style="width: 200px">
              <Option v-for="(item, i) in educations" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">招聘设置</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>招 聘 联 系 人：</span>
            <Input v-model="data.contactUser" placeholder="联系人..." style="width: 200px" />
            <span style="margin-left: 20px">联系电话：</span>
            <Input v-model="data.contactsMobile" placeholder="联系电话..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>其他联系方式：</span>
            <Select v-model="data.contactType" style="width: 200px">
              <Option v-for="(item, i) in contactTypes" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
            <Input v-model="data.contactNum" placeholder="Enter something..." style="width: 200px; margin-left: 20px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>短信通知：</span>
            <Switchs v-model="data.isNotice" :trueValue="1" :falseValue="2" />
            <span style="margin-left: 20px">开启后，学生报名会向本岗位的联系人号码{{ data.contactsMobile }}发送提醒短信</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>招聘周期：</span>
            <RadioGroup v-model="data.isLongTerm" @on-change="onRadioChange('onTime')">
              <Radio v-for="item in Object.values(terms)" :label="item.id" :key="item.id">{{ item.name }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="content-row" v-if="data.isLongTerm === terms.short.id">
          <div class="row-item">
            <span style="visibility: hidden">作为空格：</span>
            <span>
              岗位将在
              <DatePicker
                type="date"
                :value="getDate(data.onTime)"
                format="yyyy-MM-dd"
                placement="bottom-start"
                placeholder="选择日期..."
                style="width: 200px"
                @on-change="(format) => onDateRangeChange(format, 'data', 'onTime')"
              />
              日24点自动结束
            </span>
          </div>
        </div>
      </div>
    </Card>
    <div class="footer">
      <Button class="btn-footer" size="large" @click="onReturn">返回</Button>
      <Button class="btn-footer" size="large" type="primary" style="margin-left: 20px" @click="onUpdate">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import RecruitmentListApis from 'api/recruitmentListApis';
  import { detailMixin, formMixin } from 'common/js/mixins';
  import cities from 'common/js/cities';
  import * as constants from 'common/js/constants';

  export default {
    mixins: [detailMixin, formMixin],

    data() {
      return {
        apis: RecruitmentListApis,
        idName: 'positionId',
        recruit: {},
        recruitStatusList: constants.recruitStatusList,
        accommodations: constants.accommodations,
        workDateTypes: constants.workDateTypes,
        workTimeTypes: constants.workTimeTypes,
        genders: constants.genders,
        educations: constants.educations,
        contactTypes: constants.contactTypes,
        terms: constants.terms,
        cities,
        autosize: {
          minRows: 5,
          maxRows: 10,
        },
      };
    },

    created() {
      this.recruit = constants.recruitTypeList.find(item => item.id === parseInt(this.$route.query.type));
    },

    computed: {
      getRecruitCity() {
        return recruitCity => {
          if (!recruitCity) return [];

          const locals = recruitCity.split('-').map(v => parseInt(v));

          for (let i = 0; i < locals.length; i++) {
            if (Number.isNaN(locals[i])) {
              return [];
            }
          }

          return locals;
        };
      },
    },

    methods: {
      onRadioChange(field) {
        this.data[field] = '';
      },

      onCityChange(value, selectedData) {
        this.data.recruitCity = value.join('-');
        this.data.recruitCityText = selectedData.reduce((prev, cur) => [ ...prev, cur.label ], []).join('');
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .recruitment-detail
    layout-absolute()
    card-style()
    .footer
      margin 30px 0 50px
      .btn-footer
        width 160px
        height 40px
        font-size 18px
</style>
