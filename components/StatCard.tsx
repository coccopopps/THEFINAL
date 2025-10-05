import { View, Text, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type StatCardProps = {
  icon: ReactNode;
  value: string | number;
  label: string;
  gradientColors: string[];
};

export function StatCard({ icon, value, label, gradientColors }: StatCardProps) {
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#1e293b', '#0f172a']}
        style={styles.gradient}
      >
        <View style={[styles.iconContainer, { backgroundColor: gradientColors[0] + '20' }]}>
          <LinearGradient
            colors={gradientColors}
            style={styles.iconGradient}
          >
            {icon}
          </LinearGradient>
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    marginBottom: 16,
  },
  gradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
  },
});
