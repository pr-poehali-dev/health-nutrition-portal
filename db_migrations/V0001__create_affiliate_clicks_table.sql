
CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id SERIAL PRIMARY KEY,
    link_id VARCHAR(100) NOT NULL,
    link_url TEXT NOT NULL,
    link_name VARCHAR(255),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_ip VARCHAR(45),
    user_agent TEXT,
    referrer TEXT
);

CREATE INDEX idx_affiliate_clicks_link_id ON affiliate_clicks(link_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at);

COMMENT ON TABLE affiliate_clicks IS 'Таблица для отслеживания кликов по партнёрским ссылкам';
COMMENT ON COLUMN affiliate_clicks.link_id IS 'Идентификатор партнёрской ссылки';
COMMENT ON COLUMN affiliate_clicks.link_url IS 'URL партнёрской ссылки';
COMMENT ON COLUMN affiliate_clicks.link_name IS 'Название ссылки для отчётов';
