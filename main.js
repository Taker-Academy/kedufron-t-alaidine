const apiUrl = "https://api.kedufront.juniortaker.com";

const getPosts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/item/`);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getPost = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/item/${id}`);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getPicture = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/picture/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (email, name, address, cart) => {
  try {
    const { data } = await axios.post(`${apiUrl}/order/`, {
      email,
      name,
      address,
      cart,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
