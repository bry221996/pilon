import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/investments",
          component: () => import("@/view/pages/investment/Index.vue"),
          children: [
            {
              path: "user",
              component: () =>
                import("@/view/pages/investment/MyInvestments.vue")
            },
            {
              path: "available",
              component: () =>
                import("@/view/pages/investment/AvailableInvestments.vue")
            },
            {
              path: "history",
              component: () =>
                import("@/view/pages/investment/InvestmentHistory.vue")
            }
          ]
        },
        {
          path: "investment/:id",
          component: () =>
            import("@/view/pages/investment/InvestmentDetails.vue")
        },
        {
          path: "statements",
          component: () => import("@/view/pages/MonthlyStatement.vue")
        },
        {
          path: "projects/:id",
          component: () => import("@/view/pages/project/ProjectDetails.vue")
        },
        {
          path: "auto-invest",
          component: () => import("@/view/pages/auto-invest/Index.vue"),
          children: [
            {
              path: "/",
              component: () => import("@/view/pages/auto-invest/List.vue")
            },
            {
              path: "create",
              component: () => import("@/view/pages/auto-invest/Create.vue")
            },
            {
              path: ":id",
              component: () => import("@/view/pages/auto-invest/Edit.vue")
            }
          ]
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/view/pages/profile/Index.vue"),
          redirect: "/profile/personal-details",
          children: [
            {
              path: "personal-details",
              name: "personal-details",
              component: () =>
                import("@/view/pages/profile/PersonalDetails.vue")
            },
            {
              path: "company-details",
              name: "company-details",
              component: () => import("@/view/pages/profile/CompanyDetails.vue")
            },
            {
              path: "bank-account",
              name: "bank-account",
              component: () => import("@/view/pages/profile/BankAccount.vue")
            },
            {
              path: "credit-card",
              name: "credit-card",
              component: () => import("@/view/pages/profile/CreditCard.vue")
            }
          ]
        },
        {
          path: "/funds",
          name: "funds",
          component: () => import("@/view/pages/funds/Index.vue"),
          children: [
            {
              path: "overview",
              name: "funds-overview",
              component: () => import("@/view/pages/funds/Overview.vue")
            },
            {
              path: "topup",
              name: "funds-topup",
              component: () => import("@/view/pages/funds/TopUp.vue")
            },
            {
              path: "withdraw",
              name: "funds-withdraw",
              component: () => import("@/view/pages/funds/Withdraw.vue")
            },
            {
              path: "history",
              name: "funds-history",
              component: () => import("@/view/pages/funds/History.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/statements/:id",
      component: () => import("@/view/pages/Statement.vue")
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Auth"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Register")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
