export async function fetchPortfolioData() {
    try {
      const res = await fetch("api/portfolio");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      return { error: "Failed to load portfolio data" };
    }
  }
  

