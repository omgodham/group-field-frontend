
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