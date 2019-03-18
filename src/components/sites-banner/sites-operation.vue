<template>
  <div class="sites-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>海报名称：</span>
            <Input v-model="data.bannerTitle" placeholder="Enter something..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>上传图标：</span>
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
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        operations,
        operstionType: operations.add,
        apis: BannerApis,
        idName: 'bannerId',
        imgSrc: '',
        data: {
          bannerLocation: 1,
          bannerTitle: '',
          imageUrl: '',
          sortIndex: '',
          activated: 2,
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
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .sites-operation
    layout-absolute()
    card-style()
</style>
