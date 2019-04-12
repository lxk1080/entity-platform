<template>
  <div class="system-setting">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">系统设置</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <div class="title">　　注册奖励报名单数：</div>
            <div class="text">
              <div v-show="!edit">{{ data.registerAward }}</div>
              <Input v-show="edit" v-model="data.registerAward" style="width: 600px" />
            </div>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <div class="title">实名认证奖励报名单数：</div>
            <div class="text">
              <div v-show="!edit">{{ data.authenticationAward }}</div>
              <Input v-show="edit" v-model="data.authenticationAward" style="width: 600px" />
            </div>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <div class="title">　　　　　　用户协议：</div>
            <div class="text">
              <div v-show="!edit">{{ data.userAgreement }}</div>
              <Input
                v-show="edit"
                class="textarea"
                type="textarea"
                v-model="data.userAgreement"
                :autosize="autosize"
                style="width: 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
    <div class="footer">
      <Button v-show="!edit" class="btn-footer" size="large" type="primary" @click="onUpdateClick">修改</Button>
      <Button v-show="edit" class="btn-footer" size="large" type="primary" @click="onSave">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SystemSettingApis from 'api/systemSettingApis';
  import { ERR_OK } from 'api/common';

  export default {
    data() {
      return {
        apis: SystemSettingApis,
        data: {
          userAgreement: '',
          registerAward: '',
          authenticationAward: '',
        },
        autosize: {
          minRows: 10,
        },
        edit: false,
      };
    },

    created() {
      this.getData();
    },

    methods: {
      getData() {
        this.apis.getSetting().then(res => {
          if (res.code === ERR_OK) {
            this.data = res.result;
            return;
          }
          this.$Message.error(res.message);
        });
      },

      onUpdateClick() {
        this.edit = true;
      },

      onSave() {
        this.apis.updateSetting({
          userAgreement: this.data.userAgreement,
          registerAward: this.data.registerAward,
          authenticationAward: this.data.authenticationAward,
        }).then(res => {
          if (res.code === ERR_OK) {
            this.getData();
            this.edit = false;
            return;
          }
          this.$Message.error(res.message);
        });
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";
  @import "~common/stylus/variable";

  .system-setting
    page-base()
    card-style()
    .content-row
      line-height 25px
      .row-item
        display flex
        width 100%
        .text
          flex 1
          .textarea
            vertical-align text-top
    .footer
      .btn-footer
        width 160px
        height 40px
        font-size 18px
</style>
