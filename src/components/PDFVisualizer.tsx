import type { Item } from "@/utils/types";
import { generateDescription } from "@/utils/utils";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Link
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { type FC, useMemo } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 50,
  },
  titleParagraph: {
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3161c3",
  },
  titleDescription: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  titleDate: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  contactInfoParagraph: {
    fontFamily: "Helvetica-Bold",
    float: "left",
    fontSize: 12,
    fontWeight: 900,
  },
  viewer: {
    height: "calc(100vh - 20rem)",
  },
  table: {
    marginTop: 10,
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 0,
    backgroundColor: "#b4c6e7",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "#8ea9db",
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  tableDataCell: {
    margin: "0",
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
  conclusion: {
    fontFamily: "Helvetica-Bold",
    display: "flex",
    gap: 20,
    marginTop: 20,
    textAlign: "right",
    marginRight: 150,
    fontWeight: "bold",
    fontSize: 12,
  },
  greetings: {
    fontFamily: "Helvetica-Bold",
    marginTop: 100,
    textTransform: "uppercase",
    fontWeight: "extrabold",
    fontSize: 12,
    textAlign: "center",
  },
});

type PDFVisualizerProps = {
  items: Item[];
  author?: string | null;
  id?: string;
  customer?: string;
  createdAt?: Date;
};

const PDFVisualizer: FC<PDFVisualizerProps> = (props) => {
  return (
    <PDFViewer style={styles.viewer}>
      <PDFDocument {...props} />
    </PDFViewer>
  );
};

export const PDFDocument: FC<PDFVisualizerProps> = ({
  items,
  customer,
  author,
  createdAt,
  id,
}) => {
  const role = useMemo(() => {
    if (!author) return "Membre";
    if (author === "Clement LEBON") return "Trésorier";
    if (author === "Stefan ZLATKOVIC") return "Président";
    return "Membre";
  }, [author]);

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleParagraph}>
          <Text style={styles.title}>Devis {customer}</Text>
          <Text style={styles.titleDescription}>Devis n°{id ?? "0"}</Text>
          <Text style={styles.titleDate}>
            Date: {format(createdAt ?? new Date(), "dd/MM/yyyy")}
          </Text>
        </View>
        <View style={styles.contactInfoParagraph}>
          <Text>INS&apos;WEAR</Text>
          <Text style={{ marginTop: 10 }}>26 rue Raze</Text>
          <Text>33000 Bordeaux</Text>
          <Text>07 89 52 38 34</Text>
          <Link src="mailto:contact@inswear.fr">contact@inswear.fr</Link>
        </View>
        {/* INFO TABLE */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableHeader, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>Commercial</Text>
            </View>
            <View style={{ ...styles.tableHeader, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>Poste</Text>
            </View>
            <View style={{ ...styles.tableHeader, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>Conditions de paiement</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Échéance</Text>
            </View>
          </View>
          {/* TableContent */}
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>{author}</Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>{role}</Text>
            </View>
            <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
              <Text style={styles.tableCell}>À la réception</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>2-3 semaines</Text>
            </View>
          </View>
        </View>

        {/* ITEMS TABLE */}
        <View style={{ ...styles.table, borderLeft: "none" }}>
          <View style={styles.tableRow}>
            <View
              style={{
                ...styles.tableHeader,
                width: "13%",
                padding: 0,
                margin: 0,
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>Quantité</Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                width: "12%",
                padding: 0,
                margin: 0,
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>Référence</Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                width: "10%",
                padding: 0,
                margin: 0,
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>Taille</Text>
            </View>
            <View style={{ ...styles.tableHeader, borderRightWidth: 0 }}>
              <Text style={styles.tableDataCell}>Description</Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                width: "10%",
                padding: 0,
                margin: 0,
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>Couleur</Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                width: "8%",
                padding: 0,
                margin: 0,
                textAlign: "center",
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>Prix unitaire TTC</Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                width: "22%",
                padding: 0,
                margin: 0,
                textAlign: "center",
              }}
            >
              <Text style={styles.tableDataCell}>Total de la ligne</Text>
            </View>
          </View>
          {/* TableContent */}
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View
                style={{
                  ...styles.tableCol,
                  width: "13%",
                  padding: 0,
                  margin: 0,
                  borderRightWidth: 0,
                }}
              >
                <Text style={styles.tableDataCell}>{item.quantity}</Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "12%",
                  padding: 0,
                  margin: 0,
                  borderRightWidth: 0,
                }}
              >
                <Text style={styles.tableDataCell}>{item.reference}</Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "10%",
                  padding: 0,
                  margin: 0,
                  borderRightWidth: 0,
                }}
              >
                <Text style={styles.tableDataCell}>{item.size}</Text>
              </View>
              <View style={{ ...styles.tableCol, borderRightWidth: 0 }}>
                <Text style={styles.tableDataCell}>
                  {generateDescription(item)}
                </Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "10%",
                  padding: 0,
                  margin: 0,
                  borderRightWidth: 0,
                }}
              >
                <Text style={styles.tableDataCell}>{item.color}</Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "8%",
                  padding: 0,
                  margin: 0,
                  borderRightWidth: 0,
                }}
              >
                <Text style={styles.tableDataCell}>
                  {item.price.toFixed(2)}€
                </Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "22%",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Text style={styles.tableDataCell}>
                  {(item.price * item.quantity).toFixed(2)}€
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View
              style={{
                ...styles.tableCol,
                width: "13%",
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <View
              style={{
                ...styles.tableCol,
                width: "12%",
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <View
              style={{
                ...styles.tableCol,
                width: "10%",
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <View
              style={{
                ...styles.tableCol,
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <View
              style={{
                ...styles.tableCol,
                width: "10%",
                padding: 0,
                margin: 0,
                backgroundColor: "transparent",
                border: "none",
              }}
            />
            <View
              style={{
                ...styles.tableHeader,
                borderTopWidth: 0,
                width: "8%",
                padding: 0,
                margin: 0,
                borderLeft: "1px solid black",
                borderRightWidth: 0,
              }}
            >
              <Text style={styles.tableDataCell}>TOTAL TTC</Text>
            </View>
            <View
              style={{
                ...styles.tableCol,
                width: "22%",
                padding: 0,
                margin: 0,
              }}
            >
              <Text style={styles.tableDataCell}>{totalPrice.toFixed(2)}€</Text>
            </View>
          </View>
        </View>

        {/* END */}
        <View style={styles.conclusion}>
          <Text>Bon pour accord,</Text>
          <Text>Signature :</Text>
        </View>
        <View style={styles.greetings}>
          <Text>Nous vous remercions pour votre confiance</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFVisualizer;
