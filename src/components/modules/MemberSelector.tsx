import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {hp} from '../../helpers/Helpers';
import {StoreNames} from '../../store/config';
import {Member} from '../../store/types/MemberState';
import {COLORS} from '../../themes';
import StoreState from '../../types/store';

type Props = {
  onGroupSelected?: (group: string) => void;
  onMemberSelected?: (member: Member) => void;
};

const MemberSelector = ({onMemberSelected, onGroupSelected}: Props) => {
  const {members} = useSelector(
    (state: StoreState) => state[StoreNames.MEMBER],
  );

  const {groups} = useSelector((state: StoreState) => state[StoreNames.GROUP]);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const [groupSelectorVisible, setGroupSelectorVisible] = useState(false);
  const [memberSelectorVisible, setMemberSelectorVisible] = useState(false);

  const groupSelectorItems = useMemo(() => {
    return groups.map(group => ({
      label: `Group: ${group}`,
      value: group,
    }));
  }, [groups]);

  const memberSelectorItems = useMemo(() => {
    if (selectedGroup === null) {
      return [];
    }
    const groupMembers = members.filter(
      member => member.group === selectedGroup,
    );
    return groupMembers.map(member => ({
      label: member.name,
      value: member.id,
    }));
  }, [members, selectedGroup]);

  useEffect(() => {
    if (selectedMember === null || onMemberSelected === undefined) {
      return;
    }
    const member = members.find(m => m.id === selectedMember);
    if (member) {
      onMemberSelected(member);
    }
  }, [selectedMember, members, onMemberSelected]);

  useEffect(() => {
    if (onGroupSelected === undefined) {
      return;
    }
    if (selectedGroup) {
      onGroupSelected(selectedGroup);
    }
  }, [selectedGroup, onGroupSelected]);

  return (
    <View>
      <View style={styles.mt1} />
      <DropDownPicker
        placeholder="ग्रुप चुनें"
        modalTitle="ग्रुप चुनें"
        open={groupSelectorVisible}
        value={selectedGroup}
        items={groupSelectorItems}
        setOpen={setGroupSelectorVisible}
        setValue={setSelectedGroup}
        itemSeparator
        itemSeparatorStyle={styles.dropDownSeparator}
        modalContentContainerStyle={styles.dropDownContainer}
        listMode="MODAL"
      />
      <View style={styles.mt1} />
      <DropDownPicker
        placeholder="सदस्य चुनें"
        modalTitle="सदस्य चुनें"
        items={memberSelectorItems}
        open={memberSelectorVisible}
        setOpen={setMemberSelectorVisible}
        value={selectedMember}
        setValue={setSelectedMember}
        itemSeparator
        itemSeparatorStyle={styles.dropDownSeparator}
        modalContentContainerStyle={styles.dropDownContainer}
        listMode="MODAL"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownSeparator: {
    height: 1,
    backgroundColor: COLORS.GRAY,
  },
  dropDownContainer: {
    backgroundColor: COLORS.BACKGROUND,
  },
  mt1: {
    marginTop: hp(1),
  },
});

export default MemberSelector;
