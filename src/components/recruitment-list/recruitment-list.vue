<template>
  <div class="recruitment-list">
    <div class="header">
      <div class="header-left">
        <span>招聘类型：</span>
        <Select v-model="recruitmentType" style="width: 100px">
          <Option v-for="(type, i) in recruitmentTypeList" :value="type" :key="i">{{ type }}</Option>
        </Select>
      </div>
      <div class="header-right">

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const recruitmentTypeList = ['实习招聘', '兼职招聘'];

  const vm = {
    data: () => ({
      recruitmentType: recruitmentTypeList[0],
      recruitmentTypeList,
    }),
  };

  export default vm;
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
