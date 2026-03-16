import { T } from "@/utils/tokens";

export function useTheme(dark: boolean) {
  return {
    bg0: dark ? T.d0 : T.l0,
    bg1: dark ? T.d1 : T.l1,
    bg2: dark ? T.d2 : T.l2,
    bg3: dark ? T.d3 : T.l3,
    bg4: dark ? T.d4 : T.l4,
    text: dark ? T.dt : T.lt,
    textS: dark ? T.ds : T.ls,
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    borderM: dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.12)",
  };
}
