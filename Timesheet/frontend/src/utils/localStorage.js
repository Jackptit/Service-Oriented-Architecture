
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}

export const removeAccessToken = () => {
  return localStorage.removeItem('accessToken')
}

export const setAccessToken = (newToken) => {
  return localStorage.setItem('accessToken', newToken);
}

export const getUser = () => {
  const user = localStorage.getItem("user") || {
    id: 6, 
    email: "theuser@gmail.com", 
    password: "12345678", 
    name: "Trần Thanh Thế 1", 
    type: "user", 
    salary: 5000000, 
    avatar: "https://bootdey.com/img/Content/avatar/avatar1.png"
  }
  return JSON.parse(user);
}

export const removeUser = () => {
  return localStorage.removeItem('user')
}

export const setUser = (newUser) => {
  return localStorage.setItem('user', JSON.stringify(newUser));
}
