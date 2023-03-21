import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Member} from '../../store/types/MemberState';

const fetchMembers = async (): Promise<Member[]> => {
  const user = auth().currentUser;
  if (user === null) {
    return [];
  }
  const membersCollection = await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .get();

  const members: Member[] = [];
  membersCollection.forEach(doc => {
    const data = doc.data();
    if (data !== undefined) {
      members.push({
        id: doc.id,
        name: data.name,
        group: data.group,
        deposit: data.deposit,
      });
    }
  });
  return members;
};

const addMember = async (member: Omit<Member, 'id'>) => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }
  const doc = await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .add(member);

  return doc.id;
};

const updateMember = async (member: Omit<Member, 'group'>) => {
  const user = auth().currentUser;
  if (user === null) {
    return null;
  }

  await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .doc(member.id)
    .update(member);
  return null;
};

const deleteMember = async (id: string) => {
  const user = auth().currentUser;
  if (user === null) {
    return;
  }
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .collection('Members')
    .doc(id)
    .delete();
};

const Settings = {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
};

export default Settings;
