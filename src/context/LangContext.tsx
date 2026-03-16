import React from "react";

export const LangContext = React.createContext<{
  langId: string;
  setLangId: (id: string) => void;
}>({
  langId: "javascript",
  setLangId: () => {},
});
