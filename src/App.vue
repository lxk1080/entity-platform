<template>
  <div class="app">
    <header class="header">
      <div class="logo">明日箐英系统管理</div>
    </header>
    <div class="main">
      <div class="sider">
        <Menu class="sider-menu" theme="dark" active-name="1-1" :open-names="['1']" accordion>
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
</template>

<script type="text/ecmascript-6">
  import menus from 'common/js/menus';

  export default {
    name: 'App',
    data() {
      return {
        menus,
      };
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable.styl"

  .app
    display flex
    flex-direction column
    width 100%
    height 100%
    min-width 1200px
    .header
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
    .main
      flex 1
      display flex
      .sider
        flex 0 0 280px
        width 280px
        .sider-menu
          height 100%
          width 100% !important
      .content
        flex 1
        padding 20px

    .ivu-menu-vertical
      .ivu-menu-submenu-title-icon
        top 0
</style>
