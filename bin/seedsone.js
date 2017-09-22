const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const Vendor  = require("../models/vendor");
const Dish = require("../models/vendor");

const initialVendorData = [{
        email     : "maria@gmail.com",
        password  : "lopez",
        name      : "La cocina de Maria",
        location  : { type : "Point", 
                      coordinates: [2.189792, 41.390627]
                    },
        cuisine   : "spanish",
        capacity  : 20,
        dish      : {
                     dishName      : "Paella",
                     dishQuantity  : 20,
                     dishPrice     : 9,   
                    }
               
    
    },
    {
        email      : "alessandro@gmail.com",
        password   : "cerri",
        name       : "Il Cuoco Italiano",
        location   : { type : "Point", 
                      coordinates: [2.162541, 41.387037]
                     },
        cuisine    : "italian",
        capacity   : 9,
        dish      : {
                      dishName    : "Pizza",
                      dishQuantity : 9,
                      dishPrice     : 5,   
                    }
    },
    {
        email       : "nicola@gmail.com",
        password    : "daddabo",
        name        : "Dal Paino",
        location    : { type : "Point", 
                      coordinates: [2.165517, 41.368959]
                      },        
        cuisine     : "italian",
        capacity    : 12,
        dish      :   {
                        dishName    : "Lasagna alla Bolognese",
                        dishQuantity : 12,
                        dishPrice     : 5,   
                      }
                    

    },
    {
        email       : "alberto@live.com",
        password    : "piccioli",
        name        : "Alberto Cucina",
        location    : { type : "Point", 
                      coordinates: [2.121814, 41.392153]
                      }, 
        cuisine     : "italian",
        capacity    : 4,
        dish        :{
                      dishName     : "Cotoletta alla milanese",
                      dishQuantity : 4,
                      dishPrice    : 5,   
                        }
    },
    {
        email       : "riccardo@gmail.com",
        password    : "conti",
        name        : "La Vecchio Fico",
        location    : { type : "Point", 
                      coordinates: [2.171749, 41.397647]
                      }, 
        cuisine     : "italian",
        capacity    : 10,
        dish      : {
                            dishName     : "Pasta alla Carbonara",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "camila@ccc.com",
        password    : "castellano",
        name        : "Cocinera",
        location    : { type : "Point", 
                      coordinates: [2.170578, 41.390958]
                      }, 
        cuisine     : "spanish",
        capacity    : 5,
        dish      : {
                            dishName     : "Tortilla de Patatas",
                            dishQuantity : 5,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "gregory@byrne.at",
        password    : "Friedman",
        name        : "Burguesa",
        location    : { type : "Point", 
                      coordinates: [2.173521, 41.380698]
                      }, 
        cuisine     : "american",
        capacity    : 4,
        dish      : 
                        {
                            dishName     : "Hamburgers",
                            dishQuantity : 4,
                            dishPrice    : 5,   
                        }
    }, 
    {
        email       : "joyce@heller.do",
        password    : "Oakley",
        name        : "New York Vibes",
        location    : { type : "Point", 
                      coordinates: [2.178880, 41.381546]
                      },
        cuisine     : "american",
        capacity    : 10,
        dish        : {
                        dishName     : "BBB - Best Burgers in Barcelona",
                        dishQuantity : 10,
                        dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "desai",
        name        : "Tapass",
        location    : { type : "Point", 
                      coordinates: [2.179882, 41.378736]
                      },
        cuisine     : "spanish",
        capacity    : 20,
        dish        : {
                            dishName     : "Tapas",
                            dishQuantity : 20,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "mans",
        name        : "Bocadilly",
        location    : { type : "Point", 
                      coordinates: [2.194064, 41.396587]
                      },
        cuisine     : "spanish",
        capacity    : 10,
        dish      :  {
                            dishName     : "Bocadillos",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "sensai",
        name        : "Temakinhos Fusion",
        location    : { type : "Point", 
                      coordinates: [2.191371, 41.401424]
                      },
        cuisine     : "international",
        capacity    : 13,
        dish        : {
                            dishName     : "Temakis Fantasy",
                            dishQuantity : 13,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "sushi",
        name        : "Sushi Love",
        location    : { type : "Point", 
                      coordinates: [2.183155, 41.409232]
                      },
        cuisine     : "international",
        capacity    : 20,
        dish        : {
                            dishName     : "Nigiri Passion",
                            dishQuantity : 20,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "vegan",
        name        : "Vegan Dreams",
        location    : { type : "Point", 
                      coordinates: [2.175685, 41.412195]
                      },
        cuisine     : "healthy",
        capacity    : 10,
        dish        : {
                            dishName     : "Vegan Bowls",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "avo",
        name        : "Avocados",
        location    : { type : "Point", 
                      coordinates: [2.170339, 41.411013]
                      },
        cuisine     : "healthy",
        capacity    : 14,
        dish        : {
                            dishName     : "Avocado Bruschettas",
                            dishQuantity : 14,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "tofu",
        name        : "Viaje Tofu",
        location    : { type : "Point", 
                      coordinates: [2.143265, 41.405191]
                      },
        cuisine     : "healthy",
        capacity    : 6,
        dish        : {
                            dishName     : "Tofu Burgers",
                            dishQuantity : 6,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "juice",
        name        : "Juice Bar",
        location    : { type : "Point", 
                      coordinates: [2.155942, 41.428766]
                      },
        cuisine     : "healthy",
        capacity    : 20,
        dish        : {
                            dishName     : "Juicy Smoothies",
                            dishQuantity : 20,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "greek",
        name        : "Greek Saladz",
        location    : { type : "Point", 
                      coordinates: [2.150759, 41.408962]
                      },
        cuisine     : "greek",
        capacity    : 12,
        dish        : {
                            dishName     : "Greek Salads",
                            dishQuantity : 12,
                            dishPrice    : 5,   
                        }
    }, 
    {
        email       : "allen@rao.gp",
        password    : "dakos",
        name        : "Dakoss",
        location    : { type : "Point", 
                      coordinates: [2.159455, 41.384773]
                      },
        cuisine     : "greek",
        capacity    : 5,
        dish        : {
                            dishName     : "Dakos",
                            dishQuantity : 5,
                            dishPrice    : 5,   
                        }
    }, 
    {
        email       : "allen@rao.gp",
        password    : "calamares",
        name        : "Fried Heaven",
        location    : { type : "Point", 
                      coordinates: [2.202024, 41.426658]
                      },
        cuisine     : "greek",
        capacity    : 10,
        dish        : {
                            dishName     : "Calamares Fritos",
                            dishQuantity : 10,
                            dishPrice    : 5,   
                        }
    },
    {
        email       : "allen@rao.gp",
        password    : "gracia",
        name        : "Grecia",
        location    : { type : "Point", 
                      coordinates: [2.215011, 41.410157]
                      },
        cuisine     : "greek",
        capacity    : 6,
        dish        : {
                            dishName     : "Original Tzatziki Bar",
                            dishQuantity : 6,
                            dishPrice    : 5,   
                        }
    } 
];


Vendor.create(initialVendorData, (err, docs) => {
    if(err){
        throw err;
    }
    docs.forEach((element) => {
        console.log(element);
    })
    mongoose.connection.close();
})