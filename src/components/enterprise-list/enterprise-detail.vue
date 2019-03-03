<template>
  <div class="enterprise-detail">
    <div class="info base-info">
      <div class="info-title">基础信息</div>
      <div class="info-content">
        <div class="avatar-wrapper">
          <Avatar class="avatar" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        </div>
        <div class="message-wrapper">
          <div class="message-item">
            <span>账户名：</span>
            <span v-show="!usernameEdit">{{ data.username }}</span>
            <Input v-show="usernameEdit" style="width: 200px" size="small" v-model="data.username" />
            <span class="update" @click="onUsernameEdit">{{ usernameEdit ? '确定' : '修改' }}</span>
          </div>
          <div class="message-item">
            <span>姓　名：</span>
            <span>{{ data.principalName }}</span>
          </div>
          <div class="message-item">
            <span>身份证：</span>
            <span>{{ data.identityCard }}</span>
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <div class="info company-info">
      <div class="info-title">公司信息</div>
      <div class="info-content">
        <div class="message-wrapper">
          <div class="message-item">
            <span>公司名称：</span>
            <span>{{ data.companyName }}</span>
          </div>
          <div class="message-item">
            <span>所属岗位：</span>
            <span>{{ data.principalPosition }}</span>
          </div>
          <div class="message-item">
            <span>证明类型：</span>
            <span>{{ data.proveType }}</span>
          </div>
          <div class="message-item">
            <span>证明材料：</span>
            <span><a :href="data.proveResource">{{ data.proveResource }}</a></span>
          </div>
          <div class="message-item" v-show="data.activated !== 3">
            <span>审核状态：</span>
            <Tag color="success" v-show="data.activated === 1">通过审核</Tag>
            <Tag color="error" v-show="data.activated === 2">未通过审核</Tag>
          </div>
          <div class="message-item btn-wrapper" v-show="data.activated === 3">
            <Button type="primary" @click="onReview(1)">通过审核</Button>
            <Button @click="onReview(2)">不通过审核</Button>
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <div class="info finance-info">
      <div class="info-title">财务信息</div>
      <div class="info-content">
        <div class="message-wrapper">
          <div class="message-item">
            <span>账户余额：</span>
            <span>{{ data.entryFormNum }}个报名单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getDetailData, updateUsernameOfDetail } from 'api/enterpriseListApis';
  import { ERR_OK } from 'common/js/config';

  export default {
    data() {
      return {
        usernameEdit: false,
        data: {
          username: '',
        },
      };
    },

    mounted() {
      this.getData(this.$route.params.id);
    },

    methods: {
      getData(id) {
        getDetailData(id).then(res => {
          if (res.code === ERR_OK) {
            this.data = res.result;
          }
        });
      },

      onUsernameEdit() {
        if (!this.usernameEdit) {
          this.usernameEdit = true;
          return;
        }

        if (this.usernameEdit) {
          const data = {
            enterpriseId: this.data.enterpriseId,
            username: this.data.username,
          };
          updateUsernameOfDetail(data).then(res => {
            if (res.code !== ERR_OK) {
              this.$Message.error(res.message);
              return;
            }
            this.usernameEdit = false;
          });
        }
      },

      onReview(activated) {
        updateUsernameOfDetail({
          enterpriseId: this.data.enterpriseId,
          activated,
        }).then(res => {
          if (res.code !== ERR_OK) {
            this.$Message.error(res.message);
            return;
          }
          this.data.activated = activated;
          this.$Message.success(res.message);
        });
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable';

  .enterprise-detail
    width 100%
    .info
      .info-title
        height 40px
        line-height 40px
        font-size 18px
        font-weight 800
      &.base-info
        .info-title
          margin-bottom 10px
      .info-content
        display flex
        .avatar-wrapper
          margin-left 20px
          width 100px
          flex 0 0 100px
          .avatar
            width 100px
            height 100px
            border-radius 50%
        .message-wrapper
          flex 1
          margin-left 20px
          .message-item
            line-height 32px
            vertical-align middle
            &.btn-wrapper
              margin-top 10px
            .update
              margin-left 10px
              font-size 15px
              cursor pointer
              color $update-text
</style>
