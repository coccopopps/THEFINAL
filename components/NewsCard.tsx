import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Star } from 'lucide-react-native';

type NewsCardProps = {
  title: string;
  description: string;
  category: string;
  date: string;
  isBookmarked?: boolean;
  onToggleBookmark: () => void;
};

export function NewsCard({
  title,
  description,
  category,
  date,
  isBookmarked = false,
  onToggleBookmark,
}: NewsCardProps) {
  const categoryColor = category === 'Discovery' ? '#06b6d4' : '#8b5cf6';

  return (
    <View style={styles.card}>
      <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.gradient}>
        <View style={styles.header}>
          <View style={styles.metadata}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Calendar size={14} color="#64748b" />
              <Text style={styles.dateText}>{date}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={onToggleBookmark}>
            <Star
              size={24}
              color={isBookmarked ? '#06b6d4' : '#475569'}
              fill={isBookmarked ? '#06b6d4' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  gradient: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    color: '#64748b',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
});
