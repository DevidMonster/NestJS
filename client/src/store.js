import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./services/post.service";
import productReducer from "./services/product.service";
import commentReducer from "./services/comment.service";
import authReducer from "./services/auth.service";
import userReducer from "./services/user.service";
import orderReducer from "./services/order.service";
import cateReducer from "./services/category.service";
import cartReducer from "./services/cart.service";
import authSlice from "./slices/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    authReducer: authSlice,
    [postReducer.reducerPath]: postReducer.reducer,
    [authReducer.reducerPath]: authReducer.reducer,
    [userReducer.reducerPath]: userReducer.reducer,
    [commentReducer.reducerPath]: commentReducer.reducer,
    [productReducer.reducerPath]: productReducer.reducer,
    [orderReducer.reducerPath]: orderReducer.reducer,
    [cartReducer.reducerPath]: cartReducer.reducer,
    [cateReducer.reducerPath]: cateReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postReducer.middleware,
      commentReducer.middleware,
      productReducer.middleware,
      authReducer.middleware,
      userReducer.middleware,
      cateReducer.middleware,
      cartReducer.middleware,
      orderReducer.middleware,
    ]),
});


setupListeners(store.dispatch)


export default store;
