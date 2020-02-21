# TapTap-Server

# Add Player
    Make a new username to play game.

* **URL**

  http://localhost:3000/addPlayer

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    { "username" : "adin" }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```


***

# Player to join room
    player joins to room to play game.

* **URL**

  http://localhost:3000/join

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
* **Data headers**
    roomid : integer 

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 20 <br />
    **Content:** 
    ```javascript
    [
      1
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { 
        "msg" : 'bad request',,
        "error" : "is undefined"
    }
    ```

  OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***
# Player leave from room
    Player leave to room and remove RoomId.

* **URL**

  http://localhost:3000/leave

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    [
      1
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```javascript
    { 
        "msg" : 'bad request', 
        "errors" : ["Title is not empty"]
    }
    ```

  OR
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***

# Delete Player
    Delete Player.

* **URL**

  http://localhost:3000/delete/player

* **Method:**

  `DELETE`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      1
    ]
    ```
 
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```


***

# Add Room
    Make a new room master.

* **URL**

  http://localhost:3000/addRoom

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
* **Headers**
    username : string   

* **Data Params**

    RoomName : string,   

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```javascript
    [
      1
    ]
    ```
 
* **Error Response:**
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***

# Delete Room
    delete room by user.

* **URL**

  http://localhost:3000/delete

* **Method:**

  `DELETE`
  
*  **URL Params**


   **Required:**
 
* **Headers**
    idRoom :integer,   

* **Data Params**
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    { "message" : "Yeaay" }

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***
# Find All Room
    To show all room in database.

* **URL**

  http://localhost:3000/allRoom

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   

* **Data Params**
 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [{
      RoomName : 'BetaFox',
      RoomMaster : 'Ipul'
    }]
    ```
 
* **Error Response:**
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```

***
# Find One Room
    To show room master after create room.

* **URL**

  http://localhost:3000/findOne

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
* **Headers**
  RoomName : string   

* **Data Params**

    username : string,   

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    {
      RoomName : 'BetaFox',
      RoomMaster : 'Ipul'
    }
   
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```javascript
    { "msg" : "Internal Server Error" }
    ```