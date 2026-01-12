import json
import os
import psycopg2
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    """
    Получение статистики кликов по партнёрским ссылкам.
    Возвращает количество кликов по каждой ссылке за разные периоды.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT 
                link_id,
                link_name,
                link_url,
                COUNT(*) as total_clicks,
                COUNT(CASE WHEN clicked_at >= NOW() - INTERVAL '1 day' THEN 1 END) as clicks_today,
                COUNT(CASE WHEN clicked_at >= NOW() - INTERVAL '7 days' THEN 1 END) as clicks_week,
                COUNT(CASE WHEN clicked_at >= NOW() - INTERVAL '30 days' THEN 1 END) as clicks_month,
                MAX(clicked_at) as last_click
            FROM affiliate_clicks
            GROUP BY link_id, link_name, link_url
            ORDER BY total_clicks DESC
        """)
        
        results = cursor.fetchall()
        
        stats = []
        for row in results:
            stats.append({
                'linkId': row[0],
                'linkName': row[1] or 'Без названия',
                'linkUrl': row[2],
                'totalClicks': row[3],
                'clicksToday': row[4],
                'clicksWeek': row[5],
                'clicksMonth': row[6],
                'lastClick': row[7].isoformat() if row[7] else None
            })
        
        cursor.execute("SELECT COUNT(*) FROM affiliate_clicks")
        total_clicks = cursor.fetchone()[0]
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'totalClicks': total_clicks,
                'links': stats
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
