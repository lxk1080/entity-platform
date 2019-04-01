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
        data: {
          newsTitle: '',
          releaseStatus: 2,
          sortIndex: '',
          newsType: newList[0].id,
          newsContent: '',
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
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
    .editor
      display inline-block
      vertical-align text-top
</style>
