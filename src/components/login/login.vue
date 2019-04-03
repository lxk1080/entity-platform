<template>
  <div class="login">
    <div class="login-logo">
      <img src="../../../static/img/logo.png" alt="img">
    </div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginApis from 'api/loginApis';
  import LoginForm from 'base/login-form';
  import { ERR_OK } from 'api/common';
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        apis: LoginApis,
      };
    },

    methods: {
      ...mapMutations({
        'setUser': 'SET_USER',
      }),

      handleSubmit ({ username, password }) {
        this.apis.login({ username, password }).then(res => {
          if (res.code !== ERR_OK) {
            this.$Message.error(res.message);
            return;
          }
          sessionStorage.user = JSON.stringify(res.result);
          this.setUser(res.result);
          this.$router.push('/enterprise-list');
        });
      },
    },

    components: {
      LoginForm,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .login
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background url("../../../static/img/background.jpg") no-repeat
    background-size cover
    overflow hidden
    &-logo
      margin-top 100px
      text-align center
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
</style>
