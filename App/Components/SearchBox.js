import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather, Entypo } from "@expo/vector-icons";


export function SearchBox({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}) {
  return (
    <View style={styles.searchBox}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search here"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )} */}
      </View>
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    position: "absolute",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 10 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    height: 46,
    alignSelf: "center",
    borderRadius: 25,
    padding: 5,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "90%",
    paddingTop: 10,
  },
});