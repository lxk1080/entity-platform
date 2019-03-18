<template>
  <div class="user-detail">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">基础信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>头　　像：</span>
            <Avatar class="avatar" size="large" :src="data.userIcon || 'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
          </div>
          <div class="row-item">
            <span>昵称：</span>
            <span class="item-text">{{ data.nickName }}</span>
          </div>
          <div class="row-item">
            <span>姓名：</span>
            <span class="item-text">{{ data.realName }}</span>
          </div>
          <div class="row-item">
            <span>身份证号：</span>
            <span class="item-text">{{ data.realName }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>在读大学：</span>
            <span class="item-text">{{ data.school }}</span>
          </div>
          <div class="row-item">
            <span>性别：</span>
            <span class="item-text">{{ getGender(data.gender) }}</span>
          </div>
          <div class="row-item">
            <span>学历：</span>
            <span class="item-text">{{ getEducations(data.education) }}</span>
          </div>
        </div>
        <div class="content-row desc">
          <div class="desc-title">个人简介：</div>
          <div class="desc-text">{{ data.description }}</div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">应聘信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>公司名称：</span>
            <span class="item-text">{{ '阿里巴巴' }}</span>
          </div>
          <div class="row-item">
            <span>招聘类型：</span>
            <span class="item-text">{{ '实习岗位' }}</span>
          </div>
          <div class="row-item">
            <span>应聘岗位：</span>
            <span class="item-text">{{ '招聘专员' }}</span>
          </div>
          <div class="row-item">
            <span>应聘时间：</span>
            <span class="item-text">{{ '2018-11-12' }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import UserListApis from 'api/userManagementApis';
  import { detailMixin } from 'common/js/mixins';
  import { genders, educations } from 'common/js/constants';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        apis: UserListApis,
        idName: 'userId',
      };
    },

    computed: {
      getGender() {
        return gender => {
          if (!gender) return '';
          return genders.find(item => item.id === gender).name;
        };
      },

      getEducations() {
        return education => {
          if (!education) return '';
          return educations.find(item => item.id === education).name;
        };
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .user-detail
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
            display flex
            align-items center
            width 220px
            .avatar
              width 60px
              height 60px
              border-radius 50%
            .textarea
              vertical-align text-top
            .ivu-cascader
              display inline-block
            .ivu-upload-list
              margin-top 0
            .item-text
              font-weight 600
          &.desc
            display flex
            line-height 30px
            .desc-title
              white-space nowrap
            .desc-text
              flex 1
</style>
