import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Rocket } from 'lucide-react-native';
import { GameCard } from '@/components/GameCard';
import { useEffect, useState } from 'react';
import { supabase, Game } from '@/lib/supabase';

export default function GamesScreen() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Error loading games:', error);
      return;
    }

    setGames(data || []);
  }

  function handlePlayGame(gameTitle: string) {
    Alert.alert('Coming Soon!', `${gameTitle} will be available soon!`);
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#020617', '#0c4a6e']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Space Games</Text>
        <Text style={styles.subtitle}>Choose your asteroid adventure</Text>
      </LinearGradient>

      <View style={styles.content}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            description={game.description}
            icon={
              game.icon_type === 'target' ? (
                <Target size={36} color="#ffffff" />
              ) : (
                <Rocket size={36} color="#ffffff" />
              )
            }
            gradientColors={
              game.color_scheme === 'cyan'
                ? ['#06b6d4', '#0891b2']
                : ['#8b5cf6', '#7c3aed']
            }
            buttonColor={game.color_scheme === 'cyan' ? '#06b6d4' : '#8b5cf6'}
            onPress={() => handlePlayGame(game.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  content: {
    padding: 24,
  },
});
