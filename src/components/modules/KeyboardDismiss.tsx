import {Pressable, Keyboard} from 'react-native';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

function Button(props: ButtonProps) {
  return <Pressable onPress={Keyboard.dismiss}>{props.children}</Pressable>;
}

export default Button;
