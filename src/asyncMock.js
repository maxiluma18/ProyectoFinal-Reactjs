const products = [
    { id: 1, nombre: "Vasija", precio: 400, img: "https://th.bing.com/th/id/OIP.YeQbXrz5UC5K8NwSkt_jvAHaGu?w=214&h=194&c=7&r=0&o=5&pid=1.7", categoria:"Nuevo", stock:4},
    { id: 2, nombre: "Camara", precio: 900, img: "https://th.bing.com/th/id/R.ab680e86014820607b8f51e3b41fa1b0?rik=La7yVCygbhM8QQ&pid=ImgRaw&r=0", categoria:"Nuevo", stock:6 },
    { id: 3, nombre: "Radio", precio: 500, img: "https://i5.walmartimages.com/asr/5427ec3e-94ce-4937-97a4-eb132dcea81d.5d0150a2dd311abce146b9630e0b27ef.jpeg",categoria:"Electronica", stock:8 },
    {
        id: 4,
        nombre: "Maquina de Tejer",
        precio: 1000,
        img: "https://th.bing.com/th/id/OIP.yNdXuLUBED9hVWaZwCe2pgHaEO?rs=1&pid=ImgDetMain",
        categoria:"Destacados", stock:13
    },
    {
        id: 5,
        nombre: "Telefono",
        precio: 400,
        img: "https://i0.wp.com/www.reviews-tablet.com/wp-content/uploads/2019/01/BLU-VIVO-XL4-6.2-inch-HD-Display-Smartphone-32GB-Hard-Drive-3GB-RAM-picture.jpg?ssl=1",
        categoria:"Electronica", stock:3
    },
    { id: 6, nombre: "Relojes", precio: 300, img: "https://th.bing.com/th/id/OIP.fOmJ7z3osS-XB2sE67Z-1AHaJN?rs=1&pid=ImgDetMain", categoria:"Destacados", stock:50},
]



export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 100)
    })
}

export const getProductsByCategory = (categoriaId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.categoria === categoriaId))
        }, 100)
    })
}

export const getProductById = (itemId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === parseInt(itemId)))
        }, 1000)
    })
}
