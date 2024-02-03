# RestApiTest_StudentDetails

Node_js
Express_js
Mongodb
postman



## hosturl:https://restapitest111.cyclic.app

# routes: 
     /users 
     /users/details
     
# http Methods supported:
    GET
    POST
    PATCH
    DELETE


# *how to use*:

# 1)For /users/details
    
    i)"get" request
      *API*=```hosturl/users/details```
       This will give detailed information including images or files of all users.

    ii) "get by id" request

        *API*= ```hosturl/users/details/id```
        This will give detailed information/images/files of user, of particular id.

    iii) "post" request
      
         *API*=```hosturl/users/details```
         *(Exact,Specified field name should be used while posting data, below are the field names)*

         name                              (required)
         DateOfBirth                       (required) 
         gender                            (required)
         registernumber                    (required)
         email                             (required)
         course                            (required)
         branch                            (required)
         Currentyear                       (required)
         courseDuration                    (required)
         userImage_or_anyFile   

        *(In _postman_ ,if you are posting data along with image/file then in body section choose "form-data" option.*
            *else if you are posting only data with image/file then in body section, you can choose "form-data" or "raw(json type)*
         )*


       iv) "patch" request
           *API*=```hosturl/users/details/id```
            This will update the details of user of particular id.
          *(Note: use updating field name, as specified above in POST request)*


       V)"delete" request
         *API*=```hosturl/users/details/id```
          This will delete the user and it's details/info of particular user id.


# 2)For /users

     i) "get" request

        *API*=```hosturl/users```
         This will give data of all users.
        *(short detail of all user.
          Only
           *name*
           *email*
         Will be displayed)*

     ii) "get by id" request

         *API*=```hosturl/users/id```
         This will give user of particular id (short)

# Note:
>>>> ## *_Use "Postman" for better experience_*
>>>> ## *_install "json formatter" extension for better viewing experience in browser_*
