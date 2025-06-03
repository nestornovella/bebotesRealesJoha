import { response } from "../helpers/helpers";
import { prismaClient } from "../helpers/prismaClient";



export async function GET() {

    try {

        await prismaClient.product.deleteMany()
        await prismaClient.category.deleteMany()
        //categorias
        const juguetes = await prismaClient.category.create({
            data: {
                name: 'Juguetes'
            }
        })

        const bebesReales = await prismaClient.category.create({
            data: {
                name: 'Bebes Reales'
            }
        })

        const puzzles = await prismaClient.category.create({
            data: {
                name: 'puzzles',
                parent: {
                    connect: { id: juguetes.id }
                }
            },

        })
        const autitos = await prismaClient.category.create({
            data: {
                name: 'autitos',
                parent: {
                    connect: { id: juguetes.id }
                }
            },

        })
        const nenas = await prismaClient.category.create({
            data: {
                name: 'nenas',
                parent: {
                    connect: { id: bebesReales.id }
                }
            },

        })
        const nenes = await prismaClient.category.create({
            data: {
                name: 'nenes',
                parent: {
                    connect: { id: bebesReales.id }
                }
            },

        })


        //productos

        // Puzzles (4)
        await prismaClient.product.create({
            data: {
                name: 'Puzzle de Animales',
                description: 'Colorido rompecabezas de madera con formas de animales.',
                price: 14.99,
                weight: 0.5,
                length: 20,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaauQI3MQfop_iL_7uver7Litld2HUupo_HA&s',
                categories: {
                    connect: [{ id: puzzles.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Puzzle del Espacio',
                description: 'Rompecabezas temático del sistema solar, 500 piezas.',
                price: 19.99,
                weight: 0.8,
                length: 30,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfmssebTfULB5Ofvcow2hzXyw1bwHUHk8pgA&s',
                categories: {
                    connect: [{ id: puzzles.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Puzzle de Madera',
                description: 'Rompecabezas de madera natural para armar figuras 3D.',
                price: 24.99,
                weight: 1.0,
                length: 35,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa2gGMMUkuG9OzVJxkBn4MKD_-430pQBzrRw&s',
                categories: {
                    connect: [{ id: puzzles.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Puzzle del Mundo',
                description: 'Mapa del mundo en piezas, ideal para aprender geografía.',
                price: 22.99,
                weight: 0.9,
                length: 40,
                image: 'https://jugueteriaelgato.com.ar/wp-content/uploads/1675093360fa8304517673cac56a33f2b5900a98f4-2.jpg',
                categories: {
                    connect: [{ id: puzzles.id }],
                },
            },
        });

        // Autitos (4)
        await prismaClient.product.create({
            data: {
                name: 'Auto Deportivo Rojo',
                description: 'Autito metálico a escala, con puertas que se abren.',
                price: 12.99,
                weight: 0.3,
                length: 15,
                image: 'https://nuve.ar/ococ/image/cache/catalog/HOGAR/2023/CAMP%208/DAN-J003-500x500.jpg',
                categories: {
                    connect: [{ id: autitos.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Camioneta Monster Truck',
                description: 'Camioneta de ruedas grandes para terrenos difíciles.',
                price: 18.99,
                weight: 0.6,
                length: 20,
                image: 'https://http2.mlstatic.com/D_NQ_NP_641791-MLA48065359148_102021-O.webp',
                categories: {
                    connect: [{ id: autitos.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Auto de Policía',
                description: 'Vehículo de policía con luces y sonidos realistas.',
                price: 16.99,
                weight: 0.4,
                length: 18,
                image: 'https://http2.mlstatic.com/D_NQ_NP_915127-MLA47461568849_092021-O.webp',
                categories: {
                    connect: [{ id: autitos.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Auto de Carreras Azul',
                description: 'Auto deportivo azul metálico, ideal para carreras.',
                price: 14.99,
                weight: 0.35,
                length: 17,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRurr9jimi_LNawszRenM0rnpl5iW1P5BUzyw&s',
                categories: {
                    connect: [{ id: autitos.id }],
                },
            },
        });

        // Nenes (4)
        await prismaClient.product.create({
            data: {
                name: 'Figura de Superhéroe',
                description: 'Figura articulada de superhéroe favorito de los niños.',
                price: 22.99,
                weight: 0.5,
                length: 25,
                image: 'https://http2.mlstatic.com/D_NQ_NP_669961-MLA69273893730_052023-O.webp',
                categories: {
                    connect: [{ id: nenes.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Camión de Construcción',
                description: 'Camión de juguete con pala y volquete funcional.',
                price: 19.99,
                weight: 0.7,
                length: 30,
                image: 'https://http2.mlstatic.com/D_NQ_NP_620259-MLU71043021010_082023-O.webp',
                categories: {
                    connect: [{ id: nenes.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Set de Dinosaurios',
                description: 'Paquete de 6 dinosaurios de goma, colores variados.',
                price: 15.99,
                weight: 0.6,
                length: 20,
                image: 'https://acdn-us.mitiendanube.com/stores/003/673/840/products/d_q_np_868585-mla51466889958_092022-o-eb570f8aa7e42dfac416964273213626-1024-1024.jpgv1663607735',
                categories: {
                    connect: [{ id: nenes.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Pistola de Agua',
                description: 'Pistola de agua de largo alcance, perfecta para el verano.',
                price: 9.99,
                weight: 0.4,
                length: 28,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPRVoGhTtT_HHz9jsZGfDtC9dTmTAnvX5AA&s',
                categories: {
                    connect: [{ id: nenes.id }],
                },
            },
        });

        // Nenas (4)
        await prismaClient.product.create({
            data: {
                name: 'Muñeca con Accesorios',
                description: 'Muñeca con ropa intercambiable, incluye cepillo y bolso.',
                price: 26.99,
                weight: 0.7,
                length: 30,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzSHEoi0u4d70OpXXOiyCE29I59RSCOTQSQ&s',
                categories: {
                    connect: [{ id: nenas.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Set de Té para Niñas',
                description: 'Juego de té de juguete con tazas, platos y tetera.',
                price: 18.99,
                weight: 0.5,
                length: 25,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mm9BSCJzY3eJtWF2DkapzPQKFk2X-ctXmw&s',
                categories: {
                    connect: [{ id: nenas.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Casa de Muñecas',
                description: 'Casa de muñecas de madera con muebles incluidos.',
                price: 39.99,
                weight: 1.5,
                length: 50,
                image: 'https://kinderlandar.vtexassets.com/arquivos/ids/185354/D_NQ_NP_2X_969442-MLA54831034759_042023-F.jpg?v=638270282299770000',
                categories: {
                    connect: [{ id: nenas.id }],
                },
            },
        });

        await prismaClient.product.create({
            data: {
                name: 'Set de Princesa',
                description: 'Corona, varita mágica y vestido para juego de princesa.',
                price: 21.99,
                weight: 0.6,
                length: 35,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB87Nj8z39L2FW2QJsJ4juDdALV3D2fK7K9Q&s',
                categories: {
                    connect: [{ id: nenas.id }],
                },
            },
        });


        return response('ok', 'base de datos sembrada')


    } catch (error) {
        response("error", 'error al sembrar base de datos')
    }

}