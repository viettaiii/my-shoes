import axios from 'axios';
import {URL} from '../urlApi'
export const  handleSubmit =  async (e) => {
    e.preventDefault();
    let elementWrapper ;
    if(e.target.classList.contains('btn-sign-in')) {
      elementWrapper = document.querySelector('.login');
    }else{
      elementWrapper = document.querySelector('.sign-up');
    }
    var check = false ;
      const form = elementWrapper.querySelector('.form-sign-up');
      const inputAll = form.querySelectorAll('input');
      inputAll.forEach(input => {
          if(checkValid(input) === true) {
            check  = checkValid(input);
          }
      })
      if(!check) {
        var email  = inputAll[0].value;
        var password  = inputAll[1].value;
            if(e.target.classList.contains('btn-sign-in')) {
                  const res = await axios.post(`${URL}/api/user/login`, {
                    email:email,
                    password:password
                  })
                  if(res.status === 203) {
                    return false;
                  }
                  if(res.data.token) {
                    console.log("dsdas");
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('role', res.data.role);
                    return true;
                  }else{
                    console.log(res);
                    return false;
                  }
                  
            }else{
            
                try {
                  const res =  await axios.post(`${URL}/api/user` , {
                    email:email,
                    password:password
                   })
                  //  console.log(res.status);
                   if(res.data.message === 'User already exists'){
                      let parentInput = findParentElement(inputAll[0],'form-wrapper');
                       addInvalid(parentInput , "Email already exists");
                       return false;
                   }else{
                    inputAll.forEach(input => {
                      input.value = "";
                  })
                     return true;
                   }
                }catch(err) {
                  console.log("Error" , err);
                }
            }
      }
      return undefined;
  }
  const findParentElement = (child , parent) => {
    while(!(child.parentElement.classList.contains(parent))) {
       child = child.parentElement;
    }
    return child.parentElement;
};
const  removeInvalid = (parentInput) => {
 parentInput.classList.remove('invalid');
 parentInput.querySelector('.form-message').innerText ="";
};

 const addInvalid = (parentInput , message) => {
 parentInput.classList.add('invalid');
 parentInput.querySelector('.form-message').innerText =message;
};

const checkValid = (element) => {
 var min = 6 ,max = 100;
 let value = element.value.trim();
   let parentInput = findParentElement(element,'form-wrapper');
 switch(element.getAttribute('name')) {
   case "email":
     const re =
     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(re.test(value)) {
       removeInvalid(parentInput)
      }else{
       addInvalid(parentInput,"Trường này phải là email!");
       return true;
       }
   break;
   case "password":
       if(value && value.length >= min && value.length  <= max ) {
         removeInvalid(parentInput)
       }else{
         addInvalid(parentInput,`Mật khẩu phải hơn ${min} kí tự`);
         return true;
       }
     ;break;
     case "confirmation-password":
       var passwordOne = document.querySelector('input[name="password"').value.trim();
       if(passwordOne === ""){
         addInvalid(parentInput,`Mật khẩu chưa trùng khớp!`);
         return ;
       }
       if(passwordOne === value) {
         removeInvalid(parentInput)
       }else{
         addInvalid(parentInput,`Mật khẩu chưa trùng khớp!`);
         return true;
       }
       ;break;
       default: break;
 }
}

export const handleBlur =  e => {
   checkValid(e.target)
}

export const handleChange = (e) => {
 let parentInput = findParentElement(e.target,'form-wrapper');
    removeInvalid(parentInput);
}




