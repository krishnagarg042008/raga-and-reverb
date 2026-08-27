// 100+ Track Curated Archive Dataset
const TRACKS_DATA = [
  {
    "id": "gOSM2dEqwsE",
    "title": "Pehli Dafa",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "4:59",
    "thumbnail": "https://img.youtube.com/vi/gOSM2dEqwsE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "FA_J8XwpCaQ",
    "title": "Tu Jaane Na",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:42",
    "thumbnail": "https://img.youtube.com/vi/FA_J8XwpCaQ/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "NVvHyXU_SBc",
    "title": "Darasal",
    "artist": "Atif Aslam",
    "movie": "Raabta",
    "duration": "4:35",
    "thumbnail": "https://img.youtube.com/vi/NVvHyXU_SBc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "8pMiuAXNBf8",
    "title": "Beete Lamhein",
    "artist": "Kay Kay",
    "movie": "",
    "duration": "4:59",
    "thumbnail": "https://img.youtube.com/vi/8pMiuAXNBf8/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "ndU9kBk3UWI",
    "title": "Pyaar Ke Pal",
    "artist": "Kay Kay",
    "movie": "",
    "duration": "6:00",
    "thumbnail": "https://img.youtube.com/vi/ndU9kBk3UWI/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "aG7MaqtWxT8",
    "title": "Khuda Jaane",
    "artist": "Vishal-Shekhar",
    "movie": "Bachna Ae Haseeno",
    "duration": "5:34",
    "thumbnail": "https://img.youtube.com/vi/aG7MaqtWxT8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "XPu9ZE4Onzc",
    "title": "Kya Mujhe Pyar Hai",
    "artist": "Kay Kay",
    "movie": "",
    "duration": "4:27",
    "thumbnail": "https://img.youtube.com/vi/XPu9ZE4Onzc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "oOvSWET7xSA",
    "title": "Subhanallah",
    "artist": "Sreerama Chandra",
    "movie": "Yeh Jawaani Hai Deewani",
    "duration": "4:10",
    "thumbnail": "https://img.youtube.com/vi/oOvSWET7xSA/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "82P9aa28DoE",
    "title": "Jaan Ban Gaye",
    "artist": "Mithoon",
    "movie": "",
    "duration": "3:32",
    "thumbnail": "https://img.youtube.com/vi/82P9aa28DoE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "7jbqQi5XSP4",
    "title": "Tere Bin",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "4:36",
    "thumbnail": "https://img.youtube.com/vi/7jbqQi5XSP4/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "NoucUuveKJ8",
    "title": "Thoda Thoda Pyaar",
    "artist": "Stebin Ben",
    "movie": "",
    "duration": "4:05",
    "thumbnail": "https://img.youtube.com/vi/NoucUuveKJ8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "oeYgD5w3NQo",
    "title": "Tera Hone Laga Hoon",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:00",
    "thumbnail": "https://img.youtube.com/vi/oeYgD5w3NQo/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "gmoucRvDfIk",
    "title": "Kabira",
    "artist": "Pritam",
    "movie": "",
    "duration": "3:44",
    "thumbnail": "https://img.youtube.com/vi/gmoucRvDfIk/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "1kcCk4YRJdo",
    "title": "Haan Tu Hain",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:25",
    "thumbnail": "https://img.youtube.com/vi/1kcCk4YRJdo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "I94fhjQ-U30",
    "title": "Tum Se Hi",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:22",
    "thumbnail": "https://img.youtube.com/vi/I94fhjQ-U30/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "SDboZSHp-VM",
    "title": "Give Me Some Sunshine",
    "artist": "Suraj Jagan",
    "movie": "",
    "duration": "4:08",
    "thumbnail": "https://img.youtube.com/vi/SDboZSHp-VM/mqdefault.jpg",
    "mood": "Uplifting & Warmth"
  },
  {
    "id": "iY4x5QZcGZA",
    "title": "Pehla Pyaar",
    "artist": "Armaan Malik",
    "movie": "",
    "duration": "4:33",
    "thumbnail": "https://img.youtube.com/vi/iY4x5QZcGZA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "01HR1uP4kic",
    "title": "Tune Jo Na Kaha",
    "artist": "Mohit Chauhan",
    "movie": "",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/01HR1uP4kic/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "8PEqEh1lnNE",
    "title": "Main Agar Kahoon",
    "artist": "Vishal-Shekhar",
    "movie": "",
    "duration": "5:09",
    "thumbnail": "https://img.youtube.com/vi/8PEqEh1lnNE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "39BOqZO8xaM",
    "title": "Tera Ban Jaunga",
    "artist": "Akhil Sachdeva Nasha",
    "movie": "",
    "duration": "3:57",
    "thumbnail": "https://img.youtube.com/vi/39BOqZO8xaM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "bdS6OoH1W2A",
    "title": "Ajab Si",
    "artist": "Vishal-Shekhar",
    "movie": "",
    "duration": "4:02",
    "thumbnail": "https://img.youtube.com/vi/bdS6OoH1W2A/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "EQxEms7gnqs",
    "title": "Shayad",
    "artist": "Arijit Singh",
    "movie": "Love Aaj Kal",
    "duration": "4:08",
    "thumbnail": "https://img.youtube.com/vi/EQxEms7gnqs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "ZaURV4XxdPI",
    "title": "Chand Sifarish",
    "artist": "Singer Shaan",
    "movie": "",
    "duration": "4:36",
    "thumbnail": "https://img.youtube.com/vi/ZaURV4XxdPI/mqdefault.jpg",
    "mood": "Uplifting & Warmth"
  },
  {
    "id": "3E1NLVzDZ_Y",
    "title": "Tujh Mein Rab Dikhta Hai",
    "artist": "Roopkumar Rathod",
    "movie": "",
    "duration": "4:42",
    "thumbnail": "https://img.youtube.com/vi/3E1NLVzDZ_Y/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "8W-pRnIe7UM",
    "title": "MAIN RAHOON YA NA RAHOON",
    "artist": "Armaan Malik",
    "movie": "",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/8W-pRnIe7UM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "swcCuuQKGJ4",
    "title": "Pehli Nazar Mein",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:13",
    "thumbnail": "https://img.youtube.com/vi/swcCuuQKGJ4/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "piUHBTXsoiY",
    "title": "Raabta",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:04",
    "thumbnail": "https://img.youtube.com/vi/piUHBTXsoiY/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "9Cp-hNvSWZs",
    "title": "Maiyya Mainu",
    "artist": "Sachet Tandon",
    "movie": "",
    "duration": "3:52",
    "thumbnail": "https://img.youtube.com/vi/9Cp-hNvSWZs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "ZVyA_8rd1Ko",
    "title": "KAUN TUJHE",
    "artist": "Palak Muchhal",
    "movie": "",
    "duration": "4:02",
    "thumbnail": "https://img.youtube.com/vi/ZVyA_8rd1Ko/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "FOA9iyxsW_A",
    "title": "AGAR TUM SAATH HO",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "5:42",
    "thumbnail": "https://img.youtube.com/vi/FOA9iyxsW_A/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "FAPuQDOasj4",
    "title": "Do Pal",
    "artist": "Lata Mangeshkar",
    "movie": "",
    "duration": "4:26",
    "thumbnail": "https://img.youtube.com/vi/FAPuQDOasj4/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "IgITZfS7L_8",
    "title": "Dil Ibaadat",
    "artist": "Kay Kay",
    "movie": "",
    "duration": "5:30",
    "thumbnail": "https://img.youtube.com/vi/IgITZfS7L_8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "9a26mBBK4jE",
    "title": "Tere Sang Yaara",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "4:47",
    "thumbnail": "https://img.youtube.com/vi/9a26mBBK4jE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "yqtGt2IjyKg",
    "title": "Main Yahaan Hoon",
    "artist": "Udit Narayan",
    "movie": "",
    "duration": "4:55",
    "thumbnail": "https://img.youtube.com/vi/yqtGt2IjyKg/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "FYHKeHYlVA4",
    "title": "Pee Loon",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:46",
    "thumbnail": "https://img.youtube.com/vi/FYHKeHYlVA4/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "1nrKhy0z6JI",
    "title": "Kal Ho Naa Ho",
    "artist": "Shankar Ehsaan Loy",
    "movie": "",
    "duration": "5:22",
    "thumbnail": "https://img.youtube.com/vi/1nrKhy0z6JI/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "pdZ7x_aaIqs",
    "title": "Mere Haath Mein",
    "artist": "Sonu Nigam",
    "movie": "",
    "duration": "4:46",
    "thumbnail": "https://img.youtube.com/vi/pdZ7x_aaIqs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "px40MNccyqg",
    "title": "Pal (Female)",
    "artist": "Javed - Mohsin",
    "movie": "",
    "duration": "4:08",
    "thumbnail": "https://img.youtube.com/vi/px40MNccyqg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "vbpoHbBiyFk",
    "title": "Shukran Allah",
    "artist": "Salim Sulaiman Music",
    "movie": "",
    "duration": "4:51",
    "thumbnail": "https://img.youtube.com/vi/vbpoHbBiyFk/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "MEjnFgMh3qE",
    "title": "MANWA LAAGE",
    "artist": "Vishal-Shekhar",
    "movie": "",
    "duration": "4:33",
    "thumbnail": "https://img.youtube.com/vi/MEjnFgMh3qE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "V1_5SHc21m8",
    "title": "Zara Sa",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:04",
    "thumbnail": "https://img.youtube.com/vi/V1_5SHc21m8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "q1uPPBJ2tcI",
    "title": "Phir Bhi Tumko Chaahunga",
    "artist": "Mithoon",
    "movie": "",
    "duration": "5:52",
    "thumbnail": "https://img.youtube.com/vi/q1uPPBJ2tcI/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "nBcKS3dhe5U",
    "title": "Love You Zindagi",
    "artist": "Amit Trivedi",
    "movie": "Dear Zindagi",
    "duration": "3:53",
    "thumbnail": "https://img.youtube.com/vi/nBcKS3dhe5U/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "DEatLVqGuTo",
    "title": "Abhi Kuch Dino Se",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:46",
    "thumbnail": "https://img.youtube.com/vi/DEatLVqGuTo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "WKv07mnKVEE",
    "title": "Kaise Hua",
    "artist": "Vishal Mishra",
    "movie": "Kabir Singh",
    "duration": "3:55",
    "thumbnail": "https://img.youtube.com/vi/WKv07mnKVEE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "ONLEdLvimTs",
    "title": "Tera Naam Doon",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "4:44",
    "thumbnail": "https://img.youtube.com/vi/ONLEdLvimTs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "IClYb-89-Fw",
    "title": "Kuch Kuch Hota Hai",
    "artist": "Jatin Lalit",
    "movie": "",
    "duration": "4:58",
    "thumbnail": "https://img.youtube.com/vi/IClYb-89-Fw/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "eXkHvT--DBU",
    "title": "Zaalima",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "5:00",
    "thumbnail": "https://img.youtube.com/vi/eXkHvT--DBU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "TLEPzT8jrUU",
    "title": "Piya O Re Piya",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "4:53",
    "thumbnail": "https://img.youtube.com/vi/TLEPzT8jrUU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "6NjEobhb0Qc",
    "title": "Yaaron",
    "artist": "Kay Kay",
    "movie": "",
    "duration": "4:29",
    "thumbnail": "https://img.youtube.com/vi/6NjEobhb0Qc/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "pUwpLoLlzNQ",
    "title": "Samjhawan",
    "artist": "Jawad Ahmad",
    "movie": "",
    "duration": "4:30",
    "thumbnail": "https://img.youtube.com/vi/pUwpLoLlzNQ/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "_eZnQzneuKs",
    "title": "Banjaara",
    "artist": "Mohammed Irfan",
    "movie": "",
    "duration": "5:37",
    "thumbnail": "https://img.youtube.com/vi/_eZnQzneuKs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "laDxzq2qEmI",
    "title": "Tera Fitoor",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/laDxzq2qEmI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "IUeMomykm60",
    "title": "Dil Meri Na Sune (Jhankar)",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "3:58",
    "thumbnail": "https://img.youtube.com/vi/IUeMomykm60/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "JlGdhAuNyUc",
    "title": "Aaoge Jab Tum",
    "artist": "Release",
    "movie": "",
    "duration": "5:56",
    "thumbnail": "https://img.youtube.com/vi/JlGdhAuNyUc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "xuBwv7yyjR8",
    "title": "Thodi Der",
    "artist": "Farhan Saeed Butt",
    "movie": "",
    "duration": "4:57",
    "thumbnail": "https://img.youtube.com/vi/xuBwv7yyjR8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Kt1tzMHYJ6M",
    "title": "Khudaya Khair",
    "artist": "Akriti Kakar",
    "movie": "",
    "duration": "4:41",
    "thumbnail": "https://img.youtube.com/vi/Kt1tzMHYJ6M/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "1b9poX5k7zo",
    "title": "Bulleya",
    "artist": "Vishal-Shekhar",
    "movie": "Sultan",
    "duration": "5:58",
    "thumbnail": "https://img.youtube.com/vi/1b9poX5k7zo/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "J7ck984Qhso",
    "title": "Ik Lamha",
    "artist": "Azaan Sami Khan",
    "movie": "",
    "duration": "6:35",
    "thumbnail": "https://img.youtube.com/vi/J7ck984Qhso/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "2Vv-BfVoq4g",
    "title": "Perfect",
    "artist": "Ed Sheeran",
    "movie": "",
    "duration": "4:42",
    "thumbnail": "https://img.youtube.com/vi/2Vv-BfVoq4g/mqdefault.jpg",
    "mood": "Uplifting & Warmth"
  },
  {
    "id": "TuUVVKVdZm4",
    "title": "Saiyyan",
    "artist": "Kailash Kher",
    "movie": "",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/TuUVVKVdZm4/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "kTXilT_KbUM",
    "title": "Tum Jo Aaye",
    "artist": "Rahat Fateh Ali Khan & Tulsi Kumar",
    "movie": "Once Upon A Time In Mumbaai",
    "duration": "5:05",
    "thumbnail": "https://img.youtube.com/vi/kTXilT_KbUM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "3qzos9Xgvng",
    "title": "Behti Hawa Sa Tha Woh",
    "artist": "Shaan & Shantanu Moitra",
    "movie": "3 Idiots",
    "duration": "5:03",
    "thumbnail": "https://img.youtube.com/vi/3qzos9Xgvng/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "-0vjLZtDkq0",
    "title": "Zindagi Kuch Toh Bata (Reprise)",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:19",
    "thumbnail": "https://img.youtube.com/vi/-0vjLZtDkq0/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "vl8YTnx3gso",
    "title": "Tu Chahiye",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:33",
    "thumbnail": "https://img.youtube.com/vi/vl8YTnx3gso/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "fsiPzT50ZiM",
    "title": "Tum Hi Ho",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:22",
    "thumbnail": "https://img.youtube.com/vi/fsiPzT50ZiM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "1q65CU2JoXg",
    "title": "Iktara",
    "artist": "Amit Trivedi",
    "movie": "",
    "duration": "4:14",
    "thumbnail": "https://img.youtube.com/vi/1q65CU2JoXg/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "TxT0KZ-EdLs",
    "title": "Hamari Adhuri Kahani (Title Track)",
    "artist": "JEET GANNGULI",
    "movie": "",
    "duration": "6:39",
    "thumbnail": "https://img.youtube.com/vi/TxT0KZ-EdLs/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "68Xh6j__cSM",
    "title": "Hasi (Male Version)",
    "artist": "Ami Mishra",
    "movie": "",
    "duration": "4:33",
    "thumbnail": "https://img.youtube.com/vi/68Xh6j__cSM/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "IE0BhvUW6AA",
    "title": "Tu Hi Haqeeqat",
    "artist": "Pritam",
    "movie": "Tum Mile",
    "duration": "5:03",
    "thumbnail": "https://img.youtube.com/vi/IE0BhvUW6AA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "mpdt25L-_RU",
    "title": "Jogi",
    "artist": "Yasser Desai",
    "movie": "",
    "duration": "4:34",
    "thumbnail": "https://img.youtube.com/vi/mpdt25L-_RU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "6PL39H2B7UQ",
    "title": "Pal",
    "artist": "Javed - Mohsin",
    "movie": "",
    "duration": "4:08",
    "thumbnail": "https://img.youtube.com/vi/6PL39H2B7UQ/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Des4vM1U7MA",
    "title": "Meri Aashiqui",
    "artist": "Palak Muchhal",
    "movie": "",
    "duration": "4:27",
    "thumbnail": "https://img.youtube.com/vi/Des4vM1U7MA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "o-9VdyXZKsQ",
    "title": "Tujhe Bhula Diya",
    "artist": "Mohit Chauhan",
    "movie": "",
    "duration": "4:40",
    "thumbnail": "https://img.youtube.com/vi/o-9VdyXZKsQ/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "3KnWkfPQz3Q",
    "title": "Zara Zara",
    "artist": "Bombay Jayashri Ramnath",
    "movie": "",
    "duration": "4:59",
    "thumbnail": "https://img.youtube.com/vi/3KnWkfPQz3Q/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "UJxutXtHQFI",
    "title": "Hasi (Female Version)",
    "artist": "Ami Mishra",
    "movie": "",
    "duration": "3:13",
    "thumbnail": "https://img.youtube.com/vi/UJxutXtHQFI/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "h3EuilWNquo",
    "title": "Duniyaa",
    "artist": "Akhil Music",
    "movie": "Luka Chuppi",
    "duration": "3:43",
    "thumbnail": "https://img.youtube.com/vi/h3EuilWNquo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "vyJTAnlRHVc",
    "title": "Nazm Nazm",
    "artist": "ARKO",
    "movie": "",
    "duration": "3:47",
    "thumbnail": "https://img.youtube.com/vi/vyJTAnlRHVc/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "ykWgSGsZyeo",
    "title": "RABBA",
    "artist": "Mohit Chauhan",
    "movie": "",
    "duration": "4:54",
    "thumbnail": "https://img.youtube.com/vi/ykWgSGsZyeo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "PVDPkS4v8FQ",
    "title": "Bekhayali",
    "artist": "Sachet Tandon",
    "movie": "Kabir Singh",
    "duration": "6:12",
    "thumbnail": "https://img.youtube.com/vi/PVDPkS4v8FQ/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "fbx6ULRrhXg",
    "title": "AMBARSARIYA",
    "artist": "Sona Mohapatra",
    "movie": "",
    "duration": "4:09",
    "thumbnail": "https://img.youtube.com/vi/fbx6ULRrhXg/mqdefault.jpg",
    "mood": "Uplifting & Warmth"
  },
  {
    "id": "cgN4XAyKeRM",
    "title": "Sawan Aaya Hai",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:49",
    "thumbnail": "https://img.youtube.com/vi/cgN4XAyKeRM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "n9qQiuwBywU",
    "title": "Humnava Mere",
    "artist": "Jubin Nautiyal",
    "movie": "",
    "duration": "5:29",
    "thumbnail": "https://img.youtube.com/vi/n9qQiuwBywU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "AQ5qWopu_uU",
    "title": "Sajdaa",
    "artist": "Shankar Ehsaan Loy",
    "movie": "My Name Is Khan",
    "duration": "6:06",
    "thumbnail": "https://img.youtube.com/vi/AQ5qWopu_uU/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "-qsXaVlp0eI",
    "title": "Isq Risk",
    "artist": "The Folk & Soul Studio",
    "movie": "",
    "duration": "4:55",
    "thumbnail": "https://img.youtube.com/vi/-qsXaVlp0eI/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "ejK-F8_NxYc",
    "title": "Ishq Sufiyana (Male)",
    "artist": "Kamal Khan",
    "movie": "",
    "duration": "5:26",
    "thumbnail": "https://img.youtube.com/vi/ejK-F8_NxYc/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "BLodJAsYlAg",
    "title": "Ishq Sufiyana (Female)",
    "artist": "Sunidhi Chauhan Official",
    "movie": "",
    "duration": "5:28",
    "thumbnail": "https://img.youtube.com/vi/BLodJAsYlAg/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "5agwoDdsyO8",
    "title": "Saajna",
    "artist": "Falak Shabir",
    "movie": "",
    "duration": "4:42",
    "thumbnail": "https://img.youtube.com/vi/5agwoDdsyO8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "ZCRL8V0ZkEA",
    "title": "Ishq Bulaava",
    "artist": "Vishal-Shekhar",
    "movie": "",
    "duration": "5:04",
    "thumbnail": "https://img.youtube.com/vi/ZCRL8V0ZkEA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "4z-oDk1utVo",
    "title": "Lut Gaye",
    "artist": "Jubin Nautiyal",
    "movie": "",
    "duration": "3:49",
    "thumbnail": "https://img.youtube.com/vi/4z-oDk1utVo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "vfhxDfvnauo",
    "title": "Phir Mohabbat",
    "artist": "Mohammed Irfan",
    "movie": "Murder 2",
    "duration": "5:30",
    "thumbnail": "https://img.youtube.com/vi/vfhxDfvnauo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "O_bpNia-yno",
    "title": "Jo Tu Na Mila",
    "artist": "Asim Azhar",
    "movie": "",
    "duration": "3:55",
    "thumbnail": "https://img.youtube.com/vi/O_bpNia-yno/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "MzKvcV0Re7U",
    "title": "Itni Si Baat Hain",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:55",
    "thumbnail": "https://img.youtube.com/vi/MzKvcV0Re7U/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "PfcwlfCm7fc",
    "title": "Falak Tak",
    "artist": "Vishal-Shekhar",
    "movie": "Tashan",
    "duration": "5:56",
    "thumbnail": "https://img.youtube.com/vi/PfcwlfCm7fc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "bkWpCme6JCo",
    "title": "Dil Ne Yeh Kaha Hain Dil Se",
    "artist": "Udit Narayan",
    "movie": "",
    "duration": "7:07",
    "thumbnail": "https://img.youtube.com/vi/bkWpCme6JCo/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "gLBoyzFnAdE",
    "title": "Haule Haule",
    "artist": "Sukhwinder Singh",
    "movie": "",
    "duration": "4:24",
    "thumbnail": "https://img.youtube.com/vi/gLBoyzFnAdE/mqdefault.jpg",
    "mood": "Uplifting & Warmth"
  },
  {
    "id": "q9a3HjLeSJM",
    "title": "Suraj Hua Maddham",
    "artist": "Sandesh Shandilya",
    "movie": "",
    "duration": "7:08",
    "thumbnail": "https://img.youtube.com/vi/q9a3HjLeSJM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "AsieVqOTRs0",
    "title": "Mitwa",
    "artist": "Shankar Ehsaan Loy",
    "movie": "",
    "duration": "6:23",
    "thumbnail": "https://img.youtube.com/vi/AsieVqOTRs0/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "ZzVyBV9cAXY",
    "title": "Kahani",
    "artist": "Pritam",
    "movie": "",
    "duration": "3:29",
    "thumbnail": "https://img.youtube.com/vi/ZzVyBV9cAXY/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "VoTnpKGUW8k",
    "title": "Aaye Ho Meri Zindagi Mein (Female)",
    "artist": "Alka Yagnik",
    "movie": "",
    "duration": "6:04",
    "thumbnail": "https://img.youtube.com/vi/VoTnpKGUW8k/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Dtr97S83CX0",
    "title": "Ek Dil Hai",
    "artist": "Kumar Sanu Official",
    "movie": "",
    "duration": "5:11",
    "thumbnail": "https://img.youtube.com/vi/Dtr97S83CX0/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "JaNN2D54Dow",
    "title": "Dekhte Dekhte",
    "artist": "Atif Aslam",
    "movie": "Batti Gul Meter Chalu",
    "duration": "4:17",
    "thumbnail": "https://img.youtube.com/vi/JaNN2D54Dow/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "8-aagqHnx7M",
    "title": "HUM TUMKO NIGAHON MEIN",
    "artist": "Udit Narayan",
    "movie": "",
    "duration": "6:03",
    "thumbnail": "https://img.youtube.com/vi/8-aagqHnx7M/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "C14askJ1tO8",
    "title": "Haareya",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "3:35",
    "thumbnail": "https://img.youtube.com/vi/C14askJ1tO8/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "0QXHXqhKfUA",
    "title": "Bhula Dena",
    "artist": "Mustafa Zahid",
    "movie": "",
    "duration": "4:01",
    "thumbnail": "https://img.youtube.com/vi/0QXHXqhKfUA/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "MrUC9Km7U94",
    "title": "Valam",
    "artist": "Sachin Jigar",
    "movie": "Made in China",
    "duration": "3:16",
    "thumbnail": "https://img.youtube.com/vi/MrUC9Km7U94/mqdefault.jpg",
    "mood": "Acoustic & Soul"
  },
  {
    "id": "zKks-6Xf3uc",
    "title": "Chaaha Hai Tujhko",
    "artist": "Udit Narayan",
    "movie": "",
    "duration": "4:41",
    "thumbnail": "https://img.youtube.com/vi/zKks-6Xf3uc/mqdefault.jpg",
    "mood": "Nostalgia & Classics"
  },
  {
    "id": "DRZHVrSmcWU",
    "title": "Barbaad",
    "artist": "Jubin Nautiyal",
    "movie": "Saiyaara",
    "duration": "5:58",
    "thumbnail": "https://img.youtube.com/vi/DRZHVrSmcWU/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "5SGxpmPt9j0",
    "title": "Kahin Mujhe Pyar Hua Toh Nahin",
    "artist": "Alka Yagnik",
    "movie": "",
    "duration": "7:04",
    "thumbnail": "https://img.youtube.com/vi/5SGxpmPt9j0/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "AvMgfjv14B0",
    "title": "Deewana Kar Raha Hai",
    "artist": "Javed Ali",
    "movie": "",
    "duration": "5:39",
    "thumbnail": "https://img.youtube.com/vi/AvMgfjv14B0/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "12pMB_mCBOo",
    "title": "Labon Ko",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:42",
    "thumbnail": "https://img.youtube.com/vi/12pMB_mCBOo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "BLNHOgy_HCI",
    "title": "Hale Dil",
    "artist": "Harshit Saxena",
    "movie": "",
    "duration": "5:47",
    "thumbnail": "https://img.youtube.com/vi/BLNHOgy_HCI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "L0FzCiuTVEw",
    "title": "Maahi",
    "artist": "Shaarib Toshi",
    "movie": "",
    "duration": "5:30",
    "thumbnail": "https://img.youtube.com/vi/L0FzCiuTVEw/mqdefault.jpg",
    "mood": "Sufi & Devotional"
  },
  {
    "id": "eA7V16oogFA",
    "title": "Zaroorat",
    "artist": "Mustafa Zahid",
    "movie": "",
    "duration": "6:09",
    "thumbnail": "https://img.youtube.com/vi/eA7V16oogFA/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "SqlDjE35P9M",
    "title": "Milne Hai Mujhse Aayi",
    "artist": "Arijit Singh",
    "movie": "Aashiqui 2",
    "duration": "4:56",
    "thumbnail": "https://img.youtube.com/vi/SqlDjE35P9M/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "lOBmToX9gr8",
    "title": "Sunn Raha Hai",
    "artist": "Ankit Tiwari",
    "movie": "",
    "duration": "6:31",
    "thumbnail": "https://img.youtube.com/vi/lOBmToX9gr8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "NPC-9hYbkLE",
    "title": "Chahun Main Ya Naa",
    "artist": "Palak Muchhal",
    "movie": "",
    "duration": "5:05",
    "thumbnail": "https://img.youtube.com/vi/NPC-9hYbkLE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "lAsxLc9_45w",
    "title": "SOCH NA SAKE",
    "artist": "Amaal Mallik",
    "movie": "",
    "duration": "4:42",
    "thumbnail": "https://img.youtube.com/vi/lAsxLc9_45w/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "i-EXgX279wU",
    "title": "Galliyan",
    "artist": "Ankit Tiwari",
    "movie": "",
    "duration": "5:41",
    "thumbnail": "https://img.youtube.com/vi/i-EXgX279wU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "nko2VloNgLE",
    "title": "Main Dhoondne Ko Zamaane Mein",
    "artist": "Arijit Singh",
    "movie": "Heartless",
    "duration": "4:23",
    "thumbnail": "https://img.youtube.com/vi/nko2VloNgLE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "za6vJ-Qzhfg",
    "title": "Bol Do Na Zara",
    "artist": "Armaan Malik",
    "movie": "Azhar",
    "duration": "4:53",
    "thumbnail": "https://img.youtube.com/vi/za6vJ-Qzhfg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "gPlr04DEad4",
    "title": "Chale Aana",
    "artist": "Armaan Malik",
    "movie": "De De Pyaar De",
    "duration": "4:32",
    "thumbnail": "https://img.youtube.com/vi/gPlr04DEad4/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "jLHyFkCKEzg",
    "title": "Ik Mulaqaat",
    "artist": "Meet Bros",
    "movie": "",
    "duration": "4:08",
    "thumbnail": "https://img.youtube.com/vi/jLHyFkCKEzg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "64lEY8jj4RA",
    "title": "Dil Mein Ho Tum",
    "artist": "Armaan Malik",
    "movie": "Cheat India",
    "duration": "5:27",
    "thumbnail": "https://img.youtube.com/vi/64lEY8jj4RA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "qI4rijn4_Mo",
    "title": "IJAZAT",
    "artist": "Meet Bros",
    "movie": "",
    "duration": "4:49",
    "thumbnail": "https://img.youtube.com/vi/qI4rijn4_Mo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Zk_9vHhOcNg",
    "title": "Khamoshiyan",
    "artist": "JEET GANNGULI",
    "movie": "",
    "duration": "5:36",
    "thumbnail": "https://img.youtube.com/vi/Zk_9vHhOcNg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "CrL3h1Bq0Iw",
    "title": "Baarish",
    "artist": "Mohammed Irfan",
    "movie": "",
    "duration": "6:15",
    "thumbnail": "https://img.youtube.com/vi/CrL3h1Bq0Iw/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "tLaJFnc93Oc",
    "title": "Tum Hi Aana",
    "artist": "Payal Dev",
    "movie": "Marjaavaan",
    "duration": "4:10",
    "thumbnail": "https://img.youtube.com/vi/tLaJFnc93Oc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "_nJI4VcxF70",
    "title": "Filhall",
    "artist": "B Praak",
    "movie": "",
    "duration": "4:15",
    "thumbnail": "https://img.youtube.com/vi/_nJI4VcxF70/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "-IO4wID2B3A",
    "title": "Nit Khair Manga",
    "artist": "Folk & Soul Studio",
    "movie": "Raid",
    "duration": "3:49",
    "thumbnail": "https://img.youtube.com/vi/-IO4wID2B3A/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "8HRLn62jWr8",
    "title": "Sanu Ek Pal",
    "artist": "Folk & Soul Studio",
    "movie": "Raid",
    "duration": "3:31",
    "thumbnail": "https://img.youtube.com/vi/8HRLn62jWr8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "LQzByGZHiQ8",
    "title": "Tum Jo Aaye",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:47",
    "thumbnail": "https://img.youtube.com/vi/LQzByGZHiQ8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "P84DXiycs9c",
    "title": "Tere Bin",
    "artist": "Folk & Soul Studio",
    "movie": "Simmba",
    "duration": "3:51",
    "thumbnail": "https://img.youtube.com/vi/P84DXiycs9c/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "cE4atI_v-Z0",
    "title": "Main Rang Sharbaton Ka",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:24",
    "thumbnail": "https://img.youtube.com/vi/cE4atI_v-Z0/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "AsLPGPs5iQk",
    "title": "Jeena Jeena",
    "artist": "Sachin Jigar",
    "movie": "",
    "duration": "3:49",
    "thumbnail": "https://img.youtube.com/vi/AsLPGPs5iQk/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "u8zs-WGI_8U",
    "title": "Tose Naina (From \"Mickey Virus)",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:24",
    "thumbnail": "https://img.youtube.com/vi/u8zs-WGI_8U/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "dgDc_gCkA8Q",
    "title": "Agar Tum Saath Ho",
    "artist": "Alka Yagnik",
    "movie": "Tamasha",
    "duration": "5:42",
    "thumbnail": "https://img.youtube.com/vi/dgDc_gCkA8Q/mqdefault.jpg",
    "mood": "Late Night Melancholy"
  },
  {
    "id": "ppcVqfsekIs",
    "title": "Khuda Bhi",
    "artist": "Mohit Chauhan",
    "movie": "",
    "duration": "5:01",
    "thumbnail": "https://img.youtube.com/vi/ppcVqfsekIs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Gg3Xz89Q2UU",
    "title": "Hua Hain Aaj Pehli Baar",
    "artist": "Amaal Mallik",
    "movie": "",
    "duration": "5:10",
    "thumbnail": "https://img.youtube.com/vi/Gg3Xz89Q2UU/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "3M3o3Ak1qBY",
    "title": "Jeene Laga Hoon",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "3:56",
    "thumbnail": "https://img.youtube.com/vi/3M3o3Ak1qBY/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "xBqpEpMGZe8",
    "title": "Pal Pal Dil Ke Paas- Title Track",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:15",
    "thumbnail": "https://img.youtube.com/vi/xBqpEpMGZe8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Pm0Ga7R-vrM",
    "title": "Tujhe Kitna Chahne Lage",
    "artist": "Arijit Singh",
    "movie": "Kabir Singh",
    "duration": "4:45",
    "thumbnail": "https://img.youtube.com/vi/Pm0Ga7R-vrM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "eAxK5tyahUM",
    "title": "Main Agar Saamne",
    "artist": "Abhijeet Unplugged",
    "movie": "",
    "duration": "5:46",
    "thumbnail": "https://img.youtube.com/vi/eAxK5tyahUM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "SzEGaTv-jCY",
    "title": "Aaj Phir (From \"Hate Story 2)",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:22",
    "thumbnail": "https://img.youtube.com/vi/SzEGaTv-jCY/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "mnxPiV0g4ZE",
    "title": "DIL MEIN CHHUPA LOONGA",
    "artist": "Meet Bros",
    "movie": "",
    "duration": "5:32",
    "thumbnail": "https://img.youtube.com/vi/mnxPiV0g4ZE/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "IaHVWceuMMA",
    "title": "Mujhko Barsaat Bana Lo",
    "artist": "Armaan Malik",
    "movie": "Junooniyat",
    "duration": "4:24",
    "thumbnail": "https://img.youtube.com/vi/IaHVWceuMMA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "eFEFXuq9-qM",
    "title": "Tumhe Apna Banane Ka",
    "artist": "Armaan Malik",
    "movie": "",
    "duration": "5:11",
    "thumbnail": "https://img.youtube.com/vi/eFEFXuq9-qM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "EUUZjsthniI",
    "title": "Wajah Tum Ho",
    "artist": "Mithoon",
    "movie": "Wajah Tum Ho",
    "duration": "4:55",
    "thumbnail": "https://img.youtube.com/vi/EUUZjsthniI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "4xYyIDq_coo",
    "title": "Toota Jo Kabhi Tara",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "5:06",
    "thumbnail": "https://img.youtube.com/vi/4xYyIDq_coo/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Uwxs20pS4wg",
    "title": "Baarish by Atif Aslam",
    "artist": "Atif Aslam",
    "movie": "",
    "duration": "5:37",
    "thumbnail": "https://img.youtube.com/vi/Uwxs20pS4wg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "5lKv7kdzBZs",
    "title": "HANGOVER",
    "artist": "Meet Bros",
    "movie": "",
    "duration": "6:16",
    "thumbnail": "https://img.youtube.com/vi/5lKv7kdzBZs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "cK9h5PVzRpk",
    "title": "GUZARISH",
    "artist": "Javed Ali",
    "movie": "",
    "duration": "5:28",
    "thumbnail": "https://img.youtube.com/vi/cK9h5PVzRpk/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "5_2NuCw8ifg",
    "title": "Tumse Milke Dil Ka",
    "artist": "Sonu Nigam",
    "movie": "Main Hoon Na",
    "duration": "4:15",
    "thumbnail": "https://img.youtube.com/vi/5_2NuCw8ifg/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "YSRQfSmi9pI",
    "title": "Aapke Pyaar Mein Hum",
    "artist": "Alka Yagnik",
    "movie": "",
    "duration": "5:30",
    "thumbnail": "https://img.youtube.com/vi/YSRQfSmi9pI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "p8eD8PQcC8I",
    "title": "Aasan Nahin Yahan",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "3:35",
    "thumbnail": "https://img.youtube.com/vi/p8eD8PQcC8I/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "-sUUt4AGUKM",
    "title": "Muskurane  (Romantic)",
    "artist": "JEET GANNGULI",
    "movie": "Citylights",
    "duration": "5:35",
    "thumbnail": "https://img.youtube.com/vi/-sUUt4AGUKM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "VTVISZLW2fs",
    "title": "Raaz Aankhein Teri",
    "artist": "Arijit Singh",
    "movie": "Raaz Reboot",
    "duration": "4:52",
    "thumbnail": "https://img.youtube.com/vi/VTVISZLW2fs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "YAmSm4IXMlA",
    "title": "Thodi Jagah",
    "artist": "Arijit Singh",
    "movie": "Marjaavaan",
    "duration": "3:39",
    "thumbnail": "https://img.youtube.com/vi/YAmSm4IXMlA/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "vKITrWUNpjQ",
    "title": "Naina",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "3:46",
    "thumbnail": "https://img.youtube.com/vi/vKITrWUNpjQ/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "jRi_JRevJvs",
    "title": "Kaun Tujhe (Armaan Malik Version)",
    "artist": "Armaan Malik",
    "movie": "",
    "duration": "2:41",
    "thumbnail": "https://img.youtube.com/vi/jRi_JRevJvs/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "1U9548B35WI",
    "title": "Khairiyat",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:41",
    "thumbnail": "https://img.youtube.com/vi/1U9548B35WI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Wg50Ve_Mpg4",
    "title": "JAB TAK",
    "artist": "Armaan Malik",
    "movie": "",
    "duration": "2:55",
    "thumbnail": "https://img.youtube.com/vi/Wg50Ve_Mpg4/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "Kf781IbMQXk",
    "title": "Qaafirana",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "5:42",
    "thumbnail": "https://img.youtube.com/vi/Kf781IbMQXk/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "S3c-Ku1924w",
    "title": "Dekha Hazaro Dafaa",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "3:28",
    "thumbnail": "https://img.youtube.com/vi/S3c-Ku1924w/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "TW4xdaq7MBw",
    "title": "Piya Aaye Na",
    "artist": "Tulsi Kumar",
    "movie": "Aashiqui 2",
    "duration": "4:47",
    "thumbnail": "https://img.youtube.com/vi/TW4xdaq7MBw/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "H51ph0In8i0",
    "title": "Hum Mar Jayenge",
    "artist": "Tulsi Kumar",
    "movie": "Aashiqui 2",
    "duration": "5:07",
    "thumbnail": "https://img.youtube.com/vi/H51ph0In8i0/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "s6oQTPs0rZI",
    "title": "Pani Da Rang (Male)",
    "artist": "Ayushmann Khurrana",
    "movie": "",
    "duration": "4:01",
    "thumbnail": "https://img.youtube.com/vi/s6oQTPs0rZI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "g0FRQczOJ8w",
    "title": "Saadi Galli Aaja",
    "artist": "Ayushmann Khurrana",
    "movie": "",
    "duration": "4:14",
    "thumbnail": "https://img.youtube.com/vi/g0FRQczOJ8w/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "D49nMgP7Vzc",
    "title": "Bol Na Halke Halke",
    "artist": "Folk & Soul Studio",
    "movie": "",
    "duration": "5:07",
    "thumbnail": "https://img.youtube.com/vi/D49nMgP7Vzc/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "5s4fqJpXRvI",
    "title": "Kabhi Jo Baadal Barse (From \"Jackpot)",
    "artist": "Arijit Singh",
    "movie": "",
    "duration": "4:15",
    "thumbnail": "https://img.youtube.com/vi/5s4fqJpXRvI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "nnjSgp0-z-Q",
    "title": "Dheere Dheere",
    "artist": "Yo Yo Honey Singh",
    "movie": "",
    "duration": "3:33",
    "thumbnail": "https://img.youtube.com/vi/nnjSgp0-z-Q/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "_927Er2ZQMI",
    "title": "Tu Hi Mera",
    "artist": "Pritam",
    "movie": "",
    "duration": "4:33",
    "thumbnail": "https://img.youtube.com/vi/_927Er2ZQMI/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "-3vUz7QPljM",
    "title": "DARKHAAST",
    "artist": "Mithoon",
    "movie": "",
    "duration": "6:15",
    "thumbnail": "https://img.youtube.com/vi/-3vUz7QPljM/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  },
  {
    "id": "VzXPGIFDde8",
    "title": "Tera Deedar Hua",
    "artist": "Pritam",
    "movie": "",
    "duration": "5:48",
    "thumbnail": "https://img.youtube.com/vi/VzXPGIFDde8/mqdefault.jpg",
    "mood": "Romantic Soundscapes"
  }
];

if (typeof module !== 'undefined') {
  module.exports = { TRACKS_DATA };
}
