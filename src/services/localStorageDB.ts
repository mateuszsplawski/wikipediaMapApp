const key = "articlesArr";

const localStorageDB = () => {
  let articles = getArticles();

  function getArticles() {
    try {
      const articles = localStorage.getItem(key);
      return articles ? JSON.parse(articles) : [];
    } catch (e) {
      console.error("Error while reading articles from localStorage", e);
    }
  }

  function addArticle(title: string) {
    try {
      if (!articles.includes(title)) {
        articles.push(title);
        localStorage.setItem(key, JSON.stringify(articles));
      }
    } catch (e) {
      console.error("Error while adding article to localStorage", e);
    }
  }

  const api = {
    refresh() {
      articles = getArticles();
    },
    isArticleRead(title: string) {
      return articles.includes(title);
    },
    setArticleAsRead(title: string) {
      addArticle(title);
    },
  };
  return api;
};

export default localStorageDB();
