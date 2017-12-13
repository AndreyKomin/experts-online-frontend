export const apiUrl = (process.env.NODE_ENV !== 'production') ? `http://0.0.0.0:7000/api` : `http://api.xn----8sbnsbindehmjq0kxa.xn--p1ai`;
export const PORTFOLIO_MAX = 10000;
export const RECOMMEND_TIME_MINUTES = 15;

export const MESSENGERS = {
  "vk": {"id": 1, "name": "Vk", "code": "vk", "canUseForMessage": 0, "canUseForAuth": 1},
  "facebook": {"id": 2, "name": "Facebook", "code": "facebook", "canUseForMessage": 0, "canUseForAuth": 1},
  "google": {"id": 3, "name": "Goggle+", "code": "google", "canUseForMessage": 0, "canUseForAuth": 1},
  "telegram": {"id": 4, "name": "Telegram", "code": "telegram", "canUseForMessage": 1, "canUseForAuth": 1},
  "skype": {"id": 5, "name": "Skype", "code": "skype", "canUseForMessage": 1, "canUseForAuth": 1},
  "whatsapp": {"id": 6, "name": "WhatsApp", "code": "whatsapp", "canUseForMessage": 1, "canUseForAuth": 1}
};
