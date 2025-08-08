import React, { useState } from 'react';
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
import { mockPaymentHistory } from '../data/mockData';

const PaymentHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const handleReceiptPress = (payment) => {
    Alert.alert(
      'Receipt Details',
      `Transaction ID: ${payment.transactionId}\nReceipt ID: ${payment.receiptId}\nDate: ${payment.date}\nAmount: $${payment.amount.toLocaleString()}\nStatus: ${payment.status}\n\nCards:\n${payment.cards.map(card => `• ${card.name}`).join('\n')}`,
      [
        { text: 'Close', style: 'cancel' },
        { 
          text: 'Download Receipt', 
          onPress: () => {
            Alert.alert('Success', 'Receipt downloaded successfully!');
          }
        },
      ]
    );
  };

  const filteredHistory = mockPaymentHistory.filter(payment =>
    payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.receiptId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.cards.some(card => 
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getCardIcon = (cardName) => {
    if (cardName.includes('American Express')) return '●';
    if (cardName.includes('Chase')) return '●';
    if (cardName.includes('Capital One')) return '●';
    return '●';
  };

  const getCardColor = (cardName) => {
    if (cardName.includes('Platinum')) return '#6B7280';
    if (cardName.includes('Sapphire')) return '#1E40AF';
    if (cardName.includes('Gold')) return '#B45309';
    if (cardName.includes('Venture')) return '#0F4C75';
    return '#6B7280';
  };

  const PaymentCard = ({ payment }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentDate}>{payment.date}</Text>
          <Text style={styles.transactionId}>
            {payment.transactionId} • Receipt: {payment.receiptId}
          </Text>
        </View>
        <View style={styles.paymentStatus}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>completed</Text>
          </View>
          <TouchableOpacity 
            style={styles.receiptButton}
            onPress={() => handleReceiptPress(payment)}
          >
            <Ionicons name="receipt-outline" size={16} color="#4F7EFF" />
            <Text style={styles.receiptText}>Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsSection}>
        <Text style={styles.cardsLabel}>CARDS</Text>
        <View style={styles.cardsList}>
          {payment.cards.map((card, index) => (
            <View key={index} style={styles.cardItem}>
              <Text 
                style={[
                  styles.cardIndicator, 
                  { color: getCardColor(card.name) }
                ]}
              >
                {getCardIcon(card.name)}
              </Text>
              <Text style={styles.cardName}>{card.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.paymentFooter}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>AMOUNT</Text>
          <Text style={styles.amount}>${payment.amount.toLocaleString()}</Text>
        </View>
        <View style={styles.actionsSection}>
          <Text style={styles.actionsLabel}>ACTIONS</Text>
          <TouchableOpacity 
            style={styles.receiptButton}
            onPress={() => handleReceiptPress(payment)}
          >
            <Ionicons name="receipt-outline" size={16} color="#4F7EFF" />
            <Text style={styles.receiptText}>Receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Payment History</Text>
          <Text style={styles.subtitle}>View all your past payments</Text>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by transaction ID or receipt ID..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilter(!showFilter)}
        >
          <Ionicons name="filter" size={20} color="#4F7EFF" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Payment History Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.dateColumn]}>DATE</Text>
        <Text style={[styles.headerText, styles.transactionColumn]}>TRANSACTION ID</Text>
        <Text style={[styles.headerText, styles.cardsColumn]}>CARDS</Text>
        <Text style={[styles.headerText, styles.amountColumn]}>AMOUNT</Text>
        <Text style={[styles.headerText, styles.statusColumn]}>STATUS</Text>
        <Text style={[styles.headerText, styles.actionsColumn]}>ACTIONS</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredHistory.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}

        {filteredHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No payments found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try adjusting your search terms' : 'You haven\'t made any payments yet'}
            </Text>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 6,
  },
  filterText: {
    color: '#4F7EFF',
    fontWeight: '500',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  dateColumn: {
    width: 80,
  },
  transactionColumn: {
    flex: 1,
  },
  cardsColumn: {
    width: 120,
  },
  amountColumn: {
    width: 80,
    textAlign: 'right',
  },
  statusColumn: {
    width: 80,
  },
  actionsColumn: {
    width: 80,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  paymentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionId: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  paymentStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  cardsSection: {
    marginBottom: 15,
  },
  cardsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  cardsList: {
    gap: 4,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIndicator: {
    fontSize: 12,
    marginRight: 8,
  },
  cardName: {
    fontSize: 14,
    color: '#333',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  amountSection: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionsSection: {
    alignItems: 'flex-end',
  },
  actionsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  receiptText: {
    color: '#4F7EFF',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PaymentHistoryScreen;