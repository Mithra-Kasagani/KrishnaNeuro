export type GallerySlide = {
  id: string;
  src: string;
  width: number;
  height: number;
  albumUrl: string;
  photoUrl: string;
  title: string;
  titleTe: string;
  description: string;
  descriptionTe: string;
  alt: string;
  altTe: string;
};

const albumSlides: GallerySlide[] = [
  {
    id: "991905000856812",
    src: "/images/gallery/facebook-album-01.webp",
    width: 526,
    height: 538,
    albumUrl: "https://www.facebook.com/media/set/?set=a.991905000856812&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=991905180856794&set=a.991905000856812&type=3&ref=embed_post",
    title: "Mental health awareness in the press",
    titleTe: "పత్రికల్లో మానసిక ఆరోగ్య అవగాహన",
    description: "An archival newspaper feature documenting public mental-health education and professional participation.",
    descriptionTe: "ప్రజా మానసిక ఆరోగ్య అవగాహన మరియు వృత్తిపరమైన భాగస్వామ్యాన్ని నమోదు చేసిన పాత పత్రికా కథనం.",
    alt: "Archival Telugu newspaper coverage of a mental health awareness programme",
    altTe: "మానసిక ఆరోగ్య అవగాహన కార్యక్రమంపై పాత తెలుగు పత్రికా కథనం",
  },
  {
    id: "1119831351397509",
    src: "/images/gallery/facebook-album-02.webp",
    width: 552,
    height: 478,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1119831351397509&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=1119831374730840&set=a.1119831351397509&type=3&ref=embed_post",
    title: "Public education about the mind and health",
    titleTe: "మనసు మరియు ఆరోగ్యంపై ప్రజా విద్య",
    description: "A Telugu health feature explaining mental wellbeing and encouraging informed help-seeking.",
    descriptionTe: "మానసిక ఆరోగ్యాన్ని వివరించి, సమయానికి సహాయం కోరాలని ప్రోత్సహించే తెలుగు ఆరోగ్య కథనం.",
    alt: "Telugu newspaper health feature about mental wellbeing",
    altTe: "మానసిక ఆరోగ్యంపై తెలుగు పత్రికా ఆరోగ్య కథనం",
  },
  {
    id: "1290041057709870",
    src: "/images/gallery/facebook-album-03.webp",
    width: 417,
    height: 556,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1290041057709870&type=3",
    photoUrl: "https://www.facebook.com/media/set/?set=a.1290041057709870&type=3",
    title: "Professional mental-health awareness session",
    titleTe: "వృత్తిపరమైన మానసిక ఆరోగ్య అవగాహన సమావేశం",
    description: "An archival photograph from an educational talk delivered to a professional audience.",
    descriptionTe: "వృత్తిపరమైన ప్రేక్షకుల కోసం నిర్వహించిన అవగాహన ప్రసంగం నుంచి పాత చిత్రం.",
    alt: "Dr. Krishna Das speaking at a mental health awareness session",
    altTe: "మానసిక ఆరోగ్య అవగాహన సమావేశంలో మాట్లాడుతున్న డా. కృష్ణ దాస్",
  },
  {
    id: "1292379584142684",
    src: "/images/gallery/facebook-album-04.webp",
    width: 394,
    height: 517,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1292379584142684&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=1292379640809345&set=a.1292379584142684&type=3&ref=embed_post",
    title: "Depression awareness article",
    titleTe: "డిప్రెషన్‌పై అవగాహన వ్యాసం",
    description: "A Telugu educational column helping readers recognise depression and seek timely support.",
    descriptionTe: "డిప్రెషన్‌ను గుర్తించి సమయానికి సహాయం పొందేందుకు పాఠకులకు మార్గదర్శకం ఇచ్చే తెలుగు వ్యాసం.",
    alt: "Archival Telugu newspaper article explaining depression",
    altTe: "డిప్రెషన్‌ను వివరించే పాత తెలుగు పత్రికా వ్యాసం",
  },
  {
    id: "1313902715323704",
    src: "/images/gallery/facebook-album-05.webp",
    width: 552,
    height: 414,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1313902715323704&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=1313903878656921&set=a.1313902715323704&type=3&ref=embed_post",
    title: "Community mental-health discussion",
    titleTe: "సమాజ మానసిక ఆరోగ్య చర్చ",
    description: "A group learning session focused on mental-health understanding and community participation.",
    descriptionTe: "మానసిక ఆరోగ్య అవగాహన మరియు సమాజ భాగస్వామ్యంపై జరిగిన సమూహ విద్యా సమావేశం.",
    alt: "Community group participating in a mental health education discussion",
    altTe: "మానసిక ఆరోగ్య విద్యా చర్చలో పాల్గొంటున్న సమూహం",
  },
  {
    id: "1331520053561970",
    src: "/images/gallery/facebook-album-06.webp",
    width: 118,
    height: 503,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1331520053561970&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=1331520243561951&set=a.1331520053561970&type=3&ref=embed_post",
    title: "Mental-health education column",
    titleTe: "మానసిక ఆరోగ్య విద్యా కాలమ్",
    description: "An archival vertical newspaper feature created to improve public understanding of psychiatric symptoms.",
    descriptionTe: "మానసిక లక్షణాలపై ప్రజల అవగాహన పెంచేందుకు రూపొందించిన పాత నిలువు పత్రికా కథనం.",
    alt: "Tall archival Telugu newspaper column about mental health",
    altTe: "మానసిక ఆరోగ్యంపై పొడవైన పాత తెలుగు పత్రికా కాలమ్",
  },
  {
    id: "1843973172316653",
    src: "/images/gallery/facebook-album-07.webp",
    width: 344,
    height: 267,
    albumUrl: "https://www.facebook.com/media/set/?set=a.1843973172316653&type=3",
    photoUrl: "https://www.facebook.com/photo.php?fbid=1843973492316621&set=a.1843973172316653&type=3&ref=embed_post",
    title: "Mental-health awareness initiative",
    titleTe: "మానసిక ఆరోగ్య అవగాహన కార్యక్రమం",
    description: "An archival event photograph reflecting collaboration and community outreach for mental wellbeing.",
    descriptionTe: "మానసిక ఆరోగ్యం కోసం సహకారం మరియు సమాజ అవుట్‌రీచ్‌ను ప్రతిబింబించే పాత కార్యక్రమ చిత్రం.",
    alt: "Mental health awareness initiative with community representatives",
    altTe: "సమాజ ప్రతినిధులతో మానసిక ఆరోగ్య అవగాహన కార్యక్రమం",
  },
];


