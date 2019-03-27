<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" />
          <p class="login-tip">用户名和密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from 'base/login-form';

  export default {
    methods: {
      handleSubmit ({ userName, password }) {

      },
    },

    components: {
      LoginForm,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    width 100%
    height 100%
    position relative
    &-con
      position absolute
      left 50%
      top 50%
      transform translate3d(-50%, -50%, 0)
      width: 300px
      &-header
        font-size: 16px
        font-weight 300
        text-align center
        padding 30px 0
        .form-con
          padding 10px 0 0
        .login-tip
           font-size 10px
           text-align center
           color #c3c3c3
</style>
