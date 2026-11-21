
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (!res.ok) {
    throw { name: "servicesError", message: jsonResponse };
  }

  return jsonResponse;
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    const response = await fetch(
      `${baseURL}products/search/${this.category}`
    );

    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }


  async checkout(order) {
    const url = "https://wdd330-backend-osp8.onrender.com/checkout";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    const response = await fetch(url, options);

    const result = await response.json();

    console.log("Server response:", result);

    if (!response.ok) {
      throw new Error(JSON.stringify(result));
    }

    return result;

  }
}
