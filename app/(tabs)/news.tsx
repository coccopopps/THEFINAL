import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NewsCard } from '@/components/NewsCard';
import { useEffect, useState } from 'react';
import { supabase, NewsArticle } from '@/lib/supabase';

export default function NewsScreen() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error loading news:', error);
      return;
    }

    setNews(data || []);
  }

  function toggleBookmark(newsId: string) {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(newsId)) {
        newSet.delete(newsId);
      } else {
        newSet.add(newsId);
      }
      return newSet;
    });
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#020617', '#581c87']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>Asteroid News</Text>
        <Text style={styles.subtitle}>Latest updates from the cosmos</Text>
      </LinearGradient>

      <View style={styles.content}>
        {news.map((article) => (
          <NewsCard
            key={article.id}
            title={article.title}
            description={article.description}
            category={article.category}
            date={formatDate(article.date)}
            isBookmarked={bookmarkedIds.has(article.id)}
            onToggleBookmark={() => toggleBookmark(article.id)}
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
