import { createContext, useState, useContext } from "react";

const PageContext = createContext();

function GiftrProvider(props) {
  const pageInfo = {
    page: "",
    id: "",
    giftId: "",
  };

  const [page, setPage] = useState({ ...pageInfo });

  const updatePage = (pge) => {
    setPage(pge);
    console.log(pge);
  };

  return <PageContext.Provider value={[page, updatePage]} {...props} />;
}

function usePage() {
  const context = useContext(PageContext);
  if (!context) throw new Error("Not inside the Provider");
  return context; // [username, setUsername]
}

export { GiftrProvider, usePage };
