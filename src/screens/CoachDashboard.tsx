import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, SPACING, FONTS } from '../constants/theme';

export default function CoachDashboard({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
      >

        {/* ── Header Section ── */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.brandText}>P E A K S P O T</Text>
              <Text style={styles.headerSubtitle}>Coach Dashboard</Text>
            </View>

            {/* Live badge */}
            <View style={styles.liveBadge}>
              <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <Path
                  d="M6.5 3.5H10.5M10.5 3.5V7.5M10.5 3.5L6.5 7.5L4.5 5.5L1.5 8.5"
                  stroke={COLORS.secondary.limeGreen}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.liveText}>Live</Text>
            </View>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome, Coach{'\n'}Adwait</Text>
            <Text style={styles.welcomeSubText}>PeakSpot Dashboard</Text>
          </View>
        </View>

        {/* ── Main Content (Overlapping the Header) ── */}
        <View style={styles.mainContent}>

          {/* Stats Cards Row */}
          <View style={styles.statsRow}>
            {/* Total Athletes */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>Total Athletes</Text>
                <Svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M8.66667 4.66667H14M14 4.66667V10M14 4.66667L8.66667 10L6 7.33333L2 11.3333"
                    stroke={COLORS.secondary.limeGreen}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.statValue}>42</Text>
            </View>

            {/* Today's Tests */}
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statLabel}>Today's Tests</Text>
                <Svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M8.66667 4.66667H14M14 4.66667V10M14 4.66667L8.66667 10L6 7.33333L2 11.3333"
                    stroke={COLORS.secondary.limeGreen}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.statValue}>12</Text>
            </View>
          </View>

          {/* Device Status Pill */}
          <View style={styles.devicePill}>
            <View style={styles.statusDot} />
            <Text style={styles.deviceText}>PeakSpot Devices: 4 Connected</Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('AthleteRegistration')}
              >
                <View style={styles.iconCircle}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 9V12M18 12V15M18 12H21M18 12H15M13 7C13 9.20766 11.2077 11 9 11C6.79234 11 5 9.20766 5 7C5 4.79234 6.79234 3 9 3C11.2077 3 13 4.79234 13 7ZM3 20C3 16.6885 5.68851 14 9 14C12.3115 14 15 16.6885 15 20V21H3V20Z"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.actionText}>Register{'\n'}Athlete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.iconCircle}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M5 8H7C7.551 8 8 7.551 8 7V5C8 4.448 7.551 4 7 4H5C4.448 4 4 4.448 4 5V7C4 7.551 4.448 8 5 8ZM17 8H19C19.551 8 20 7.551 20 7V5C20 4.448 19.551 4 19 4H17C16.448 4 16 4.448 16 5V7C16 7.551 16.448 8 17 8ZM5 20H7C7.551 20 8 19.551 8 19V17C8 16.448 7.551 16 7 16H5C4.448 16 4 16.448 4 17V19C4 19.551 4.448 20 5 20ZM4 12H8M12 4V5M12 9V12M12 12H12.01M12 12H16.01M16 20H20M12 16V20M20 12H20.01"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.actionText}>Scan QR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => navigation.navigate('Tests')}>
                <View style={styles.iconCircle}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M13 10V3L4 14H11V21L20 10H13Z"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.actionText}>Start Test</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7} onPress={() => navigation.navigate('Reports')}>
                <View style={styles.iconCircle}>
                  <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M9 19V13C9 11.896 8.103 11 7 11H5C3.896 11 3 11.896 3 13V19C3 20.103 3.896 21 5 21H7C8.103 21 9 20.103 9 19ZM9 19V9C9 7.896 9.896 7 11 7H13C14.103 7 15 7.896 15 9V19M15 19V5C15 3.896 15.896 3 17 3H19C20.103 3 21 3.896 21 5V19C21 20.103 20.103 21 19 21H17C15.896 21 15 20.103 15 19ZM9 19C9 20.103 9.896 21 11 21H13C14.103 21 15 20.103 15 19"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <Text style={styles.actionText}>Reports</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Recent Activities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>

            <View style={styles.activityList}>
              {/* Activity 1 */}
              <View style={styles.activityCard}>
                <View style={styles.activityIconWrapper} />
                <View style={styles.activityDetails}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>Sprint 20m — Completed</Text>
                    <Text style={styles.activityTime}>2m ago</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Completed</Text>
                  </View>
                </View>
              </View>

              {/* Activity 2 */}
              <View style={styles.activityCard}>
                <View style={styles.activityIconWrapper}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path
                      d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1394 14.1394 17.5 10 17.5C5.86064 17.5 2.5 14.1394 2.5 10C2.5 5.86064 5.86064 2.5 10 2.5C14.1394 2.5 17.5 5.86064 17.5 10Z"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.activityDetails}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>10m Sprint — Completed</Text>
                    <Text style={styles.activityTime}>18m ago</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Completed</Text>
                  </View>
                </View>
              </View>

              {/* Activity 3 */}
              <View style={styles.activityCard}>
                <View style={styles.activityIconWrapper}>
                  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M13 10V3L4 14H11V21L20 10H13Z"
                      stroke={COLORS.coralRed[500]}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={styles.activityDetails}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>Agility Drill — Completed</Text>
                    <Text style={styles.activityTime}>41m ago</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Completed</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB', // Light slate/blue-gray premium background
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Clean space at the bottom to scroll past bottom tab navigator
  },
  header: {
    backgroundColor: COLORS.oxfordBlue[500],
    paddingHorizontal: SPACING.xl,
    paddingTop: 65,
    paddingBottom: 75,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  brandText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    fontFamily: FONTS.display.bold,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: FONTS.primary.semiBold,
    marginTop: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  liveText: {
    color: COLORS.neutral.white,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
  },
  welcomeContainer: {
    marginTop: SPACING.sm,
  },
  welcomeText: {
    color: COLORS.neutral.white,
    fontSize: 32,
    fontWeight: '800',
    fontFamily: FONTS.display.bold,
    lineHeight: 38,
  },
  welcomeSubText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.primary.semiBold,
    marginTop: 6,
  },
  mainContent: {
    paddingHorizontal: SPACING.xl,
    marginTop: -45, // Soft overlap to stats cards
    gap: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.neutral.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#1A1F36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E9ECEF', // Subtle border as in Figma
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: 'rgba(24, 38, 80, 0.4)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: COLORS.oxfordBlue[500],
    fontSize: 36,
    fontWeight: '800',
    fontFamily: FONTS.display.bold,
  },
  devicePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.neutral.white,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#1A1F36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary.limeGreen,
  },
  deviceText: {
    color: COLORS.oxfordBlue[500],
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
  },
  section: {
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.oxfordBlue[500],
    fontSize: 18,
    fontWeight: '800',
    fontFamily: FONTS.display.bold,
    marginBottom: SPACING.md,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  actionButton: {
    width: '48%',
    backgroundColor: COLORS.neutral.white,
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#1A1F36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F9',
    marginBottom: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(238, 68, 93, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: COLORS.oxfordBlue[500],
    fontSize: 13,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
    textAlign: 'center',
    lineHeight: 18,
  },
  activityList: {
    gap: SPACING.md,
  },
  activityCard: {
    backgroundColor: COLORS.neutral.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#1A1F36',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F9',
  },
  activityIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(238, 68, 93, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    color: COLORS.oxfordBlue[500],
    fontSize: 14,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
  },
  activityTime: {
    color: 'rgba(24, 38, 80, 0.4)',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: FONTS.primary.semiBold,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(144, 199, 62, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  statusBadgeText: {
    color: COLORS.secondary.limeGreen,
    fontSize: 10,
    fontWeight: '700',
    fontFamily: FONTS.primary.bold,
  }
});