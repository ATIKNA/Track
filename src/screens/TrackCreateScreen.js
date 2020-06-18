import "../_mockLocation";
import React, {useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView,withNavigationFocus } from "react-navigation";
import useLocation from '../hooks/useLocation'
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";

const TrackCreateScreen = ({isFocused}) => {
  const { addLocation } = useContext(LocationContext);
  const [err] = useLocation((isFocused,location) => {
    addLocation(location)
  })
  
  console.log(isFocused)
  
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {/*<NavigationEvents onWillBlur = {() => {console.log('Leaving...')}}/>*/}
      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
