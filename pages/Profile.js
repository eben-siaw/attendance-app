// import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
  TextInput,Keyboard } from 'react-native';
import React, { useEffect, route, Component, useState } from "react";
class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      ip_address: '',
      student_id:''
    };
  }
  

 takeAttendance = () => {
  const { data } = this.state;
  const { ip_address } = this.state;
  const {student_id}= this.state;
 // const { id } = this.state;

  fetch('http://localhost/smart_attd_app/attendance_api/take_attendance.php', {
    method: 'post',
    header: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      attendanceData: data,
      ip_address:ip_address,
      student_id:student_id
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson);
      this.props.navigation.navigate('Profile');
    })
    .catch((error) => {
      console.error(error);
    });
};



  componentDidMount = () => {
    this.setState({
      student_id: localStorage.getItem('user_id') 
   })
    
    fetch('http://localhost/smart_attd_app/attendance_api/getactiveclass.php', {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
       //console.log(responseJson);
       this.setState({
          data: responseJson
       });
       //getting ip address
       fetch('https://api.ipify.org?format=json', {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
       //console.log(responseJson);
       this.setState({
          ip_address: result.ip
       })
    })
    .catch((error) => {
       console.error(error);
    });
    })
    .catch((error) => {
       console.error(error);
    });
 }

  

  render() {
  
    return (
      <View style={styles.container}>
        <Text style={styles.pageName}>Profile</Text>
        <Text>Active Class: {this.state.data.cc_id}</Text>
        <TouchableOpacity
          onPress={this.takeAttendance}
          style={{
            width: 250,
            padding: 10,
            backgroundColor: 'magenta',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>Take Attendance</Text>
        </TouchableOpacity>
        
      </View>
    );
  }

  

}
const App = () => {
  return (
     <Profile />
  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageName: {
    margin: 10,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default App