"use client"

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer"
import type { CertElement } from "@/lib/certificates/types"

type CertificatePDFProps = {
  recipientName: string
  courseName: string
  courseHours: string
  institutionalText: string
  folio: string
  issueDate: string
  issuedBy: string
  qrDataUrl: string // base64 QR image
  signers: Array<{ name: string; role: string; signature_url?: string | null }>
  primaryColor?: string
  elementLayout?: CertElement[] | null
  backgroundUrl?: string | null
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`
    : hex
}

export function CertificatePDF({
  recipientName,
  courseName,
  courseHours,
  institutionalText,
  folio,
  issueDate,
  issuedBy,
  qrDataUrl,
  signers,
  primaryColor = "#0ea5e9",
  elementLayout,
  backgroundUrl,
}: CertificatePDFProps) {
  const pc = hexToRgb(primaryColor)
  const formattedDate = new Date(issueDate).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  // ─── Dynamic layout rendering (CertElement[] array) ───
  if (elementLayout && Array.isArray(elementLayout) && elementLayout.length > 0) {
    const visibleElements = elementLayout.filter(el => el.visible)

    const renderElement = (el: CertElement) => {
      const baseStyle = {
        position: "absolute" as const,
        left: el.x,
        top: el.y,
        width: el.w,
        height: el.h,
      }

      switch (el.type) {
        case "header":
          return (
            <View key={el.id} style={baseStyle}>
              <Text style={{
                fontSize: el.fontSize || 13,
                fontWeight: "bold",
                color: pc,
                textAlign: (el.align || "left") as "left" | "center" | "right",
              }}>
                {el.customText || issuedBy}
              </Text>
              <Text style={{
                fontSize: 7,
                color: "#64748b",
                letterSpacing: 1,
                marginTop: 1,
                textAlign: (el.align || "left") as "left" | "center" | "right",
              }}>
                ECOGRAFÍA NEUROMUSCULOESQUELÉTICA
              </Text>
            </View>
          )

        case "folio":
          return (
            <View key={el.id} style={baseStyle}>
              <Text style={{
                fontSize: el.fontSize || 7.5,
                color: "#64748b",
                textAlign: (el.align || "right") as "left" | "center" | "right",
              }}>
                Folio: {folio}
              </Text>
              <Text style={{
                fontSize: el.fontSize || 7.5,
                color: "#64748b",
                textAlign: (el.align || "right") as "left" | "center" | "right",
                marginTop: 2,
              }}>
                Fecha: {formattedDate}
              </Text>
            </View>
          )

        case "title":
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 30,
                fontWeight: "bold",
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#1e293b",
                letterSpacing: 4,
              }}>
                {el.customText || "CERTIFICADO"}
              </Text>
            </View>
          )

        case "divider":
          return (
            <View key={el.id} style={{
              ...baseStyle,
              height: Math.max(1, el.fontSize || 2),
              backgroundColor: "#c9a84c",
              borderRadius: 1,
            }} />
          )

        case "decorative_line":
          return (
            <View key={el.id} style={{
              ...baseStyle,
              height: Math.max(1, el.fontSize || 1),
              backgroundColor: "#cbd5e1",
              borderRadius: 1,
            }} />
          )

        case "recipient":
          return (
            <View key={el.id} style={{
              ...baseStyle,
              justifyContent: "center",
              alignItems: el.align === "left" ? "flex-start" : el.align === "right" ? "flex-end" : "center",
            }}>
              <Text style={{
                fontSize: 9,
                color: "#64748b",
                letterSpacing: 3,
                textTransform: "uppercase",
                textAlign: (el.align || "center") as "left" | "center" | "right",
                marginBottom: 8,
              }}>
                Se otorga a
              </Text>
              <Text style={{
                fontSize: el.fontSize || 24,
                fontWeight: "bold",
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#0f172a",
                paddingBottom: 4,
                marginHorizontal: 20,
              }}>
                {recipientName}
              </Text>
            </View>
          )

        case "course_name":
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 14,
                fontWeight: "bold",
                fontStyle: "italic",
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#1e293b",
              }}>
                {courseName || "Curso de Ecografía Neuromusculoesquelética"}
              </Text>
            </View>
          )

        case "body":
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 10,
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#334155",
                lineHeight: 1.7,
              }}>
                {el.customText || institutionalText}
              </Text>
            </View>
          )

        case "course_hours":
          if (!courseHours) return null
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 11,
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#475569",
              }}>
                (Duración: {courseHours} horas)
              </Text>
            </View>
          )

        case "date":
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 9,
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#64748b",
              }}>
                {el.customText || `Ciudad de México, a ${formattedDate}`}
              </Text>
            </View>
          )

        case "signature": {
          // Each signature element now has its own signer info
          const signerName = el.signerName || signers[0]?.name || "Nombre"
          const signerRole = el.signerRole || signers[0]?.role || "Cargo"
          const signatureUrl = el.imageUrl || signers[0]?.signature_url

          return (
            <View key={el.id} style={{
              ...baseStyle,
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
              {signatureUrl ? (
                <Image style={{ width: 80, height: 32, marginBottom: 4 }} src={signatureUrl} />
              ) : null}
              <View style={{ width: "100%", borderTop: "1pt solid #0f172a", marginBottom: 4 }} />
              <Text style={{
                fontSize: el.fontSize || 9,
                fontWeight: "bold",
                color: "#0f172a",
                textAlign: "center",
              }}>
                {signerName}
              </Text>
              <Text style={{
                fontSize: (el.fontSize || 9) * 0.85,
                color: "#64748b",
                textAlign: "center",
              }}>
                {signerRole}
              </Text>
            </View>
          )
        }

        case "qr":
          return (
            <View key={el.id} style={{
              ...baseStyle,
              alignItems: "center",
              justifyContent: "center",
            }}>
              {qrDataUrl ? <Image style={{ width: 52, height: 52, marginBottom: 3 }} src={qrDataUrl} /> : null}
              <Text style={{ fontSize: 6, color: "#94a3b8", textAlign: "center" }}>
                Verificar autenticidad
              </Text>
              <Text style={{ fontSize: 6, color: "#94a3b8", textAlign: "center", marginTop: 2 }}>
                Escanea el código QR
              </Text>
            </View>
          )

        case "custom_image":
          if (!el.imageUrl) return null
          return (
            <View key={el.id} style={{
              ...baseStyle,
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Image src={el.imageUrl} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </View>
          )

        case "custom_text":
          return (
            <View key={el.id} style={{ ...baseStyle, justifyContent: "center" }}>
              <Text style={{
                fontSize: el.fontSize || 10,
                textAlign: (el.align || "center") as "left" | "center" | "right",
                color: "#334155",
                lineHeight: 1.5,
              }}>
                {el.customText || ""}
              </Text>
            </View>
          )

        default:
          return null
      }
    }

    return (
      <Document>
        <Page size="A4" orientation="landscape" style={absoluteStyles.page}>
          {/* Background image */}
          {backgroundUrl && (
            <Image src={backgroundUrl} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
          )}
          <View style={absoluteStyles.outerBorder}>
            {/* Ornamental corners */}
            <View style={absoluteStyles.cornerTL} />
            <View style={absoluteStyles.cornerTR} />
            <View style={absoluteStyles.cornerBL} />
            <View style={absoluteStyles.cornerBR} />

            <View style={absoluteStyles.innerBorder}>
              {visibleElements.map(renderElement)}
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  // ─── Fallback: original default layout ───
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fefcf3",
      padding: 0,
      fontFamily: "Helvetica",
    },
    outerBorder: {
      margin: 18,
      border: `3pt solid #c9a84c`,
      flex: 1,
      padding: 0,
      position: "relative",
    },
    innerBorder: {
      margin: 6,
      border: `1pt solid #c9a84c`,
      flex: 1,
      padding: 30,
      paddingTop: 24,
    },
    cornerTL: { position: "absolute", top: 10, left: 10, width: 20, height: 20, borderTop: "2pt solid #c9a84c", borderLeft: "2pt solid #c9a84c" },
    cornerTR: { position: "absolute", top: 10, right: 10, width: 20, height: 20, borderTop: "2pt solid #c9a84c", borderRight: "2pt solid #c9a84c" },
    cornerBL: { position: "absolute", bottom: 10, left: 10, width: 20, height: 20, borderBottom: "2pt solid #c9a84c", borderLeft: "2pt solid #c9a84c" },
    cornerBR: { position: "absolute", bottom: 10, right: 10, width: 20, height: 20, borderBottom: "2pt solid #c9a84c", borderRight: "2pt solid #c9a84c" },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    logoBlock: {
      flexDirection: "column",
    },
    logoTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: pc,
    },
    logoSubtitle: {
      fontSize: 7,
      color: "#64748b",
      letterSpacing: 1,
      marginTop: 1,
    },
    certTitle: {
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      color: "#1e293b",
      letterSpacing: 4,
      marginBottom: 4,
    },
    divider: {
      width: 120,
      height: 2,
      backgroundColor: "#c9a84c",
      alignSelf: "center",
      marginBottom: 14,
    },
    grantedTo: {
      fontSize: 9,
      textAlign: "center",
      color: "#64748b",
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 8,
    },
    recipientName: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      color: "#0f172a",
      marginBottom: 4,
      borderBottom: "1pt solid #cbd5e1",
      marginHorizontal: 60,
      paddingBottom: 4,
    },
    bodyText: {
      fontSize: 10,
      textAlign: "center",
      color: "#334155",
      lineHeight: 1.7,
      marginHorizontal: 60,
      marginTop: 12,
      marginBottom: 16,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 10,
    },
    signatureBlock: {
      width: 140,
      alignItems: "center",
    },
    signatureImage: {
      width: 80,
      height: 32,
      marginBottom: 4,
    },
    signatureLine: {
      width: "100%",
      borderTop: "1pt solid #0f172a",
      marginBottom: 4,
    },
    signatureName: {
      fontSize: 9,
      fontWeight: "bold",
      color: "#0f172a",
      textAlign: "center",
    },
    signatureRole: {
      fontSize: 7.5,
      color: "#64748b",
      textAlign: "center",
    },
    folioBlock: {
      alignItems: "center",
    },
    folioText: {
      fontSize: 7.5,
      color: "#64748b",
    },
    qrImage: {
      width: 52,
      height: 52,
      marginBottom: 3,
    },
    qrLabel: {
      fontSize: 6,
      color: "#94a3b8",
      textAlign: "center",
    },
  })

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          <View style={styles.innerBorder}>
            <View style={styles.headerRow}>
              <View style={styles.logoBlock}>
                <Text style={styles.logoTitle}>{issuedBy}</Text>
                <Text style={styles.logoSubtitle}>ECOGRAFÍA NEUROMUSCULOESQUELÉTICA</Text>
              </View>
              <View>
                <Text style={{ fontSize: 7.5, color: "#64748b", textAlign: "right" }}>
                  Folio: {folio}
                </Text>
                <Text style={{ fontSize: 7.5, color: "#64748b", textAlign: "right", marginTop: 2 }}>
                  Fecha: {formattedDate}
                </Text>
              </View>
            </View>

            <Text style={styles.certTitle}>CERTIFICADO</Text>
            <View style={styles.divider} />

            <Text style={styles.grantedTo}>Se otorga a</Text>
            <Text style={styles.recipientName}>{recipientName}</Text>

            <Text style={styles.bodyText}>
              {institutionalText}
              {courseHours ? `\n(Duración: ${courseHours} horas)` : ""}
            </Text>

            <View style={styles.footer}>
              {signers.map((signer, i) => (
                <View key={i} style={styles.signatureBlock}>
                  {signer.signature_url ? (
                    <Image style={styles.signatureImage} src={signer.signature_url} />
                  ) : null}
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureName}>{signer.name}</Text>
                  <Text style={styles.signatureRole}>{signer.role}</Text>
                </View>
              ))}

              <View style={styles.folioBlock}>
                {qrDataUrl ? <Image style={styles.qrImage} src={qrDataUrl} /> : null}
                <Text style={styles.qrLabel}>Verificar autenticidad</Text>
                <Text style={[styles.qrLabel, { marginTop: 2 }]}>Escanea el código QR</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

// ─── Styles for the absolute‐positioned layout ───
const absoluteStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fefcf3",
    padding: 0,
    fontFamily: "Helvetica",
  },
  outerBorder: {
    margin: 18,
    border: "3pt solid #c9a84c",
    flex: 1,
    padding: 0,
    position: "relative",
  },
  innerBorder: {
    margin: 6,
    border: "1pt solid #c9a84c",
    flex: 1,
    position: "relative",
  },
  cornerTL: { position: "absolute", top: 10, left: 10, width: 20, height: 20, borderTop: "2pt solid #c9a84c", borderLeft: "2pt solid #c9a84c" },
  cornerTR: { position: "absolute", top: 10, right: 10, width: 20, height: 20, borderTop: "2pt solid #c9a84c", borderRight: "2pt solid #c9a84c" },
  cornerBL: { position: "absolute", bottom: 10, left: 10, width: 20, height: 20, borderBottom: "2pt solid #c9a84c", borderLeft: "2pt solid #c9a84c" },
  cornerBR: { position: "absolute", bottom: 10, right: 10, width: 20, height: 20, borderBottom: "2pt solid #c9a84c", borderRight: "2pt solid #c9a84c" },
})
