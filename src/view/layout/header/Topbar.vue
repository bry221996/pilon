<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: Notifications -->
    <b-dropdown
      size="sm"
      variant="link"
      toggle-class="topbar-item text-decoration-none"
      no-caret
      right
      no-flip
      ref="dropdown"
      @show="onShow"
    >
      <template v-slot:button-content>
        <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
          <span class="svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src="media/pilons/pilon_notification.svg"></inline-svg>
          </span>
          <span v-if="unreadCount" class="pulse-ring notif-count">{{
            unreadCount
          }}</span>
        </div>
      </template>
      <b-dropdown-text tag="div" class="min-w-md-350px">
        <form>
          <KTDropdownNotification
            ref="notifications"
            @item-selected="itemSelected"
          ></KTDropdownNotification>
        </form>
      </b-dropdown-text>
    </b-dropdown>
    <!--end: Notifications -->

    <!--begin: Quick Actions -->
    <!-- <b-dropdown
      size="sm"
      variant="link"
      toggle-class="topbar-item text-decoration-none"
      no-caret
      right
      no-flip
    >
      <template v-slot:button-content>
        <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
          <span class="svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src="media/svg/icons/Media/Equalizer.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text tag="div" class="min-w-md-350px">
        <KTDropdownQuickAction></KTDropdownQuickAction>
      </b-dropdown-text>
		</b-dropdown>-->
    <!--end: Quick Actions -->

    <!--begin: My Cart -->
    <!-- <b-dropdown
      size="sm"
      variant="link"
      toggle-class="topbar-item text-decoration-none"
      no-caret
      right
      no-flip
    >
      <template v-slot:button-content>
        <div class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
          <span class="svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg src="media/svg/icons/Shopping/Cart3.svg" />
          </span>
        </div>
      </template>
      <b-dropdown-text tag="div" class="min-w-md-350px">
        <KTDropdownMyCart></KTDropdownMyCart>
      </b-dropdown-text>
		</b-dropdown>-->
    <!--end: My Cart -->

    <!--begin: Quick panel toggle -->
    <!-- <KTQuickPanel></KTQuickPanel> -->
    <!--end: Quick panel toggle -->

    <!--begin: Language bar -->
    <!-- <div class="topbar-item">
      <b-dropdown
        size="sm"
        variant="link"
        toggle-class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 text-decoration-none"
        no-caret
        right
        no-flip
      >
        <template v-slot:button-content>
          <img
            class="h-20px w-20px rounded-sm"
            :src="languageFlag || getLanguageFlag"
            alt=""
          />
        </template>
        <b-dropdown-text tag="div" class="min-w-md-175px">
          <KTDropdownLanguage
            v-on:language-changed="onLanguageChanged"
          ></KTDropdownLanguage>
        </b-dropdown-text>
		</b-dropdown>-->
    <!-- </div> -->
    <!--end: Language bar -->

    <!--begin: User Bar -->
    <!-- <KTQuickUser></KTQuickUser> -->
    <!--end: User Bar -->
  </div>
  <!-- end:: Header Topbar -->
</template>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }

  .notif-count {
    min-height: 1.5rem !important;
    min-width: 1.5rem !important;
    background: red;
    color: white;
    border-radius: 50%;
    margin-left: -0.5rem;
  }
}
</style>

<script>
import KTDropdownNotification from "@/view/layout/extras/dropdown/DropdownNotification.vue";
import i18nService from "@/core/services/i18n.service.js";
import ApiService from "@/core/services/api.service";

import {
  GET_NOTIFICATIONS,
  GET_ACTIVITIES
} from "@/core/services/store/notifications.module";

export default {
  name: "KTTopbar",
  data() {
    return {
      languageFlag: "",
      languages: i18nService.languages,
      unread: []
    };
  },
  components: {
    KTDropdownNotification
  },
  mounted() {
    ApiService.get("/notification/message/summary").then(({ data }) => {
      this.unread = data.data.total_unread;
    });
  },
  methods: {
    onLanguageChanged() {
      this.languageFlag = this.languages.find(val => {
        return val.lang === i18nService.getActiveLanguage();
      }).flag;
    },
    onShow() {
      this.$store.dispatch(GET_NOTIFICATIONS);
      this.$store.dispatch(GET_ACTIVITIES);
    },
    itemSelected() {
      this.$refs.dropdown.hide(true);
    }
  },
  computed: {
    unreadCount() {
      return this.unread.length;
    },
    getLanguageFlag() {
      return this.onLanguageChanged();
    }
  }
};
</script>
