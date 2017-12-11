export const apiUrl = (process.env.NODE_ENV !== 'production') ? `http://0.0.0.0:7000` : `http://api.xn----8sbnsbindehmjq0kxa.xn--p1ai`;
export const PORTFOLIO_MAX = 600;
export const RECOMMEND_TIME_MINUTES = 15;

export const MESSENGERS = [
  { "id": 1, "name": "Vk", "code": "vk", "canUseForMessage": 0, "canUseForAuth": 1 },
  { "id": 2, "name": "Facebook", "code": "facebook", "canUseForMessage": 0, "canUseForAuth": 1 },
  { "id": 3, "name": "Goggle+", "code": "google", "canUseForMessage": 0, "canUseForAuth": 1 },
  { "id": 4, "name": "Telegram", "code": "telegram", "canUseForMessage": 1, "canUseForAuth": 1 },
  { "id": 5, "name": "Skype", "code": "skype", "canUseForMessage": 1, "canUseForAuth": 1 },
  { "id": 6, "name": "WhatsApp", "code": "whatsapp", "canUseForMessage": 1, "canUseForAuth": 1 }
];