type FacebookPagePhoto = { id: string; src: string; photoUrl: string; width: number; height: number; title: string; titleTe: string };

const facebookPagePhotos: FacebookPagePhoto[] = [
  {
    "id": "479783344154964",
    "src": "/images/gallery/facebook-page-01.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=479783344154964&set=pb.100063699067434.-2207520000&type=3",
    "width": 370,
    "height": 383,
    "title": "Dr. Pamarthi Krishna Das — archive portrait",
    "titleTe": "డా. పామర్తి కృష్ణ దాస్ — ఆర్కైవ్ చిత్రం"
  },
  {
    "id": "479783340821631",
    "src": "/images/gallery/facebook-page-02.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=479783340821631&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 313,
    "title": "Krishna Neuro Psychiatric Centre identity card",
    "titleTe": "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్ పరిచయ చిత్రం"
  },
  {
    "id": "1827363317448608",
    "src": "/images/gallery/facebook-page-03.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=1827363317448608&set=pb.100063699067434.-2207520000&type=3",
    "width": 394,
    "height": 525,
    "title": "Mental-health services information card",
    "titleTe": "మానసిక ఆరోగ్య సేవల సమాచార చిత్రం"
  },
  {
    "id": "741960425988908",
    "src": "/images/gallery/facebook-page-04.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=741960425988908&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 345,
    "title": "Clinic information and appointment contacts",
    "titleTe": "క్లినిక్ సమాచారం మరియు అపాయింట్‌మెంట్ నంబర్లు"
  },
  {
    "id": "513296552188631",
    "src": "/images/gallery/facebook-page-05.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296552188631&set=pb.100063699067434.-2207520000&type=3",
    "width": 394,
    "height": 525,
    "title": "Community outreach and professional interaction",
    "titleTe": "సమాజ అవుట్‌రీచ్ మరియు వృత్తిపరమైన సమావేశం"
  },
  {
    "id": "513296438855309",
    "src": "/images/gallery/facebook-page-06.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296438855309&set=pb.100063699067434.-2207520000&type=3",
    "width": 350,
    "height": 518,
    "title": "Mental-health awareness in local media",
    "titleTe": "స్థానిక మీడియాలో మానసిక ఆరోగ్య అవగాహన"
  },
  {
    "id": "513296382188648",
    "src": "/images/gallery/facebook-page-07.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296382188648&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 397,
    "title": "Professional recognition and public education",
    "titleTe": "వృత్తిపరమైన గుర్తింపు మరియు ప్రజా విద్య"
  },
  {
    "id": "513296318855321",
    "src": "/images/gallery/facebook-page-08.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296318855321&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 433,
    "title": "Health education and community recognition",
    "titleTe": "ఆరోగ్య విద్య మరియు సమాజ గుర్తింపు"
  },
  {
    "id": "513296242188662",
    "src": "/images/gallery/facebook-page-09.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296242188662&set=pb.100063699067434.-2207520000&type=3",
    "width": 526,
    "height": 538,
    "title": "Public mental-health programme coverage",
    "titleTe": "ప్రజా మానసిక ఆరోగ్య కార్యక్రమం వార్తలు"
  },
  {
    "id": "513296182188668",
    "src": "/images/gallery/facebook-page-10.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296182188668&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 327,
    "title": "Mental-health education and recognition",
    "titleTe": "మానసిక ఆరోగ్య విద్య మరియు గుర్తింపు"
  },
  {
    "id": "513296135522006",
    "src": "/images/gallery/facebook-page-11.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296135522006&set=pb.100063699067434.-2207520000&type=3",
    "width": 362,
    "height": 432,
    "title": "Community programme in the press",
    "titleTe": "పత్రికల్లో సమాజ కార్యక్రమం"
  },
  {
    "id": "513296055522014",
    "src": "/images/gallery/facebook-page-12.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=513296055522014&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 414,
    "title": "Mental-health service recognition",
    "titleTe": "మానసిక ఆరోగ్య సేవలకు గుర్తింపు"
  },
  {
    "id": "496395807212039",
    "src": "/images/gallery/facebook-page-13.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=496395807212039&set=pb.100063699067434.-2207520000&type=3",
    "width": 240,
    "height": 502,
    "title": "Brain-health and seizure awareness article",
    "titleTe": "మెదడు ఆరోగ్యం మరియు ఫిట్స్‌పై అవగాహన వ్యాసం"
  },
  {
    "id": "489381807913439",
    "src": "/images/gallery/facebook-page-14.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=489381807913439&set=pb.100063699067434.-2207520000&type=3",
    "width": 381,
    "height": 246,
    "title": "Clinical education through the press",
    "titleTe": "పత్రికల ద్వారా క్లినికల్ అవగాహన"
  },
  {
    "id": "489381721246781",
    "src": "/images/gallery/facebook-page-15.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=489381721246781&set=pb.100063699067434.-2207520000&type=3",
    "width": 173,
    "height": 260,
    "title": "Public-health outreach feature",
    "titleTe": "ప్రజా ఆరోగ్య అవుట్‌రీచ్ కథనం"
  },
  {
    "id": "472182026300084",
    "src": "/images/gallery/facebook-page-16.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=472182026300084&set=pb.100063699067434.-2207520000&type=3",
    "width": 206,
    "height": 527,
    "title": "Psychiatric education newspaper column",
    "titleTe": "మానసిక వైద్య విద్యా పత్రికా కాలమ్"
  },
  {
    "id": "465902963594657",
    "src": "/images/gallery/facebook-page-17.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=465902963594657&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 414,
    "title": "Public mental-health awareness programme",
    "titleTe": "ప్రజా మానసిక ఆరోగ్య అవగాహన కార్యక్రమం"
  },
  {
    "id": "465902656928021",
    "src": "/images/gallery/facebook-page-18.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=465902656928021&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 414,
    "title": "Community mental-health stage event",
    "titleTe": "సమాజ మానసిక ఆరోగ్య వేదిక కార్యక్రమం"
  },
  {
    "id": "461613217356965",
    "src": "/images/gallery/facebook-page-19.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=461613217356965&set=pb.100063699067434.-2207520000&type=3",
    "width": 417,
    "height": 506,
    "title": "Mental-health services press coverage",
    "titleTe": "మానసిక ఆరోగ్య సేవల పత్రికా కథనం"
  },
  {
    "id": "459290710922549",
    "src": "/images/gallery/facebook-page-20.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=459290710922549&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 367,
    "title": "World Mental Health Week session",
    "titleTe": "ప్రపంచ మానసిక ఆరోగ్య వారోత్సవ సమావేశం"
  },
  {
    "id": "458947297623557",
    "src": "/images/gallery/facebook-page-21.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=458947297623557&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 192,
    "title": "Mental-health advice column",
    "titleTe": "మానసిక ఆరోగ్య సలహా కాలమ్"
  },
  {
    "id": "458746587643628",
    "src": "/images/gallery/facebook-page-22.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=458746587643628&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 311,
    "title": "Professional mental-health education seminar",
    "titleTe": "వృత్తిపరమైన మానసిక ఆరోగ్య విద్యా సెమినార్"
  },
  {
    "id": "458746274310326",
    "src": "/images/gallery/facebook-page-23.webp",
    "photoUrl": "https://www.facebook.com/photo.php?fbid=458746274310326&set=pb.100063699067434.-2207520000&type=3",
    "width": 552,
    "height": 311,
    "title": "World Mental Health Day recognition",
    "titleTe": "ప్రపంచ మానసిక ఆరోగ్య దినోత్సవ గుర్తింపు"
  }
];

const facebookPageUrl = "https://www.facebook.com/vijayawadapsychiatry/photos";

export const gallerySlides: GallerySlide[] = [
  ...albumSlides,
  ...facebookPagePhotos.map((item) => ({
    ...item,
    albumUrl: facebookPageUrl,
    description: `An archival clinic image from the public Facebook photo collection documenting ${item.title.toLowerCase()}.`,
    descriptionTe: `${item.titleTe}ను నమోదు చేసిన క్లినిక్ పబ్లిక్ Facebook ఫోటో సేకరణలోని ఆర్కైవ్ చిత్రం.`,
    alt: item.title,
    altTe: item.titleTe,
  })),
];
