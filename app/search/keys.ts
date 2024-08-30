const QueryKeys: string[] = [
  "card",
  "wifi",
  "lunch",
  "course",
  "free_drink",
  "free_food",
  "midnight",
  "midnight_meal",
  "private_room",
  "horigotatsu",
  "tatami",
  "cocktail",
  "shochu",
  "sake",
  "wine",
  "non_smoking",
  "charter",
  "ktai",
  "parking",
  "barrier_free",
  "sommelier",
  "night_view",
  "open_air",
  "show",
  "equipment",
  "karaoke",
  "band",
  "tv",
  "english",
  "pet",
  "child",
  "ktai_coupon",
  "wedding",
];

export default QueryKeys;

export const KeyConvert = (key: (typeof QueryKeys)[number]) => {
  switch (key) {
    case "ktai_coupon":
      return "携帯クーポン有り";
    case "wifi":
      return "Wi-Fi有り";
    case "wedding":
      return "ウェディング二次会等";
    case "course":
      return "コース料理あり";
    case "free_drink":
      return "飲み放題";
    case "free_food":
      return "食べ放題";
    case "private_room":
      return "個室あり";
    case "horigotatsu":
      return "掘りごたつあり";
    case "tatami":
      return "座敷あり";
    case "cocktail":
      return "カクテル充実";
    case "shochu":
      return "焼酎充実";
    case "sake":
      return "日本酒充実";
    case "wine":
      return "ワイン充実";
    case "card":
      return "カード可";
    case "non_smoking":
      return "禁煙";
    case "charter":
      return "貸切可";
    case "ktai":
      return "携帯電話OK";
    case "parking":
      return "駐車場あり";
    case "barrier_free":
      return "バリアフリー";
    case "sommelier":
      return "ソムリエがいる";
    case "night_view":
      return "夜景がキレイ";
    case "open_air":
      return "オープンエア";
    case "show":
      return "ライブ・ショーあり";
    case "equipment":
      return "エンタメ設備あいｒ";
    case "karaoke":
      return "カラオケ有り";
    case "band":
      return "バンド演奏家";
    case "tv":
      return "テレビ・プロジェクター";
    case "lunch":
      return "ランチあり";
    case "midnight":
      return "深夜営業 (23時~)";
    case "midnight_meal":
      return "深夜食事可 (23時~)";
    case "english":
      return "英語メニューあり";
    case "pet":
      return "ペット可";
    case "child":
      return "子供可";
    default:
      return "";
  }
};
