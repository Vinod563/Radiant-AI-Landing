-- Radiant Digital CMS Database Schema
-- Run: mysql -u root -p radiant_cms < db/init.sql

CREATE DATABASE IF NOT EXISTS radiant_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE radiant_cms;

-- ─── ADMIN USERS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role        ENUM('admin', 'editor') DEFAULT 'editor',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login  TIMESTAMP NULL
);

-- ─── CONTENT BLOCKS ──────────────────────────────────
-- Each section's content stored as JSON.
-- section_key maps 1:1 to siteContent.js exports.
CREATE TABLE IF NOT EXISTS content_blocks (
  section_key   VARCHAR(100) PRIMARY KEY,
  content_data  JSON NOT NULL,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by    VARCHAR(255)
);

-- ─── SECTION VISIBILITY ───────────────────────────────
CREATE TABLE IF NOT EXISTS section_visibility (
  section_name  VARCHAR(100) PRIMARY KEY,
  label         VARCHAR(255) NOT NULL,
  is_visible    BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── CHAT CONFIGURATION ───────────────────────────────
CREATE TABLE IF NOT EXISTS chat_config (
  id          INT PRIMARY KEY DEFAULT 1,
  mode        ENUM('static', 'dynamic') DEFAULT 'static',
  api_url     VARCHAR(500) DEFAULT '',
  api_key_enc VARCHAR(1000) DEFAULT '',
  model       VARCHAR(100) DEFAULT 'gpt-4o',
  system_prompt TEXT,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── SEED: DEFAULT SECTION VISIBILITY ────────────────
INSERT INTO section_visibility (section_name, label, is_visible, display_order) VALUES
  ('hero',             'Hero',                        TRUE,  1),
  ('whatIsRadiantAI',  'What Is Radiant AI (PCE)',    TRUE,  2),
  ('solutions',        'Solutions',                   TRUE,  3),
  ('enablers',         'AI Fabric / Enablers',        TRUE,  4),
  ('caseStudy',        'Case Study',                  TRUE,  5),
  ('socialProof',      'Social Proof',                TRUE,  6),
  ('marketCarousel',   'Market Carousel (Industries)',TRUE,  7),
  ('platform',         'Platform',                    TRUE,  8),
  ('infrastructure',   'Infrastructure / Tech Stack', TRUE,  9),
  ('cta',              'CTA / Contact',               TRUE, 10)
ON DUPLICATE KEY UPDATE label = VALUES(label);

-- ─── SEED: DEFAULT CHAT CONFIG ────────────────────────
INSERT INTO chat_config (id, mode) VALUES (1, 'static')
ON DUPLICATE KEY UPDATE id = 1;
