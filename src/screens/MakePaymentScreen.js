import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockCards } from '../data/mockData';

const MakePaymentScreen = ({ navigation }) => {
  const [paymentType, setPaymentType] = useState('consolidated'); // 'consolidated' or 'individual'
  const [totalAmount, setTotalAmount] = useState('500');

  // Calculate payment distribution based on entered amount
  const paymentDistribution = useMemo(() => {
    const amount = parseFloat(totalAmount) || 0;
    
    // Card data with colors
    const cardsWithColors = [
      {
        id: 1,
        name: 'American Express Platinum Card',
        minPay: 938,
        totalDue: 18750,
        color: '#6B7280',
        interestRate: 24.99, // Highest interest rate
      },
      {
        id: 2,
        name: 'Chase Sapphire Reserve',
        minPay: 2250,
        totalDue: 45000,
        color: '#1E40AF',
        interestRate: 22.99,
      },
      {
        id: 3,
        name: 'American Express Gold Card',
        minPay: 1625,
        totalDue: 32500,
        color: '#B45309',
        interestRate: 21.99,
      },
      {
        id: 4,
        name: 'Capital One Venture X',
        minPay: 1380,
        totalDue: 27600,
        color: '#0F4C75',
        interestRate: 19.99, // Lowest interest rate
      },
    ];

    // Initialize payment amounts for each card
    let remainingAmount = amount;
    const distributedCards = cardsWithColors.map(card => ({
      ...card,
      amount: 0,
      percentage: 0,
    }));

    // Step 1: Cover minimum payments first (in order of due dates/priority)
    const sortedForMinPayments = [...distributedCards].sort((a, b) => {
      // Prioritize by interest rate for minimum payments
      return b.interestRate - a.interestRate;
    });

    for (const card of sortedForMinPayments) {
      if (remainingAmount > 0 && card.minPay > 0) {
        const minPayment = Math.min(card.minPay, remainingAmount);
        card.amount += minPayment;
        remainingAmount -= minPayment;
      }
    }

    // Step 2: Distribute remaining amount to highest interest rate cards
    if (remainingAmount > 0) {
      const sortedForAdditional = [...distributedCards].sort((a, b) => {
        return b.interestRate - a.interestRate;
      });

      for (const card of sortedForAdditional) {
        if (remainingAmount > 0) {
          const maxAdditionalPayment = card.totalDue - card.amount;
          if (maxAdditionalPayment > 0) {
            const additionalPayment = Math.min(maxAdditionalPayment, remainingAmount);
            card.amount += additionalPayment;
            remainingAmount -= additionalPayment;
          }
        }
      }
    }

    // Calculate percentages
    distributedCards.forEach(card => {
      card.percentage = amount > 0 ? Math.round((card.amount / amount) * 100) : 0;
    });

    return {
      totalAmount: amount,
      cards: distributedCards,
    };
  }, [totalAmount]);

  const handlePayment = () => {
    Alert.alert(
      'Payment Confirmation',
      `Are you sure you want to proceed with the payment of $${totalAmount}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            Alert.alert('Success', 'Payment processed successfully!');
            navigation.navigate('Payment History');
          }
        },
      ]
    );
  };

  const PaymentTypeTab = ({ type, title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const ProgressBar = ({ percentage, color }) => (
    <View style={styles.progressBarContainer}>
      <View 
        style={[
          styles.progressBar, 
          { width: `${percentage}%`, backgroundColor: color }
        ]} 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Make Payment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Pay your credit card bills</Text>

          {/* Payment Type Tabs */}
          <View style={styles.tabContainer}>
            <PaymentTypeTab
              type="consolidated"
              title="Pay Consolidated"
              isActive={paymentType === 'consolidated'}
              onPress={() => setPaymentType('consolidated')}
            />
            <PaymentTypeTab
              type="individual"
              title="Pay Individually"
              isActive={paymentType === 'individual'}
              onPress={() => setPaymentType('individual')}
            />
          </View>

          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Total Amount to Pay</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={totalAmount}
                onChangeText={setTotalAmount}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Ionicons name="information-circle" size={20} color="#4F7EFF" />
            <Text style={styles.infoText}>
              Our system will automatically distribute this amount across your cards, prioritizing minimum payments first and then the highest interest cards.
            </Text>
          </View>

          {/* Payment Distribution */}
          <View style={styles.distributionContainer}>
            <Text style={styles.distributionTitle}>Payment Distribution</Text>
            
            {paymentDistribution.cards.map((card, index) => (
              <View key={card.id} style={styles.cardDistribution}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIndicator}>
                    <View style={[styles.cardDot, { backgroundColor: card.color }]} />
                    <Text style={styles.cardName}>{card.name}</Text>
                  </View>
                  <Text style={styles.cardAmount}>
                    ${card.amount.toFixed(0)}
                  </Text>
                </View>
                
                <ProgressBar percentage={card.percentage} color={card.color} />
                
                <View style={styles.cardDetails}>
                  <Text style={styles.cardDetailText}>
                    Min pay: ${card.minPay.toLocaleString()}
                  </Text>
                  <Text style={styles.cardDetailText}>
                    Total due: ${card.totalDue.toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Total Amount */}
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>
                ${paymentDistribution.totalAmount.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity 
            style={styles.proceedButton}
            onPress={handlePayment}
          >
            <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#4F7EFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  amountContainer: {
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#4F7EFF',
    marginLeft: 10,
    lineHeight: 20,
  },
  distributionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  distributionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  cardDistribution: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailText: {
    fontSize: 12,
    color: '#666',
  },
  totalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#4F7EFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MakePaymentScreen;