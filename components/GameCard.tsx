import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';

type GameCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  gradientColors: string[];
  buttonColor: string;
  onPress: () => void;
};

export function GameCard({
  title,
  description,
  icon,
  gradientColors,
  buttonColor,
  onPress,
}: GameCardProps) {
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

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity onPress={onPress}>
          <View style={[styles.button, { backgroundColor: buttonColor }]}>
            <Text style={styles.buttonText}>Play Now</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  gradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
