<template>
  <div class="login">
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
  import LoginApis from 'api/LoginApis';
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

          this.setUser(res.result);
          sessionStorage.username = res.result.username;
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
</style>
