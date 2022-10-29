import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: '',
      userPassword: '',
      error: ''
    };
  }

  login = () => {
    //alert();
    const { studentID, userPassword } = this.state;
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (studentID == '') {
      //alert("Please enter Email address");
      this.setState({ studentID: 'Please enter Student ID' });
    } 
    
    
    else if (userPassword == '') {
      this.setState({ password: 'Please enter password' });
    } else {
      fetch('http://localhost/smart_attd_app/attendance_api/login.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          // we will pass our input data to server
          studentID: studentID,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.result);
          if (responseJson.result == 'success') {
            // redirect to profile page
            //alert('Successfully Login');
            localStorage.setItem('user_id', responseJson.user_id);
            this.props.navigation.navigate('Profile', { user_id: responseJson.user_id});
          } else {
            alert('Wrong Login Details');
          }
        })
        .catch((error) => {
          setTimeout(() => { 
            this.setState({error: 'failed to register student'})
          },500)
          console.error(error);
        });
    }

    Keyboard.dismiss();
  };

  render() {
    const { navigate } = this.props.navigation;

    const {error} = this.state; 

    return (
      <View style={styles.container}>
        <Text style={{ padding: 10, margin: 10, color: 'red' }}>
          {this.state.email}
        </Text>  

        <View style={styles.showcase}> 
           <Text style={styles.heading}> Welcome to Attendance </Text>
        </View>
          
          <View>
            <Image
              style={{width: 150, height: 160}}
              resizeMode={'cover'}
             source={require('../images/attendance_3.jpg')} /> 
          </View> 

        <View> 
          <Text style={styles.error}> {error} </Text>
        </View> 

        <View> 
         <Text style={styles.info}> Student ID </Text>
         <TextInput
          placeholder="Enter Student Id"
          placeholderTextColor="#808080"
          style={{ width: 250, height:30, margin: 10, borderWidth: 1,   textAlign: 'center'  }}
          onChangeText={(studentID) => this.setState({ studentID })}
        />
          </View>
      

         <View> 
          <Text style={styles.info}> Your password </Text>
          <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#808080"
          secureTextEntry={true} 
          style={{ width: 250, height:30, margin: 10, borderWidth: 1,   textAlign: 'center' }}
          onChangeText={(userPassword) => this.setState({ userPassword })}
        />
         </View>
       
        <TouchableOpacity
          onPress={this.login}
          style={{
            width: 250,
            padding: 10,
            backgroundColor: 'magenta',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textInfo} onPress={() => navigate("Register")}> 
           <Text> Don't have an account? Click here to register </Text>
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
    flexDirection: 'column'
  },
  btn2: {
    backgroundColor: 'green',
    width: 250,
    padding: 10,
    alignItems: 'center'
  },
  info: { 
    paddingLeft: 5
  },
  textInfo: { 
    paddingTop: 15
  },
  heading: { 
    fontSize: 25
  },
  showcase: { 
   paddingBottom: 50
  },
  error: { 
    color: '#F44336'
  }
});