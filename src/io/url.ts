

export const url = `http://localhost:3000/dapp/api/v1/`

export const Method = {
  register: "member.register",
  query: "member.query",
  bound: "member.bound",
  unbound: "member.unbound",
}


export interface Resp {
  msg: string;
  code: number;
}
export interface Member {
  wallet: string;
  wallet2: string;
  tg_id?: string;
  nick_name?: string;
  logo_url?: string;
}
export interface RegisterResp extends Resp {
  data: Member;
}
export interface BoundResp extends Resp {
  data: Member;
}

export interface UnboundResp extends Resp {
  data: Member;
}