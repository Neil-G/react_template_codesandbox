import {
  USER_HOME_PATH,
  SEARCH_PATH,
  PROFILE_PAGE_PATH,
  MANAGE_PAGE_PATH,
} from './../constants/urlPaths'
import {
  HomePage,
  ProfilePage,
  SearchPage,
  ManagePage,
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
}

export const managePageConfig = {
  label: 'Manage',
  path: MANAGE_PAGE_PATH,
  PageComponent: ManagePage,
}

export const profilePageConfig = {
  label: 'Profile',
  path: PROFILE_PAGE_PATH,
  PageComponent: ProfilePage,
}

export default [
  homePageConfig,
  searchPageConfig,
  managePageConfig,
  profilePageConfig,
]
