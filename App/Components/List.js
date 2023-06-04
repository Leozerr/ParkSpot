//List.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../Image/parkpin.png";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, symbol, free, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.mainBox}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.item}>
        <Text style={styles.itemText}>{name}</Text>
        <Text style={styles.itemText}>{free}</Text>
        {/* <Text style={styles.details}>{symbol}</Text> */}
      </View>
    </View>
  </TouchableOpacity>
);

// the filter
const List = ({
  searchPhrase,
  setClicked,
  data,
  onMarkerPress,
  mapEventData,
}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    let freetemp = "";
    if (item.fullSlots == 0 || item.fullSlots === null) {
      freetemp = "N/A";
    } else {
      if (item.cars > item.fullSlots) {
        freetemp = 0;
      } else {
        freetemp = item.fullSlots - item.cars;
        freetemp = freetemp;
      }
    }

    // when no input, show all
    if (searchPhrase === "") {
      return (
        <Item
          name={item.name}
          symbol={item.symbol}
          free={freetemp}
          onPress={() => {
            onMarkerPress(item, mapEventData);
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      );
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          name={item.name}
          symbol={item.symbol}
          free={freetemp}
          onPress={() => {
            onMarkerPress(item, mapEventData);
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      );
    }
    // filter of the description
    if (
      item.symbol
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          name={item.name}
          symbol={item.symbol}
          free={freetemp}
          onPress={() => {
            onMarkerPress(item, mapEventData);
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.list_container}>
      <View
        style={styles.listOfItem}
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list_container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 3,
    backgroundColor: "#fff",
  },
  listOfItem: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1.5,
    borderBottomColor: "#EBEBEB",
    padding: 10,
    paddingVertical: 30,
    flex: 1,
  },
  logo: {
    width: 35,
    height: 35,
  },
  itemText: {
    fontSize: 20,
    color: "#343434",
  },
});