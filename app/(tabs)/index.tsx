import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Rocket, Target, Trophy, Star } from 'lucide-react-native';
import { StatCard } from '@/components/StatCard';
import { useEffect, useState } from 'react';
import { supabase, UserProfile } from '@/lib/supabase';

export default function HomeScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const mockProfile: UserProfile = {
      id: '1',
      username: 'Space Explorer',
      level: 12,
      is_pro: true,
      games_played: 24,
      high_score: 1847,
      achievements: 8,
      news_read: 156,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProfile(mockProfile);
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#06b6d4', '#8b5cf6']}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarText}>SE</Text>
        </LinearGradient>

        <View style={styles.headerInfo}>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.subtitle}>Cosmic Adventurer</Text>

          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Level {profile.level}</Text>
            </View>
            {profile.is_pro && (
              <View style={[styles.badge, styles.proBadge]}>
                <Text style={styles.badgeText}>Pro Player</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={<Rocket size={28} color="#ffffff" />}
          value={profile.games_played}
          label="Games Played"
          gradientColors={['#06b6d4', '#0891b2']}
        />
        <StatCard
          icon={<Target size={28} color="#ffffff" />}
          value={profile.high_score.toLocaleString()}
          label="High Score"
          gradientColors={['#0891b2', '#0e7490']}
        />
        <StatCard
          icon={<Trophy size={28} color="#ffffff" />}
          value={profile.achievements}
          label="Achievements"
          gradientColors={['#0e7490', '#155e75']}
        />
        <StatCard
          icon={<Star size={28} color="#ffffff" />}
          value={profile.news_read}
          label="News Read"
          gradientColors={['#155e75', '#164e63']}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Trophy size={24} color="#06b6d4" />
          <Text style={styles.sectionTitle}>Achievements</Text>
        </View>
        <Text style={styles.comingSoon}>Achievement list coming soon...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 20,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#06b6d4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  proBadge: {
    backgroundColor: '#8b5cf6',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    padding: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  section: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  comingSoon: {
    color: '#64748b',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
