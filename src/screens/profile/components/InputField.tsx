import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Row} from '../../../components/root';
import {hp, wp} from '../../../helpers/Helpers';
import {COLORS} from '../../../themes';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

type InputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

const InputField = (props: InputFieldProps) => {
  const {value, onChangeText, placeholder, icon: Icon} = props;

  return (
    <Row style={[styles.inputWrapper, styles.border]}>
      <Icon style={styles.placeholderImage} />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY}
      />
    </Row>
  );
};

type DateInputFieldProps = {
  value: string;
  onChangeDate: (date: moment.Moment) => void;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  minDate: string;
};

const DateInputField = (props: DateInputFieldProps) => {
  const {value, onChangeDate, icon: Icon} = props;

  const [isDatePickerOpen, setDatePickerOpen] = React.useState(false);
  const onDatePickerClose = (date?: Date | undefined) => {
    setDatePickerOpen(false);
    if (date !== undefined) {
      onChangeDate(moment(date));
    }
  };

  return (
    <View>
      <Row style={[styles.inputWrapper, styles.border]}>
        <Icon style={styles.placeholderImage} />
        <Button style={styles.input} onClick={() => setDatePickerOpen(true)}>
          <Text style={styles.dateInfo}>{value || 'YYYY-MM-DD'}</Text>
        </Button>
      </Row>
      <DateTimePickerModal
        isVisible={isDatePickerOpen}
        mode="date"
        onConfirm={onDatePickerClose}
        onCancel={onDatePickerClose}
        minimumDate={moment(props.minDate, 'MM-YYYY').toDate()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: wp(90),
    height: hp(6),
    paddingHorizontal: wp(2),
    justifyContent: 'space-evenly',
  },
  border: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.ACTION_LIGHT,
  },
  input: {
    color: COLORS.BLACK,
    flex: 1,
    fontSize: wp(3.5),
  },
  placeholderImage: {
    marginLeft: wp(1),
    marginRight: wp(2),
    width: wp(5),
    height: wp(5),
  },
  dateInfo: {
    width: wp(60),
    textAlign: 'center',
    fontSize: wp(4),
    color: COLORS.BLACK,
  },
});

export default InputField;
export {DateInputField};
