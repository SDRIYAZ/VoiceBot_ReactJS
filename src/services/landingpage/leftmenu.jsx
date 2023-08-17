const leftmenu = async () => {
    const response = await fetch('http://localhost:3000/skills');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};
export default leftmenu;