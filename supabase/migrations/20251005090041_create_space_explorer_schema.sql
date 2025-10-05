/*
  # Space Explorer App Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `level` (integer, default 1)
      - `is_pro` (boolean, default false)
      - `games_played` (integer, default 0)
      - `high_score` (integer, default 0)
      - `achievements` (integer, default 0)
      - `news_read` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `games`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon_type` (text)
      - `color_scheme` (text)
      - `order_index` (integer)
      - `created_at` (timestamptz)
    
    - `news_articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `date` (date)
      - `created_at` (timestamptz)
    
    - `user_news_reads`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `news_id` (uuid, references news_articles)
      - `read_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  level integer DEFAULT 1,
  is_pro boolean DEFAULT false,
  games_played integer DEFAULT 0,
  high_score integer DEFAULT 0,
  achievements integer DEFAULT 0,
  news_read integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Games Table
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon_type text NOT NULL,
  color_scheme text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read games"
  ON games FOR SELECT
  TO authenticated
  USING (true);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news"
  ON news_articles FOR SELECT
  TO authenticated
  USING (true);

-- User News Reads Table
CREATE TABLE IF NOT EXISTS user_news_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  news_id uuid REFERENCES news_articles(id) ON DELETE CASCADE,
  read_at timestamptz DEFAULT now(),
  UNIQUE(user_id, news_id)
);

ALTER TABLE user_news_reads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own news reads"
  ON user_news_reads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own news reads"
  ON user_news_reads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample games
INSERT INTO games (title, description, icon_type, color_scheme, order_index) VALUES
  ('Asteroid Clicker', 'Click the asteroids as fast as you can!', 'target', 'cyan', 1),
  ('Asteroid Dodge', 'Navigate your ship through the asteroid field!', 'rocket', 'purple', 2)
ON CONFLICT DO NOTHING;

-- Insert sample news
INSERT INTO news_articles (title, description, category, date) VALUES
  ('New Asteroid Belt Discovery', 'Astronomers have discovered a previously unknown asteroid belt in the outer solar system, containing potentially thousands of rocky bodies.', 'Discovery', '2025-10-01'),
  ('Near-Earth Asteroid Flyby', 'A large asteroid will safely pass Earth this week at a distance of 4 million miles. No threat to our planet.', 'Alert', '2025-09-28')
ON CONFLICT DO NOTHING;