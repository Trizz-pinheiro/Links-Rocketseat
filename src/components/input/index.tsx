import { TextInput, TextInputProps } from "react-native";
import { s } from "./style";
import { colors } from "@/styles/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={s.container}
      placeholderTextColor={colors.gray[400]}
      {...rest}
    />
  );
}
