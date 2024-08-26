// Importing necessary components and modules from React Native
import {
  Alert,
  AsyncStorage,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// Importing custom components and utilities
import CustomInput from '../../../common/components/CustomInput';
import CustomButton from '../../../common/components/CustomButton';
import CustomText from '../../../common/components/CustomText';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import colors from '../../../util/colors';
import images from '../../../assets/images';
import fonts from '../../../assets/fonts';

// Importing service functions for API interaction
import {isValidEmail} from '../../../util/validation';
import {login} from '../../../services/Api';

// Defining the Login component
const Login = ({navigation}) => {
  // State variables for email, password, error message, and loader
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

  // useEffect hook to check if the user is already logged in
  useEffect(() => {
    AsyncStorage.getItem('user_id').then(res => {
      if (res == null) {
        return;
      } else {
        navigation.navigate('MainStack');
      }
    });
  });

  // Function to validate the input fields
  const validate = () => {
    const errors = [];

    if (email?.length == 0) {
      errors.push('Email address *');
      setError('Email address *');
    } else if (!isValidEmail(email)) {
      errors.push('Invalid email address');
      setError('Invalid email address');
    } else if (password?.length == 0) {
      errors.push('Password *');
      setError('Password *');
    }

    if (errors.length > 0) {
      let errorMessage = '';
      errors.forEach(error => {
        errorMessage += '\n' + error;
      });
      // Alert.alert('Missing or invalid information', errorMessage);
    } else {
      onSubmit();
    }
  };

  // Function to handle form submission
  const onSubmit = () => {
    setLoader(true);
    const payload = {
      email: email,
      password: password,
    };

    // Calling the login API service function
    login(payload)
      .then(res => {
        AsyncStorage.setItem('user_id', res?.data?.data.user_id);
        AsyncStorage.setItem('user_type', res?.data?.data.user_type);
        console.log(res);
        navigation.navigate('MainStack');
      })
      .catch(e => {
        Alert.alert('Error', 'Please Check your email and password');
        console.log('Error', e);
      })
      .finally(() => setLoader(false));
  };

  // Rendering the UI components
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={images.logo}
            style={{width: '100%'}}
            resizeMode="contain"
          />
          <CustomInput
            placeholder="Email"
            withLabel="Email"
            borderWidth={0.5}
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            placeholder="Password"
            withLabel="Password"
            value={password}
            secureTextEntry={true}
            borderWidth={0.5}
            onChangeText={setPassword}
          />
          {error.length ? (
            <CustomText
              label={error}
              color={colors.red}
              fontFamily={fonts.medium}
              container={{marginBottom: verticalScale(10)}}
            />
          ) : null}
          <CustomButton
            loading={loader}
            title="Login"
            width="100%"
            onPress={validate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Exporting the Login component as default
export default Login;

// Styles for the Login component
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgContainer: {
    flex: 1,
    marginHorizontal: '20@s',
  },
});
