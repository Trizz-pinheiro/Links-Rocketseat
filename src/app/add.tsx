import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/styles/colors";
import { s } from "./style/add-styles";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { LinkStorage } from "@/storage/link-storage";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione a categoria");
      }

      if (!name.trim()) {
        return Alert.alert("Nome", "Informe o nome");
      }

      if (!url.trim()) {
        return Alert.alert("URL", "Informe a URL");
      }

      await LinkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      Alert.alert("Sucesso", "Novo link adicionado", [
        { text: "OK", onPress: () => router.back() },
      ]);

      const data = await LinkStorage.get();
      console.log(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link");
      console.log(error);
    }
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={s.title}>Novo</Text>
      </View>

      <Text style={s.label}>Selecione uma categoria</Text>

      <Categories onChange={setCategory} selected={category} />

      <View style={s.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
        <Input placeholder="URL" onChangeText={setUrl} autoCapitalize="none" />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
