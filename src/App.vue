<template>
  <div class="app">
    <div class="main" v-if="user.username">
      <header class="app-header">
        <div class="logo">明日箐英系统管理</div>
        <div class="admin">
          <Dropdown @on-click="onDropDownClick">
            <div class="admin-text">{{ user.username }}<Icon type="ios-arrow-down" /></div>
            <DropdownMenu slot="list">
              <DropdownItem :name="dropdowns.logout">退出登录</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
      <div class="app-main">
        <div class="sider">
          <Menu class="sider-menu" ref="menu" theme="dark" :active-name="activeName" :open-names="openName" accordion>
            <Submenu v-for="menu in menus" :key="menu.key" :name="menu.key">
              <template slot="title">
                <Icon type="ios-paper" />{{menu.title}}
              </template>
              <Menu-Item v-for="subMenu in menu.subMenus" :key="subMenu.key" :name="subMenu.key" :to="subMenu.path">
                {{subMenu.title}}
              </Menu-Item>
            </Submenu>
          </Menu>
        </div>
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
    <!--作为登录专用组件-->
    <div class="login" v-if="!user.username">
      <router-view />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import LoginApis from 'api/LoginApis';
  import menus from 'common/js/menus';
  import { mapGetters, mapMutations } from 'vuex';
  import { ERR_OK } from 'api/common';

  const dropdowns = {
    logout: 'logout',
  };

  export default {
    name: 'App',

    data() {
      return {
        apis: LoginApis,
        menus,
        activeName: '1-1',
        openName: ['1'],
        dropdowns,
      };
    },

    computed: {
      ...mapGetters([
        'user',
      ]),
    },

    mounted() {
      if (sessionStorage.user) {
        this.setUser(JSON.parse(sessionStorage.user));

        const path = window.location.hash.substring(1);

        if (path === '/login' || path === '/') {
          this.$router.push('/enterprise-list');
        }
      }
    },

    methods: {
      ...mapMutations({
        'setUser': 'SET_USER',
      }),

      onDropDownClick(name) {
        if (name === dropdowns.logout) {
          this.logout();
        }
      },

      logout() {
        this.apis.logout().then(res => {
          if (res.code !== ERR_OK) {
            this.$Message.error(res.message);
            return;
          }
          sessionStorage.removeItem('user');
          this.setUser({});
          this.$router.push('/login');
        });
      },

      getActiveItem() {
        if (!sessionStorage.currentPath) return;

        menus.map(menu => {
          menu.subMenus.map(subMenu => {
            let exist = false;

            if (subMenu.path === sessionStorage.currentPath) {
              exist = true;
            }

            if (!exist && subMenu.children) {
              subMenu.children.map(path => {
                if (sessionStorage.currentPath.includes(path)) {
                  exist = true;
                }
              });
            }

            if (exist) {
              this.activeName = subMenu.key;
              this.openName = [subMenu.key.split('-')[0]];

              this.$nextTick(() => {
                this.$refs.menu.updateOpened();
              });
            }
          });
        });
      },
    },

    watch: {
      $route(to, from) {
        // 这里判断是否登录
        if (!sessionStorage.user) {
          this.$router.push('/login');
          return;
        }

        // 如果登录了，但是强行走登录的路由，直接返回之前的路由
        if (sessionStorage.user && (to.fullPath === '/login' || to.fullPath === '/')) {
          this.$router.push(from);
          return;
        }

        if (to.fullPath === '/authority-miss') return;

        // 判断是否有权限
        if (to.fullPath !== '/authority-miss') {
          const authorityIds = JSON.parse(sessionStorage.user).authorityIds.split(',').map(v => parseInt(v));
          let flag = false;

          for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];

            for (let j = 0; j < menu.subMenus.length; j++) {
              const subMenu = menu.subMenus[j];

              if (subMenu.path === to.fullPath) {
                if (!authorityIds.includes(subMenu.authId)) {
                  this.$router.push('/authority-miss');
                  return;
                }
                flag = true;
                break;
              }
            }

            if (flag) break;
          }
        }

        // 保存当前路径
        sessionStorage.currentPath = to.fullPath;

        // 刷新页面或网页后退前进时，使UI可以定位到正确的MenuItem上
        this.getActiveItem();
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable"
  @import "common/stylus/fixable"

  .app
    width 100%
    min-width 1200px
    height 100%
    .login
      position relative
      width 100%
      height 100%
    .main
      display flex
      flex-direction column
      width 100%
      height 100%
      .app-header
        flex 0 0 60px
        display flex
        justify-content space-between
        padding-right 30px
        height 60px
        line-height 60px
        background $header-background
        .logo
          width 280px
          text-align center
          color $white
          font-size 22px
          font-weight 600
          background $logo-background
        .admin
          .admin-text
            color $white
            cursor pointer
      .app-main
        flex 1
        display flex
        .sider
          flex 0 0 280px
          width 280px
          .sider-menu
            height 100%
            width 100% !important
        .content
          fix-flex-1()
          flex 1
          height: 100%
          overflow-y auto
          background $page-background

      .ivu-menu-vertical
        .ivu-menu-submenu-title-icon
          top 0
</style>
