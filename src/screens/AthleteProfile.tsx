import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Platform,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Circle, Polyline } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

const ActivityIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke={COLORS.neutral.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const TrophyIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M6 9H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6v-1a2 2 0 0 0-2-2h-2M6 9V4h12v5M12 19v3M8 22h8" stroke={COLORS.secondary.limeGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const TimerIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={COLORS.coralRed[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Polyline points="12 6 12 12 16 14" stroke={COLORS.coralRed[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const QrIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="3" width="7" height="7" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="14" y="3" width="7" height="7" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="14" y="14" width="7" height="7" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3 14h7v7H3z" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ReportIcon = () => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path d="M18 20V10M12 20V4M6 20v-6M3 20h18" stroke={COLORS.oxfordBlue[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

// ─── Sub-component: single grid card ──────────────────────────────────────────

const GridCard = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.gridCard}>
        <Text style={styles.gridLabel}>{label}</Text>
        <Text style={styles.gridValue}>{value}</Text>
    </View>
);

// ─── Main Screen ───────────────────────────────────────────────────────────────

export default function AthleteProfile({ navigation }: any) {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

                {/* ═══ HERO IMAGE ═══ */}
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.heroBackground}
                    resizeMode="cover"
                >
                    {/* Transparent status bar spacer */}
                    <View style={styles.statusBarSpacer} />

                    <LinearGradient
                        colors={['transparent', 'rgba(24, 38, 80, 0.6)', '#182650']}
                        locations={[0.25, 0.65, 1]}
                        style={styles.gradientOverlay}
                    >
                        <View style={styles.heroContent}>
                            <Text style={styles.athleteName}>Adwait Kamble</Text>
                            <View style={styles.idBadge}>
                                <Text style={styles.idBadgeText}>ID: ATH-2026-000123</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>

                {/* ═══ WHITE BODY (slides over hero) ═══ */}
                <View style={styles.bodyContainer}>

                    {/* ── Demographics Grid: 3 cols × 2 rows ── */}
                    {/* ROW 1 */}
                    <View style={styles.gridRow}>
                        <GridCard label="Age" value="21" />
                        <GridCard label="Height" value="180 cm" />
                        <GridCard label="Weight" value="75 kg" />
                    </View>
                    {/* ROW 2 */}
                    <View style={[styles.gridRow, { marginBottom: SPACING.lg }]}>
                        <GridCard label="Sport" value="Football" />
                        <GridCard label="Academy" value={'PCCOE\nElite'} />
                        <GridCard label="Coach" value="Atharva" />
                    </View>

                    {/* ── Performance Stats Card ── */}
                    <View style={styles.statsCard}>

                        {/* Top row: Tests Conducted | Best Result */}
                        <View style={styles.statsTopRow}>

                            {/* Left column */}
                            <View style={styles.statCol}>
                                <View style={[styles.iconCircle, { backgroundColor: '#EEF1FB' }]}>
                                    <ActivityIcon />
                                </View>
                                <Text style={styles.statLabel}>Tests{'\n'}Conducted</Text>
                                <Text style={styles.statBigValue}>14</Text>
                            </View>

                            {/* Vertical separator */}
                            <View style={styles.verticalDivider} />

                            {/* Right column */}
                            <View style={styles.statCol}>
                                <View style={[styles.iconCircle, { backgroundColor: '#F0FAE6' }]}>
                                    <TrophyIcon />
                                </View>
                                <Text style={styles.statLabel}>Best Result</Text>
                                <Text style={styles.statBigValue}>
                                    2.14s{'  '}
                                    <Text style={styles.greenText}>(10m Sprint)</Text>
                                </Text>
                            </View>
                        </View>

                        {/* Horizontal separator */}
                        <View style={styles.horizontalDivider} />

                        {/* Bottom row: Latest Result — full width */}
                        <View style={styles.latestResultRow}>
                            <View style={[styles.iconCircle, { backgroundColor: '#FDECEA' }]}>
                                <TimerIcon />
                            </View>
                            <View>
                                <Text style={styles.statLabel}>Latest Result</Text>
                                <Text style={styles.statBigValue}>2.21s</Text>
                            </View>
                        </View>

                    </View>

                    {/* ── Action Buttons ── */}
                    <View style={styles.actionSection}>
                        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Tests')}>
                            <Text style={styles.primaryBtnText}>START TEST</Text>
                        </TouchableOpacity>

                        <View style={styles.secondaryRow}>
                            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8} onPress={() => navigation.navigate('QRCodePreview')}>
                                <QrIcon />
                                <Text style={styles.secondaryBtnText}>View QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8} onPress={() => navigation.navigate('Reports')}>
                                <ReportIcon />
                                <Text style={styles.secondaryBtnText}>Reports</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#182650', // oxford blue — shows behind hero on overscroll
    },

    // ── Hero ──
    heroBackground: {
        width: '100%',
        height: 260,
    },
    statusBarSpacer: {
        height: Platform.OS === 'android' ? StatusBar.currentHeight ?? 28 : 44,
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: SPACING.xl,
        paddingBottom: 30,
    },
    heroContent: {
        alignItems: 'flex-start',
    },
    athleteName: {
        color: '#FFFFFF',
        fontSize: 30,
        fontFamily: FONTS.display.bold,
        marginBottom: 10,
        letterSpacing: 0.2,
    },
    idBadge: {
        backgroundColor: COLORS.secondary.turboSky,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 24,
    },
    idBadgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 0.3,
    },

    // ── Body ──
    bodyContainer: {
        backgroundColor: '#F2F5FA',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        paddingHorizontal: SPACING.lg,     // 16px sides
        paddingTop: SPACING.lg,
        paddingBottom: 110,                // clears the bottom tab bar
    },

    // ── Grid (3 columns × 2 rows) ──
    gridRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    gridCard: {
        flex: 1,                           // equal width — 3 per row
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 14,
        minHeight: 78,
        justifyContent: 'flex-start',
        ...SHADOWS.sm,
    },
    gridLabel: {
        color: COLORS.neutral.muted,
        fontSize: 10,
        fontFamily: FONTS.primary.semiBold,
        marginBottom: 6,
    },
    gridValue: {
        color: COLORS.oxfordBlue[500],
        fontSize: 15,
        fontFamily: FONTS.primary.bold,
        lineHeight: 21,
    },

    // ── Stats Card ──
    statsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.md,
        marginBottom: SPACING.lg,
        ...SHADOWS.sm,
    },
    statsTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: SPACING.md,
    },
    statCol: {
        flex: 1,
        alignItems: 'flex-start',
        gap: 6,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    statLabel: {
        color: COLORS.neutral.muted,
        fontSize: 11,
        fontFamily: FONTS.primary.semiBold,
        lineHeight: 16,
    },
    statBigValue: {
        color: COLORS.oxfordBlue[500],
        fontSize: 20,
        fontFamily: FONTS.display.bold,
        marginTop: 2,
        flexShrink: 1,
        flexWrap: 'wrap',
    },
    greenText: {
        color: COLORS.secondary.limeGreen,
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    verticalDivider: {
        width: 1,
        alignSelf: 'stretch',
        backgroundColor: '#E4EAF4',
        marginHorizontal: 16,
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: '#E4EAF4',
        marginBottom: SPACING.md,
    },
    latestResultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 4,
    },

    // ── Action Buttons ──
    actionSection: {
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: COLORS.coralRed[500],
        borderRadius: 50,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.coralRed[500],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 7,
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontFamily: FONTS.primary.bold,
        letterSpacing: 1.5,
    },
    secondaryRow: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#D4DCE9',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    secondaryBtnText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
});