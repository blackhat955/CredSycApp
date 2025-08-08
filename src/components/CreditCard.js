import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreditCard = ({ card, style, onPress }) => {
  const getCardColor = (type) => {
    switch (type) {
      case 'platinum':
        return '#6B7280';
      case 'sapphire':
        return '#1E40AF';
      case 'gold':
        return '#B45309';
      case 'venture':
        return '#0F4C75';
      default:
        return '#6B7280';
    }
  };

  const getDaysLeftColor = (days) => {
    if (days <= 2) return '#EF4444';
    if (days <= 7) return '#F59E0B';
    return '#10B981';
  };

  const formatCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: getCardColor(card.type) }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.cardName}>{card.name}</Text>
          <Text style={styles.bankName}>{card.bank}</Text>
        </View>
        <Ionicons name="card-outline" size={24} color="#fff" />
      </View>

      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumber}>{formatCardNumber(card.number)}</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.validThruLabel}>VALID THRU</Text>
          <Text style={styles.validThru}>{card.validThru}</Text>
        </View>
        <View style={styles.daysLeftContainer}>
          <View style={[styles.daysLeftDot, { backgroundColor: getDaysLeftColor(card.daysLeft) }]} />
          <Text style={styles.daysLeft}>{card.daysLeft} days left</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 180,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bankName: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  cardNumberContainer: {
    marginVertical: 10,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  validThruLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
  },
  validThru: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 2,
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daysLeftDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  daysLeft: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
});

export default CreditCard;