import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { colors } from "@/styles/colors";
import { s } from "./styles";

type Props = TouchableOpacityProps & {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: "primary" | "secundary";
};

export function Option({ name, icon, variant = "primary", ...rest }: Props) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <MaterialIcons
        name={icon}
        size={20}
        color={variant === "primary" ? colors.green[300] : colors.gray[400]}
      />

      <Text
        style={variant === "primary" ? s.primaryTitle : s.secondaryTitle}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
