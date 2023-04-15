import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

const PDFVisualizer = () => {
  return (
    <PDFViewer>
      <Document>
        <Page size="A4">
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Product</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Type</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Period</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Price</Text>
              </View>
            </View>
            {/* TableContent */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>React-PDF</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>3 User </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>5€</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFVisualizer;
