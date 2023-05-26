import React from "react";
import { StyleSheet, Text, View, Keyboard, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

//const { width, height } = Dimensions.get("window");

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, symbol, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{symbol}</Text>
  </TouchableOpacity>
);

// the filter
const List = ({ searchPhrase, setClicked, data, onMarkerPress, mapEventData }) => {
  const navigation = useNavigation();

  // const handleItemPress = (item, CARD_WIDTH, mapEventData) => {
  //   // Find the index of the item in the data array
  //   const index = data.findIndex((dataItem) => dataItem.id === item.id);

  //   // Calculate the scroll position based on the index and card width
  //   const scrollPosition = index * (CARD_WIDTH + 20);

  //   // Scroll the ScrollView to the desired position
  //   _scrollView.current.scrollTo({ x: scrollPosition, y: 0, animated: true });

  //   // Open the bottom sheet for the selected item
  //   openHandler(item);
  //   onMarkerPress(item)
  //   // Navigate to the pin in the database using item.id or any other relevant identifier
  //   Keyboard.dismiss();
  //   setClicked(false);
  //   console.log("go to pin");
  //   //navigation.navigate("Home", { pinId: item.id });
  // };

  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item name={item.name} symbol={item.symbol} onPress={() => {
        onMarkerPress(item, mapEventData);
        setClicked(false);
      }} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} symbol={item.symbol} onPress={() => {
        onMarkerPress(item, mapEventData);
        setClicked(false);
      }} />;
    }
    // filter of the description
    if (
      item.symbol
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} symbol={item.symbol} onPress={() => {
        onMarkerPress(item, mapEventData);
        setClicked(false);
      }} />;
    }
  };

  return (
    <SafeAreaView style={styles.list_container}>
      <View style={styles.listOfItem}
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
  },
  item: {
    margin: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    //fontWeight: "bold",
    marginBottom: 5,
    //fontStyle: "italic",
  },
});