# Backend Application using NodeJS and ExpressJS for CRUD APIs Implementations
  
  Session : 1. Project Structure

  Session : 2. MongoDB Connection to Application

  Session : 3. Standardize Response & Error

  Session : 4. HealthCheck Logics [ Controllers, Routes ]

  Session : 5. Develop the Models [ Post, User ]

  Session : 6. Implement Post APIs
                          
                          1. Create Post

                          2. Get All Post / Get One Post

                          3. Update Post

                          4. Delete Post

  Session : 7. Configure the Error Middleware

  Session : 8. Authentication & Authorization 
                         
                         User Model [ user.models.js ]
                                  - user schema
                                  - middlewares
                         User Controller [ user.controllers.js ]
                                  - registerUser [Register]
                                  - loginUser [SignIn]
                                  - getUser [Profile]
                                  - changeUserPassword [updatePassword]
                                  - logoutUser [logout]
                          Authentication [ authentication.middlewares.js ]
                                  - authentication [middleware]
                          User Validation [ user.validators.js ] [https://zod.dev/] [https://joi.dev/api/?v=17.13.3]
                                  - signupSchema 
                                  - signinSchema
                         User Routes [ user.routes.js ]
                                - login route [ post ]  - "/api/v1/users/login"
                                - register route [ post ] - "/api/v1/users/signup"
                                - profile route [ get ] - "/api/v1/users/profile"
                                - change password route [put] - "/api/v1/users/change-password"
                                - logout route [delete] - "/api/v1/users/logout"
                                  



