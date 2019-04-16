<template>
  <div class="banner-operation-34">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>广告名称：</span>
            <Input v-model="data.bannerTitle" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>上传图片：</span>
            <Avatar v-if="operstionType.id === operations.edit.id" class="avatar" size="large" shape="square" :src="imgSrc" />
            <Upload
              :before-upload="onBeforeUpload"
              action=""
              style="display: inline-block"
              :format="['jpg','jpeg','png']"
            >
              <Button>{{ operstionType.imgTitle }}</Button>
              <span>{{ getFileName }}</span>
            </Upload>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　排序：</span>
            <Input v-model="data.sortIndex" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>是否显示：</span>
            <Switchs v-model="data.activated" :trueValue="1" :falseValue="2" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>广告类型：</span>
            <RadioGroup v-model="data.bannerType">
              <Radio v-for="(item, i) in bannerTypes" :label="item.id" :key="i">{{ item.name }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="content-row" v-if="data.bannerType === 2 || data.bannerType === 3">
          <div class="row-item">
            <span style="visibility: hidden">作为空格：</span>
            <Select v-if="data.bannerType === 2" v-model="data.activityId" style="width: 200px">
              <Option v-for="(item, i) in activityList" :value="item.activityId" :key="i">{{ item.activityTitle }}</Option>
            </Select>
            <Input v-if="data.bannerType === 3" v-model="data.hyperlink" placeholder="Enter something..." style="width: 400px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　内容：</span>
            <vue-editor
              v-if="data.bannerType === 1"
              class="editor"
              v-model="data.content"
              useCustomImageHandler
              @imageAdded="handleImageAdded"
            />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>展示时间：</span>
            <RadioGroup v-model="data.isLongShow" @on-change="onIsLongRadioChange">
              <Radio v-for="(item, i) in showTypes" :label="item.id" :key="i">{{ item.name }}</Radio>
            </RadioGroup>
            <DatePicker
              :disabled="data.isLongShow === 1"
              :value="getDate(data.startDate)"
              format="yyyy-MM-dd"
              placeholder="选择日期..."
              style="width: 200px"
              @on-change="(format) => onDateRangeChange(format, 'data', 'startDate')"
            /> 至
            <DatePicker
            :disabled="data.isLongShow === 1"
            :value="getDate(data.endDate)"
            format="yyyy-MM-dd"
            placeholder="选择日期..."
            style="width: 200px"
            @on-change="(format) => onDateRangeChange(format, 'data', 'endDate')"
          />
          </div>
        </div>
      </div>
    </Card>
    <div class="footer">
      <Button size="large" @click="onReturn">返回</Button>
      <Button v-if="operstionType.id === operations.add.id" size="large" type="primary" @click="onAdd">添加</Button>
      <Button v-if="operstionType.id === operations.edit.id" size="large" type="primary" @click="onUpdate">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BannerApis from 'api/bannerApis';
  import ActivityListApis from 'api/activityListApis';
  import { ERR_OK } from 'api/common';
  import { detailMixin, formMixin } from 'common/js/mixins';
  import { operations, bannerTypes, showTypes } from 'common/js/constants';
  import { VueEditor } from 'vue2-editor';

  export default {
    mixins: [detailMixin, formMixin],

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
        operations,
        bannerTypes,
        showTypes,
        operstionType: operations.add,
        imgSrc: '',
        activityList: [],
        data: {
          bannerLocation: this.banner.id,
          bannerTitle: '',
          imageUrl: '',
          sortIndex: '',
          activated: 2,
          bannerType: 1,
          activityId: '',
          hyperlink: '',
          content: '',
          isLongShow: 1,
          startDate: '',
          endDate: '',
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));

      ActivityListApis.getList({ pageNum: 1, pageSize: 100 }).then(res => {
        if (res.code === ERR_OK) {
          this.activityList = res.result;
        }
      });
    },

    computed: {
      getFileName() {
        if (typeof this.data.imageUrl === 'object') {
          return this.data.imageUrl.name;
        }

        return '';
      },
    },

    methods: {
      onBeforeUpload(file) {
        this.data.imageUrl = file;
        return false;
      },

      onLinkSwitchChange(status) {
        if (status === 2) {
          this.data.activityId = '';
        }
      },

      onIsLongRadioChange(value) {
        if (value === 1) {
          this.data.startDate = '';
          this.data.endDate = '';
        }
      },
    },

    watch: {
      data(newValue) {
        this.imgSrc = newValue.imageUrl;
      },
    },

    components: {
      VueEditor,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .banner-operation-34
    layout-absolute()
    card-style()
    .row-item
      margin-right 0
    .editor
      margin-top 20px
      margin-left 25px
      vertical-align text-top
</style>
