import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import RoundBtn from '@/app/components/RoundBtn';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(420); // Example balance value, initial state
  const currencySymbol = '₹'; // Currency symbol

  const addMoney = () => {
    const amountToAdd = 10; // Example amount to add
    const newTransaction = {
      id: transactions.length + 1,
      title: 'Deposit',
      amount: amountToAdd,
      date: new Date(),
    };
    setTransactions([...transactions, newTransaction]);
    setBalance(balance + amountToAdd); // Update balance
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>{currencySymbol}</Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}
        >
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>
            Accounts
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add money'} onPress={addMoney} />
        <RoundBtn icon={'refresh'} text={'Exchange'} onPress={() => {}} />
        <RoundBtn icon={'list'} text={'Details'} onPress={() => {}} />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 ? (
          <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
        ) : (
          transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
            >
              <View style={styles.circle}>
                <Ionicons
                  name={transaction.amount > 0 ? 'add' : 'remove'}
                  size={24}
                  color={Colors.dark}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  {transaction.date.toLocaleString()}
                </Text>
              </View>
              <Text>{transaction.amount}{currencySymbol}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 20,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  transactions: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Home;
