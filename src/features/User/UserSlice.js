import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const InitState =  {
    name: "",
    email: "",
    password: "",
    birthdate: "",
    mobile: "",
    id: "",
    fav:[],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  }

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async ({ name, email, password, birthdate, mobile, id }, thunkAPI) => {
      try {
        const response = await fetch(
          "/users/register",
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              password,
              birthdate,
              mobile,
              id
            }),
          }
        )
        const text = await response.text()
        const data = JSON.parse(text);
        if (data.status  === 200) {
            console.log('im here');
          localStorage.setItem("token", data.token)
          
          return { ...data, name: name, email: email }
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      } catch (e) {
        console.log("Error", e.response.data)
        return thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )

  export const loginUser = createAsyncThunk(
    "users/login",
    async ({ email, password }, thunkAPI) => {
      try {
        const response = await fetch(
          "/users/authenticate",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        )
        const text = await response.text()
        const data = JSON.parse(text);
        if (data.status === 200) {
          localStorage.setItem("token", data.token)
          console.log(data);
          return data
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      } catch (e) {
        console.log("Error", e.response.data)
        thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )


export const userSlice = createSlice({
  name: "user",
  initialState:InitState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    addToFav: (state, action) => {
        const newFav = [...state.fav,action.payload]
        state.fav = newFav
        return state
    },
    removeFromFav: (state, action) => {
        const newFav = state.fav.filter(item => item.title !== action.payload)
        console.log(newFav);
        state.fav = newFav
        return state
    },
    removeUser: (state) => {
        state = InitState
        return state
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.name = payload.name;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState, addToFav, removeFromFav, removeUser } = userSlice.actions;

export const userSelector = (state) => state.user;
