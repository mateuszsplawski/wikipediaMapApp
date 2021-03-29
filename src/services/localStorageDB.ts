import { ReadArticle } from "types/index";

const key = "articlesArr";

const localStorageDB = () => {
  let articles: ReadArticle[] = getArticles();

  function getArticles() {
    try {
      const articles = localStorage.getItem(key);
      return articles ? JSON.parse(articles) : [];
    } catch (e) {
      console.error("Error while reading articles from localStorage", e);
    }
  }

  function addArticle({ title, coords }: ReadArticle) {
    try {
      if (!articles.map(({ title }) => title).includes(title)) {
        articles = getArticles();
        articles.push({ title, coords });
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
    isArticleRead({ title }: { title: string }) {
      return articles.map(({ title }) => title).includes(title);
    },
    setArticleAsRead({ title, coords }: ReadArticle) {
      addArticle({ title, coords });
    },
    getReadArticles() {
      return articles;
    },
    getReadArticlesCount() {
      return articles.length;
    },
  };
  return api;
};

export default localStorageDB();
