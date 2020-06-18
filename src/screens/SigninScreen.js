import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
const SigninScreen = () => {
  const { state, signin,clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
    <NavigationEvents
    onWillBlur = {clearErrorMessage}
    
    />
      <AuthForm
        headerText="Sign In to your account"
        errorMessage={state.errorMessage}
        onSubmit={({ email, password }) => {
          signin({ email, password });
        }}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account ? Sign up instead!"
        routeName="Sign Up"
      />
    </View>
  );
};
SigninScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SigninScreen;
