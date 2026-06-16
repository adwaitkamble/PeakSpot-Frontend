import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Polyline, Line } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// --- Reusable SVG Icons ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke={COLORS.neutral.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const EditIcon = () => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ChevronRightIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M9 18l6-6-6-6" stroke={COLORS.neutral.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const SectionIcons = {
    Account: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="7" r="4" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" /></Svg>,
    Groups: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" /><Circle cx="9" cy="7" r="4" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" /></Svg>,
    Devices: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Line x1="12" y1="18" x2="12.01" y2="18" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" /></Svg>,
    Timer: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Polyline points="12 6 12 12 16 14" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Line x1="12" y1="2" x2="12" y2="4" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /></Svg>,
    Notifications: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    Palette: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" /><Circle cx="7.5" cy="9.5" r="1.5" fill={COLORS.oxfordBlue[500]} /><Circle cx="12" cy="6.5" r="1.5" fill={COLORS.oxfordBlue[500]} /><Circle cx="16.5" cy="9.5" r="1.5" fill={COLORS.oxfordBlue[500]} /><Path d="M12 22a5 5 0 010-10h5" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" /></Svg>,
    Shield: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    Bluetooth: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    AddCircle: () => <Svg width="18" height="18" viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="10" stroke={COLORS.neutral.white} strokeWidth="2" /><Line x1="12" y1="8" x2="12" y2="16" stroke={COLORS.neutral.white} strokeWidth="2" /><Line x1="8" y1="12" x2="16" y2="12" stroke={COLORS.neutral.white} strokeWidth="2" /></Svg>,
    Logout: () => <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke={COLORS.coralRed[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
};

export default function Settings({ navigation }: any) {
    // --- Toggle States ---
    const [autoGenerateId, setAutoGenerateId] = useState(true);
    const [autoStart, setAutoStart] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [testCompletion, setTestCompletion] = useState(true);
    const [lowBattery, setLowBattery] = useState(true);
    const [weeklyReports, setWeeklyReports] = useState(false);

    // --- Custom Unit Toggle State ---
    const [unit, setUnit] = useState('METERS');

    // --- Reusable Component for Standard Rows ---
    const SettingsRow = ({ label, rightElement, onPress, isDanger }: any) => (
        <TouchableOpacity style={styles.rowItem} onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
            <Text style={[styles.rowText, isDanger && styles.textDanger]}>{label}</Text>
            {rightElement || <ChevronRightIcon />}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerLeft}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <BackIcon />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Settings</Text>
                        </View>
                        <View style={styles.headerAvatarContainer}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=100&auto=format&fit=crop' }}
                                style={styles.headerAvatar}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Profile Card */}
                <View style={[styles.card, styles.profileCard]}>
                    <View style={styles.profileImageWrapper}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.editBadge}>
                            <EditIcon />
                        </View>
                    </View>
                    <Text style={styles.profileName}>Coach Adwait</Text>
                    <Text style={styles.profileEmail}>adwait@peakspot.com</Text>
                    <Text style={styles.profileAcademy}>PCCOE ELITE ATHLETICS</Text>
                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Text style={styles.editProfileBtnText}>EDIT PROFILE</Text>
                    </TouchableOpacity>
                </View>

                {/* Account Settings */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Account />
                        <Text style={styles.cardHeaderTitle}>ACCOUNT</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="Personal Information" />
                        <SettingsRow label="Change Password" />
                        <SettingsRow label="Update Email" />
                        <SettingsRow label="Manage Organization" />
                    </View>
                </View>

                {/* Athlete Management */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Groups />
                        <Text style={styles.cardHeaderTitle}>ATHLETE MANAGEMENT</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="Default Registration Settings" />
                        <SettingsRow label="QR Preferences" />
                        <SettingsRow
                            label="Auto-Generate ID"
                            rightElement={
                                <Switch value={autoGenerateId} onValueChange={setAutoGenerateId} trackColor={{ true: COLORS.coralRed[500] }} />
                            }
                        />
                        <SettingsRow
                            label="Default Sport"
                            rightElement={<Text style={styles.valueTextBold}>Football</Text>}
                        />
                    </View>
                </View>

                {/* Device Settings */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Devices />
                        <Text style={styles.cardHeaderTitle}>DEVICE SETTINGS</Text>
                    </View>
                    <View style={styles.cardBodyInnerPadding}>
                        <View style={styles.deviceRow}>
                            <View style={styles.deviceLeft}>
                                <View style={styles.deviceIconBg}>
                                    <SectionIcons.Bluetooth />
                                </View>
                                <View>
                                    <Text style={styles.deviceName}>SpeedSensor V4</Text>
                                    <Text style={styles.deviceStatus}>CONNECTED</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none"><Circle cx="12" cy="12" r="3" stroke={COLORS.neutral.muted} strokeWidth="2" /><Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={COLORS.neutral.muted} strokeWidth="2" /></Svg>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.deviceStatsGrid}>
                            <View style={styles.deviceStatBox}>
                                <Text style={styles.deviceStatLabel}>CALIBRATION</Text>
                                <Text style={styles.deviceStatValue}>98.4% Acc.</Text>
                            </View>
                            <View style={styles.deviceStatBox}>
                                <Text style={styles.deviceStatLabel}>FIRMWARE</Text>
                                <Text style={styles.deviceStatValue}>v2.1.0-A</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.pairDeviceBtn}>
                            <SectionIcons.AddCircle />
                            <Text style={styles.pairDeviceBtnText}>PAIR NEW DEVICE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Test Configuration */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Timer />
                        <Text style={styles.cardHeaderTitle}>TEST CONFIGURATION</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="Countdown Timer" rightElement={<Text style={styles.valueText}>3s</Text>} />
                        <SettingsRow label="Auto Start" rightElement={<Switch value={autoStart} onValueChange={setAutoStart} trackColor={{ true: COLORS.coralRed[500] }} />} />
                        <SettingsRow label="Auto Save" rightElement={<Switch value={autoSave} onValueChange={setAutoSave} trackColor={{ true: COLORS.coralRed[500] }} />} />
                        <SettingsRow label="Split Timing" />
                        <SettingsRow
                            label="Units"
                            rightElement={
                                <View style={styles.unitToggleGroup}>
                                    <TouchableOpacity
                                        style={[styles.unitToggleBtn, unit === 'METERS' && styles.unitToggleBtnActive]}
                                        onPress={() => setUnit('METERS')}
                                    >
                                        <Text style={[styles.unitToggleText, unit === 'METERS' && styles.unitToggleTextActive]}>METERS</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.unitToggleBtn, unit === 'FEET' && styles.unitToggleBtnActive]}
                                        onPress={() => setUnit('FEET')}
                                    >
                                        <Text style={[styles.unitToggleText, unit === 'FEET' && styles.unitToggleTextActive]}>FEET</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Notifications />
                        <Text style={styles.cardHeaderTitle}>NOTIFICATIONS</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="Push Notifications" rightElement={<Switch value={pushNotifs} onValueChange={setPushNotifs} trackColor={{ true: COLORS.coralRed[500] }} />} />
                        <SettingsRow label="Test Completion" rightElement={<Switch value={testCompletion} onValueChange={setTestCompletion} trackColor={{ true: COLORS.coralRed[500] }} />} />
                        <SettingsRow label="Low Battery Warning" rightElement={<Switch value={lowBattery} onValueChange={setLowBattery} trackColor={{ true: COLORS.coralRed[500] }} />} />
                        <SettingsRow label="Weekly Reports" rightElement={<Switch value={weeklyReports} onValueChange={setWeeklyReports} trackColor={{ true: COLORS.coralRed[500] }} />} />
                    </View>
                </View>

                {/* Appearance & Security (Stacked for Mobile) */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Palette />
                        <Text style={styles.cardHeaderTitle}>APPEARANCE</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="Theme" rightElement={<Text style={[styles.valueTextBold, { color: COLORS.coralRed[500] }]}>LIGHT</Text>} />
                        <SettingsRow label="Language" rightElement={<Text style={styles.valueTextBold}>EN</Text>} />
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <SectionIcons.Shield />
                        <Text style={styles.cardHeaderTitle}>SECURITY</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <SettingsRow label="2FA Status" rightElement={<Text style={[styles.valueTextBold, { color: COLORS.secondary.limeGreen }]}>ON</Text>} />
                        <SettingsRow label="Logout" isDanger rightElement={<SectionIcons.Logout />} />
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerBrand}>PeakSpot</Text>
                    <Text style={styles.footerTagline}>EVERY MOVE COUNTS</Text>
                    <View style={styles.footerSub}>
                        <Text style={styles.footerSubText}>Powered by Powered Sports Tech</Text>
                        <Text style={styles.footerVersion}>VERSION v1.0.0</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral.light,
    },
    header: {
        backgroundColor: COLORS.oxfordBlue[500],
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        ...SHADOWS.md,
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 20,
        fontFamily: FONTS.display.bold,
    },
    headerAvatarContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
    },
    headerAvatar: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
        gap: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        overflow: 'hidden',
        ...SHADOWS.sm,
    },
    profileCard: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: SPACING.md,
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        borderColor: COLORS.neutral.light,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.coralRed[500],
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.sm,
    },
    profileName: {
        color: COLORS.oxfordBlue[500],
        fontSize: 24,
        fontFamily: FONTS.display.bold,
        marginBottom: 2,
    },
    profileEmail: {
        color: COLORS.neutral.muted,
        fontSize: 16,
        fontFamily: FONTS.primary.regular,
        marginBottom: 6,
    },
    profileAcademy: {
        color: COLORS.oxfordBlue[400], // Mapped from on-primary-fixed-variant
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.5,
        marginBottom: SPACING.lg,
    },
    editProfileBtn: {
        borderWidth: 2,
        borderColor: COLORS.coralRed[500],
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.sm,
        borderRadius: 8,
    },
    editProfileBtnText: {
        color: COLORS.coralRed[500],
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        backgroundColor: COLORS.oxfordBlue[50], // Mapped from surface-container-low
        paddingHorizontal: SPACING.md,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.border,
    },
    cardHeaderTitle: {
        color: COLORS.oxfordBlue[500],
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.5,
    },
    cardBody: {
        backgroundColor: COLORS.neutral.white,
    },
    cardBodyInnerPadding: {
        padding: SPACING.md,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.light,
    },
    rowText: {
        color: COLORS.neutral.dark,
        fontSize: 16,
        fontFamily: FONTS.primary.regular,
    },
    textDanger: {
        color: COLORS.coralRed[500],
        fontFamily: FONTS.primary.bold,
    },
    valueText: {
        color: COLORS.neutral.muted,
        fontSize: 16,
        fontFamily: FONTS.primary.bold,
    },
    valueTextBold: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    unitToggleGroup: {
        flexDirection: 'row',
        backgroundColor: COLORS.neutral.light,
        padding: 4,
        borderRadius: 8,
    },
    unitToggleBtn: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    unitToggleBtnActive: {
        backgroundColor: COLORS.neutral.white,
        ...SHADOWS.sm,
    },
    unitToggleText: {
        color: COLORS.neutral.muted,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
    },
    unitToggleTextActive: {
        color: COLORS.oxfordBlue[500],
    },
    deviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deviceLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    deviceIconBg: {
        backgroundColor: COLORS.oxfordBlue[50],
        padding: SPACING.sm,
        borderRadius: 8,
    },
    deviceName: {
        color: COLORS.neutral.dark,
        fontSize: 16,
        fontFamily: FONTS.primary.semiBold,
    },
    deviceStatus: {
        color: COLORS.secondary.limeGreen,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    deviceStatsGrid: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginTop: SPACING.md,
    },
    deviceStatBox: {
        flex: 1,
        backgroundColor: COLORS.neutral.light,
        padding: SPACING.sm,
        borderRadius: 8,
    },
    deviceStatLabel: {
        color: COLORS.neutral.muted,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        marginBottom: 2,
    },
    deviceStatValue: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    pairDeviceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: COLORS.coralRed[500],
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: SPACING.md,
    },
    pairDeviceBtnText: {
        color: COLORS.neutral.white,
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.5,
    },
    footer: {
        alignItems: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
        opacity: 0.6,
    },
    footerBrand: {
        color: COLORS.oxfordBlue[500],
        fontSize: 20,
        fontFamily: FONTS.display.bold,
    },
    footerTagline: {
        color: COLORS.coralRed[500],
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 1.5,
        marginTop: 4,
    },
    footerSub: {
        alignItems: 'center',
        marginTop: SPACING.md,
    },
    footerSubText: {
        color: COLORS.neutral.muted,
        fontSize: 14,
        fontFamily: FONTS.primary.regular,
    },
    footerVersion: {
        color: COLORS.neutral.muted,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        marginTop: 4,
    }
});