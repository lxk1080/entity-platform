<template>
  <div class="recruitment-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>类型名称：</span>
            <Input v-model="data.professionName" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　图标：</span>
            <Avatar v-if="operstionType.id === operations.edit.id" class="avatar" size="large" :src="imgSrc" />
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
            <span>所属分类：</span>
            <Select v-model="data.recruitType" style="width: 100px">
              <Option v-for="(item, i) in recruitTypeList" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
      </div>
    </Card>
    <div class="footer">
      <Button size="large" @click="onReturn('/recruitment-type')">返回</Button>
      <Button v-if="operstionType.id === operations.add.id" size="large" type="primary" @click="onAdd">添加</Button>
      <Button v-if="operstionType.id === operations.edit.id" size="large" type="primary" @click="onUpdate">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import RecruitmentTypeApis from 'api/recruitmentTypeApis';
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';
  import { recruitTypeList } from 'components/recruitment-list/constants';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        operations,
        operstionType: operations.add,
        apis: RecruitmentTypeApis,
        idName: 'professionId',
        recruitTypeList,
        imgSrc: '',
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
    },

    computed: {
      getFileName() {
        if (typeof this.data.professionIcon === 'object') {
          return this.data.professionIcon.name;
        }

        return '';
      },
    },

    methods: {
      onBeforeUpload(file) {
        this.data.professionIcon = file;
        return false;
      },
    },

    watch: {
      data(newValue) {
        this.imgSrc = newValue.professionIcon;
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .recruitment-operation
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
            .ivu-cascader
              display inline-block
            .ivu-upload-list
              margin-top 0
</style>
