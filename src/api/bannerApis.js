import { post, postStream, postFile } from './common';

const BannerApis = {
  /**
   * 获取banner列表
   * @param pageNum
   * @param pageSize
   * @param bannerLocation 广告位置：1网站顶部海报，2小程序顶部广告，3小程序中部广告，4小程序底部广告
   */
  getList: data => post('/banner/getBannerList.do', '', data),

  /**
   * 删除单条数据
   * @param data => bannerId
   */
  deleteSingleData: data => post('/banner/deleteBanner.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/banner/deleteBannerBatch.do', '', data, sameKey),

  /**
   * 添加 banner
   */
  addData: data => postFile('/banner/addBanner.do', '', data),

  /**
   * 编辑 banner
   */
  updateData: data => postFile('/banner/modifyBanner.do', '', data),

  /**
   * 获取详情页数据
   * @param data => bannerId
   */
  getDetailData: data => post('/banner/getBannerById.do', '', data),
};

export default BannerApis;
