export const convertOptionSelect = (data) => {
    if (!data || data.length === 0) return []
  
    return data.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    })
  
  }
  export const convertOptionSelectTwo = (data) => {
    if (!data || data.length === 0) return []
  
    return data.map((item) => {
      return {
        value: item._id,
        label: item.status,
      };
    })
  
  }
  export const convertOptionSelectOne = (data) => {
    if (!data || data.length === 0) return []
  
    return data.map((item) => {
      return {
        value: item._id,
        label: item.fullName,
      };
    })
  
  }