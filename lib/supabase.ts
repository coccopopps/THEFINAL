import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  username: string;
  level: number;
  is_pro: boolean;
  games_played: number;
  high_score: number;
  achievements: number;
  news_read: number;
  created_at: string;
  updated_at: string;
};

export type Game = {
  id: string;
  title: string;
  description: string;
  icon_type: string;
  color_scheme: string;
  order_index: number;
  created_at: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  created_at: string;
};
