import {
  USER_HOME_PATH,
  SEARCH_PATH,
  PROFILE_PAGE_PATH,
  MANAGE_PAGE_PATH,
  MESSAGES_PAGE_PATH,
  FORUM_PAGE_PATH,
  SEARCH_PAGE_SUBPATHS,
} from './../constants/urlPaths'
import {
  HomePage,
  ProfilePage,
  SearchPage,
  ManagePage,
  MessagesPage,
  ForumPage,
} from './../components/pages'

export const homePageConfig = {
  label: 'Home',
  path: USER_HOME_PATH,
  PageComponent: HomePage,
}

export const searchPageConfig = {
  label: 'Search',
  path: SEARCH_PATH,
  PageComponent: SearchPage,
  showFooter: false,
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
}

export const messagesPageConfig = {
  label: 'Messages',
  path: MESSAGES_PAGE_PATH,
  PageComponent: MessagesPage,
}

export const forumPageConfig = {
  label: 'Forum',
  path: FORUM_PAGE_PATH,
  PageComponent: ForumPage,
}

export const profilePageConfig = {
  label: 'Profile',
  path: PROFILE_PAGE_PATH,
  PageComponent: ProfilePage,
}

export const allPageConfigs = [
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]

export default [
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  messagesPageConfig,
  forumPageConfig,
  profilePageConfig,
]
