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

children components

### Studnet List Page

1. add new student button
   1. - Add blue color
        Actions
   - click -> popup modal contains a form
     popup modal
   - 2 input fields
   - 2 drop downs
   - add button
   - cancel button
2. search bar
   2.1 input element - hover border color blue - placeholder - Search by name
   2.2 search button - hover border color blue

3. Table

   - table head

     1. No
        string(unclickable) - 1,2,3,4
     2. Name(clickable)

        - up&down arrow icon
        - hover: popup box 'Click to sort Ascending'

        Actions

        - click 1 -> sort name from A - Z
          -> hover: popup box 'Click to sort Descending'
          -> up arrow icon highlighted

        - click 2
          - sort name from Z - A
          - hover: popup box 'Click to cancel sorting'
          - down arrow highlighted
        - click 3
          - popup box 'Click to sort Ascending'
          - cancel arrow highlight

   3. Area
      string(Area)
      icon(dropdown menu)

      - 4 checkbox
      - reset button(disabled when unselect)
      - ok button

      Actions

      - click icon - dropdown menu popup
      - select checkbox - enable reset button(color from grey to blue)
      - unselect checkbox - disable reset button (from blue to grey)
      - click ok button - show data by selected area, dropdown menu disappear

   4. Email(Unclickable)
   5. Selected Curriculum(unclickable)
   6. Student type
      string(student type)
      icon (dropdown menu)
      - 2 checkbox
      - reset button
      - ok button
   7. Join time(unclickable)
   8. Action

activity = {
type:edit or add
visibility: true
record:record
counter:count
}
