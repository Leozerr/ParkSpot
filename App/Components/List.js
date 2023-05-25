import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";


//const { width, height } = Dimensions.get("window");

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, symbol }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{symbol}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === "") {
      return <Item name={item.name} symbol={item.symbol} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} symbol={item.symbol} />;
    }
    // filter of the description
    if (
      item.symbol
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} symbol={item.symbol} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
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
  list__container: {
    //margin: 10,
    height: "99%",
    width: "100%",
    //backgroundColor: "#fff",
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