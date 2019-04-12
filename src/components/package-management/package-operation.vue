<template>
  <div class="package-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>　套餐名称：</span>
            <Input v-model="data.mealName" placeholder="套餐名称..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>　　　价格：</span>
            <Input v-model="data.mealPrice" placeholder="价格..." style="width: 200px" />
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>报名单数量：</span>
            <Input v-model="data.entryNum" placeholder="报名单数量..." style="width: 200px" />
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
  import PackageManagementApis from 'api/packageManagementApis';
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        operations,
        operstionType: operations.add,
        apis: PackageManagementApis,
        idName: 'combinedMealId',
        data: {
          mealName: '',
          mealPrice: '',
          entryNum: '',
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .package-operation
    layout-absolute()
    card-style()
</style>
