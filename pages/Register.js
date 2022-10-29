import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: '',
      studentName: '',
      userPassword: '',
      error: ''
    };
  }

  userRegister = () => {
    const { studentID } = this.state;
    const { studentName } = this.state;
    const { userPassword } = this.state;

    fetch('http://localhost/smart_attd_app/attendance_api/register.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentID: studentID,
        studentName: studentName,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => { 
          this.setState({error: 'failed to register student'})
        },500)
      });
  };

  render() {

    const { navigate } = this.props.navigation;

    const { error } = this.state;

    return (
      <View style={styles.container}>  

        <View style={styles.showcase}> 
           <Text style={styles.heading}> Let's get you started! </Text>
        </View>
          
          <View>
            <Image
              style={{width: 170, height: 160}}
              resizeMode={'cover'}
              source={require('../images/attendance_1.webp')} /> 
          </View> 

        <View> 
          <Text style={styles.error}> {error} </Text>
        </View> 

        <View>
         <Text style={styles.info}> Your Student ID </Text> 
         <TextInput
          placeholder="Enter Student ID"
          placeholderTextColor="#808080"
          style={{
            width: 250,
            height:30,
            margin: 10,
            borderColor: '#333',
            borderWidth: 1,
            textAlign: 'center'
          }}
          underlineColorAndroid="transparent"
          onChangeText={(studentID) => this.setState({ studentID })}
        />
         </View> 

       <View>
        <Text style={styles.info}> Your Full Name </Text>
        <TextInput
          placeholder="Enter Full Name"
          placeholderTextColor="#808080"
          style={{
            width: 250,
            height:30,
            margin: 10,
            borderColor: '#333',
            borderWidth: 1,
            textAlign: 'center'
          }}
          underlineColorAndroid="transparent"
          onChangeText={(studentName) => this.setState({ studentName })}
        />
        </View> 
       

        <View>  
          <Text style={styles.info}> Your Password </Text>
         <TextInput
           placeholder="Enter Password"
           placeholderTextColor="#808080"
           style={{
            width: 250,
            height:30,
            margin: 10,
            borderColor: '#333',
            borderWidth: 1,
            textAlign: 'center'
          }}
          underlineColorAndroid="transparent"
          onChangeText={(userPassword) => this.setState({ userPassword })}
        />
        </View>
       
        <TouchableOpacity
          onPress={this.userRegister}
          style={{
            width: 250,
            padding: 10,
            backgroundColor: 'magenta',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff' }}>Signup</Text>
        </TouchableOpacity> 

        <TouchableOpacity style={styles.textInfo} onPress={() => navigate("Login")}> 
           <Text> Already have an account? Click here to login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  info: { 
    paddingLeft: 5
  }, 
  textInfo: { 
    paddingTop: 15
  }, 
  error: { 
    color: '#F44336'
  },
  showcase: { 
    paddingBottom: 50
   },
   heading: { 
    fontSize: 25
  }
});