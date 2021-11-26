
export const setChilds = (data) => {
    return {
      type:'SET_CHILDS',
      payload:data
    }
  }

  export const setTimeZone = (data) => {
    return {
      type:'SET_TIMEZONE',
      payload:data
    }
  }

  export const setLocalCurrency = (data) => {
    return {
      type:'SET_CURRENCY',
      payload:data
    }
  }
  
  export const setLocalRate = (data) => {
    return {
      type:'SET_LEARNING_RATE',
      payload:data
    }
  }

  
export const setAllNotifications = (data) => {
  return {
    type:'SET_NOTIFICATIONS',
    payload:data
  }
}