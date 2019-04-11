<template>
  <div class="activity-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>活动名称：</span>
            <Input v-model="data.activityTitle" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>跳转链接：</span>
            <Input v-model="data.activityUrl" placeholder="Enter something..." style="width: 200px" />
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
            <span>活动正文：</span>
            <vue-editor class="editor" v-model="data.activityContent" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>是否显示报名按钮：</span>
            <Switchs v-model="data.activated" :trueValue="1" :falseValue="2" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>报名表单字段显示：</span>
            <CheckboxGroup v-model="showColumn" style="margin-top: 20px" @on-change="onCheckBoxChange">
              <Checkbox v-for="(item, index) in columns" :label="item.key" :key="index" style="margin-right: 20px">{{ item.name }}</Checkbox>
            </CheckboxGroup>
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
  import ActivityListApis from 'api/activityListApis';
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';
  import { VueEditor } from 'vue2-editor';

  const columns = [
    { key: 'realName', name: '姓名' },
    { key: 'school', name: '学校' },
    { key: 'gender', name: '性别' },
    { key: 'mobile', name: '联系电话' },
    { key: 'wechat', name: '微信号' },
    { key: 'qq', name: 'QQ' },
    { key: 'education', name: '学历' },
  ];

  export default {
    mixins: [detailMixin],

    data() {
      return {
        test: '',
        apis: ActivityListApis,
        operations,
        operstionType: operations.add,
        idName: 'activityId',
        columns,
        showColumn: [],
        data: {
          activityTitle: '',
          activityUrl: '',
          sortIndex: '',
          activityContent: '',
          activated: 2,
          showColumn: '',
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
    },

    methods: {
      onCheckBoxChange(v) {
        this.data.showColumn = v.join(',');
      },
    },

    watch: {
      data(newValue) {
        if (newValue.showColumn) {
          this.showColumn = newValue.showColumn.split(',');
        }
      },
    },

    components: {
      VueEditor,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .activity-operation
    layout-absolute()
    card-style()
    .editor
      margin-top 20px
      vertical-align text-top
</style>
