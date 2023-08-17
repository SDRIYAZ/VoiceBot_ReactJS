const fetchLandingPageData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};
export default fetchLandingPageData;