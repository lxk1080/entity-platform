const menus = [
  {
    title: '企业招聘',
    key: '1',
    subMenus: [
      {
        title: '企业列表',
        key: '1-1',
        path: '/enterprise-list',
        children: ['/enterprise-detail'],
      },
      {
        title: '招聘列表',
        key: '1-2',
        path: '/recruitment-list',
        children: ['/recruitment-detail'],
      },
      {
        title: '招聘类型',
        key: '1-3',
        path: '/recruitment-type',
        children: ['/recruitment-operation'],
      },
    ],
  },
  {
    title: '用户管理',
    key: '2',
    subMenus: [
      {
        title: '用户列表',
        key: '2-1',
        path: '/user-list',
      },
    ],
  },
  {
    title: '新闻管理',
    key: '3',
    subMenus: [
      {
        title: '新闻列表',
        key: '3-1',
        path: '/news-list',
      },
    ],
  },
  {
    title: '广告管理',
    key: '4',
    subMenus: [
      {
        title: '网站banner',
        key: '4-1',
        path: '/sites-banner',
      },
      {
        title: '小程序banner',
        key: '4-2',
        path: '/applets-banner',
      },
      {
        title: '首页中部广告',
        key: '4-3',
        path: '/home-m-banner',
      },
      {
        title: '首页底部广告',
        key: '4-4',
        path: '/home-b-banner',
      },
    ],
  },
  {
    title: '活动管理',
    key: '5',
    subMenus: [
      {
        title: '活动列表',
        key: '5-1',
        path: '/activity-list',
      },
    ],
  },
  {
    title: '财务管理',
    key: '6',
    subMenus: [
      {
        title: '订单列表',
        key: '6-1',
        path: '/order-list',
      },
      {
        title: '套餐管理',
        key: '6-2',
        path: '/package-management',
      },
      {
        title: '发票管理',
        key: '6-3',
        path: '/invoice-management',
      },
    ],
  },
  {
    title: '系统设置',
    key: '7',
    subMenus: [
      {
        title: '数据统计',
        key: '7-1',
        path: '/data-statistics',
      },
      {
        title: '账号管理',
        key: '7-2',
        path: '/account-management',
      },
      {
        title: '权限管理',
        key: '7-3',
        path: '/authority-management',
      },
      {
        title: '操作日志',
        key: '7-4',
        path: '/operation-log',
      },
    ],
  },
];

export default menus;
