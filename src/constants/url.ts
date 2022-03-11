function addPrefix(path: string): string {
  return path
}

export const Path = {
  index: "*",
  locker: addPrefix("/locker"),
  todo: addPrefix("/todo"),
  debug: addPrefix("/debug"),
  tools: addPrefix("/tools"),
  swap: addPrefix("/swap"),
  member: addPrefix("/me"),
  buy: addPrefix("/buy"),
  buy2: addPrefix("/buy2"),
  divide: addPrefix("/divide"),
}

export const Website = {
  website: 'http://cowboyplayer.com/',
  dapp: 'http://cowboyplayer.com/dapp/',
}