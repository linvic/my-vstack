import { isDebug } from "@/utils";
import axios from "./axio";
import { Method, RegisterResp, url } from "./url";



export async function register(account: string): Promise<RegisterResp> {
  const resp = await axios.post(url, { account, method: Method.register });
  isDebug() && console.log(`RegisterResp ${JSON.stringify(resp.data)}`);
  return resp.data as RegisterResp;
}

export async function query(account: string): Promise<RegisterResp> {
  const resp = await axios.post(url, { account, method: Method.query });
  isDebug() && console.log(`query ${JSON.stringify(resp.data)}`);

  return resp.data as RegisterResp;
}
export async function bound(account: string, tg_id: string): Promise<RegisterResp> {
  const resp = await axios.post(url, { account, method: Method.bound, tg_id });
  isDebug() && console.log(`bound ${JSON.stringify(resp.data)}`);

  return resp.data as RegisterResp;
}
export async function unbound(account: string): Promise<RegisterResp> {
  const resp = await axios.post(url, { account, method: Method.unbound });
  isDebug() && console.log(`unbound ${JSON.stringify(resp.data)}`);

  return resp.data as RegisterResp;
}
