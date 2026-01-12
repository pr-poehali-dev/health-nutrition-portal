import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    Отслеживание кликов по партнёрским ссылкам.
    Записывает информацию о клике в базу данных.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
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
        body = json.loads(event.get('body', '{}'))
        link_id = body.get('linkId')
        link_url = body.get('linkUrl')
        link_name = body.get('linkName', '')
        
        if not link_id or not link_url:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'linkId and linkUrl are required'}),
                'isBase64Encoded': False
            }
        
        headers = event.get('headers', {})
        user_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', '')
        user_agent = headers.get('user-agent', '')
        referrer = headers.get('referer', '')
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cursor = conn.cursor()
        
        cursor.execute(
            """
            INSERT INTO affiliate_clicks (link_id, link_url, link_name, user_ip, user_agent, referrer)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (link_id, link_url, link_name, user_ip, user_agent, referrer)
        )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Click tracked'}),
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
