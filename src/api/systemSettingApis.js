import { post } from './common';

const SystemSettingApis = {
  getSetting: data => post('/setting/getSettingById.do', '', data),

  /**
   * @param data
   * userAgreement 用户协议
   * registerAward 注册奖励
   * authenticationAward 实名认证
   */
  updateSetting: data => post('/setting/modifySetting.do', '', data),
};

export default SystemSettingApis;
