import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CreditCard from '../components/CreditCard';
import { mockCards, mockPaymentData } from '../data/mockData';

const DashboardScreen = ({ navigation }) => {
  const [smsAlerts, setSmsAlerts] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back, Durgesh</Text>
            <Text style={styles.subtitleText}>Here's an overview of your credit cards</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Outstanding</Text>
              <Text style={styles.summaryAmount}>${mockPaymentData.totalOutstanding.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Total Minimum Due</Text>
              <Text style={styles.summaryAmount}>${mockPaymentData.totalMinimumDue.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Quick Pay */}
        <View style={styles.quickPayContainer}>
          <Text style={styles.quickPayTitle}>Quick Pay</Text>
          <Text style={styles.quickPaySubtitle}>Pay all your dues in one go</Text>
          <View style={styles.quickPayCard}>
            <Text style={styles.quickPayLabel}>Total Due Amount</Text>
            <Text style={styles.quickPayAmount}>${mockPaymentData.totalOutstanding.toLocaleString()}</Text>
            <TouchableOpacity 
              style={styles.quickPayButton}
              onPress={() => navigation.navigate('Make Payment')}
            >
              <Text style={styles.quickPayButtonText}>Payment Summary Pay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Dues */}
        <View style={styles.upcomingDuesContainer}>
          <Text style={styles.sectionTitle}>Upcoming Dues</Text>
          {mockPaymentData.upcomingDues.map((due, index) => (
            <View key={index} style={styles.dueItem}>
              <View style={styles.dueInfo}>
                <Text style={styles.dueCardName}>{due.cardName}</Text>
                <Text style={styles.dueDate}>{due.dueDate}</Text>
              </View>
              <View style={styles.dueAmountContainer}>
                <Text style={styles.dueAmount}>${due.amount.toLocaleString()}</Text>
                <Text style={styles.dueMinimum}>Min: ${due.minimum}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* My Credit Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardsHeader}>
            <Text style={styles.sectionTitle}>My Credit Cards</Text>
            <TouchableOpacity onPress={() => navigation.navigate('My Cards')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockCards.slice(0, 2).map((card, index) => (
              <CreditCard key={index} card={card} style={styles.cardItem} />
            ))}
            <TouchableOpacity style={styles.addCardButton}>
              <Ionicons name="add" size={24} color="#666" />
              <Text style={styles.addCardText}>Add New Card</Text>
              <Text style={styles.addCardSubtext}>Add a new credit card to manage</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Reminders */}
        <View style={styles.remindersContainer}>
          <Text style={styles.sectionTitle}>Reminders</Text>
          <View style={styles.reminderItem}>
            <Ionicons name="mail-outline" size={20} color="#4F7EFF" />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Email Reminders</Text>
              <Text style={styles.reminderStatus}>Enabled</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleActive} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.reminderItem}
            onPress={() => setSmsAlerts(!smsAlerts)}
          >
            <Ionicons 
              name="chatbubble-outline" 
              size={20} 
              color={smsAlerts ? "#4F7EFF" : "#666"} 
            />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>SMS Alerts</Text>
              <Text style={styles.reminderStatus}>{smsAlerts ? "Enabled" : "Disabled"}</Text>
            </View>
            <View style={smsAlerts ? styles.toggle : styles.toggleInactive}>
              {smsAlerts && <View style={styles.toggleActive} />}
            </View>
          </TouchableOpacity>
          <View style={styles.reminderItem}>
            <Ionicons name="notifications-outline" size={20} color="#4F7EFF" />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Push Notifications</Text>
              <Text style={styles.reminderStatus}>Enabled</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleActive} />
            </View>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationIcon: {
    padding: 8,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#e8f2ff',
    padding: 20,
    borderRadius: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quickPayContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  quickPayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  quickPaySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  quickPayCard: {
    backgroundColor: '#4F7EFF',
    padding: 20,
    borderRadius: 12,
  },
  quickPayLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  quickPayAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  quickPayButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quickPayButtonText: {
    color: '#4F7EFF',
    fontWeight: '600',
  },
  upcomingDuesContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  dueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dueInfo: {
    flex: 1,
  },
  dueCardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  dueAmountContainer: {
    alignItems: 'flex-end',
  },
  dueAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dueMinimum: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  cardsContainer: {
    marginTop: 30,
  },
  cardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewAllText: {
    color: '#4F7EFF',
    fontWeight: '500',
  },
  cardItem: {
    marginLeft: 20,
  },
  addCardButton: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 20,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
  },
  addCardSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  remindersContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reminderContent: {
    flex: 1,
    marginLeft: 15,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  reminderStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#4F7EFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 3,
  },
  toggleActive: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  toggleInactive: {
    width: 50,
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 3,
  },
});

export default DashboardScreen;