import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Login = () => import('components/login/login');
const EnterpriseList = () => import('components/enterprise-list/enterprise-list');
const EnterpriseDetail = () => import('components/enterprise-list/enterprise-detail');
const RecruitmentList = () => import('components/recruitment-list/recruitment-list');
const RecruitmentDetail = () => import('components/recruitment-list/recruitment-detail');
const RecruitmentType = () => import('components/recruitment-type/recruitment-type');
const RecruitmentOperation = () => import('components/recruitment-type/recruitment-operation');
const UserList = () => import('components/user-management/user-list');
const UserDetail = () => import('components/user-management/user-detail');
const NewsList = () => import('components/news-list/news-list');
const NewsOperation = () => import('components/news-list/news-operation');
const SitesBanner = () => import('components/sites-banner/sites-banner');
const SitesOperation = () => import('components/sites-banner/sites-operation');
const AppletsBanner = () => import('components/applets-banner/applets-banner');
const AppletsOperation = () => import('components/applets-banner/applets-operation');
const HomeMBanner = () => import('components/home-m-banner/home-m-banner');
const HomeMOperation = () => import('components/home-m-banner/home-m-operation');
const HomeBBanner = () => import('components/home-b-banner/home-b-banner');
const HomeBOperation = () => import('components/home-b-banner/home-b-operation');
const ActivityList = () => import('components/activity-list/activity-list');
const ActivityOperation = () => import('components/activity-list/activity-operation');
const enrollList = () => import('components/activity-list/enroll-list');
const OrderList = () => import('components/order-list/order-list');
const PackageManagement = () => import('components/package-management/package-management');
const PackageOperation = () => import('components/package-management/package-operation');
const InvoiceManagement = () => import('components/invoice-management/invoice-management');
const InvoiceDetail = () => import('components/invoice-management/invoice-detail');
const DataStatistics = () => import('components/data-statistics/data-statistics');
const AccountManagement = () => import('components/account-management/account-management');
const AccountOperation = () => import('components/account-management/account-operation');
const AuthorityManagement = () => import('components/authority-management/authority-management');
const AuthorityOperation = () => import('components/authority-management/authority-operation');
const OperationLog = () => import('components/operation-log/operation-log');
const SystemSetting = () => import('components/system-setting/system-setting');
const authorityMiss = () => import('components/authority-miss/authority-miss');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
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
      children: [
        {
          path: '/news-operation/:id',
          component: NewsOperation,
        },
      ],
    },
    {
      path: '/sites-banner',
      component: SitesBanner,
      children: [
        {
          path: '/sites-operation/:id',
          component: SitesOperation,
        },
      ],
    },
    {
      path: '/applets-banner',
      component: AppletsBanner,
      children: [
        {
          path: '/applets-operation/:id',
          component: AppletsOperation,
        },
      ],
    },
    {
      path: '/home-m-banner',
      component: HomeMBanner,
      children: [
        {
          path: '/home-m-operation/:id',
          component: HomeMOperation,
        },
      ],
    },
    {
      path: '/home-b-banner',
      component: HomeBBanner,
      children: [
        {
          path: '/home-b-operation/:id',
          component: HomeBOperation,
        },
      ],
    },
    {
      path: '/activity-list',
      component: ActivityList,
      children: [
        {
          path: '/activity-operation/:id',
          component: ActivityOperation,
        },
        {
          path: '/enroll-list/:id',
          component: enrollList,
        },
      ],
    },
    {
      path: '/order-list',
      component: OrderList,
    },
    {
      path: '/package-management',
      component: PackageManagement,
      children: [
        {
          path: '/package-operation/:id',
          component: PackageOperation,
        },
      ],
    },
    {
      path: '/invoice-management',
      component: InvoiceManagement,
      children: [
        {
          path: '/invoice-detail/:id',
          component: InvoiceDetail,
        },
      ],
    },
    {
      path: '/data-statistics',
      component: DataStatistics,
    },
    {
      path: '/account-management',
      component: AccountManagement,
      children: [
        {
          path: '/account-operation/:id',
          component: AccountOperation,
        },
      ],
    },
    {
      path: '/authority-management',
      component: AuthorityManagement,
      children: [
        {
          path: '/authority-operation/:id',
          component: AuthorityOperation,
        },
      ],
    },
    {
      path: '/operation-log',
      component: OperationLog,
    },
    {
      path: '/system-setting',
      component: SystemSetting,
    },
    {
      path: '/authority-miss',
      component: authorityMiss,
    },
  ],
});
