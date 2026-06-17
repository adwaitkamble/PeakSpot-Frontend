import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// --- Reusable SVG Icons ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M15 19l-7-7 7-7" stroke={COLORS.neutral.white} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const TrendUpIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <Path d="M23 6l-9.5 9.5-5-5L1 18" stroke={COLORS.secondary.limeGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 6h6v6" stroke={COLORS.secondary.limeGreen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const SaveIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 21v-8H7v8M7 3v5h8" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PdfIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export default function TestResults() {
    const [showSavedModal, setShowSavedModal] = useState(false);

    const handleSave = () => {
        setShowSavedModal(true);
        setTimeout(() => {
            setShowSavedModal(false);
        }, 2200);
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.backButton}>
                            <BackIcon />
                        </TouchableOpacity>
                        <View style={styles.headerTextCenter}>
                            <Text style={styles.headerTitle}>Test Results</Text>
                            <Text style={styles.headerSubtitle}>Sprint 20m</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>Completed</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Key Metrics Card */}
                <View style={styles.metricsCard}>
                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>Peak Speed</Text>
                        <Text style={[styles.metricValue, { color: COLORS.coralRed[500] }]}>
                            8.4 <Text style={styles.metricUnit}>m/s</Text>
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>Total Time</Text>
                        <Text style={[styles.metricValue, { fontSize: 32, color: COLORS.oxfordBlue[500] }]}>
                            4.12<Text style={[styles.metricUnit, { fontSize: 22 }]}>s</Text>
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.metricItem}>
                        <Text style={styles.metricLabel}>Acceleration</Text>
                        <Text style={[styles.metricValue, { color: COLORS.secondary.turboSky }]}>
                            6.2 <Text style={styles.metricUnit}>m/s²</Text>
                        </Text>
                    </View>
                </View>

                {/* Performance Curve Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeaderRow}>
                        <Text style={styles.sectionTitle}>Performance Curve</Text>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: COLORS.coralRed[500] }]} />
                                <Text style={styles.legendText}>Current</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={styles.legendDash} />
                                <Text style={styles.legendText}>Avg</Text>
                            </View>
                        </View>
                    </View>

                    <LinearGradient
                        colors={[COLORS.oxfordBlue[700], COLORS.oxfordBlue[900]]} // Deep navy gradient
                        style={styles.graphContainer}
                    >
                        {/* Y-Axis Labels */}
                        <View style={styles.graphTopLabels}>
                            <Text style={styles.graphLabelText}>Speed</Text>
                            <Text style={styles.graphLabelText}>m/s</Text>
                        </View>

                        {/* Background Grid Lines */}
                        <View style={styles.gridLinesContainer}>
                            <View style={styles.gridLine} />
                            <View style={styles.gridLine} />
                            <View style={styles.gridLine} />
                            <View style={styles.gridLine} />
                        </View>

                        {/* SVG Graph Area */}
                        <Svg
                            style={styles.svgGraph}
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            <Defs>
                                <SvgLinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={COLORS.coralRed[500]} stopOpacity="1" />
                                    <Stop offset="100%" stopColor={COLORS.coralRed[500]} stopOpacity="0" />
                                </SvgLinearGradient>
                            </Defs>

                            {/* Avg Line (Dashed) */}
                            <Path d="M 0 90 Q 50 70 100 60" fill="none" stroke={COLORS.secondary.brightOrange} strokeDasharray="3,3" strokeWidth="1.5" />

                            {/* Current Line Fill (Gradient) */}
                            <Path d="M 0 85 Q 30 75 50 60 T 100 45 L 100 100 L 0 100 Z" fill="url(#grad1)" opacity="0.3" />

                            {/* Current Line (Solid) */}
                            <Path d="M 0 85 Q 30 75 50 60 T 100 45" fill="none" stroke={COLORS.coralRed[500]} strokeWidth="2.5" />

                            {/* Data Points */}
                            <Circle cx="10" cy="83" fill={COLORS.coralRed[500]} r="2.5" />
                            <Circle cx="30" cy="72" fill={COLORS.coralRed[500]} r="2.5" />
                            <Circle cx="50" cy="60" fill={COLORS.coralRed[500]} r="2.5" />
                            <Circle cx="70" cy="53" fill={COLORS.coralRed[500]} r="2.5" />
                            <Circle cx="90" cy="48" fill={COLORS.coralRed[500]} r="2.5" />
                        </Svg>

                        {/* X-Axis Labels */}
                        <View style={styles.graphBottomLabels}>
                            <Text style={styles.graphLabelText}>0m</Text>
                            <Text style={styles.graphLabelText}>10m</Text>
                            <Text style={styles.graphLabelText}>20m</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Split Times Card */}
                <View style={styles.card}>
                    <Text style={[styles.sectionTitle, { marginBottom: SPACING.md }]}>Split Times</Text>

                    <View style={styles.splitList}>
                        {/* Split 1 */}
                        <View style={styles.splitItem}>
                            <View style={styles.splitLeft}>
                                <Text style={styles.splitDistance}>0—10m</Text>
                                <TrendUpIcon />
                            </View>
                            <Text style={styles.splitTime}>2.10s</Text>
                        </View>

                        {/* Split 2 (No border bottom) */}
                        <View style={[styles.splitItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                            <View style={styles.splitLeft}>
                                <Text style={styles.splitDistance}>10—20m</Text>
                                <TrendUpIcon />
                            </View>
                            <Text style={styles.splitTime}>2.02s</Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={handleSave}>
                        <SaveIcon />
                        <Text style={styles.primaryBtnText}>Save Result</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
                        <PdfIcon />
                        <Text style={styles.secondaryBtnText}>Export PDF</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Success Popup Modal */}
            <Modal
                transparent={true}
                visible={showSavedModal}
                animationType="fade"
                onRequestClose={() => setShowSavedModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIconWrapper}>
                            <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M20 6L9 17L4 12"
                                    stroke={COLORS.secondary.limeGreen}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                        </View>
                        <Text style={styles.modalText}>Your results are saved successfully</Text>
                    </View>
                </View>
            </Modal>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        ...SHADOWS.sm,
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
    },
    headerTextCenter: {
        alignItems: 'center',
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 22,
        fontFamily: FONTS.display.bold,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
        fontFamily: FONTS.primary.semiBold,
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: COLORS.secondary.limeGreen,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusBadgeText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
        gap: SPACING.lg,
    },
    metricsCard: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 24,
        padding: SPACING.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    metricItem: {
        flex: 1,
        alignItems: 'center',
    },
    metricLabel: {
        color: COLORS.neutral.muted,
        fontSize: 11,
        fontFamily: FONTS.primary.semiBold,
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 22,
        fontFamily: FONTS.display.bold,
    },
    metricUnit: {
        fontSize: 14,
        fontFamily: FONTS.primary.semiBold,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: COLORS.neutral.border,
    },
    card: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 24,
        padding: SPACING.lg,
        ...SHADOWS.sm,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    sectionTitle: {
        color: COLORS.oxfordBlue[500],
        fontSize: 18,
        fontFamily: FONTS.display.bold,
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendDash: {
        width: 16,
        borderTopWidth: 2,
        borderColor: COLORS.secondary.brightOrange,
        borderStyle: 'dashed',
    },
    legendText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 10,
        fontFamily: FONTS.primary.semiBold,
    },
    graphContainer: {
        height: 200,
        borderRadius: 16,
        padding: SPACING.md,
        position: 'relative',
        overflow: 'hidden',
    },
    graphTopLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    graphLabelText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 10,
        fontFamily: FONTS.primary.semiBold,
    },
    gridLinesContainer: {
        position: 'absolute',
        top: 32,
        bottom: 32,
        left: 16,
        right: 16,
        justifyContent: 'space-between',
        zIndex: 0,
    },
    gridLine: {
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        width: '100%',
    },
    svgGraph: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
    },
    graphBottomLabels: {
        position: 'absolute',
        bottom: 12,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    splitList: {
        gap: 0,
    },
    splitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.neutral.border,
        paddingBottom: SPACING.md,
        marginBottom: SPACING.md,
    },
    splitLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    splitDistance: {
        color: COLORS.neutral.muted,
        fontSize: 14,
        fontFamily: FONTS.primary.semiBold,
    },
    splitTime: {
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.display.bold,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        paddingTop: 8,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: COLORS.coralRed[500],
        borderRadius: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...SHADOWS.sm,
    },
    primaryBtnText: {
        color: COLORS.neutral.white,
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    secondaryBtn: {
        flex: 1,
        backgroundColor: COLORS.neutral.white,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        borderRadius: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...SHADOWS.sm,
    },
    secondaryBtnText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(24, 38, 80, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        width: '80%',
        maxWidth: 320,
        ...SHADOWS.md,
    },
    successIconWrapper: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F0FAE6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    modalText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.primary.bold,
        textAlign: 'center',
        lineHeight: 22,
    }
});