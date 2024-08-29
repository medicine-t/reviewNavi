interface Area {
  code: string;
  name: string;
}

interface Genre {
  name: string;
  catch?: string;
  code: string;
}

interface Budget {
  code: string;
  name: string;
  average: string;
}

interface Urls {
  pc: string;
  sp?: string;
}

interface Photo {
  pc: {
    l: string;
    m: string;
    s: string;
  };
  mobile: {
    l: string;
    s: string;
  };
}

export interface Shop {
  id: string;
  name: string;
  logo_image: string;
  name_kana: string;
  address: string;
  station_name: string;
  ktai_coupon: number;
  large_service_area: Area;
  service_area: Area;
  large_area: Area;
  middle_area: Area;
  small_area: Area;
  lat: number;
  lng: number;
  genre: Genre;
  sub_genre: Genre;
  budget: Budget;
  catch: string;
  capacity: number;
  access: string;
  mobile_access: string;
  urls: Urls;
  photo: Photo;
  open: string;
  close: string;
  party_capacity: number;
  other_memo: string;
  shop_detail_memo: string;
  budget_memo: string;
  wedding: string;
  course: string;
  free_drink: string;
  free_food: string;
  private_room: string;
  horigotatsu: string;
  tatami: string;
  card: string;
  non_smoking: string;
  charter: string;
  parking: string;
  barrier_free: string;
  show: string;
  karaoke: string;
  band: string;
  tv: string;
  lunch: string;
  midnight: string;
  english: string;
  pet: string;
  child: string;
  wifi: string;
  coupon_urls: Urls;
}

export interface HotPepperGourmetSearchQuery {
  // key: string; // API Key (required)?
  id?: string;
  name?: string;
  name_kana?: string;
  name_any?: string;
  tel?: string;
  address?: string;
  special?: string;
  special_or?: string;
  special_category?: string;
  special_category_or?: string;
  large_service_area?: string;
  service_area?: string;
  large_area?: string;
  middle_area?: string;
  small_area?: string;
  keyword?: string;
  lat?: number;
  lng?: number;
  range?: 1 | 2 | 3 | 4 | 5; // 1: 300m 2: 500m 3: 1000m (初期値) 4: 2000m 5: 3000m
  datum?: string;
  ktai_coupon?: 0 | 1;
  genre?: string;
  budget?: string;
  party_capacity?: number;
  wifi?: 0 | 1;
  wedding?: 0 | 1;
  course?: 0 | 1;
  free_drink?: 0 | 1;
  free_food?: 0 | 1;
  private_room?: 0 | 1;
  horigotatsu?: 0 | 1;
  tatami?: 0 | 1;
  cocktail?: 0 | 1;
  shochu?: 0 | 1;
  sake?: 0 | 1;
  wine?: 0 | 1;
  card?: 0 | 1;
  non_smoking?: 0 | 1;
  charter?: 0 | 1;
  ktai?: 0 | 1;
  parking?: 0 | 1;
  barrier_free?: 0 | 1;
  sommelier?: 0 | 1;
  night_view?: 0 | 1;
  open_air?: 0 | 1;
  show?: 0 | 1;
  equipment?: 0 | 1;
  karaoke?: 0 | 1;
  band?: 0 | 1;
  tv?: 0 | 1;
  lunch?: 0 | 1;
  midnight?: 0 | 1;
  midnight_meal?: 0 | 1;
  english?: 0 | 1;
  pet?: 0 | 1;
  child?: 0 | 1;
  credit_card?: string;
  type?: "lite" | "credit_card" | "special";
  order?: 1 | 2 | 3 | 4; //1:店名かな順 2:ジャンルコード順 3:小エリアコード順 4:おススメ順 初期値はおススメ順。位置から検索を行った場合は距離順
  start?: number;
  count?: number;
  format?: "json" | "xml"; // Response Format (optional)
}
