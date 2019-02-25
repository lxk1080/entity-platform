<template>
  <div class="app">
    <header class="header">
      header
    </header>
    <div class="main">
      <div class="sider">
        <Menu class="sider-menu" theme="dark" active-name="1-1" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />内容管理
            </template>
            <Menu-Item name="1-1">文章管理</Menu-Item>
            <Menu-Item name="1-2">评论管理</Menu-Item>
            <Menu-Item name="1-3">举报管理</Menu-Item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />用户管理
            </template>
            <Menu-Item name="2-1">新增用户</Menu-Item>
            <Menu-Item name="2-2">活跃用户</Menu-Item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats" />统计分析
            </template>
            <MenuGroup title="使用">
              <Menu-Item name="3-1">新增和启动</Menu-Item>
              <Menu-Item name="3-2">活跃分析</Menu-Item>
              <Menu-Item name="3-3">时段分析</Menu-Item>
            </MenuGroup>
            <MenuGroup title="留存">
              <Menu-Item name="3-4">用户留存</Menu-Item>
              <Menu-Item name="3-5">流失用户</Menu-Item>
            </MenuGroup>
          </Submenu>
        </Menu>
      </div>
      <div class="content">
        content
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'App',
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .app
    display flex
    flex-direction column
    width 100%
    height 100%
    min-width 1200px
    .header
      flex 0 0 60px
      height 60px
      background #ccc
    .main
      flex 1
      display flex
      .sider
        flex 0 0 250px
        width 250px
        .sider-menu
          height 100%
          width 100% !important
      .content
        flex 1
        border blue solid 1px
        padding 20px
</style>
