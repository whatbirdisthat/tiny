/*

# main.js
```
Import and execute the tbs initializers
because angular executes after docready
and the tbs data-blah attrs aren't written yet
SO we have to re-init the tbs components
after we've bound their attrs etc to data
```
*/
import hackTbsNg from './hackTbsNg';
hackTbsNg();


import bodyColour from './bodyColour';

bodyColour('#fa903d');
console.log("ASGADSG");
