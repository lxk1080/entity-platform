<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <v-input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person" />
        </span>
      </v-input>
    </FormItem>
    <FormItem prop="password">
      <v-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock" />
        </span>
      </v-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>

<script>
  import { Input } from 'iview';

  export default {
    name: 'LoginForm',

    props: {
      usernameRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: '账号不能为空', trigger: 'blur' },
          ];
        },
      },
      passwordRules: {
        type: Array,
        default: () => {
          return [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ];
        },
      },
    },

    data () {
      return {
        form: {
          username: '',
          password: '',
        },
      };
    },

    computed: {
      rules () {
        return {
          username: this.usernameRules,
          password: this.passwordRules,
        };
      },
    },

    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              username: this.form.username,
              password: this.form.password,
            });
          }
        });
      },
    },

    components: {
      'v-input': Input,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
