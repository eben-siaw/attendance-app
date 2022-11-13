// import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
  TextInput,Keyboard, Image } from 'react-native';
import React, { useEffect, route, Component, useState } from "react";
class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      ip_address: '',
      student_id:'', 
      error: ''
    };
  }
  

 takeAttendance = () => {
  const { data } = this.state;
  const { ip_address } = this.state;
  const {student_id}= this.state;
 // const { id } = this.state; 

 console.log(ip_address);

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
      this.setState({error: error})
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

        <View style={styles.class}> 
         <Text style={styles.article}>Active Class: {this.state.data.cc_id}</Text>
        </View> 
         
        <Text> {this.state.error} </Text>

        <View style={{marginVertical: 80}}> 
           <Image  
            style={{
              width: 200, 
              height: 180, 
              borderRadius: 8
            }}
            source={{uri: 'https://th.bing.com/th/id/R.02891eff04a59f9ed7fa076b490525b4?rik=pXzF66LhzNbSJQ&pid=ImgRaw&r=0'}}
           />
        </View>

        <View style={styles.attendanceBtn}> 
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
    fontSize: 18,
    textAlign: 'center',
  },
  attendanceBtn: { 
    paddingVertical: 50
  }, 
  class: { 
   paddingVertical: 10
  }, 
  article: { 
    fontSize: 20
  }
});

export default App