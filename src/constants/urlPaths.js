export const ROOT_URL_PATH = ''
export const SettingsPath = '/settings'

/*
|--------------------------------------------------------------------------
| Top Level Paths
|--------------------------------------------------------------------------
*/
export const ONBOARDING_PAGE_PATH = [ROOT_URL_PATH, 'onboarding'].join('/')
export const HOME_PAGE_PATH = [ROOT_URL_PATH, 'home'].join('/')
export const SEARCH_PATH = [ROOT_URL_PATH, 'search'].join('/')
export const MANAGE_PAGE_PATH = [ROOT_URL_PATH, 'manage'].join('/')
export const MESSAGES_PAGE_PATH = [ROOT_URL_PATH, 'messages'].join('/')
export const FORUM_PAGE_PATH = [ROOT_URL_PATH, 'forum'].join('/')
export const PROFILE_PAGE_PATH = [ROOT_URL_PATH, 'profile'].join('/')
export const ITEMS_PAGE_PATH = [ROOT_URL_PATH, 'items'].join('/')

/*
|--------------------------------------------------------------------------
| Subpaths
|--------------------------------------------------------------------------
*/

// Onboarding Page Subpaths
export const ONBOARDING_PAGE_SUBPATHS = {
  FIRST: 'first',
  SECOND: 'second',
  TERMS: 'terms-and-conditions',
}

export const ONBOARDING_PAGE_PATHS = createPagePathnames(
  ONBOARDING_PAGE_PATH,
  ONBOARDING_PAGE_SUBPATHS,
)

// Search Page Paths
export const SEARCH_PAGE_SUBPATHS = {
  NEW: 'new',
  SEEN: 'seen',
  SAVED: 'saved',
  ALL: 'all',
}

// Message Page Paths
export const MESSAGE_PAGE_SUBPATHS = {
  NEW: 'new',
  READ: 'read',
  SAVED: 'saved',
  ARCHIVED: 'archived',
  ALL: 'all',
}

// Manage Page Paths
export const MANAGE_PAGE_SUBPATHS = {
  SCREENING: 'screening',
  INTERVIEW: 'interviewing',
  OFFERED: 'offered',
  REJECTED: 'rejected',
  ALL: 'all',
}

// Items Page Paths
export const ITEMS_PAGE_SUBPATHS = {
  PUBLIC: 'public',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  ALL: 'all',
}

// Forum Page Subpaths
export const FORUM_PAGE_SUBPATHS = {
  ALL: 'all',
  ISSUES: 'issues',
  RANDOM: 'random',
}

// Profile Page Subpaths
export const PROFILE_PAGE_SUBPATHS = {
  USER_INFO: 'user',
  LINKED_ACCOUNTS: 'linked-accounts',
}

export const PROFILE_PAGE_PATHS = createPagePathnames(
  PROFILE_PAGE_PATH,
  PROFILE_PAGE_SUBPATHS,
)

/*
|--------------------------------------------------------------------------
| Util methods
|--------------------------------------------------------------------------
*/

function createPagePathnames(rootPath, subPaths) {
  const paths = {}
  Object.entries(subPaths).forEach(([key, value]) => {
    paths[key] = [rootPath, value].join('/')
  })
  return paths
}
