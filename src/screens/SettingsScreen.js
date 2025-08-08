import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [enable2FA, setEnable2FA] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [showCardNumbers, setShowCardNumbers] = useState(true);
  const [defaultSorting, setDefaultSorting] = useState('dueDate');

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'You will be redirected to change your password securely.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Navigate to change password') },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Sign out') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => console.log('Delete account') 
        },
      ]
    );
  };

  const SettingsSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement, 
    showArrow = true,
    destructive = false 
  }) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.iconContainer, destructive && styles.destructiveIcon]}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={destructive ? '#EF4444' : '#4F7EFF'} 
          />
        </View>
        <View style={styles.settingsItemContent}>
          <Text style={[styles.settingsItemTitle, destructive && styles.destructiveText]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingsItemRight}>
        {rightElement}
        {showArrow && onPress && (
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ToggleSwitch = ({ value, onValueChange }) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#ddd', true: '#4F7EFF' }}
      thumbColor={value ? '#fff' : '#fff'}
    />
  );

  const DropdownValue = ({ value, onPress }) => (
    <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
      <Text style={styles.dropdownValue}>{value}</Text>
      <Ionicons name="chevron-down" size={16} color="#666" />
    </TouchableOpacity>
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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      
      <Text style={styles.subtitle}>Manage your account settings and preferences</Text>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Security Settings */}
        <SettingsSection title="Security Settings">
          <SettingsItem
            icon="key-outline"
            title="Change Password"
            subtitle="Keep your account secure with a strong password"
            onPress={handleChangePassword}
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            title="Two-Factor Authentication"
            subtitle="Add an extra layer of security to your account"
            rightElement={
              <ToggleSwitch 
                value={enable2FA} 
                onValueChange={setEnable2FA} 
              />
            }
            showArrow={false}
          />
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection title="Notification Settings">
          <SettingsItem
            icon="mail-outline"
            title="Email Notification Frequency"
            subtitle="How often would you like to receive email notifications about your upcoming dues?"
            rightElement={
              <DropdownValue 
                value="Daily" 
                onPress={() => console.log('Open frequency selector')}
              />
            }
            showArrow={false}
          />
          <SettingsItem
            icon="mail-outline"
            title="Email Reminders"
            subtitle="Enabled"
            rightElement={
              <ToggleSwitch 
                value={emailNotifications} 
                onValueChange={setEmailNotifications} 
              />
            }
            showArrow={false}
          />
          <SettingsItem
            icon="chatbubble-outline"
            title="SMS Alerts"
            subtitle={smsAlerts ? "Enabled" : "Disabled"}
            rightElement={
              <ToggleSwitch 
                value={smsAlerts} 
                onValueChange={setSmsAlerts} 
              />
            }
            showArrow={false}
          />
          <SettingsItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Enabled"
            rightElement={
              <ToggleSwitch 
                value={pushNotifications} 
                onValueChange={setPushNotifications} 
              />
            }
            showArrow={false}
          />
        </SettingsSection>

        {/* Card Display Settings */}
        <SettingsSection title="Card Display Settings">
          <SettingsItem
            icon="eye-outline"
            title="Show card numbers"
            subtitle="Display full card numbers instead of masked numbers"
            rightElement={
              <ToggleSwitch 
                value={showCardNumbers} 
                onValueChange={setShowCardNumbers} 
              />
            }
            showArrow={false}
          />
          <SettingsItem
            icon="swap-vertical-outline"
            title="Default card sorting"
            subtitle="Choose how your cards are sorted by default"
            rightElement={
              <DropdownValue 
                value="Due date (earliest first)" 
                onPress={() => console.log('Open sorting options')}
              />
            }
            showArrow={false}
          />
        </SettingsSection>

        {/* Account Management */}
        <SettingsSection title="Account Management">
          <SettingsItem
            icon="log-out-outline"
            title="Sign Out"
            onPress={handleSignOut}
          />
          <SettingsItem
            icon="trash-outline"
            title="Delete Account"
            onPress={handleDeleteAccount}
            destructive={true}
          />
        </SettingsSection>
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
  subtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
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
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#fef2f2',
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  destructiveText: {
    color: '#EF4444',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  dropdownValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default SettingsScreen;