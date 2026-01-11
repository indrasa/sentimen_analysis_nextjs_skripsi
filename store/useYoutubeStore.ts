import "zustand";
import { create } from "zustand";

type YoutubeState = {
  url: string;
  isValid: boolean;
  setUrl: (url: string) => void;
  reset: () => void;
};

export const useYoutubeStore = create<YoutubeState>((set) => ({
  url: "",
  isValid: false,
  setUrl: (url) => set({ url, isValid: isValidYoutubeUrl(url) }),
  reset: () => ({ url: "", isValid: false }),
}));

function isValidYoutubeUrl(url: string) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=[-\w]{11}|youtu\.be\/[-\w]{11}|shorts\/[-\w]{11})/;
  
  try {
    const u = new URL(url);
    const isValidHostname = u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be");
    const isValidFormat = youtubeRegex.test(url);
    
    return isValidHostname && isValidFormat;
  } catch {
    return false;
  }
}
