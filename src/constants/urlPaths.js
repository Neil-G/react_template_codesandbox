export const ROOT_URL_PATH = ''
export const SettingsPath = '/settings'

// Top-level pages
export const USER_HOME_PATH = [ROOT_URL_PATH, 'home'].join('/')
export const SEARCH_PATH = [ROOT_URL_PATH, 'search'].join('/')
export const MANAGE_PAGE_PATH = [ROOT_URL_PATH, 'manage'].join('/')
export const MESSAGES_PAGE_PATH = [ROOT_URL_PATH, 'messages'].join('/')
export const FORUM_PAGE_PATH = [ROOT_URL_PATH, 'forum'].join('/')
export const PROFILE_PAGE_PATH = [ROOT_URL_PATH, 'profile'].join('/')
export const ITEMS_PAGE_PATH = [ROOT_URL_PATH, 'items'].join('/')

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
  INTERVIEW: 'interview',
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

export const FORUM_PAGE_SUBPATHS = {
  ALL: 'all',
  ISSUES: 'issues',
  RANDOM: 'random',
}

export const PROFILE_PAGE_SUBPATHS = {
  USER_INFO: 'user',
  LINKED_ACCOUNTS: 'linked-accounts',
}
