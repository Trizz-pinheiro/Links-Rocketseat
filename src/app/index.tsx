import { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "@/styles/colors";
import { s } from "./style/index-styles";

import { LinkStorage } from "@/storage/link-storage";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/option";
import { categories } from "@/utils/categories";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [category, setCategory] = useState(categories[0].name);

  async function getLinks() {
    try {
      const response = await LinkStorage.get();

      const filtered = response.filter((link) => link.category === category);

      setLinks(filtered);
    } catch (error) {
      Alert.alert("error", "Não foi possícel listar os links");
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setLink(selected);
  }

  async function linkRemove() {
    try {
      await LinkStorage.remove(link.id);
      getLinks();
      setShowModal(false);
    } catch (error) {
      Alert.alert("Error", "Não foi possível excluir");
      console.log(error);
    }
  }

  function handeRemove() {
    try {
      Alert.alert("Excluir", "Deseja realmente excluir:", [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: linkRemove },
      ]);
    } catch (error) {}
  }

  async function handleOpen() {
    try {
      await Linking.openURL(link.url);
      setShowModal(false)
    } catch (error) {
      Alert.alert("Link", "Não foi possível abrir o link");
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Image source={require("@/assets/logo.png")} style={s.logo} />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.navigate("/add")}
        >
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={s.links}
        contentContainerStyle={s.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={s.modal}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalCategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={s.modalLinkName}>{link.name}</Text>

            <Text style={s.modalUrl}>{link.url}</Text>

            <View style={s.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secundary"
                onPress={handeRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
