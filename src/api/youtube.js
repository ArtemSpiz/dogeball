/**
 * YouTube API Module
 * API calls for fetching YouTube/blog content
 */

import axios from "axios";

// YouTube API base URL (same as faucet)
const BASE_URL = "https://dogeball-faucet.vercel.app";

/**
 * Fetch YouTube videos/blog posts
 */
export const getYouTubeVideos = async () => {
  const res = await axios({
    url: "/api/youtube",
    baseURL: BASE_URL,
    method: "GET",
  });
  return res.data;
};

export default {
  getYouTubeVideos,
};
