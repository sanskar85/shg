import {View, StyleSheet, StyleProp, ViewStyle, Pressable} from 'react-native';
import React from 'react';
import {LOADING_LOTTIE} from '../../assets/Lottie';
import AnimatedLottieView from 'lottie-react-native';

interface ButtonProps {
  children: React.ReactNode;
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
  onClick?: () => void;
  isLoading?: boolean;
}

const DEFAULT = {
  defaultOpacity: 0.9,
  onClick: () => {},
};

function Button(props: ButtonProps) {
  const [isActive, setActive] = React.useState(false);

  return (
    <Pressable
      style={[
        styles.buttonWrapper,
        props.style,
        props.centered ? styles.centered : null,
        {
          opacity: isActive
            ? props.activeOpacity || DEFAULT.defaultOpacity
            : DEFAULT.defaultOpacity,
        },
      ]}
      onPress={props.onClick || DEFAULT.onClick}
      onPressIn={() => setActive(true)}
      onPressOut={() => setActive(false)}>
      <View
        style={[
          styles.centered,
          styles.loading,
          props.isLoading ? styles.visible : styles.hidden,
        ]}>
        <AnimatedLottieView
          style={styles.loading}
          source={LOADING_LOTTIE}
          autoPlay
          loop={true}
        />
      </View>
      <View
        style={[
          styles.centered,
          !props.isLoading ? styles.visible : styles.hidden,
        ]}>
        {props.children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 7,
    position: 'relative',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 45,
    height: 45,
  },
  visible: {
    display: 'flex',
  },
  hidden: {
    display: 'none',
  },
});

export default Button;
