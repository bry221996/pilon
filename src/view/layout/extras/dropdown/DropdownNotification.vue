<template>
  <div>
    <div
      class="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <h4 class="d-flex flex-center rounded-top">
        <span class="text-white">User Notifications</span>
      </h4>

      <ul
        class="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
        role="tablist"
      >
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="0"
            class="nav-link active"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Recent Activities
          </a>
        </li>
        <li class="nav-item">
          <a
            v-on:click="setActiveTab"
            data-tab="1"
            class="nav-link"
            data-toggle="tab"
            href="#"
            role="tab"
          >
            Notifications
          </a>
        </li>
      </ul>
    </div>

    <b-tabs class="hide-tabs" v-model="tabIndex">
      <b-tab active>
        <perfect-scrollbar
          class="navi navi-hover scroll my-4"
          style="max-height: 40vh; position: relative;"
          v-if="activities.length"
        >
          <template v-for="(item, i) in activities">
            <a
              href="#"
              class="navi-item"
              v-bind:key="i"
              @click.prevent="onClick(item.id)"
            >
              <div class="navi-link">
                <div class="navi-text">
                  <div class="font-weight-bold">
                    {{ item.title }}
                  </div>
                  <div class="text-muted">
                    {{ fromNow(item.created_at) }}
                  </div>
                </div>
              </div>
            </a>
          </template>
        </perfect-scrollbar>
        <div
          class="d-flex flex-center text-center font-weight-bold min-h-100px"
          v-else
        >
          No new notifications.
        </div>
      </b-tab>

      <b-tab>
        <perfect-scrollbar
          class="navi navi-hover scroll my-4"
          style="max-height: 40vh; position: relative;"
          v-if="notifications.length"
        >
          <template v-for="(item, i) in notifications">
            <a href="#" class="navi-item" v-bind:key="i" @click.prevent="onClick(item.id)">
              <div class="navi-link">
                <div class="navi-text">
                  <div class="font-weight-bold">
                    {{ item.title }}
                  </div>
                  <div class="text-muted">
                    {{ fromNow(item.created_at) }}
                  </div>
                </div>
              </div>
            </a>
          </template>
        </perfect-scrollbar>
        <div
          class="d-flex flex-center text-center font-weight-bold min-h-100px"
          v-else
        >
          No new notifications.
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style lang="scss">
/* hide default vue-bootstrap tab links */
.hide-tabs > div:not(.tab-content) {
  display: none;
}
</style>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "KTDropdownNotification",
  data() {
    return {
      tabIndex: 0,
      list1: [
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "primary",
          svg: process.env.BASE_URL + "media/svg/icons/Home/Library.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "warning",
          svg: process.env.BASE_URL + "media/svg/icons/Communication/Write.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "success",
          svg:
            process.env.BASE_URL +
            "media/svg/icons/Communication/Group-chat.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "danger",
          svg: process.env.BASE_URL + "media/svg/icons/General/Attachment2.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "info",
          svg:
            process.env.BASE_URL +
            "media/svg/icons/Communication/Shield-user.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "info",
          svg:
            process.env.BASE_URL +
            "media/svg/icons/Communication/Mail-notification.svg"
        },
        {
          title: "Briviba SaaS",
          desc: "PHP, SQLite, Artisan CLIмм",
          color: "info",
          svg: process.env.BASE_URL + "media/svg/icons/Design/Bucket.svg"
        }
      ],
      list2: [
        {
          title: "New report has been received",
          desc: "23 hrs ago",
          icon: "flaticon2-line-chart text-success"
        },
        {
          title: "Finance report has been generated",
          desc: "25 hrs ago",
          icon: "flaticon2-paper-plane text-danger"
        },
        {
          title: "New order has been received",
          desc: "2 hrs ago",
          icon: "flaticon2-user flaticon2-line- text-success"
        },
        {
          title: "New customer is registered",
          desc: "3 hrs ago",
          icon: "flaticon2-pin text-primary"
        },
        {
          title: "Application has been approved",
          desc: "3 hrs ago",
          icon: "flaticon2-sms text-danger"
        },
        {
          title: "New file has been uploaded",
          desc: "5 hrs ago",
          icon: "flaticon2-pie-chart-3 text-warning"
        },
        {
          title: "New user feedback received",
          desc: "8 hrs ago",
          icon: "flaticon-pie-chart-1 text-info"
        },
        {
          title: "System reboot has been successfully completed",
          desc: "12 hrs ago",
          icon: "flaticon2-settings text-success"
        },
        {
          title: "New order has been placed",
          desc: "15 hrs ago",
          icon: "flaticon-safe-shield-protection text-primary"
        },
        {
          title: "Company meeting canceled",
          desc: "19 hrs ago",
          icon: "flaticon2-notification text-primary"
        },
        {
          title: "New report has been received",
          desc: "23 hrs ago",
          icon: "flaticon2-fax text-success"
        },
        {
          title: "Finance report has been generated",
          desc: "25 hrs ago",
          icon: "flaticon-download-1 text-danger"
        }
      ]
    };
  },
  methods: {
    onClick(id) {
      this.$emit("item-selected");

      if (!this.$route.fullPath.includes(id)) {
        this.$router.push(`/notifications/${id}`);
      }
    },
    fromNow(date) {
      return moment(date).fromNow();
    },
    setActiveTab(event) {
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(event.target.getAttribute("data-tab"));

      // set current active tab
      event.target.classList.add("active");
    },
    fetch() {
      console.log(this.tabIndex);
    }
  },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/misc/bg-1.jpg";
    },
    ...mapState({
      activities: state => state.notifications.activities,
      notifications: state => state.notifications.notifications
    })
  }
};
</script>
