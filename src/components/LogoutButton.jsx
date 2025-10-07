import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function LogoutButton() {


    const navigator = useNavigate()


  function handleLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, Stay Here',
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicked "Yes"
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: 'Logged Out',
              text: 'You have successfully logged out.',
              icon: 'success',
              confirmButtonText: 'Okay',
            }).then(() => {
                navigator('/')
              
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: `Something went wrong: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'Try Again',
            });
          });
      }
    });
  }


  return (
    <div className='flex justify-end'>
      
      <button onClick={handleLogout}
      className="bg-red-400 hover:bg-red-600 rounded p-[6px] ml-6">
      LogOut
    </button>

    </div>
  );
}





export default LogoutButton;