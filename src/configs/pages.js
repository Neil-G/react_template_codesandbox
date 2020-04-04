import {
  ONBOARDING_PAGE_PATH,
  HOME_PAGE_PATH,
  SEARCH_PATH,
  PROFILE_PAGE_PATH,
  MANAGE_PAGE_PATH,
  MESSAGES_PAGE_PATH,
  FORUM_PAGE_PATH,
  SEARCH_PAGE_SUBPATHS,
  MESSAGE_PAGE_SUBPATHS,
  ITEMS_PAGE_PATH,
  MANAGE_PAGE_SUBPATHS,
  ITEMS_PAGE_SUBPATHS,
  FORUM_PAGE_SUBPATHS,
  PROFILE_PAGE_SUBPATHS,
  ONBOARDING_PAGE_SUBPATHS,
} from './../constants/urlPaths'
import {
  OnboardingPage,
  HomePage,
  ProfilePage,
  SearchPage,
  ManagePage,
  MessagesPage,
  ForumPage,
  ItemsPage,
} from './../components/pages'

export const onboardingPageConfig = {
  label: 'Onboarding',
  path: ONBOARDING_PAGE_PATH,
  PageComponent: OnboardingPage,
  redirects: [
    {
      from: ONBOARDING_PAGE_PATH,
      to: [ONBOARDING_PAGE_PATH, ONBOARDING_PAGE_SUBPATHS.FIRST].join('/'),
    },
  ],
}

export const homePageConfig = {
  label: 'Home',
  path: HOME_PAGE_PATH,
  PageComponent: HomePage,
}

export const searchPageConfig = {
  label: 'Search',
  path: SEARCH_PATH,
  PageComponent: SearchPage,
  showFooter: false,
  subRoutes: Object.keys(SEARCH_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [SEARCH_PATH, SEARCH_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: SEARCH_PATH,
      to: [SEARCH_PATH, SEARCH_PAGE_SUBPATHS.NEW].join('/'),
    },
  ],
}

export const managePageConfig = {
  label: 'Manage',
  path: MANAGE_PAGE_PATH,
  PageComponent: ManagePage,
  subRoutes: Object.keys(MANAGE_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [MANAGE_PAGE_PATH, MANAGE_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: MANAGE_PAGE_PATH,
      to: [MANAGE_PAGE_PATH, MANAGE_PAGE_SUBPATHS.SCREENING].join('/'),
    },
  ],
}

export const messagesPageConfig = {
  label: 'Messages',
  path: MESSAGES_PAGE_PATH,
  PageComponent: MessagesPage,
  subRoutes: Object.keys(MESSAGE_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [MESSAGES_PAGE_PATH, MESSAGE_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: MESSAGES_PAGE_PATH,
      to: [MESSAGES_PAGE_PATH, MESSAGE_PAGE_SUBPATHS.NEW].join('/'),
    },
  ],
}

export const forumPageConfig = {
  label: 'Forum',
  path: FORUM_PAGE_PATH,
  PageComponent: ForumPage,
  subRoutes: Object.keys(FORUM_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [FORUM_PAGE_PATH, FORUM_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: FORUM_PAGE_PATH,
      to: [FORUM_PAGE_PATH, FORUM_PAGE_SUBPATHS.ALL].join('/'),
    },
  ],
}

export const profilePageConfig = {
  label: 'Profile',
  path: PROFILE_PAGE_PATH,
  PageComponent: ProfilePage,
  subRoutes: Object.keys(PROFILE_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [PROFILE_PAGE_PATH, PROFILE_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: PROFILE_PAGE_PATH,
      to: [PROFILE_PAGE_PATH, PROFILE_PAGE_SUBPATHS.USER_INFO].join('/'),
    },
  ],
}

export const itemsPageConfig = {
  label: 'Items',
  path: ITEMS_PAGE_PATH,
  PageComponent: ItemsPage,
  subRoutes: Object.keys(ITEMS_PAGE_SUBPATHS).map(subpath => {
    return {
      label: subpath,
      path: [ITEMS_PAGE_PATH, ITEMS_PAGE_SUBPATHS[subpath]].join('/'),
    }
  }),
  redirects: [
    {
      from: ITEMS_PAGE_PATH,
      to: [ITEMS_PAGE_PATH, ITEMS_PAGE_SUBPATHS.PUBLIC].join('/'),
    },
  ],
}

export const allPageConfigs = [
  onboardingPageConfig,
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
  itemsPageConfig,
]
