import { Address } from "@/constants";

type State = {
  account?: string,
  token?: string,
  locker: string,
}
type Action = {
  type: 'update_state',
  data: State
}
const initState: State = {
  account: '',
  token: '',
  locker: Address.LOCKER,
}
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'update_state':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
export { reducer, initState };