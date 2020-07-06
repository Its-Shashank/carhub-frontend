// const API = 'http://localhost:5000/api'
const API = 'https://carhub-backend.herokuapp.com/api'

// user route calls
export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: user
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const login = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const updateUser = (data, userId) => {
    let token = JSON.parse(localStorage.getItem('user')).token
    console.log('hello')
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: data
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getUser = userId => {
    let token = JSON.parse(localStorage.getItem('user')).token
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('user', JSON.stringify(data))
        next()
    }
}

export const signout = next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('user')
        next()

        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(response => console.log(response, 'Signout success'))
        .catch(err => console.log(err+ 'signout eror'))
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    }
    else {
        return false
    }
}

// city route calls
export const getCities = () => {
    return fetch(`${API}/cities`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getCity = cityId => {
    return fetch(`${API}/city/${cityId}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch(err =>console.log(err))
}

export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

// car route calls
export const createNewCar = (car, userId) => {
    let token = JSON.parse(localStorage.getItem('user')).token
    return fetch(`${API}/car/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: car
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getPhoto = (carId) => {
    return fetch(`${API}/car/photo/${carId}`,{
      method:"GET"
    })
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
  }

export const getCar = carId => {
    let token = JSON.parse(localStorage.getItem('user')).token
    return fetch(`${API}/car/${carId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const getAllCars = () => {
    return fetch(`${API}/cars`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const deleteCar = (carId, userId) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    return fetch(`${API}/car/${carId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}