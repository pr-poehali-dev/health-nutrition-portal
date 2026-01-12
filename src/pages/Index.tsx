import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { trackAffiliateClick, AFFILIATE_LINKS } from "@/utils/analytics";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articles = [
    {
      title: "Здоровье кишечника: основы",
      description: "Как микробиом влияет на общее состояние организма",
      category: "ЖКТ",
      readTime: "5 мин",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      title: "Питание при синдроме раздраженного кишечника",
      description: "Практические рекомендации по диете",
      category: "Нутрициология",
      readTime: "8 мин",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Пробиотики: мифы и реальность",
      description: "Научный подход к выбору пробиотиков",
      category: "Здоровье",
      readTime: "6 мин",
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];

  const webinars = [
    {
      date: "15",
      month: "ЯНВ",
      title: "Детокс организма: работает ли это?",
      speaker: "Др. Анна Петрова",
      specialization: "Гастроэнтеролог",
      time: "19:00 МСК",
      attendees: 234
    },
    {
      date: "22",
      month: "ЯНВ",
      title: "Микробиом и иммунитет",
      speaker: "Др. Михаил Соколов",
      specialization: "Иммунолог",
      time: "18:00 МСК",
      attendees: 189
    },
    {
      date: "28",
      month: "ЯНВ",
      title: "Питание при воспалительных заболеваниях ЖКТ",
      speaker: "Др. Елена Кузнецова",
      specialization: "Нутрициолог",
      time: "20:00 МСК",
      attendees: 312
    }
  ];

  const consultations = [
    {
      icon: "Video",
      title: "Онлайн консультация",
      description: "Видеозвонок с нутрициологом, 60 минут",
      price: "3 500 ₽",
      features: ["Персональный план питания", "Рекомендации по добавкам", "Поддержка 14 дней"]
    },
    {
      icon: "FileText",
      title: "Анализ рациона",
      description: "Детальный разбор вашего питания",
      price: "2 000 ₽",
      features: ["Оценка баланса нутриентов", "Рекомендации по корректировке", "Список продуктов"]
    },
    {
      icon: "Users",
      title: "Программа на месяц",
      description: "Комплексное сопровождение",
      price: "12 000 ₽",
      features: ["4 консультации", "Меню на каждый день", "Чат с нутрициологом 24/7"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-blue-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Icon name="Heart" className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ЗдоровьеПлюс
              </span>
            </div>
            <div className="hidden md:flex gap-8">
              <button onClick={() => setActiveSection("home")} className="text-foreground hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => setActiveSection("articles")} className="text-foreground hover:text-primary transition-colors">
                Статьи
              </button>
              <button onClick={() => setActiveSection("webinars")} className="text-foreground hover:text-primary transition-colors">
                Вебинары
              </button>
              <button onClick={() => setActiveSection("consultations")} className="text-foreground hover:text-primary transition-colors">
                Консультации
              </button>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Записаться
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
                Ваше здоровье в надёжных руках
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Здоровье ЖКТ и{" "}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  правильное питание
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Персональные консультации нутрициологов, научные статьи и вебинары от ведущих специалистов
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Начать консультацию
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" className="border-2">
                  Смотреть вебинары
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/ba003aaf-df9f-4ab9-9df7-6416a9249dac/files/0d8a2879-788f-44f6-99df-a2fe9a6a9387.jpg"
                alt="Здоровье и питание"
                className="rounded-3xl shadow-2xl hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-xl transition-all hover-scale">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Icon name="Microscope" className="text-purple-600" size={24} />
                </div>
                <CardTitle>Научный подход</CardTitle>
                <CardDescription>Рекомендации на основе последних исследований</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-xl transition-all hover-scale">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-blue-600" size={24} />
                </div>
                <CardTitle>Опытные специалисты</CardTitle>
                <CardDescription>Сертифицированные нутрициологи и гастроэнтерологи</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-xl transition-all hover-scale">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Icon name="Target" className="text-orange-600" size={24} />
                </div>
                <CardTitle>Индивидуально</CardTitle>
                <CardDescription>Персональные программы под ваши цели</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-3xl border-2 border-purple-200 hover-scale">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Gift" className="text-white" size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-2xl mb-2">Специальное предложение</h3>
                  <p className="text-muted-foreground">Витамины и добавки для здоровья со скидками до 40%</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link2.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link2.id, AFFILIATE_LINKS.link2.url, AFFILIATE_LINKS.link2.name)}
                >
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Получить скидку
                    <Icon name="ExternalLink" className="ml-2" size={20} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">Статьи</Badge>
            <h2 className="text-4xl font-bold mb-4">Полезные материалы</h2>
            <p className="text-xl text-muted-foreground">Научные статьи о здоровье ЖКТ и питании</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all hover-scale group cursor-pointer">
                <div className={`h-48 ${article.color} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-foreground">{article.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      {article.readTime}
                    </div>
                    <a href="#" className="text-primary font-semibold hover:underline">
                      Читать →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 space-y-6">
            <div className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border-2 border-orange-200 hover-scale">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Лучшие добавки для здоровья ЖКТ</h3>
                  <p className="text-sm text-muted-foreground">Проверенные пробиотики и витамины со скидкой</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link1.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link1.id, AFFILIATE_LINKS.link1.url, AFFILIATE_LINKS.link1.name)}
                >
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Перейти
                    <Icon name="ExternalLink" className="ml-2" size={16} />
                  </Button>
                </a>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 hover-scale">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Специальное предложение для здоровья</h3>
                  <p className="text-sm text-muted-foreground">Качественные нутрицевтики с доставкой</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link2.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link2.id, AFFILIATE_LINKS.link2.url, AFFILIATE_LINKS.link2.name)}
                >
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Перейти
                    <Icon name="ExternalLink" className="ml-2" size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="webinars" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">Календарь</Badge>
            <h2 className="text-4xl font-bold mb-4">Предстоящие вебинары</h2>
            <p className="text-xl text-muted-foreground">Онлайн-события со специалистами</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <div className="flex gap-4 items-start mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{webinar.date}</div>
                      <div className="text-sm text-muted-foreground uppercase">{webinar.month}</div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{webinar.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Icon name="Clock" size={16} />
                        {webinar.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                    <div>
                      <div className="font-semibold text-sm">{webinar.speaker}</div>
                      <div className="text-xs text-muted-foreground">{webinar.specialization}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Users" size={16} />
                      {webinar.attendees} участников
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <img
              src="https://cdn.poehali.dev/projects/ba003aaf-df9f-4ab9-9df7-6416a9249dac/files/7df91401-2e37-49b1-96d6-d02c163dbe35.jpg"
              alt="Онлайн вебинары"
              className="rounded-3xl shadow-2xl max-w-2xl mx-auto mb-8"
            />
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border-2 border-cyan-200 hover-scale">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Icon name="ShoppingBag" className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Рекомендуем участникам вебинаров</h3>
                  <p className="text-sm text-muted-foreground">Качественные добавки для поддержки здоровья ЖКТ</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link1.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link1.id, AFFILIATE_LINKS.link1.url, AFFILIATE_LINKS.link1.name)}
                >
                  <Button className="bg-cyan-500 hover:bg-cyan-600">
                    Узнать больше
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="consultations" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500">Консультации</Badge>
            <h2 className="text-4xl font-bold mb-4">Персональная поддержка</h2>
            <p className="text-xl text-muted-foreground">Выберите формат работы с нутрициологом</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {consultations.map((consultation, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover-scale">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                    <Icon name={consultation.icon as any} className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-2xl">{consultation.title}</CardTitle>
                  <CardDescription className="text-base">{consultation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-6">{consultation.price}</div>
                  <ul className="space-y-3 mb-6">
                    {consultation.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-green-500 mt-1" size={16} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mb-12">
            <img
              src="https://cdn.poehali.dev/projects/ba003aaf-df9f-4ab9-9df7-6416a9249dac/files/37a8b782-bb29-493f-ac68-f11e599788db.jpg"
              alt="Консультации нутрициолога"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover-scale">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Icon name="Heart" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Поддержка здоровья кишечника</h3>
                  <p className="text-sm text-muted-foreground mb-4">Пробиотики и добавки, рекомендованные специалистами</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link2.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link2.id, AFFILIATE_LINKS.link2.url, AFFILIATE_LINKS.link2.name)}
                >
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Посмотреть каталог
                    <Icon name="ExternalLink" className="ml-2" size={16} />
                  </Button>
                </a>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 hover-scale">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                  <Icon name="Star" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Проверенное качество</h3>
                  <p className="text-sm text-muted-foreground mb-4">Натуральные нутрицевтики для вашего здоровья</p>
                </div>
                <a 
                  href={AFFILIATE_LINKS.link1.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link1.id, AFFILIATE_LINKS.link1.url, AFFILIATE_LINKS.link1.name)}
                >
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Выбрать добавки
                    <Icon name="ExternalLink" className="ml-2" size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Готовы начать путь к здоровью?</h2>
          <p className="text-xl mb-8 opacity-90">Запишитесь на бесплатную консультацию прямо сейчас</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Записаться на консультацию
              <Icon name="Calendar" className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              Посмотреть вебинары
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="mb-12 p-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" className="text-white" size={28} />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-xl mb-1">Лучшие добавки для здоровья</h3>
                  <p className="text-sm text-white/80">Качественные витамины и пробиотики с доставкой</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a 
                  href={AFFILIATE_LINKS.link1.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link1.id, AFFILIATE_LINKS.link1.url, AFFILIATE_LINKS.link1.name)}
                >
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Каталог
                    <Icon name="ExternalLink" className="ml-2" size={18} />
                  </Button>
                </a>
                <a 
                  href={AFFILIATE_LINKS.link2.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link2.id, AFFILIATE_LINKS.link2.url, AFFILIATE_LINKS.link2.name)}
                >
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                    Скидки
                    <Icon name="Tag" className="ml-2" size={18} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Icon name="Heart" className="text-white" size={16} />
                </div>
                <span className="font-bold text-lg">ЗдоровьеПлюс</span>
              </div>
              <p className="text-sm text-gray-400">Ваш путь к здоровому питанию и хорошему самочувствию</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#articles" className="hover:text-white transition-colors">Статьи</a></li>
                <li><a href="#webinars" className="hover:text-white transition-colors">Вебинары</a></li>
                <li><a href="#consultations" className="hover:text-white transition-colors">Консультации</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@zdravplus.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Youtube" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-colors">
                  <Icon name="Facebook" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ЗдоровьеПлюс. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {showFloatingButton && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <a 
            href={AFFILIATE_LINKS.link1.url}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick(AFFILIATE_LINKS.link1.id, AFFILIATE_LINKS.link1.url, AFFILIATE_LINKS.link1.name)}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover-scale rounded-full px-6 py-6"
            >
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Добавки
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Index;