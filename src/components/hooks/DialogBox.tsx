import React, {useState} from 'react';
import {Modal} from 'react-native';

type Props = {
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  onRequestClose?: () => void;
};

const DialogBox = (props?: Props) => {
  const animationType = props?.animationType || 'fade';
  const transparent = props?.transparent || true;

  const [isModalVisible, setModalVisible] = useState(false);

  const ModalView = ({children}: {children: React.ReactNode}) => (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={isModalVisible}
      onRequestClose={() => {
        props?.onRequestClose ? props.onRequestClose() : setModalVisible(false);
      }}>
      {children}
    </Modal>
  );

  return {isModalVisible, setModalVisible, ModalView};
};

export default DialogBox;
