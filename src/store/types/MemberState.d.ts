type MemberState = {
  members: Member[];
};

export type Member = {
  id: string;
  name: string;
  group: string;
  deposit: number;
};

export default MemberState;
