const baseUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/';
const API_KEY = process.env.REACT_APP_CWB_WEATHER_API_KEY;

export const taiwanCityList = [
  { chinese: '臺北市', english: 'Taipei City' },
  { chinese: '宜蘭縣', english: 'Yilan County' },
  { chinese: '花蓮縣', english: 'Hualien County' },
  { chinese: '臺東縣', english: 'Taitung County' },
  { chinese: '澎湖縣', english: 'Penghu County' },
  { chinese: '金門縣', english: 'Kinmen County' },
  { chinese: '連江縣', english: 'Lienchiang County' },
  { chinese: '新北市', english: 'New Taipei City' },
  { chinese: '桃園市', english: 'Taoyuan City' },
  { chinese: '臺中市', english: 'Taichung City' },
  { chinese: '臺南市', english: 'Tainan City' },
  { chinese: '高雄市', english: 'Kaohsiung City' },
  { chinese: '基隆市', english: 'Keelung City' },
  { chinese: '新竹縣', english: 'Hsinchu County' },
  { chinese: '新竹市', english: 'Hsinchu City' },
  { chinese: '苗栗縣', english: 'Miaoli County' },
  { chinese: '彰化縣', english: 'Changhua County' },
  { chinese: '南投縣', english: 'Nantou County' },
  { chinese: '雲林縣', english: 'Yunlin County' },
  { chinese: '嘉義縣', english: 'Chiayi County' },
  { chinese: '嘉義市', english: 'Chiayi City' },
  { chinese: '屏東縣', english: 'Pingtung County' },
] as const;

export default async function getWeatherDataByChineseCityName(
  cityName = '臺北市',
) {
  const url = `${baseUrl}F-D0047-091?Authorization=${API_KEY}&locationName=${cityName}&sort=time`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
