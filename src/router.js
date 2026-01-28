import Home from "@/pages/Home.vue";
import About from "./pages/About.vue";
import Roadmap from "./pages/Roadmap.vue";
import BlogPost from "./pages/BlogPost.vue";

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
    path: "/blog-01",
    name: "BlogPost",
    component: BlogPost,
    meta: {
      title: "What is Layer 2, and Why Does it Matter? – $DOGEBALL",
      description:
        "Learn about Layer 2 technology and why it matters for DOGEBALL. Discover how DogeChain enables micro-transactions, instant feedback, and scalability.",
      ogTitle: "What is Layer 2, and Why Does it Matter? – $DOGEBALL",
      ogDescription:
        "Learn about Layer 2 technology and why it matters for DOGEBALL. Discover how DogeChain enables micro-transactions, instant feedback, and scalability.",
      ogImage: "https://www.dogeballtoken.com/logo.png",
      canonical: "https://www.dogeballtoken.com/blog-01",
    },
  },
];
