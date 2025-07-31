export const publicEndpoints = {
  title: 'Public Endpoints',
  description: 'Accessible to all users without authentication',
  accessLevel: 'public',
  subcategories: {
    auth: {
      title: 'Authentication',
      description: 'User login and registration endpoints',
      endpoints: [
        {
          title: 'User Login',
          method: 'POST',
          url: '/login',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/login',
          description: 'Authenticate user and receive access token',
          requiresAuth: false,
          accessLevel: 'public',
          requestBody: {
            username: "admin_user",
            password: "admin123"
          },
          parameters: [],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin_user',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(console.log);`,
          sampleResponse: `{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbl91c2VyIiwidXNlcl9pZCI6MSwicm9sZXMiOlsiQURNSU4iXSwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3NTIzMDYzNjMsImV4cCI6MTc1MjM5Mjc2M30.MxtuTSQt4_fg9b2YGo3vmgmYFN53VD4dT7efUx0Sot0"
}`
        },
        {
          title: 'User Registration',
          method: 'POST',
          url: '/register',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/register',
          description: 'Register a new user account',
          requiresAuth: false,
          accessLevel: 'public',
          requestBody: {
            email: "newuser@example.com",
            password: "password123",
            firstName: "John",
            lastName: "Doe"
          },
          parameters: [],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'newuser@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  })
})
.then(res => res.json())
.then(console.log);`,
          sampleResponse: `{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "GENERAL"
  }
}`
        }
      ]
    },
    recipes: {
      title: 'Free Recipes API',
      description: 'Access free recipes and recipe data',
      endpoints: [
        {
          title: 'Get Free Recipe by ID',
          method: 'GET',
          url: '/recipes',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/recipes',
          description: 'Retrieve a specific free recipe by its ID',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'id', type: 'number', description: 'The ID of the recipe', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/recipes?id=1')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Recipe found",
    "data": {
        "id": 1,
        "name": "Apple Frangipan Tart",
        "category": "Dessert",
        "area": "British",
        "instructions": "Preheat the oven to 200C/180C Fan/Gas.",
        "image": "https://res.cloudinary.com/dmbpesu2z/image/upload/recipes/apple-frangipan-tart.jpg",
        "ingredients": "175g/6oz digestive biscuits. 75g/3oz butter. 200g/7oz Bramley apples. 75g/3oz Salted Butter. 75g/3oz caster sugar. 2 free-range eggs, beaten. 75g/3oz ground almonds. 1 tsp almond extract. 50g/1¾oz flaked almonds.",
        "publishedOn": "2019-04-11",
        "recipedBy": 32,
        "prepareTime": "30 minutes",
        "cookingTime": "23 minutes",
        "yield": "8 servings",
        "shortDescription": "Indulge in the sweet and buttery flavors of this Apple Frangipan Tart, perfect for a crisp autumn evening or as a decadent dessert any time of the year. The combination of crunchy biscuit crust, creamy frangipane filling, and tender apple slices is sure to impress your guests. Serve warm with a dollop of whipped cream or a scoop of vanilla ice cream for an extra-special treat.",
        "accessType": "FREE",
        "comments": [],
        "detailedInstructions": []
    }
}`
        },
        {
          title: 'Get All Free Recipes',
          method: 'GET',
          url: '/recipes',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/recipes',
          description: 'Retrieve all free recipes with pagination',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'page', type: 'number', description: 'The page number (default = 1)', required: false },
            { name: 'size', type: 'number', description: 'The number of records per page (default = 10)', required: false }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/recipes?page=1&size=10')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Free recipes fetched successfully",
    "data": {
        "recipes": [
            {
                "id": 1,
                "name": "Apple Frangipan Tart",
                "category": "Dessert",
                "area": "British",
                "instructions": "Preheat the oven to 200C/180C Fan/Gas 6.Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.",
                "image": "https://res.cloudinary.com/dmbpesu2z/image/upload/recipes/apple-frangipan-tart.jpg",
                "ingredients": "175g/6oz digestive biscuits. 75g/3oz butter. 200g/7oz Bramley apples. 75g/3oz Salted Butter. 75g/3oz caster sugar. 2 free-range eggs, beaten. 75g/3oz ground almonds. 1 tsp almond extract. 50g/1¾oz flaked almonds.",
                "publishedOn": "2019-04-11",
                "recipedBy": 32,
                "prepareTime": "30 minutes",
                "cookingTime": "23 minutes",
                "yield": "8 servings",
                "shortDescription": "Indulge in the sweet and buttery flavors of this Apple Frangipan Tart, perfect for a crisp autumn evening or as a decadent dessert any time of the year. The combination of crunchy biscuit crust, creamy frangipane filling, and tender apple slices is sure to impress your guests. Serve warm with a dollop of whipped cream or a scoop of vanilla ice cream for an extra-special treat.",
                "accessType": "FREE",
                "comments": [],
                "nutrition": {
                    "id": 0,
                    "recipeId": 0
                },
                "detailedInstructions": []
            },
            {...},
            {...},
            {...}
        ],
        "currentPage": 1,
        "totalPages": 154,
        "totalItems": 1540
    }
}`
        },
        {
          title: 'Get Free Recipes by Area',
          method: 'GET',
          url: '/recipes',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/recipes',
          description: 'Retrieve free recipes filtered by area/cuisine',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'page', type: 'number', description: 'The page number (default = 1)', required: false },
            { name: 'size', type: 'number', description: 'The number of records per page (default = 10)', required: false },
            { name: 'area', type: 'string', description: 'The area name (e.g., American, British)', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/recipes?area=American&page=1&size=10')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Free recipes fetched successfully",
    "data": {
        "recipes": [
            {
                "id": 1,
                "name": "Apple Frangipan Tart",
                "category": "Dessert",
                "area": "British",
                "instructions": "Preheat the oven to 200C/180C Fan/Gas 6.Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.",
                "image": "https://res.cloudinary.com/dmbpesu2z/image/upload/recipes/apple-frangipan-tart.jpg",
                "ingredients": "175g/6oz digestive biscuits. 75g/3oz butter. 200g/7oz Bramley apples. 75g/3oz Salted Butter. 75g/3oz caster sugar. 2 free-range eggs, beaten. 75g/3oz ground almonds. 1 tsp almond extract. 50g/1¾oz flaked almonds.",
                "publishedOn": "2019-04-11",
                "recipedBy": 32,
                "prepareTime": "30 minutes",
                "cookingTime": "23 minutes",
                "yield": "8 servings",
                "shortDescription": "Indulge in the sweet and buttery flavors of this Apple Frangipan Tart, perfect for a crisp autumn evening or as a decadent dessert any time of the year. The combination of crunchy biscuit crust, creamy frangipane filling, and tender apple slices is sure to impress your guests. Serve warm with a dollop of whipped cream or a scoop of vanilla ice cream for an extra-special treat.",
                "accessType": "FREE",
                "comments": [],
                "nutrition": {
                    "id": 0,
                    "recipeId": 0
                },
                "detailedInstructions": []
            },
            {...},
            {...},
            {...}
        ],
        "currentPage": 1,
        "totalPages": 154,
        "totalItems": 1540
    }
}`
        },
        {
          title: 'Get Free Recipes by Category',
          method: 'GET',
          url: '/recipes',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/recipes',
          description: 'Retrieve free recipes filtered by category',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'page', type: 'number', description: 'The page number (default = 1)', required: false },
            { name: 'size', type: 'number', description: 'The number of records per page (default = 10)', required: false },
            { name: 'category', type: 'string', description: 'The category name (e.g., Beef, Dessert)', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/recipes?category=Beef&page=1&size=10')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Free recipes fetched successfully",
    "data": {
        "recipes": [
            {
                "id": 1,
                "name": "Apple Frangipan Tart",
                "category": "Dessert",
                "area": "British",
                "instructions": "Preheat the oven to 200C/180C Fan/Gas 6.Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.",
                "image": "https://res.cloudinary.com/dmbpesu2z/image/upload/recipes/apple-frangipan-tart.jpg",
                "ingredients": "175g/6oz digestive biscuits. 75g/3oz butter. 200g/7oz Bramley apples. 75g/3oz Salted Butter. 75g/3oz caster sugar. 2 free-range eggs, beaten. 75g/3oz ground almonds. 1 tsp almond extract. 50g/1¾oz flaked almonds.",
                "publishedOn": "2019-04-11",
                "recipedBy": 32,
                "prepareTime": "30 minutes",
                "cookingTime": "23 minutes",
                "yield": "8 servings",
                "shortDescription": "Indulge in the sweet and buttery flavors of this Apple Frangipan Tart, perfect for a crisp autumn evening or as a decadent dessert any time of the year. The combination of crunchy biscuit crust, creamy frangipane filling, and tender apple slices is sure to impress your guests. Serve warm with a dollop of whipped cream or a scoop of vanilla ice cream for an extra-special treat.",
                "accessType": "FREE",
                "comments": [],
                "nutrition": {
                    "id": 0,
                    "recipeId": 0
                },
                "detailedInstructions": []
            },
            {...},
            {...},
            {...}
        ],
        "currentPage": 1,
        "totalPages": 154,
        "totalItems": 1540
    }
}`
        },
        {
          title: 'Discover Free Recipes',
          method: 'GET',
          url: '/discover/recipes',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/discover/recipes',
          description: 'Search and discover free recipes with multiple filters',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'keyword', type: 'string', description: 'The search keyword', required: false },
            { name: 'category', type: 'string', description: 'The recipe category', required: false },
            { name: 'area', type: 'string', description: 'The recipe area', required: false },
            { name: 'recipedBy', type: 'number', description: "The creator's user ID", required: false },
            { name: 'page', type: 'number', description: 'The page number (default = 1)', required: false },
            { name: 'size', type: 'number', description: 'The number of records per page (default = 10)', required: false }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/discover/recipes?keyword=chicken&category=Miscellaneous&page=1&size=10')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Free recipes fetched successfully",
    "data": {
        "recipes": [
            {
                "id": 1,
                "name": "Apple Frangipan Tart",
                "category": "Dessert",
                "area": "British",
                "instructions": "Preheat the oven to 200C/180C Fan/Gas 6.Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs. Melt the butter in a small pan, then add the biscuit crumbs and stir until coated with butter. Tip into the tart tin and, using the back of a spoon, press over the base and sides of the tin to give an even layer. Chill in the fridge while you make the filling.",
                "image": "https://res.cloudinary.com/dmbpesu2z/image/upload/recipes/apple-frangipan-tart.jpg",
                "ingredients": "175g/6oz digestive biscuits. 75g/3oz butter. 200g/7oz Bramley apples. 75g/3oz Salted Butter. 75g/3oz caster sugar. 2 free-range eggs, beaten. 75g/3oz ground almonds. 1 tsp almond extract. 50g/1¾oz flaked almonds.",
                "publishedOn": "2019-04-11",
                "recipedBy": 32,
                "prepareTime": "30 minutes",
                "cookingTime": "23 minutes",
                "yield": "8 servings",
                "shortDescription": "Indulge in the sweet and buttery flavors of this Apple Frangipan Tart, perfect for a crisp autumn evening or as a decadent dessert any time of the year. The combination of crunchy biscuit crust, creamy frangipane filling, and tender apple slices is sure to impress your guests. Serve warm with a dollop of whipped cream or a scoop of vanilla ice cream for an extra-special treat.",
                "accessType": "FREE",
                "comments": [],
                "nutrition": {
                    "id": 0,
                    "recipeId": 0
                },
                "detailedInstructions": []
            },
            {...},
            {...},
            {...}
        ],
        "currentPage": 1,
        "totalPages": 154,
        "totalItems": 1540
    }
}`
        }
      ]
    },
    contests: {
      title: 'Contests API',
      description: 'Access public contest information',
      endpoints: [
        {
          title: 'Get All Contests',
          method: 'GET',
          url: '/contests',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/contests',
          description: 'Retrieve all available contests',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/contests')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "All contests fetched",
    "data": [
        {
            "id": 1,
            "articleBody": "TASTE OF HOMEOur staff is busy with work and can&#8217;t wait for lunch! We&#8217;re looking for your quick and easy favorites to sustain us through the rest of the day.Tell us about your go-to recipe, including chicken wraps, change-of-pace pinwheels, Mediterranean salads and fun, new takes on lunchtime classics that kids can?t get enough of.Do you have a healthy noon meal you rely on? Maybe you amp up the flavors of a grab-and-go convenience item. Share the details with us!Submit your recipe between March 1 and May 31, 2025.What We?re Looking ForSandwiches, salads, bowls or anything you&#8217;d eat for lunchHot, cold or make-ahead optionsGrown-up meals or lunch box ideas for the kidsGet Inspired by Our Lunch RecipesDAN ROBERTS FOR TASTE OF HOME46 Sandwich Recipes That Aren&#039;t PB&amp;J44 of Our Best Cold Lunch IdeasTaste of Home35 Make-Ahead Lunch RecipesThe PrizesThree talented home cooks will have the chance to win:1st prize: $5002nd prize: $3003rd prize: $150How to EnterSubmit your recipe between March 1 and May 31, 2025.Submit Your RecipeLooking for the Everything Eggs recipe contest we teased in our Winter issue? With the current price of eggs, we decided this isn?t the best time for this contest. So, get creative and show off your favorite lunches instead!",
            "headline": "'Let's Do Lunch' Recipe Contest Announcement",
            "description": "Who's ready for lunch? Show off your favorite lunch recipes for the chance to win $500.",
            "datePublished": "2025-03-01",
            "dateModified": "2025-03-01",
            "accessRole": "GENERAL",
            "contestImages": [
                {
                    "id": 1,
                    "contestId": 1,
                    "imagePath": "https://res.cloudinary.com/dmbpesu2z/image/upload/contests/Lets_Do_Lunch_Recipe_Contest_Announcement_1.jpg"
                },
                {
                    "id": 2,
                    "contestId": 1,
                    "imagePath": "https://res.cloudinary.com/dmbpesu2z/image/upload/contests/Lets_Do_Lunch_Recipe_Contest_Announcement_2.jpg"
                }
            ],
            "isFree": true,
            "isClosed": false
        },
        {...},
        {...},
        {...}
    ]
}`
        },
        {
          title: 'Get Contest by ID',
          method: 'GET',
          url: '/contests',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/contests',
          description: 'Retrieve a specific contest by its ID',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'id', type: 'number', description: 'The ID of the contest', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/contests?id=1')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Contest fetched successfully",
    "data": {
        "id": 4,
        "articleBody": "Grand Prize: Chicken &amp; Green Chile Stuffed Shells3 ReviewsContest WinnerTest Kitchen ApprovedTotal Time1 hour 15 minServings12 servingsGo to RecipeFrom the Recipe Creator:For a family potluck, I was told to bring a pasta casserole. For these events, I usually make a lasagna. To switch things up, I modified my family&rsquo;s favorite chicken chile lasagna into a stuffed shells dish. The creamy, cheesy recipe is now the new favorite! &acirc;&#128;&#148;Donna Gribbins, Shelbyville, KentuckyNutrition Facts:3 stuffed shells: 501 calories, 32g fat (18g saturated fat), 117mg cholesterol, 872mg sodium, 27g carbohydrate (3g sugars, 2g fiber), 26g protein. Diabetic Exchanges: 2 starch.",
        "headline": "Our Make Take Recipe Contest",
        "description": "Home cooks shared their favorite dish to pass that they rely on for potlucks, get-togethers and bake sales. The best crowd-pleasing dishes in this list range from casseroles to cakes.&nbsp;",
        "datePublished": "2024-11-11",
        "dateModified": "2024-11-11",
        "accessRole": "SUBSCRIBER",
        "contestImages": [
            {
                "id": 7,
                "contestId": 4,
                "imagePath": "https://res.cloudinary.com/dmbpesu2z/image/upload/contests/Our_Make_Take_Recipe_Contest_1.jpg"
            },
            {
                "id": 8,
                "contestId": 4,
                "imagePath": "https://res.cloudinary.com/dmbpesu2z/image/upload/contests/Our_Make_Take_Recipe_Contest_2.jpg"
            }
        ],
        "isFree": true,
        "isClosed": true
    }
}`
        }
      ]
    },
    areas: {
      title: 'Areas API',
      description: 'Access cuisine areas and regions',
      endpoints: [
        {
          title: 'Get All Areas',
          method: 'GET',
          url: '/areas',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/areas',
          description: 'Retrieve all available cuisine areas/regions',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/areas')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "All areas fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "American"
        },
        {
            "id": 2,
            "name": "British"
        },
        {
            "id": 3,
            "name": "Canadian"
        }
        {...},
        {...},
        {...}
    ]
}`
        },
        {
          title: 'Get Area by ID',
          method: 'GET',
          url: '/areas',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/areas',
          description: 'Retrieve a specific area by its ID',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'id', type: 'number', description: 'The ID of the area', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/areas?id=1')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Area fetched successfully",
    "data": {
        "id": 1,
        "name": "American"
    }
}`
        },
        {
          title: 'Get Area by Name',
          method: 'GET',
          url: '/areas',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/areas',
          description: 'Retrieve area by name',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'name', type: 'string', description: 'Area name', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/areas?name=British')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Area fetched successfully",
    "data": {
        "id": 2,
        "name": "British"
    }
}`
        }
      ]
    },
    categories: {
      title: 'Categories API',
      description: 'Access recipe categories and types',
      endpoints: [
        {
          title: 'Get All Categories',
          method: 'GET',
          url: '/categories',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/categories',
          description: 'Retrieve all available recipe categories',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/categories')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "All categories fetched successfully",
    "data": [
        {
            "id": 1,
            "name": "Beef",
            "path": "https://res.cloudinary.com/dmbpesu2z/image/upload/categories/beef.png"
        },
        {
            "id": 2,
            "name": "Breakfast",
            "path": "https://res.cloudinary.com/dmbpesu2z/image/upload/categories/breakfast.png"
        },
        {
            "id": 3,
            "name": "Chicken",
            "path": "https://res.cloudinary.com/dmbpesu2z/image/upload/categories/chicken.png"
        }
        {...},
        {...},
        {...}
    ]
}`
        },
        {
          title: 'Get Category by ID',
          method: 'GET',
          url: '/categories',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/categories',
          description: 'Retrieve a specific category by its ID',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'id', type: 'number', description: 'The ID of the category', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/categories?id=1')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
    "success": true,
    "status": 200,
    "message": "Category fetched successfully",
    "data": {
        "id": 1,
        "name": "Beef",
        "path": "https://res.cloudinary.com/dmbpesu2z/image/upload/categories/beef.png"
    }
}`
        },
        {
          title: 'Get Category by Name',
          method: 'GET',
          url: '/categories',
          endpoint: 'https://jamesthewwebapi.onrender.com/api/categories',
          description: 'Retrieve category by name',
          requiresAuth: false,
          accessLevel: 'public',
          parameters: [
            { name: 'name', type: 'string', description: 'Category name', required: true }
          ],
          sampleRequest: `fetch('https://jamesthewwebapi.onrender.com/api/categories?name=Beef')
  .then(res => res.json())
  .then(console.log);`,
          sampleResponse: `{
  "success": true,
  "status": 200,
  "message": "Category fetched successfully",
  "data": {
    "id": 1,
    "name": "Beef",
    "path": "https://res.cloudinary.com/dmbpesu2z/image/upload/categories/beef.png"
  }
}`
        }
      ]
    }
  }
};
