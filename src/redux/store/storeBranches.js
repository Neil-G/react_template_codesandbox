/*
|--------------------------------------------------------------------------
| Store branch initial states
|--------------------------------------------------------------------------
*/

const global = {
  isOpen: {
    topNav: false,
  },
}

/*
|--------------------------------------------------------------------------
| main export
|--------------------------------------------------------------------------
*/

export default {
  global,
  session: { userId: null },
  users: {},
  directMessages: {},
  items: {},
  forumPosts: {},
  forumThreads: {},
  group: {},
  groupMemberships: {},
  notes: {},
}
