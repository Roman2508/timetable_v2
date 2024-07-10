export const sortItemsByKey = (items: any[], key: string) => {
  const itemsDeepCopy = JSON.parse(JSON.stringify(items))
  return itemsDeepCopy.sort((a: any, b: any) => a[key].toLowerCase().localeCompare(b[key].toLowerCase()))
  //   return itemsDeepCopy.sort((a: any, b: any) => a[key] - b[key])
}
