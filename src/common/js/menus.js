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
        authId: 8,
      },
      {
        title: '招聘列表',
        key: '1-2',
        path: '/recruitment-list',
        children: ['/recruitment-detail'],
        authId: 9,
      },
      {
        title: '招聘类型',
        key: '1-3',
        path: '/recruitment-type',
        children: ['/recruitment-operation'],
        authId: 10,
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
        children: ['/user-detail'],
        authId: 11,
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
        children: ['/news-operation'],
        authId: 12,
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
        children: ['/sites-operation'],
        authId: 13,
      },
      {
        title: '小程序banner',
        key: '4-2',
        path: '/applets-banner',
        children: ['/applets-operation'],
        authId: 14,
      },
      {
        title: '首页中部广告',
        key: '4-3',
        path: '/home-m-banner',
        children: ['/home-m-operation'],
        authId: 15,
      },
      {
        title: '首页底部广告',
        key: '4-4',
        path: '/home-b-banner',
        children: ['/home-b-operation'],
        authId: 16,
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
        children: ['/activity-operation', '/enroll-list'],
        authId: 17,
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
        authId: 18,
      },
      {
        title: '套餐管理',
        key: '6-2',
        path: '/package-management',
        authId: 19,
      },
      {
        title: '发票管理',
        key: '6-3',
        path: '/invoice-management',
        authId: 20,
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
        authId: 21,
      },
      {
        title: '账号管理',
        key: '7-2',
        path: '/account-management',
        children: ['/account-operation'],
        authId: 22,
      },
      {
        title: '权限管理',
        key: '7-3',
        path: '/authority-management',
        children: ['/authority-operation'],
        authId: 23,
      },
      {
        title: '操作日志',
        key: '7-4',
        path: '/operation-log',
        authId: 24,
      },
    ],
  },
];

export default menus;
