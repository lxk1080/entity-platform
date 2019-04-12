<template>
  <div class="invoice-detail">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">发票信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>发票抬头：</span>
            <span>{{ data.invoiceTitle }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>税务登记号：</span>
            <span>{{ data.taxCode }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>开户银行：</span>
            <span>{{ data.blank }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>开户账号：</span>
            <span>{{ data.accountNumber }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>注册所在地址：</span>
            <span>{{ data.registerAddress }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>注册固定电话：</span>
            <span>{{ data.registerMobile }}</span>
          </div>
        </div>
      </div>
    </Card>
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">快递信息</span>
      </p>
      <div class="card-content">
        <div class="content-row">
          <div class="row-item">
            <span>收件人：</span>
            <span>{{ data.recipients }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>手机号：</span>
            <span>{{ data.recipientsMobile }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>收件地址：</span>
            <span>{{ data.recipientsAddress }}</span>
          </div>
        </div>
        <div class="content-row">
          <div class="row-item">
            <span>邮编：</span>
            <span>{{ data.postcode }}</span>
          </div>
        </div>
      </div>
    </Card>
    <div style="margin-top: 30px"></div>
    <div class="content-row">
      <div class="row-item">
        <span>发票状态：</span>
        <Select v-model="data.invoiceStatus" style="width: 200px">
          <Option v-for="(item, i) in invoiceStatusType" :value="item.id" :key="i">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
    <div class="footer">
      <Button class="btn-footer" size="large" @click="onReturn">返回</Button>
      <Button class="btn-footer" size="large" type="primary" style="margin-left: 20px" @click="onUpdate">保存</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import InvoiceManagementApis from 'api/invoiceManagementApis';
  import { detailMixin } from 'common/js/mixins';
  import { invoiceStatusType } from 'common/js/constants';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        apis: InvoiceManagementApis,
        idName: 'invoiceId',
        invoiceStatusType,
      };
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .invoice-detail
    layout-absolute()
    card-style()
    .footer
      margin 30px 0 50px
      .btn-footer
        width 160px
        height 40px
        font-size 18px
</style>
