 import axios from 'axios';

const viewFile = async () => {
    const response = await axios.get(`${process.env.API_URL}/file/${context.params.archivos}`);
    return response
}

// const createProduct = async (product) => {
//     const response = await axios.post(`${process.env.API_URL}/product`, {
//         name: product.name,
//         price: product.price,
//         quantity: product.quantity,
//         description: product.description
//     });
//     return response
// }

 module.exports = {
    viewFile
 }