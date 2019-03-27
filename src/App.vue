<template>
  <div class="app">
    <header class="app-header">
      <div class="logo">明日箐英系统管理</div>
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
      <div class="content" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 901">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import menus from 'common/js/menus';

  export default {
    name: 'App',

    data() {
      return {
        menus,
        activeName: '1-1',
        openName: ['1'],
      };
    },

    methods: {
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
      $route(to) {
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
    display flex
    flex-direction column
    width 100%
    height 100%
    min-width 1200px
    .app-header
      flex 0 0 60px
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
