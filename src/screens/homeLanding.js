import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Divider, Layout } from "@ui-kitten/components";
import LandingHeader from "../components/landingHeader";

export const HomeLandingScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <LandingHeader />
      <Layout style={{ flex: 1 }}>
        <Image
          style={styles.landingImage}
          source={require("../../assets/High-five-pana.png")}
        />
      </Layout>
      <Layout style={{ flex: 1 }}>
        <Text style={styles.landingTitle}>Swipe. Chat. Team Up</Text>
        <Text style={styles.textContent}>
          Finding your Orbital teammate
          {"\n"}
          has never been easier.
        </Text>
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button>Get Started</Button>
        </Layout>
      </Layout>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    resizeMode: "contain",
    backgroundColor: "white",
  },
  landingTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 10,
  },
  textContent: {
    textAlign: "center",
    fontSize: 17,
  },
});
