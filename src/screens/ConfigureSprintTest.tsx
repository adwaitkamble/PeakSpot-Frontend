import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// --- Reusable SVG Icons ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke={COLORS.neutral.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ChevronDownIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M19 9l-7 7-7-7" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ConnectIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export default function ConfigureSprintTest({ route, navigation }: any) {
    const protocol = route?.params?.protocol;
    const title = protocol?.title || 'Sprint Test';

    // --- Form State ---
    const [gates, setGates] = useState('3');
    const [distance, setDistance] = useState('20m');

    // --- Toggle State ---
    const [autoStart, setAutoStart] = useState(true);
    const [countdown, setCountdown] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Configure {title}</Text>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Gate Diagram Card */}
                <View style={styles.card}>
                    <View style={styles.diagramContainer}>
                        {/* Connecting Line */}
                        <View style={styles.gateLine} />

                        {/* Gates Row */}
                        <View style={styles.gatesRow}>
                            {/* Gate 1 */}
                            <View style={styles.gateWrapper}>
                                <View style={styles.gateBox} />
                                <Text style={styles.gateLabel}>Gate 1</Text>
                                <View style={[styles.distanceLabel, { left: '120%' }]}>
                                    <Text style={styles.distanceLabelText}>10m</Text>
                                </View>
                            </View>

                            {/* Gate 2 */}
                            <View style={styles.gateWrapper}>
                                <View style={styles.gateBox} />
                                <Text style={styles.gateLabel}>Gate 2</Text>
                                <View style={[styles.distanceLabel, { right: '120%' }]}>
                                    <Text style={styles.distanceLabelText}>10m</Text>
                                </View>
                            </View>

                            {/* Gate 3 */}
                            <View style={styles.gateWrapper}>
                                <View style={styles.gateBox} />
                                <Text style={styles.gateLabel}>Gate 3</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Settings Card */}
                <View style={styles.card}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Number of PeakSpot Gates</Text>
                        <TouchableOpacity style={styles.fakeDropdown} activeOpacity={0.8}>
                            <Text style={styles.inputText}>{gates}</Text>
                            <ChevronDownIcon />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Distance</Text>
                        <TextInput
                            style={styles.textInput}
                            value={distance}
                            onChangeText={setDistance}
                            keyboardType="default"
                        />
                    </View>
                </View>

                {/* Toggles Card */}
                <View style={styles.card}>
                    {/* Auto Start */}
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Auto Start</Text>
                        <Switch
                            trackColor={{ false: COLORS.neutral.border, true: COLORS.secondary.limeGreen }}
                            thumbColor={COLORS.neutral.white}
                            ios_backgroundColor={COLORS.neutral.border}
                            onValueChange={setAutoStart}
                            value={autoStart}
                        />
                    </View>

                    {/* Countdown */}
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Countdown</Text>
                        <Switch
                            trackColor={{ false: COLORS.neutral.border, true: COLORS.secondary.limeGreen }}
                            thumbColor={COLORS.neutral.white}
                            ios_backgroundColor={COLORS.neutral.border}
                            onValueChange={setCountdown}
                            value={countdown}
                        />
                    </View>

                    {/* Auto Save */}
                    <View style={styles.toggleRow}>
                        <Text style={styles.toggleLabel}>Auto Save</Text>
                        <Switch
                            trackColor={{ false: COLORS.neutral.border, true: COLORS.secondary.limeGreen }}
                            thumbColor={COLORS.neutral.white}
                            ios_backgroundColor={COLORS.neutral.border}
                            onValueChange={setAutoSave}
                            value={autoSave}
                        />
                    </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
                    <ConnectIcon />
                    <Text style={styles.actionButtonText}>CONNECT DEVICES & READY</Text>
                </TouchableOpacity>

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
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        ...SHADOWS.md,
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: 16,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 18,
        fontFamily: FONTS.display.bold,
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
        gap: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 24, // Translates to rounded-3xl/rounded-[2rem]
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        ...SHADOWS.sm,
    },
    diagramContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    gateLine: {
        position: 'absolute',
        width: '80%',
        height: 2,
        backgroundColor: COLORS.oxfordBlue[500],
        top: '40%', // Centers it specifically behind the boxes
        zIndex: 1,
    },
    gatesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: SPACING.sm,
        zIndex: 2,
    },
    gateWrapper: {
        alignItems: 'center',
        position: 'relative',
    },
    gateBox: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.neutral.white,
        borderWidth: 2,
        borderColor: COLORS.coralRed[500],
        borderRadius: 4,
        shadowColor: COLORS.coralRed[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    gateLabel: {
        color: COLORS.oxfordBlue[500],
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        marginTop: SPACING.sm,
    },
    distanceLabel: {
        position: 'absolute',
        top: -10,
        backgroundColor: COLORS.neutral.white,
        paddingHorizontal: 4,
        zIndex: 3,
    },
    distanceLabelText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    inputLabel: {
        color: COLORS.neutral.muted,
        fontSize: 12,
        fontFamily: FONTS.primary.semiBold,
        marginBottom: 6,
        marginLeft: 4,
    },
    fakeDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.neutral.white,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        borderRadius: 16,
        paddingHorizontal: SPACING.lg,
        height: 52,
    },
    textInput: {
        backgroundColor: COLORS.neutral.white,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        borderRadius: 16,
        paddingHorizontal: SPACING.lg,
        height: 52,
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.primary.bold,
    },
    inputText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.primary.bold,
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.neutral.light,
        padding: SPACING.md,
        borderRadius: 16,
        marginBottom: 8,
    },
    toggleLabel: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.coralRed[500],
        borderRadius: 30, // Fully rounded pill shape
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.coralRed[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        marginTop: SPACING.sm,
    },
    actionButtonText: {
        color: COLORS.neutral.white,
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.5,
    }
});