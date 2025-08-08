# CardSyncApp 💳

A comprehensive React Native credit card management application that helps users track their credit cards, manage payments, and monitor their financial health.

## 📱 Features

### Dashboard Overview
![Dashboard](https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/1.png)
- **Quick Summary**: View total balance, minimum payments, and available credit at a glance
- **Upcoming Dues**: Track payment deadlines for all your cards
- **Quick Pay**: Fast access to minimum payment options
- **Notification Settings**: Manage email, SMS, and push notifications

### Credit Card Management
![My Cards](https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/2.png)
- **Card Portfolio**: Visual display of all your credit cards
- **Real-time Balances**: Current balance, available credit, and payment due dates
- **Card Details**: Interest rates, credit limits, and minimum payments
- **Add New Cards**: Easy integration of additional credit cards

### Smart Payment Distribution
![Make Payment](https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/3.png)
- **Intelligent Algorithm**: Automatically distributes payments across cards
- **Minimum Payment Priority**: Ensures all minimum payments are covered first
- **Interest Rate Optimization**: Allocates remaining funds to highest interest rate cards
- **Custom Amount Entry**: Flexible payment amounts with real-time distribution preview
- **Payment Types**: Support for minimum payments, custom amounts, and full balance payments

### Payment History & Receipts
![Payment History](https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/5.png)
- **Transaction Tracking**: Complete history of all payments made
- **Receipt Generation**: Digital receipts for every transaction
- **Payment Details**: Card-wise breakdown of payment distributions
- **Status Monitoring**: Track payment completion and processing status
- **Search & Filter**: Easy navigation through payment history

### Settings & Preferences
![Settings](https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/7.png)
- **Security Settings**: Two-factor authentication and password management
- **Notification Controls**: Granular control over email, SMS, and push notifications
- **Display Preferences**: Customize card sorting and number visibility
- **Account Management**: Sign out and account deletion options

## 🚀 Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation v7
- **Icons**: Expo Vector Icons
- **State Management**: React Hooks (useState, useMemo)
- **Platform Support**: iOS, Android, and Web

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/blackhat955/CredSycApp.git
   cd CardSyncApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go
   - **Web**: Press `w` or open http://localhost:19006

## 🎯 Key Functionalities

### Payment Distribution Algorithm
The app features an intelligent payment distribution system that:
1. **Covers Minimum Payments**: Ensures all cards receive their minimum payment first
2. **Optimizes Interest Savings**: Allocates remaining funds to cards with highest interest rates
3. **Prevents Over-payment**: Respects total due amounts for each card
4. **Real-time Updates**: Shows live distribution as you adjust payment amounts

### Receipt System
- **Instant Generation**: Creates detailed receipts for every payment
- **Comprehensive Details**: Includes transaction ID, payment breakdown, and card information
- **Download Option**: Allows users to save receipts for record-keeping
- **Alert Integration**: Uses native alerts for seamless user experience

### Notification Management
- **Multi-channel Support**: Email, SMS, and push notifications
- **Synchronized Settings**: Changes reflect across Dashboard and Settings screens
- **Interactive Toggles**: Easy on/off controls with visual feedback
- **Real-time Updates**: Immediate state changes with proper UI feedback

## 📱 Screenshots

| Dashboard | My Cards | Make Payment |
|-----------|----------|-------------|
| <img src="https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/1.png" width="200" alt="Dashboard"> | <img src="https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/2.png" width="200" alt="My Cards"> | <img src="https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/3.png" width="200" alt="Make Payment"> |

| Payment History | Settings |
|----------------|----------|
| <img src="https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/5.png" width="200" alt="Payment History"> | <img src="https://raw.githubusercontent.com/blackhat955/CredSycApp/master/CardSyncApp/assets/7.png" width="200" alt="Settings"> |

## 🛠️ Development

### Project Structure
```
CardSyncApp/
├── src/
│   ├── components/
│   │   └── CreditCard.js          # Reusable credit card component
│   ├── data/
│   │   └── mockData.js            # Sample data for development
│   └── screens/
│       ├── DashboardScreen.js     # Main dashboard with overview
│       ├── MyCardsScreen.js       # Credit card portfolio view
│       ├── MakePaymentScreen.js   # Payment interface with smart distribution
│       ├── PaymentHistoryScreen.js # Transaction history and receipts
│       └── SettingsScreen.js      # App preferences and account settings
├── assets/                        # Images and icons
├── App.js                        # Main app component with navigation
└── package.json                  # Dependencies and scripts
```

### Key Components
- **Navigation**: Bottom tab navigation with 5 main screens
- **State Management**: Local state with hooks for real-time updates
- **Responsive Design**: Optimized for various screen sizes
- **Cross-platform**: Works seamlessly on iOS, Android, and Web

## 🔧 Configuration

The app uses Expo configuration in `app.json`:
- **App Name**: CardSyncApp
- **Platform Support**: iOS, Android, Web
- **Icons**: Custom app icons for all platforms
- **Splash Screen**: Branded loading screen

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**blackhat955**
- GitHub: [@blackhat955](https://github.com/blackhat955)
- Repository: [CredSycApp](https://github.com/blackhat955/CredSycApp)

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Expo team for the amazing development platform
- React Navigation for seamless navigation solutions

---

**CardSyncApp** - Simplifying credit card management, one payment at a time! 💳✨