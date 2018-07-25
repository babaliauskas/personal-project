import React from 'react';

import swal from 'sweetalert2';

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

export default class Support extends React.Component {
    
      render() { 
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        
        toast({
          type: 'success',
          title: 'Signed in successfully'
        })
        return (
          <div>
            
              
          </div>
        )
      }
}