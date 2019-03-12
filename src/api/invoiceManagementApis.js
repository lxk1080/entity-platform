import { post, postStream } from './common';

const InvoiceManagementApis = {
  /**
   * 获取发票列表
   */
  getList: data => post('/invoice/getInvoiceList.do', '', data),

  /**
   * 删除单条数据
   * @param data => invoiceId
   */
  deleteSingleData: data => post('/invoice/deleteInvoice.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/invoice/deleteInvoiceBatch.do', '', data, sameKey),

  /**
   * 添加发票
   */
  addData: data => post('/invoice/addInvoice.do', '', data),

  /**
   * 修改发票
   */
  update: data => post('/invoice/modifyInvoice.do', '', data),

  /**
   * 获取详情页数据
   * @param data => invoiceId
   */
  getDetailData: data => post('/invoice/getInvoiceById.do', '', data),
};

export default InvoiceManagementApis;
