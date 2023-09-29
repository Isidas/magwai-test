const URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchData = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Ошибка запроса сервера");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

fetchData();
