import React from "react";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDF = (props: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={props?.productData?.thumbnail} />
      </View>
      <View style={styles.section}>
        <Text>Product Title: {props.productData.title}</Text>
        <Text>Product Description: {props.productData.description}</Text>
        <Text>Product Price: {props.productData.price}</Text>
        <Text>Product Rating: {props.productData.rating}</Text>
      </View>
    </Page>
  </Document>
);

export default PDF;
