import React, { useEffect, useState } from 'react';
import {
  Alert,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import colors from '../../../util/colors';
import Header from '../../../common/components/Header';
import Card from './items/Card';

const Home = ({ navigation }) => {
  // State variable to hold the user type
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Effect hook to retrieve user type from AsyncStorage when component mounts
    AsyncStorage.getItem('user_type').then(res => {
      setUserType(res); // Set the user type state
      console.log(res); // Log the retrieved user type
    });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  // Function to handle user logout
  const onLogout = () => {
    // Remove user type and user ID from AsyncStorage
    AsyncStorage.removeItem('user_type').then(res => {
      AsyncStorage.removeItem('user_id').then(res =>
        navigation.navigate('AuthStack'), // Navigate to AuthStack after successful logout
      );
      navigation.navigate('AuthStack'); // Navigate to AuthStack after successful logout
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Render header component */}
        <Header title="Home" />
        {/* Render cards for various actions */}
        <View style={styles.card}>
          {/* Card for placing order */}
          <Card
            text="Place Order"
            family="AntDesign"
            name="search1"
            onPress={() => {
              // Navigate to placeOrder screen if user type is manager or waiter staff
              // Otherwise, show an alert indicating no access
              if (userType === 'manager' || userType === 'waiter staff') {
                navigation.navigate('placeOrder');
              } else {
                Alert.alert('Alert', "You don't have access");
              }
            }}
          />
          {/* Card for viewing report */}
          <Card
            text="View Report"
            family="Octicons"
            name="report"
            onPress={() => {
              // Navigate to viewReport screen if user type is waiter staff or kitchen staff
              // Otherwise, show an alert indicating no access
              if (userType === 'waiter staff' || userType === 'kitchen staff') {
                Alert.alert('Alert', "You don't have access");
              } else {
                navigation.navigate('viewReport');
              }
            }}
          />
          {/* Card for managing staff */}
          <Card
            text="Manage Staff"
            family="Ionicons"
            name="person-outline"
            onPress={() => {
              // Navigate to manageStaff screen if user type is manager
              // Otherwise, show an alert indicating no access
              if (userType === 'manager') {
                navigation.navigate('manageStaff');
              } else {
                Alert.alert('Alert', "You don't have access");
              }
            }}
          />
          {/* Card for viewing orders */}
          <Card
            text="View Order"
            family="Fontisto"
            name="preview"
            onPress={() => navigation.navigate('viewOrder')}
          />
          {/* Card for managing menu */}
          <Card
            text="Manage Menu"
            family="Fontisto"
            name="preview"
            onPress={() => {
              // Navigate to manageMenu screen if user type is manager
              // Otherwise, show an alert indicating no access
              if (userType === 'manager') {
                navigation.navigate('manageMenu');
              } else {
                Alert.alert('Alert', "You don't have access");
              }
            }}
          />
          {/* Card for logging out */}
          <Card
            text="Log Out"
            family="Fontisto"
            name="preview"
            onPress={onLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles using ScaledSheet for responsive design
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    marginHorizontal: '20@s',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '20@vs',
    justifyContent: 'space-between',
  },
});

export default Home;
