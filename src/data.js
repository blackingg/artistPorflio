export const queueVariants = {
  desktopInitial: { x: "100%", opacity: 0 },
  desktopAnimate: { x: 0, opacity: 1 },
  desktopExit: { x: "100%", opacity: 0 },
  mobileInitial: { y: "100%", opacity: 0 },
  mobileAnimate: { y: 0, opacity: 1 },
  mobileExit: { y: "100%", opacity: 0 },
};

export const albums = [
  {
    id: 1,
    title: "Attention",
    image: "/img/attention.jpg",
    songs: [
      {
        name: "Attention",
        songUrl: "/songs/attention.mp3",
        link: "https://ffm.to/attention-dafash",
      },
    ],
  },
  {
    id: 2,
    title: "Genesis",
    image: "/img/genesis.jpg",
    songs: [
      {
        name: "Genesis (Intro)",
        songUrl: "/songs/genesis_intro.mp3",
        link: "https://ffm.to/genesis-dafash",
      },
      {
        name: "Right Now",
        songUrl: "/songs/right_now.mp3",
        link: "https://ffm.to/genesis-dafash",
      },
      {
        name: "Lupita",
        songUrl: "/songs/lupita.mp3",
        link: "https://ffm.to/genesis-dafash",
      },
      {
        name: "Apollo",
        songUrl: "/songs/apollo.mp3",
        link: "https://ffm.to/genesis-dafash",
      },
    ],
  },
  {
    id: 3,
    title: "Fight Somebody",
    image: "/img/fightSomebody.jpg",
    songs: [
      {
        name: "Fight Somebody",
        songUrl: "/songs/fight_somebody.mp3",
        link: "https://ffm.to/fs-dafash",
      },
    ],
  },
  {
    id: 4,
    title: "Shege Wey I see (SWIS)",
    image: "/img/SWIS.jpg",
    songs: [
      {
        name: "Shege Wey I see",
        songUrl: "/songs/shege_wey_i_see.mp3",
        link: "https://ffm.to/shege-wey-i-see",
      },
    ],
  },
  {
    id: 5,
    title: "Odessey",
    image: "/img/odessey.jpg",
    songs: [
      {
        name: "Duro Mi",
        songUrl: "/songs/duro_mi.mp3",
        link: "https://ffm.to/odyssey-ep",
      },
      {
        name: "Shege Wey I see",
        songUrl: "/songs/shege_wey_i_see.mp3",
        link: "https://ffm.to/odyssey-ep",
      },
      {
        name: "Amazing",
        songUrl: "/songs/amazing.mp3",
        link: "https://ffm.to/odyssey-ep",
      },
      {
        name: "Mia",
        songUrl: "/songs/mia.mp3",
        link: "https://ffm.to/odyssey-ep",
      },
      {
        name: "Fight Somebody",
        songUrl: "/songs/fight_somebody.mp3",
        link: "https://ffm.to/odyssey-ep",
      },
    ],
  },
];

export const videos = [
  {
    id: 1,
    title: "DA FASH - Live at Metropolis",
    thumbnail: "/api/placeholder/320/180",
    duration: "1:23:45",
  },
  {
    id: 2,
    title: "Behind the Scenes - Album Recording",
    thumbnail: "/api/placeholder/320/180",
    duration: "15:30",
  },
  {
    id: 3,
    title: "DA FASH - 'Neon Nights' Official Music Video",
    thumbnail: "/api/placeholder/320/180",
    duration: "4:12",
  },
  {
    id: 4,
    title: "Interview with DA FASH - The Creative Process",
    thumbnail: "/api/placeholder/320/180",
    duration: "28:55",
  },
  {
    id: 5,
    title: "DA FASH - Unplugged Session",
    thumbnail: "/api/placeholder/320/180",
    duration: "37:20",
  },
  {
    id: 6,
    title: "DA FASH - Tour Diary 2024",
    thumbnail: "/api/placeholder/320/180",
    duration: "52:10",
  },
];
