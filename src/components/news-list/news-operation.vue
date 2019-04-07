<template>
  <div class="news-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>　　标题：</span>
            <Input v-model="data.newsTitle" placeholder="Enter something..." style="width: 600px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　作者：</span>
            <Input v-model="data.author" placeholder="Enter something..." style="width: 600px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　来源：</span>
            <Input v-model="data.source" placeholder="Enter something..." style="width: 600px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　简介：</span>
            <Input type="textarea" v-model="data.synopsis" placeholder="140字以内..." style="width: 600px" :maxlength="140" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>是否发布：</span>
            <Switchs v-model="data.releaseStatus" :trueValue="1" :falseValue="2" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　排序：</span>
            <Input v-model="data.sortIndex" placeholder="Enter..." style="width: 100px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　分类：</span>
            <Select v-model="data.newsType" style="width: 100px">
              <Option v-for="(item, i) in newList" :value="item.id" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　上传封面：</span>
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
            <span>　　内容：</span>
            <vue-editor class="editor" v-model="data.newsContent" />
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
  import NewsListApis from 'api/newsListApis';
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';
  import { VueEditor } from 'vue2-editor';

  const newList = [
    { id: 1, name: '箐英动态' },
    { id: 2, name: '社团展示' },
    { id: 3, name: '公益活动' },
  ];

  export default {
    mixins: [detailMixin],

    data() {
      return {
        operations,
        newList,
        operstionType: operations.add,
        apis: NewsListApis,
        idName: 'newsId',
        imgSrc: '',
        data: {
          newsTitle: '',
          author: '',
          source: '',
          synopsis: '',
          releaseStatus: 2,
          sortIndex: '',
          newsType: newList[0].id,
          newsContent: '',
          imageUrl: '',
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
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

  .news-operation
    layout-absolute()
    card-style()
    .row-item
      margin-right 0
      .editor
        margin-top 20px
        margin-left 25px
        vertical-align text-top
</style>
