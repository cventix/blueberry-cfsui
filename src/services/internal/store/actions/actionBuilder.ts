export const actionBuilder = (type: string, ...argNames: Array<any>) => {
  return function(...args: any) {
    const action: any = { type }
    argNames.forEach((arg: string, index: number) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}
