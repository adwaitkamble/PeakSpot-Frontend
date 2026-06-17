import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Polyline, Rect } from 'react-native-svg';
import { COLORS, SPACING, FONTS } from '../constants/theme';

// --- Reusable SVG Icons ---
const BackIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={COLORS.neutral.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UserIcon = () => (
  <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlusIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={COLORS.neutral.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={COLORS.oxfordBlue[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 2V6M8 2V6M3 10H21" stroke={COLORS.oxfordBlue[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Polyline points="6 9 12 15 18 9" stroke={COLORS.oxfordBlue[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// --- Reusable Input Component ---
interface FormInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  rightIcon?: React.ReactNode;
  rightText?: string;
  flex?: number;
}

const FormInput = ({ label, placeholder, value, rightIcon, rightText, flex }: FormInputProps) => (
  <View style={[styles.inputContainer, flex ? { flex } : undefined]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
      />
      {rightIcon && <View style={styles.rightElement}>{rightIcon}</View>}
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
    </View>
  </View>
);

// --- Main Screen Component ---
export default function AthleteRegistration({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Register Athlete</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        bounces={true}
        alwaysBounceVertical={true}
      >

        {/* Centered Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <UserIcon />
            </View>
            <TouchableOpacity style={styles.addPhotoBadge} activeOpacity={0.8}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Sections */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <FormInput label="Full Name" placeholder="Enter full name" />

          <View style={styles.row}>
            <FormInput label="Date of Birth" flex={1} rightIcon={<CalendarIcon />} />
            <FormInput label="Gender" placeholder="Select" flex={1} rightIcon={<ChevronDownIcon />} />
          </View>

          <FormInput label="Contact Number" placeholder="+1 (555) 000-0000" />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Physical Metrics</Text>
          <View style={styles.row}>
            <FormInput label="Height" placeholder="0" flex={1} rightText="cm" />
            <FormInput label="Weight" placeholder="0" flex={1} rightText="kg" />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Affiliations</Text>
          <FormInput label="Sport Specialization" placeholder="Select Sport" rightIcon={<ChevronDownIcon />} />
          <FormInput label="Academy" placeholder="PCCOE Elite Athletics" />
          <FormInput label="Assigned Coach" placeholder="Coach Aryan Aradhye" rightIcon={<ChevronDownIcon />} />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('QRCodePreview')}
          >
            <Text style={styles.primaryButtonText}>SAVE & GENERATE QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Download QR</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral.white,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  header: {
    backgroundColor: COLORS.oxfordBlue[500],
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: 10,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    color: COLORS.neutral.white,
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.display.bold,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 130, // Large bottom padding so tab navigator doesn't cover actions
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F3F8', // Soft light gray/blue fill
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.coralRed[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.neutral.white,
    // Soft shadow for depth
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  formSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    color: COLORS.oxfordBlue[500],
    fontSize: 16,
    fontWeight: '800',
    fontFamily: FONTS.display.bold,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    color: COLORS.oxfordBlue[500],
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FB', // Soft light blue/gray input background
    borderRadius: 12, // More rounded, matching mockup
    paddingHorizontal: 16,
    height: 52,
  },
  textInput: {
    flex: 1,
    color: COLORS.oxfordBlue[500],
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.primary.regular,
  },
  rightElement: {
    marginLeft: SPACING.sm,
  },
  rightText: {
    color: 'rgba(24, 38, 80, 0.4)', // Dark blue muted
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONTS.primary.semiBold,
    marginLeft: SPACING.sm,
  },
  actionSection: {
    marginTop: SPACING.sm,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.coralRed[500],
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.coralRed[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryButtonText: {
    color: COLORS.neutral.white,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONTS.primary.bold,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E9ECEF', // Subtle light gray border
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: 'rgba(24, 38, 80, 0.4)', // Muted text color matching download button
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.primary.semiBold,
  }
});