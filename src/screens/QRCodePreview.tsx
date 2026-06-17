import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Image, Share, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { File as ExpoFile, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Svg, { Path, Rect, Circle, Line, Polyline } from 'react-native-svg';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';

// --- Reusable SVG Icons (Geometric & Outline Style) ---
const BackIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const UserIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke={COLORS.neutral.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const DownloadIcon = ({ color = COLORS.oxfordBlue[500] }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ShareIcon = ({ color = COLORS.oxfordBlue[500] }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PrintIcon = ({ color = COLORS.oxfordBlue[500] }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Polyline points="6 9 6 2 18 2 18 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="6" y="14" width="12" height="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const QrIconSmall = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="3" width="7" height="7" stroke={COLORS.neutral.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="14" y="3" width="7" height="7" stroke={COLORS.neutral.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="14" y="14" width="7" height="7" stroke={COLORS.neutral.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="3" y="14" width="7" height="7" stroke={COLORS.neutral.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9 9H9.01M15 9H15.01M9 15H9.01M15 15H15.01" stroke={COLORS.neutral.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export default function QRCodePreview({ navigation }: any) {
    const [showDownloadedModal, setShowDownloadedModal] = useState(false);

    const handleDownload = async () => {
        try {
            // Request write-only permissions to save to gallery
            const { status } = await MediaLibrary.requestPermissionsAsync(true);
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Storage permission is required to save the QR code to your gallery.');
                return;
            }

            const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ATH-0248&color=182650';
            const fileLocation = new ExpoFile(Paths.cache, 'ATH-0248-QR.png');

            // Download file to local cache directory
            const downloadedFile = await ExpoFile.downloadFileAsync(qrUrl, fileLocation, { idempotent: true });

            // Verify the file actually exists before saving
            if (!downloadedFile.exists) {
                throw new Error('Download completed but file was not found on device.');
            }

            // Create a media asset in the device gallery
            const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
            if (!asset) {
                throw new Error('Failed to save QR code to gallery.');
            }
            
            // Show custom popup
            setShowDownloadedModal(true);
            setTimeout(() => {
                setShowDownloadedModal(false);
            }, 2200);
        } catch (error: any) {
            Alert.alert('Download Error', error.message || 'Unable to download and save QR code.');
        }
    };

    const handleShare = async () => {
        try {
            const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ATH-0248&color=182650';
            const fileLocation = new ExpoFile(Paths.cache, 'ATH-0248-QR-share.png');
            
            // Download to cache for sharing
            const downloadedFile = await ExpoFile.downloadFileAsync(qrUrl, fileLocation, { idempotent: true });
            
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(downloadedFile.uri);
            } else {
                Alert.alert('Sharing Not Available', 'Sharing is not available on this platform.');
            }
        } catch (error: any) {
            Alert.alert('Share Error', error.message || 'Unable to share QR code.');
        }
    };

    const handlePrint = () => {
        Alert.alert('Print Job', 'Connecting to PCCOE Network Printer...');
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>QR Code Preview</Text>
                        <View style={{ width: 24 }} />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Athlete Profile Card */}
                <View style={styles.card}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarCircle}>
                            <UserIcon />
                        </View>
                        <View style={styles.profileInfo}>
                            <View style={styles.titleRow}>
                                <Text style={styles.athleteName}>Adwait Kamble</Text>
                                <View style={styles.idBadge}>
                                    <Text style={styles.idBadgeText}>Athlete ID • 0248</Text>
                                </View>
                            </View>
                            <Text style={styles.athleteSubtext}>Football • 18 yrs • Male</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>HEIGHT</Text>
                            <Text style={styles.statValue}>180 cm</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>WEIGHT</Text>
                            <Text style={styles.statValue}>75 kg</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>ACADEMY</Text>
                            <Text style={styles.statValue}>PCCOE</Text>
                        </View>
                    </View>
                </View>

                {/* QR Code Section */}
                <View style={styles.card}>
                    <View style={styles.qrHeaderRow}>
                        <View>
                            <Text style={styles.sectionTitle}>Generated QR Code</Text>
                            <Text style={styles.sectionSubtext}>Scan to open athlete profile instantly</Text>
                        </View>
                        <View style={styles.readyBadge}>
                            <Text style={styles.readyBadgeText}>Ready</Text>
                        </View>
                    </View>

                    <View style={styles.qrContainer}>
                        <View style={styles.qrInnerCard}>
                            {/* Realistic QR Placeholder via API */}
                            <Image
                                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ATH-0248&color=182650' }}
                                style={styles.qrImage}
                            />
                        </View>
                    </View>

                    {/* Small Action Buttons */}
                    <View style={styles.smallActionsRow}>
                        <TouchableOpacity style={styles.smallActionButton} onPress={handleDownload}>
                            <DownloadIcon />
                            <Text style={styles.smallActionText}>Download</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallActionButton} onPress={handleShare}>
                            <ShareIcon />
                            <Text style={styles.smallActionText}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallActionButton} onPress={handlePrint}>
                            <PrintIcon />
                            <Text style={styles.smallActionText}>Print</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <View style={styles.infoIconCircle}>
                        <QrIconSmall />
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoTitle}>Keep this QR handy</Text>
                        <Text style={styles.infoDesc}>Use it at check-in, testing stations, and throughout the event.</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Sticky Bottom Actions (Above Navigation Tab) */}
            <View style={styles.stickyBottomBar}>
                <TouchableOpacity style={styles.primaryDownloadBtn} activeOpacity={0.8} onPress={handleDownload}>
                    <Text style={styles.primaryDownloadText}>DOWNLOAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.8} onPress={handleShare}>
                    <ShareIcon />
                    <Text style={styles.secondaryActionText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.8} onPress={handlePrint}>
                    <PrintIcon />
                    <Text style={styles.secondaryActionText}>Print</Text>
                </TouchableOpacity>
            </View>

            {/* Success Popup Modal */}
            <Modal
                transparent={true}
                visible={showDownloadedModal}
                animationType="fade"
                onRequestClose={() => setShowDownloadedModal(false)}
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
                        <Text style={styles.modalText}>Your QR code is downloaded successfully</Text>
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
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.xl,
        paddingVertical: 16,
    },
    backButton: {
        padding: SPACING.xs,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 18,
        fontFamily: FONTS.display.bold,
    },
    scrollContent: {
        padding: SPACING.lg,
        paddingBottom: 40,
        gap: SPACING.lg,
    },
    card: {
        backgroundColor: COLORS.neutral.white,
        borderRadius: 20,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        ...SHADOWS.sm,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    avatarCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.neutral.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    athleteName: {
        color: COLORS.oxfordBlue[500],
        fontSize: 18,
        fontFamily: FONTS.display.bold,
    },
    idBadge: {
        backgroundColor: COLORS.coralRed[50],
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    idBadgeText: {
        color: COLORS.coralRed[500],
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    athleteSubtext: {
        color: COLORS.neutral.muted,
        fontSize: 13,
        fontFamily: FONTS.primary.semiBold,
        marginTop: 2,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SPACING.lg,
        gap: SPACING.sm,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.neutral.light,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    statLabel: {
        color: COLORS.neutral.muted,
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statValue: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
        marginTop: 4,
    },
    qrHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        color: COLORS.oxfordBlue[500],
        fontSize: 16,
        fontFamily: FONTS.display.bold,
    },
    sectionSubtext: {
        color: COLORS.neutral.muted,
        fontSize: 12,
        fontFamily: FONTS.primary.regular,
        marginTop: 2,
    },
    readyBadge: {
        backgroundColor: COLORS.coralRed[50],
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    readyBadgeText: {
        color: COLORS.coralRed[500],
        fontSize: 10,
        fontFamily: FONTS.primary.bold,
    },
    qrContainer: {
        backgroundColor: COLORS.neutral.light,
        padding: SPACING.xl,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
    },
    qrInnerCard: {
        backgroundColor: COLORS.neutral.white,
        padding: SPACING.sm,
        borderRadius: 16,
        ...SHADOWS.sm,
    },
    qrImage: {
        width: 180,
        height: 180,
    },
    smallActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.sm,
    },
    smallActionButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    smallActionText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 12,
        fontFamily: FONTS.primary.semiBold,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: COLORS.coralRed[50],
        borderWidth: 1,
        borderColor: '#FFE4E6',
        borderRadius: 16,
        padding: SPACING.md,
        alignItems: 'flex-start',
        gap: SPACING.md,
    },
    infoIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.coralRed[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        color: COLORS.oxfordBlue[500],
        fontSize: 14,
        fontFamily: FONTS.primary.bold,
    },
    infoDesc: {
        color: COLORS.neutral.muted,
        fontSize: 12,
        fontFamily: FONTS.primary.regular,
        marginTop: 4,
        lineHeight: 18,
    },
    stickyBottomBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.neutral.white,
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderColor: COLORS.neutral.border,
        gap: SPACING.sm,
    },
    primaryDownloadBtn: {
        flex: 1.2,
        backgroundColor: COLORS.coralRed[500],
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.sm,
    },
    primaryDownloadText: {
        color: COLORS.neutral.white,
        fontSize: 13,
        fontFamily: FONTS.display.bold,
        letterSpacing: 0.5,
    },
    secondaryActionBtn: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.neutral.border,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    secondaryActionText: {
        color: COLORS.oxfordBlue[500],
        fontSize: 13,
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