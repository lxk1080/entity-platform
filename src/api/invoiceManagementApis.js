import { post, postStream } from './common';

const InvoiceManagementApis = {
  /**
   * 获取发票列表
   */
  getList: data => post('/orderInvoice/getOrderInvoiceList.do', '', data),

  /**
   * 删除单条数据
   * @param data => invoiceId
   */
  deleteSingleData: data => post('/orderInvoice/deleteOrderInvoice.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/orderInvoice/deleteOrderInvoiceBatch.do', '', data, sameKey),

  /**
   * 添加发票
   */
  addData: data => post('/orderInvoice/addOrderInvoice.do', '', data),

  /**
   * 修改发票
   */
  updateData: data => post('/orderInvoice/modifyOrderInvoice.do', '', data),

  /**
   * 获取详情页数据
   * @param data => invoiceId
   */
  getDetailData: data => post('/orderInvoice/getOrderInvoiceById.do', '', data),
};

export default InvoiceManagementApis;
