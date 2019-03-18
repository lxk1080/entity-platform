import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const EnterpriseList = () => import('components/enterprise-list/enterprise-list');
const EnterpriseDetail = () => import('components/enterprise-list/enterprise-detail');
const RecruitmentList = () => import('components/recruitment-list/recruitment-list');
const RecruitmentDetail = () => import('components/recruitment-list/recruitment-detail');
const RecruitmentType = () => import('components/recruitment-type/recruitment-type');
const RecruitmentOperation = () => import('components/recruitment-type/recruitment-operation');
const UserList = () => import('components/user-management/user-list');
const UserDetail = () => import('components/user-management/user-detail');
const NewsList = () => import('components/news-list/news-list');
const SitesBanner = () => import('components/sites-banner/sites-banner');
const AppletsBanner = () => import('components/applets-banner/applets-banner');
const HomeMBanner = () => import('components/home-m-banner/home-m-banner');
const HomeBBanner = () => import('components/home-b-banner/home-b-banner');
const ActivityList = () => import('components/activity-list/activity-list');
const OrderList = () => import('components/order-list/order-list');
const PackageManagement = () => import('components/package-management/package-management');
const InvoiceManagement = () => import('components/invoice-management/invoice-management');
const DataStatistics = () => import('components/data-statistics/data-statistics');
const AccountManagement = () => import('components/account-management/account-management');
const AuthorityManagement = () => import('components/authority-management/authority-management');
const OperationLog = () => import('components/operation-log/operation-log');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/enterprise-list',
    },
    {
      path: '/enterprise-list',
      component: EnterpriseList,
    },
    {
      path: '/enterprise-detail/:id',
      component: EnterpriseDetail,
    },
    {
      path: '/recruitment-list',
      component: RecruitmentList,
      children: [
        {
          path: '/recruitment-detail/:id',
          component: RecruitmentDetail,
        },
      ],
    },
    {
      path: '/recruitment-type',
      component: RecruitmentType,
      children: [
        {
          path: '/recruitment-operation/:id',
          component: RecruitmentOperation,
        },
      ],
    },
    {
      path: '/user-list',
      component: UserList,
      children: [
        {
          path: '/user-detail/:id',
          component: UserDetail,
        },
      ],
    },
    {
      path: '/news-list',
      component: NewsList,
    },
    {
      path: '/sites-banner',
      component: SitesBanner,
    },
    {
      path: '/applets-banner',
      component: AppletsBanner,
    },
    {
      path: '/home-m-banner',
      component: HomeMBanner,
    },
    {
      path: '/home-b-banner',
      component: HomeBBanner,
    },
    {
      path: '/activity-list',
      component: ActivityList,
    },
    {
      path: '/order-list',
      component: OrderList,
    },
    {
      path: '/package-management',
      component: PackageManagement,
    },
    {
      path: '/invoice-management',
      component: InvoiceManagement,
    },
    {
      path: '/data-statistics',
      component: DataStatistics,
    },
    {
      path: '/account-management',
      component: AccountManagement,
    },
    {
      path: '/authority-management',
      component: AuthorityManagement,
    },
    {
      path: '/operation-log',
      component: OperationLog,
    },
  ],
});
