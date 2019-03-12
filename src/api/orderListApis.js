import { post, postStream } from './common';

const OrderListApis = {
  /**
   * 获取订单列表
   */
  getList: data => post('/order/getOrderList.do', '', data),

  /**
   * 删除单条数据
   * @param data => orderId
   */
  deleteSingleData: data => post('/order/deleteOrder.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/order/deleteOrderBatch.do', '', data, sameKey),

  /**
   * 修改订单
   */
  update: data => post('/order/modifyOrder.do', '', data),

  /**
   * 获取详情页数据
   * @param data => orderId
   */
  getDetailData: data => post('/order/getOrderById.do', '', data),
};

export default OrderListApis;
