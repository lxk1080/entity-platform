import { colors } from 'common/js/constants';

export const searchTypeList = [
  { id: 1, name: '发布人' },
  { id: 2, name: '岗位标题' },
  { id: 3, name: '岗位类型' },
  { id: 4, name: '招聘周期' },
  { id: 5, name: '发布时间' },
  { id: 6, name: '状态' },
];

export const recruitTypeList = [
  { id: 1,
    name: '实习招聘',
    color: colors.info,
    remunerationUnits: [
      { id: 2, name: '天' },
      { id: 4, name: '月' },
    ],
    clearingTypes: [
      { id: 1, name: '日结' },
      { id: 3, name: '月结' },
    ],
  },
  {
    id: 2,
    name: '兼职招聘',
    color: colors.success,
    remunerationUnits: [
      { id: 1, name: '小时' },
      { id: 2, name: '天' },
      { id: 3, name: '周' },
      { id: 4, name: '月' },
      { id: 5, name: '次' },
      { id: 6, name: '其他' },
    ],
    clearingTypes: [
      { id: 1, name: '日结' },
      { id: 2, name: '周结' },
      { id: 3, name: '月结' },
      { id: 4, name: '完工结' },
      { id: 5, name: '其他方式' },
    ],
  },
];

export const recruitStatusList = [
  { id: 1, name: '招聘中', color: colors.success, operationText: '暂停', operationId: 2 },
  { id: 2, name: '暂停中', color: colors.error, operationText: '开始', operationId: 1 },
  { id: 3, name: '已结束', color: colors.info, operationText: '操作' },
];

export const accommodations = ['包住宿', '包工作餐', '交通补助', '加班补助', '有提成', '奖金奖励', '转正机会'];

export const workDateTypes = {
  noAssign: {
    id: 1,
    name: '无指定日期',
    children: [
      { id: 1, name: '任意日期' },
      { id: 2, name: '周末节假日' },
      { id: 3, name: '工作日' },
      { id: 4, name: '依据个人时间安排' },
    ],
  },
  assign: {
    id: 2,
    name: '指定日期',
    children: [],
  },
};
