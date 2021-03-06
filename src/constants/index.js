export const ALLOWED_WEBHOOKS = {
  THEME_CREATE: 'themes/create',
  THEME_PUBLISH: 'themes/publish',
  THEME_UPDATE: 'themes/update',
  THEME_DELETE: 'themes/delete',
  ORDER_PAID: 'orders/paid'
};

export const VAlIDATION_RESPONSE_CODE = {
  NOT_FOUND_SHOP: 'NOT_FOUND_SHOP',
  NOT_FOUND_THEMES: 'NOT_FOUND_THEMES',
  NOT_FOUND_WEBHOOKS: 'NOT_FOUND_WEBHOOKS',
  NOT_FOUND_SCRIPT_TAGS: 'NOT_FOUND_SCRIPT_TAGS',
  ACCESS_TOKEN_REQUIRED: 'ACCESS_TOKEN_REQUIRED',
  ACCESS_TOKEN_NOT_MATCH: 'ACCESS_TOKEN_NOT_MATCH'
};

export const THEME_STATUS = {
  ACTIVATED: 'ACTIVATED',
  SCHEDULED: 'SCHEDULED',
  NOT_READY: 'NOT_READY'
};

export const TRIGGER_TYPES = {
  SCRIPT_TAG: 'SCRIPT_TAG',
  WEBHOOK: 'WEBHOOK'
};

export const LOG_TYPES = {
  INVALID_HOOK_DATTA: 'INVALID_HOOK_DATTA',
  ADD_THEME: 'ADD_THEME',
  EDIT_THEME: 'EDIT_THEME',
  DEL_THEME: 'DEL_THEME',
  ADD_SCHEDULE: 'ADD_SCHEDULE',
  EDIT_SCHEDULE: 'EDIT_SCHEDULE',
  DEL_SCHEDULE: 'DEL_SCHEDULE',
  ADD_SUBSCRIBE: 'ADD_SUBSCRIBE',
  EDIT_SUBSCRIBE: 'EDIT_SUBSCRIBE',
  DEL_SUBSCRIBE: 'DEL_SUBSCRIBE',
  ADD_SUPPORT: 'ADD_SUPPORT',
  EDIT_SUPPORT: 'EDIT_SUPPORT',
  DEL_SUPPORT: 'DEL_SUPPORT',
  ADD_WEBHOOK: 'ADD_WEBHOOK',
  EDIT_WEBHOOK: 'EDIT_WEBHOOK',
  DEL_WEBHOOK: 'DEL_WEBHOOK',
  ADD_SCRIPT_TAG: 'ADD_SCRIPT_TAG',
  EDIT_SCRIPT_TAG: 'EDIT_SCRIPT_TAG',
  DEL_SCRIPT_TAG: 'DEL_SCRIPT_TAG'
};
