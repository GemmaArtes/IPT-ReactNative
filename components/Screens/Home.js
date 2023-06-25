import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, DrawerLayoutAndroid, SafeAreaView } from 'react-native';
import { Row, Rows, Table, TableWrapper, Cell } from 'react-native-table-component'


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Product Number', 'Total Stocks Added'],
            tableData: [
                ['1', '2',],
                ['a', 'b',],
                ['1', '2',],
                ['a', 'b',],
                ['1', '2',],
                ['a', 'b',],
                ['1', '2',],
                ['a', 'b',],
                ['1', '2',],
                ['a', 'b',],
                ['1', '2',],
                ['a', 'b',],


            ]
        }
    }
    render() {
        const state = this.state;
        const element = (data, index) => ('')


        return (

            <DrawerLayoutAndroid
                drawerWidth={200}
                drawerPosition={'left'}
                renderNavigationView={() => (<View style={styles.drawerContent}>
                    <Text style={{ color: 'white', marginTop: 40, fontSize: 28 }}>Dashboard</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonDashboard} onPress={() => { this.props.navigation.navigate("Home"); }}>
                            <Text style={{ color: '#EDDBC7' }}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonDashboard} onPress={() => { this.props.navigation.navigate("Products"); }}>
                            <Text style={{ color: '#EDDBC7' }}>Products</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonDashboard} onPress={() => { this.props.navigation.navigate("Categories"); }}>
                            <Text style={{ color: '#EDDBC7' }}>Categories</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonDashboard} onPress={() => { this.props.navigation.navigate("AddProduct"); }}>
                            <Text style={{ color: '#EDDBC7' }}>Add Product</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonDashboard} onPress={() => { this.props.navigation.navigate("AddCategory"); }}>
                            <Text style={{ color: '#EDDBC7' }}>Add Category</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
                }
            >

                <View style={styles.container}>
                    <View style={styles.upperBox}></View>
                    <Text style={styles.upperTitle}>  Inventory System</Text>
                    <View style={styles.box}>
                        <Text> </Text>
                        <Text style={styles.boxTitle}>Home</Text>
                        <View style={styles.line}></View>
                        <Text> </Text>
                        <Text style={styles.textTotal}>Total Products</Text>
                        <Text style={styles.boxTitle}>4</Text>
                        <Text style={styles.textTotal}>Total Categories</Text>
                        <Text style={styles.boxTitle}>6</Text>
                        <Text></Text>
                        <ScrollView horizontal={true}>
                            <View>
                                <Table borderStyle={{ borderColor: 'transparent' }}>
                                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                    {
                                        state.tableData.map((rowData, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                {
                                                    rowData.map((cellData, cellIndex) => (
                                                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                    ))
                                                }
                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </View>
                        </ScrollView>


                    </View>
                </View >
            </DrawerLayoutAndroid>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A06D78',
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        borderWidth: 2,
        marginTop: 20,
        borderColor: '#EDDBC7',
        borderRadius: 10,
        backgroundColor: 'white',
        width: '80%',
        padding: 5,
        alignSelf: 'center',
    },

    boxTitle: {
        fontSize: 28,
        color: '#A06D78',
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    textTotal: {
        fontSize: 18,
        color: '#A06D78',
        alignSelf: 'flex-start'
    },
    upperTitle: {
        fontSize: 36,
        color: '#EDDBC7',
        marginTop: -200,
        marginBottom: 200,
        alignSelf: 'flex-start'
    },
    upperBox: {
        width: '100%',
        height: '15%',
        backgroundColor: '#9F8C8F',
        marginTop: -238,
        marginBottom: 120

    },
    box: {
        width: '80%',
        backgroundColor: '#EDDBC7',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: -100
    },
    buttonDashboard: {
        height: 50,
        width: 100,
        backgroundColor: '#A06D78',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
    },
    drawerContent: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'flex-start',
    },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2, alignSelf: 'flex-end', marginRight: -160 },
    btnText: { textAlign: 'center', color: '#fff' }
});