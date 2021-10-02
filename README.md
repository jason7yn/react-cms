### login page

click login button

1. post request
   payload:{
   email
   password-->AES encryption
   role
   }
2. handle response
   convert response data to json & save into localStorage,

3. redirect to dashboard page

### dashboard page

side menu -- fixed position

1.  logo
2.  overview -- default
3.  student - sub
4.  teacher - sub
5.  course - sub
6.  Message
7.  button --> side menu collapsed, uncollapsed

header menu -- fixed position

1.  button --> side menu collapsed, uncollapsed
2.  notification button
3.  logout button
    1. hover-->pop up logout button
    2. click pop up button
    3. post logout request with auth headers(bearer token)
    4. if success -- clear localStorage, redirect to home page

content
