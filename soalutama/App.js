import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Soal1 from './src/soal1.json'
const { createHash } = require('crypto');
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [soal4Data, setSoal4Data] = useState([])
  const [jsonSoal1, setJsonSoal1] = useState(Soal1)
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const renderSoal2 = () => {
    return jsonSoal1.map((value, index) => {
      return (
        <TouchableOpacity
        key={index}
          onPress={() => {
            const filterdata = Soal1.filter(item => {
              if (item.id == value.id) {
                item.done = !item.done
              }
              return item
            })
            setJsonSoal1(filterdata)
          }}
          style={{ height: 30, width: "90%" }}>
          <Text style={{ color: "#000", fontSize: 15, fontWeight: "bold", textDecorationLine: value.done ? "line-through" : "none", textDecorationColor: "red" }}>{value.nama}</Text>
        </TouchableOpacity>
      )
    })
  }

  const Soal3 = () => {
    fetch("http://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => {
        // Soal 3 cetak console
        console.log(res)

        // Untuk Soal 4
        setSoal4Data(res.slice(0, 10))
      })
  }

  useEffect(() => {
    check()
    Soal3()
  }, [])

  const check = async () => {
    // db
    const db = {
      username: "test",
      password: "test"
    }
    AsyncStorage.setItem("@db", JSON.stringify(db))
    const islogin = await AsyncStorage.getItem("@islogin")
    if (islogin != null) {
      setLogin(true)
    }
  }

  const renderSoal4 = () => {
    return soal4Data.map((value, index) => {
      return (
        <View key={index} style={{ height: 100, width: "88%", flexDirection: "row", borderWidth: 1 }}>
          <View style={{ height: 100, width: 20, borderWidth: 1 }}>
            <Text>{value.id}</Text>
          </View>
          <View style={{ height: 100, width: Dimensions.get("window").width / 3, borderWidth: 1 }}>
            <Text>{value.title}</Text>
          </View>
          <View style={{ height: 100, width: "30%", borderWidth: 1 }}>
            <Text>{value.body}</Text>
          </View>
          <View style={{ height: 100, width: "30%", borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            {/* Soal 5 */}
            <TouchableOpacity
              onPress={() => {
                const soal5 = soal4Data.filter(item => item.id != value.id)
                setSoal4Data(soal5)
              }}
              style={{ height: 50, width: 120, backgroundColor: "red", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 10, textAlign: "center" }} >SOAL 5 : Hapus Data</Text>
            </TouchableOpacity>
            {/* Soal 6 */}
            <TouchableOpacity
              onPress={() => {
                const soal6 = soal4Data.map((value) => {
                  return {
                    id: value.id,
                    title: value.title,
                    userId: value.userId
                  }
                })
                setSoal4Data(soal6)
              }}
              style={{ height: 50, width: 120, backgroundColor: "red", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 10, textAlign: "center" }} >SOAL 6 : Hapus Key "BODY" pada Object</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    })
  }

  const soal7 = () => {
    const timeData = new Date
    return createHash('sha256').update(`${timeData.getDay}${timeData.getMonth}${timeData.getFullYear}wandipriaifabula`).digest('hex');
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>SOAL 2: Menampilkan data json SOAL 1</Text>
      {renderSoal2()}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 5 }}>SOAL 4: Menampilkan data json SOAL 3</Text>
      {renderSoal4()}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 5 }}>SOAL 7: Hashing</Text>
      <Text>{soal7()}</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 5 }}>SOAL 9: Logic Login</Text>
      <View style={{ height: 200, width: "100%", justifyContent: "center", alignItems: "center" }}>
        {
          login == false ?
            <View style={{ width: "100%", alignItems: "center" }}>
              <TextInput
                placeholder='Masukan Username'
                style={{ height: 50, width: "80%", borderWidth: 1, borderBottomColor: "#aeaeae", marginTop: 10 }}
                onChangeText={(username) => setUsername(username)}
              />
              <TextInput
                placeholder='Masukan password'
                style={{ height: 50, width: "80%", borderWidth: 1, borderBottomColor: "#aeaeae", marginTop: 10 }}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={async () => {
                  const db = await AsyncStorage.getItem("@db")
                  if (JSON.parse(db).username == username && JSON.parse(db).password == password) {
                    await AsyncStorage.setItem("@islogin", JSON.stringify(username + password))
                    setLogin(true)
                  } else {
                    alert("Username atau Password salah")
                  }
                }}
                style={{ height: 50, width: "80%", backgroundColor: "red", marginTop: 20, alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Login</Text>
              </TouchableOpacity>
            </View>
            :
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text>Selamat Datang</Text>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem("@islogin")
                  setLogin(false)
                }}
                style={{ height: 50, width: "80%", backgroundColor: "red", marginTop: 20, alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Logout</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    </View>
  )
}

export default App