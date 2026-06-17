import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// --- Mock Data ---
const TABS = ['Sprint', 'Shuttle', 'Agility', 'Endurance'];

const PROTOCOLS_BY_TAB: Record<string, Array<{ id: number; title: string; subtitle: string }>> = {
    Sprint: [
        { id: 1, title: '2 Gate 10 Meter Sprint', subtitle: '2 gates • 10 meters' },
        { id: 2, title: '3 Gate 20 Meter Sprint', subtitle: '3 gates • 20 meters' },
        { id: 3, title: '4 Gate 30 Meter Sprint', subtitle: '4 gates • 30 meters' },
        { id: 4, title: '5 Gate 40 Meter Sprint', subtitle: '5 gates • 40 meters' },
        { id: 5, title: '2 Gate 20 Meter Sprint', subtitle: '2 gates • 20 meters' },
    ],
    Shuttle: [
        { id: 6, title: '5-10-5 Shuttle', subtitle: '3 gates • 20 meters total' },
        { id: 7, title: '30-15 Intermittent Fitness Test', subtitle: 'Audio cues • 40 meters' },
        { id: 8, title: 'Pro Agility Shuttle', subtitle: '3 gates • 15 meters' },
    ],
    Agility: [
        { id: 9, title: 'T-Test Agility', subtitle: '4 gates • Directional' },
        { id: 10, title: 'Illinois Agility Test', subtitle: '8 gates • Standard path' },
        { id: 11, title: 'L-Run / 3-Cone Test', subtitle: '3 gates • 3 cones' },
    ],
    Endurance: [
        { id: 12, title: 'Beep Test (20m Multi-Stage)', subtitle: 'Audio cues • 20 meters' },
        { id: 13, title: 'Yo-Yo Intermittent Recovery Test', subtitle: 'Audio cues • 20 meters' },
        { id: 14, title: '12-Minute Cooper Run', subtitle: 'Continuous tracking • Track lap' },
    ],
};

// --- Reusable SVG Icons ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const SearchIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const AthleteBadgeIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" stroke={COLORS.oxfordBlue[500]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ChevronRightIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill={COLORS.coralRed[500]}>
        <Path fillRule="evenodd" clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" />
    </Svg>
);

export default function SelectTestProtocol({ navigation }: any) {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Select Test Protocol</Text>
                        <TouchableOpacity style={styles.iconButton}>
                            <SearchIcon />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            {/* Sticky Horizontal Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsScrollContent}
                >
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                                onPress={() => setActiveTab(tab)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScrollContent}>

                {/* Athlete Context Card */}
                <View style={styles.athleteCard}>
                    <View style={styles.athleteAvatar}>
                        <AthleteBadgeIcon />
                    </View>
                    <View style={styles.athleteInfo}>
                        <View style={styles.athleteTitleRow}>
                            <Text style={styles.athleteName}>Adwait Kamble</Text>
                            <View style={styles.idBadge}>
                                <Text style={styles.idBadgeText}>ATH-2026-000123</Text>
                            </View>
                        </View>
                        <Text style={styles.athleteSubtext}>Assigned athlete for the selected test protocol</Text>
                    </View>
                </View>

                {/* Protocol List */}
                <View style={styles.protocolList}>
                    {(PROTOCOLS_BY_TAB[activeTab] || []).map((protocol) => (
                        <TouchableOpacity
                            key={protocol.id}
                            style={styles.protocolCard}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('ConfigureSprintTest', { protocol })}
                        >
                            <View style={styles.protocolIconPlaceholder} />
                            <View style={styles.protocolInfo}>
                                <Text style={styles.protocolTitle}>{protocol.title}</Text>
                                <Text style={styles.protocolSubtitle}>{protocol.subtitle}</Text>
                            </View>
                            <ChevronRightIcon />
                        </TouchableOpacity>
                    ))}
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
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: 16,
    },
    iconButton: {
        padding: SPACING.xs,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 18,
        fontFamily: FONTS.display.bold,
        letterSpacing: 0.5,
    },
    tabsContainer: {
        backgroundColor: COLORS.neutral.light,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral.border,
        zIndex: 5,
    },
    tabsScrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: 12,
        gap: 8,
    },
    tabButton: {
        backgroundColor: COLORS.neutral.border, // Maps to Tailwind's slate-100/200 inactive
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonActive: {
        backgroundColor: COLORS.oxfordBlue[500],
        ...SHADOWS.sm,
    },
    tabText: {
        color: COLORS.neutral.muted,
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tabTextActive: {
        color: COLORS.neutral.white,
    },
    mainScrollContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
    },
    athleteCard: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 16,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        ...SHADOWS.sm,
        marginBottom: SPACING.lg,
    },
    athleteAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF', // Light blue tint
        alignItems: 'center',
        justifyContent: 'center',
    },
    athleteInfo: {
        flex: 1,
    },
    athleteTitleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    athleteName: {
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.display.bold,
    },
    idBadge: {
        backgroundColor: COLORS.secondary.turboSky,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    idBadgeText: {
        color: COLORS.neutral.white,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    athleteSubtext: {
        color: COLORS.neutral.muted,
        fontSize: 12,
        fontFamily: FONTS.primary.regular,
    },
    protocolList: {
        gap: 12,
    },
    protocolCard: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 16,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        ...SHADOWS.sm,
    },
    protocolIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF', // Light blue tint
    },
    protocolInfo: {
        flex: 1,
    },
    protocolTitle: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
        marginBottom: 2,
    },
    protocolSubtitle: {
        color: COLORS.neutral.muted,
        fontSize: 11,
        fontFamily: FONTS.primary.regular,
    }
});