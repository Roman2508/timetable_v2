export const searchItemsByField = (items: any[] | any[][], key: string, searchValue: string) => {
  if (items[0].length) {
    // if items === any[][]
    const keys = Object.keys(items[0][0])
    const isKeyExist = keys.includes(key)

    if (isKeyExist) {
      return items.filter((el) => el[0][key].toLowerCase().includes(searchValue.toLowerCase()))
    }

    return items
  } else {
    // if items === any[]
    const keys = Object.keys(items[0])

    const isKeyExist = keys.includes(key)

    if (isKeyExist) {
      return items.filter((el) => el[key].toLowerCase().includes(searchValue.toLowerCase()))
    }

    return items
  }
}
