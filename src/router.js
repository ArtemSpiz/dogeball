import Home from "@/pages/Home.vue";
import DogePay from "./pages/DogePay.vue";
import About from "./pages/About.vue";
import Roadmap from "./pages/Roadmap.vue";
import Game from "./pages/Game.vue";
import BlogPost from "./pages/BlogPost.vue";
import BlogPost2 from "./pages/BlogPost2.vue";
import BlogPost3 from "./pages/BlogPost3.vue";
import BlogPost4 from "./pages/BlogPost4.vue";
import BlogPost5 from "./pages/BlogPost5.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "$DOGEBALL – Meme coin, presale and game on Ethereum L2",
      description:
        "Join $DOGEBALL – the ultimate meme coin presale on Ethereum L2. Play, earn rewards, and be part of the future of decentralized gaming. Buy $DOGEBALL tokens now!",
      ogTitle: "$DOGEBALL – Meme coin, presale and game on Ethereum L2",
      ogDescription:
        "Join $DOGEBALL – the ultimate meme coin presale on Ethereum L2. Play, earn rewards, and be part of the future of decentralized gaming.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/",
    },
  },
  {
    path: "/dogepay",
    name: "DogePay",
    component: DogePay,
    meta: {
      title: "$DOGEPAY – $DOGEBALL",
      description:
        "$DOGEPAY: fiat-to-crypto and payment features for the $DOGEBALL ecosystem. More details coming soon.",
      ogTitle: "$DOGEPAY – $DOGEBALL",
      ogDescription:
        "$DOGEPAY: fiat-to-crypto and payment features for the $DOGEBALL ecosystem.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/dogepay",
    },
  },
  {
    path: "/eth-l2",
    name: "ETH L2",
    component: About,
    meta: {
      title: "$DOGEBALL on Ethereum L2 – Scalable, Fast, Low-Cost",
      description:
        "Discover $DOGEBALL on Ethereum L2. Experience fast transactions, low gas fees, and seamless gameplay. Built on cutting-edge Layer 2 technology for the best user experience.",
      ogTitle: "$DOGEBALL on Ethereum L2 – Scalable, Fast, Low-Cost",
      ogDescription:
        "Discover $DOGEBALL on Ethereum L2. Experience fast transactions, low gas fees, and seamless gameplay.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/eth-l2",
    },
  },
  {
    path: "/play-$DOGEBALL",
    name: "Roadmap",
    component: Roadmap,
    meta: {
      title: "Play $DOGEBALL – Roadmap & Game Features",
      description:
        "Explore the $DOGEBALL roadmap and upcoming game features. Learn about tokenomics, staking rewards, and the future of the $DOGEBALL ecosystem.",
      ogTitle: "Play $DOGEBALL – Roadmap & Game Features",
      ogDescription:
        "Explore the $DOGEBALL roadmap and upcoming game features. Learn about tokenomics, staking rewards, and the future.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/play-$DOGEBALL",
    },
  },
  {
    path: "/play",
    name: "Game",
    component: Game,
    meta: {
      title: "Play $DOGEBALL Game",
      description:
        "Play the $DOGEBALL Unity game. Experience the ultimate meme coin arcade-style game on Ethereum L2.",
      ogTitle: "Play $DOGEBALL Game",
      ogDescription:
        "Play the $DOGEBALL Unity game. Experience the ultimate meme coin arcade-style game.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/play",
    },
  },
  {
    path: "/blog-01",
    name: "BlogPost",
    component: BlogPost,
    meta: {
      title:
        "What is DOGEBALL Crypto 2026: An Introduction to High-Performance P2E Gaming – $DOGEBALL",
      description:
        "Learn about DOGEBALL ($DOGEBALL) - a high-performance gaming ecosystem on Ethereum Layer 2. Discover the $1M P2E prize pool, DogeChain L2 infrastructure, and Coinsult-audited smart contracts with 100% security score.",
      ogTitle:
        "What is DOGEBALL Crypto 2026: An Introduction to High-Performance P2E Gaming – $DOGEBALL",
      ogDescription:
        "Learn about DOGEBALL ($DOGEBALL) - a high-performance gaming ecosystem on Ethereum Layer 2. Discover the $1M P2E prize pool, DogeChain L2 infrastructure, and Coinsult-audited smart contracts with 100% security score.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-01",
    },
  },
  {
    path: "/blog-02",
    name: "BlogPost2",
    component: BlogPost2,
    meta: {
      title:
        "Is DOGEBALL Crypto the Most Productive Meme Coin of 2026? Let's Find Out – $DOGEBALL",
      description:
        "Discover how DOGEBALL uses Layer 2 technology to solve the gas problem in crypto gaming. Learn about the $1M prize pool, real-time gameplay, and why DOGEBALL is leading the utility-backed meme coin revolution.",
      ogTitle:
        "Is DOGEBALL Crypto the Most Productive Meme Coin of 2026? Let's Find Out – $DOGEBALL",
      ogDescription:
        "Discover how DOGEBALL uses Layer 2 technology to solve the gas problem in crypto gaming. Learn about the $1M prize pool, real-time gameplay, and why DOGEBALL is leading the utility-backed meme coin revolution.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-02",
    },
  },
  {
    path: "/blog-03",
    name: "BlogPost3",
    component: BlogPost3,
    meta: {
      title:
        "Best Crypto to Buy in 2026: How to Win Big in the $1M DOGEBALL Arena – $DOGEBALL",
      description:
        "Discover why DOGEBALL ($DOGEBALL) is the best crypto to buy in 2026. Learn about the $1M prize pool, 80% staking rewards, and how to earn through active gameplay or passive staking on DogeChain L2.",
      ogTitle:
        "Best Crypto to Buy in 2026: How to Win Big in the $1M DOGEBALL Arena – $DOGEBALL",
      ogDescription:
        "Discover why DOGEBALL ($DOGEBALL) is the best crypto to buy in 2026. Learn about the $1M prize pool, 80% staking rewards, and how to earn through active gameplay or passive staking on DogeChain L2.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-03",
    },
  },
  {
    path: "/blog-04",
    name: "BlogPost4",
    component: BlogPost4,
    meta: {
      title: "DOGEBALL Crypto 2026-2028 Price Prediction – $DOGEBALL",
      description:
        "Get data-driven DOGEBALL ($DOGEBALL) price predictions for 2026-2028. Learn about the 50x presale-to-listing gap, 80% APY staking rewards, and long-term price targets based on DogeChain L2 infrastructure.",
      ogTitle: "DOGEBALL Crypto 2026-2028 Price Prediction – $DOGEBALL",
      ogDescription:
        "Get data-driven DOGEBALL ($DOGEBALL) price predictions for 2026-2028. Learn about the 50x presale-to-listing gap, 80% APY staking rewards, and long-term price targets based on DogeChain L2 infrastructure.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-04",
    },
  },
  {
    path: "/blog-05",
    name: "BlogPost5",
    component: BlogPost5,
    meta: {
      title: "Why DOGEBALL is the Best Crypto in 2026 for Gamers – $DOGEBALL",
      description:
        "Discover why DOGEBALL ($DOGEBALL) is the best crypto in 2026 for gamers. Learn about the Play-and-Own philosophy, true asset ownership on DogeChain L2, and why fun-first gameplay makes DOGEBALL the top choice for gaming enthusiasts.",
      ogTitle: "Why DOGEBALL is the Best Crypto in 2026 for Gamers – $DOGEBALL",
      ogDescription:
        "Discover why DOGEBALL ($DOGEBALL) is the best crypto in 2026 for gamers. Learn about the Play-and-Own philosophy, true asset ownership on DogeChain L2, and why fun-first gameplay makes DOGEBALL the top choice for gaming enthusiasts.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-05",
    },
  },
];
