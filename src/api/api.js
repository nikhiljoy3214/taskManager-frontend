import axios from "axios";

// USERR AUTENCATION
export const sendUserAuthRequest = async (data) => {
    const res = await axios.post('user/login', {
        email: data.email,
        password: data.password
      }).catch((err) => {
        console.log(err);
        return { status: 500, data: { message: "Unexpected Error Occurred" } };
      });
      
      if (res && (res.status !== 200 && res.status !== 201)) {
        console.log("Unexpected Error Occurred");
      }
      
      console.log(res); 
      
      const resData = res ? res.data : {};
      return resData;
    }

// User Signup
    export const userSignUp = async (data) => {
        const res = await axios.post('user/signup', {
            name:data.name,
            email: data.email,
            password: data.password
          }).catch((err) => {
            console.log(err);
            return { status: 500, data: { message: "Unexpected Error Occurred" } };
          });
          
          if (res && (res.status !== 200 && res.status !== 201)) {
            console.log("Unexpected Error Occurred");
          }
          
          console.log(res); 
          
          const resData = res ? res.data : {};
          return resData;
        }

