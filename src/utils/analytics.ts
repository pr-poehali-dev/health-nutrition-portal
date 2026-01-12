const TRACK_CLICK_URL = 'https://functions.poehali.dev/6cd63ea3-adb0-4ae6-b4c0-f913fb3139a8';

export const trackAffiliateClick = async (linkId: string, linkUrl: string, linkName: string) => {
  try {
    await fetch(TRACK_CLICK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        linkId,
        linkUrl,
        linkName
      })
    });
  } catch (error) {
    console.error('Failed to track click:', error);
  }
};

export const AFFILIATE_LINKS = {
  link1: {
    id: 'link1',
    url: 'https://ihclick.ru/?p=331518&o=333012&idp=318536&erid=2VtzqxUrE2N',
    name: 'Добавки для здоровья ЖКТ'
  },
  link2: {
    id: 'link2',
    url: 'https://ihclick.ru/?p=240274&o=318379&idp=318536&erid=2Vtzqw8BvxZ',
    name: 'Нутрицевтики со скидкой'
  }
};
