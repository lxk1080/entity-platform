<template>
  <div class="account-operation">
    <Card style="width: 100%" class="card">
      <p slot="title" class="card-title">
        <Icon type="ios-create" size="18" />
        <span class="title-text">{{ operstionType.title }}</span>
      </p>
      <div class="card-content">
        <Form ref="form" :model="data" :rules="formRules" :label-width="100">
          <FormItem label="管理角色：" prop="roleId">
            <Select v-model="data.roleId" placeholder="选择角色名称">
              <Option v-for="(item, index) in roleList" :value="item.roleId" :key="index">{{ item.roleName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否启用：" prop="activated">
            <Switchs v-model="data.activated" :trueValue="1" :falseValue="2" />
          </FormItem>
          <FormItem label="用户名：" prop="username">
            <Input v-model="data.username" placeholder="用户名" />
          </FormItem>
          <FormItem label="登录密码：" prop="password">
            <Input type="password" v-model="data.password" placeholder="登录密码" />
          </FormItem>
          <FormItem label="确认密码：" prop="confirmPassword">
            <Input type="password" v-model="data.confirmPassword" placeholder="确认密码" />
          </FormItem>
          <FormItem>
            <Button @click="onReturn" style="margin-right: 10px">返回</Button>
            <Button v-if="operstionType.id === operations.add.id" type="primary" @click="handleSubmit(operstionType.id)">添加</Button>
            <Button v-if="operstionType.id === operations.edit.id" type="primary" @click="handleSubmit(operstionType.id)">保存</Button>
            <Button type="primary" @click="handleReset">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import AccountListApis from 'api/accountManagementApis';
  import { detailMixin } from 'common/js/mixins';
  import { operations } from 'common/js/constants';
  import { ERR_OK } from 'api/common';

  export default {
    mixins: [detailMixin],

    data() {
      return {
        apis: AccountListApis,
        idName: 'adminId',
        operations,
        operstionType: operations.add,
        roleList: [],
        data: {
          roleId: '',
          activated: 1,
          username: '',
          password: '',
          confirmPassword: '',
        },
        formRules: {
          roleId: [
            { required: true, message: '管理角色不能为空', trigger: 'blur', type: 'number' },
          ],
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: this.validatePass, trigger: 'blur' },
          ],
          confirmPassword: [
            { validator: this.validatePassConfirm, trigger: 'blur' },
          ],
        },
      };
    },

    created() {
      this.operstionType = Object.values(operations).find(item => item.id === parseInt(this.$route.query.type));
      this.getRoleList();
    },

    methods: {
      getRoleList() {
        this.apis.getRoleList({ pageSize: 100, pageNum: 1 }).then(res => {
          if (res.code === ERR_OK) {
            this.roleList = res.result;
          }
        });
      },

      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('密码不能为空'));
          return;
        }
        if (this.data.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword');
        }
        callback();
      },

      validatePassConfirm(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
          return;
        }
        if (value !== this.data.password) {
          callback(new Error('两次输入密码不一致'));
          return;
        }
        callback();
      },

      handleSubmit(type) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (type === operations.add.id) {
              this.onAdd();
            }
            if (type === operations.edit.id) {
              this.onUpdate();
            }
          }
        });
      },

      handleReset () {
        this.$refs.form.resetFields();
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin";

  .account-operation
    layout-absolute()
    card-style()
</style>
