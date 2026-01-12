import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

const STATS_URL = 'https://functions.poehali.dev/61af8638-e7d5-4e21-ad3b-cd8fe46f5a53';

interface LinkStats {
  linkId: string;
  linkName: string;
  linkUrl: string;
  totalClicks: number;
  clicksToday: number;
  clicksWeek: number;
  clicksMonth: number;
  lastClick: string | null;
}

interface StatsData {
  totalClicks: number;
  links: LinkStats[];
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(STATS_URL);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-muted-foreground">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <Icon name="ArrowLeft" size={20} />
            На главную
          </a>
          <h1 className="text-4xl font-bold mb-2">📊 Статистика партнёрских ссылок</h1>
          <p className="text-muted-foreground">Отслеживание кликов по всем партнёрским ссылкам</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
            <CardHeader>
              <CardDescription className="text-white/80">Всего кликов</CardDescription>
              <CardTitle className="text-4xl">{stats?.totalClicks || 0}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
            <CardHeader>
              <CardDescription className="text-white/80">За сегодня</CardDescription>
              <CardTitle className="text-4xl">
                {stats?.links.reduce((sum, link) => sum + link.clicksToday, 0) || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
            <CardHeader>
              <CardDescription className="text-white/80">За неделю</CardDescription>
              <CardTitle className="text-4xl">
                {stats?.links.reduce((sum, link) => sum + link.clicksWeek, 0) || 0}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
            <CardHeader>
              <CardDescription className="text-white/80">За месяц</CardDescription>
              <CardTitle className="text-4xl">
                {stats?.links.reduce((sum, link) => sum + link.clicksMonth, 0) || 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Детализация по ссылкам</CardTitle>
            <CardDescription>Статистика кликов для каждой партнёрской ссылки</CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.links && stats.links.length > 0 ? (
              <div className="space-y-4">
                {stats.links.map((link) => (
                  <div key={link.linkId} className="p-4 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{link.linkName}</h3>
                        <a 
                          href={link.linkUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {link.linkUrl.substring(0, 60)}...
                          <Icon name="ExternalLink" size={14} />
                        </a>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                        ID: {link.linkId}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{link.totalClicks}</div>
                        <div className="text-xs text-muted-foreground">Всего кликов</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{link.clicksToday}</div>
                        <div className="text-xs text-muted-foreground">Сегодня</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{link.clicksWeek}</div>
                        <div className="text-xs text-muted-foreground">За неделю</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{link.clicksMonth}</div>
                        <div className="text-xs text-muted-foreground">За месяц</div>
                      </div>
                    </div>

                    {link.lastClick && (
                      <div className="mt-3 pt-3 border-t text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Clock" size={14} />
                        Последний клик: {new Date(link.lastClick).toLocaleString('ru-RU')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="BarChart3" className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-muted-foreground">Пока нет кликов по партнёрским ссылкам</p>
                <p className="text-sm text-muted-foreground mt-2">Данные появятся после первого клика</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" className="text-blue-600 mt-1" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Информация</p>
              <p className="text-blue-700">
                Статистика обновляется автоматически каждые 30 секунд. 
                Все клики отслеживаются анонимно и используются только для аналитики.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
