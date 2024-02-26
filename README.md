# Redux

# List Konten

    - [`Prinsip Redux`](#prinsip-redux)
         - [`State`](#mengubah-state-hanya-dapat-dilakukan-dengan-men---dispatch-sebuah-action)

# Redux

## 3 Konsep Utama Redux

1. `store` tempat menampung semua state dari aplikasi.
2. `action` deskripsi tentang apa yang terjadi di dalam aplikasi.
3. `reducer` yang menangani action dan yang memutuskan cara untuk mengupdate store

## Analogi

Sebuah toko suplemen yang mempunyai:

1. Toko => tempat menampung semua produk
   - Store
2. Orderan Susu Whey Masuk => yang terjadi
   - Action
3. Penjaga Toko => yang menangani apa yang terjadi di toko dan yang melakukan apa yang ditugaskan. Seperti cek stok , bungkus dll
   - Reducer

## Prinsip Redux

### Global state di simpan dalam bentuk object

Contoh toko punya 10 stok creatine:

```js
{
  stokCreatine: 10;
}
```

### Mengubah state hanya dapat dilakukan dengan men - dispatch sebuah action

Kita harus memberi tau redux tentang apa yang terjadi dengan sebuah action untuk mengubah state. State hanya readonly!
Tidak dapat mengupdate state secara langsung. Analoginya ketika mau order harus scan QR Code , dimana QR tsb memberi tau toko apa yang kamu mau. Toko hanya bisa tau dengan membaca QR.
Object Action biasanya memiliki 2 props. Type dan Payload. Payload biasanya diisi dengan value param Action Creator (Baca section Action Creator)

```js
{
  type: `CREATINE_ORDERED`,
  payload : 1 // Atau isi dengan param dari action creator.
}
```

### Untuk mengupdate store kita buat sebuah reducers

Reducer merupakan function yang menerima 2 param yg dimana :

- previousState
- action
  Kemudian menreturn state baru.

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATINE_ORDERED:
      return {
        ...state,
        stokCreatine: state.stokCreatine - 1,
      };
  }
};
```

### Redux Store

Mempunyai tanggung jawab untuk :

- Menampung state aplikasi javascript kita. (1)
- Memberi akses untuk mengakses state via `getState()` (2)
- Memberi akses untuk update state via `dispatch(action)` (3)
- Memberi akses untuk mendaftarkan listeners via `subscribe(listener)` (4)
- Menghandle unregistering listeners via function yang direturn oleh `subscribe(listener)` (4)

### Action Creator

Merupakan function yang mereturn Action (object).

```js
function orderCreatine(qty = 1) {
  return {
    type: CREATINE_ORDERED,
    payload: qty,
  };
}
```

## Multiple Reducer

Agar mempermudah kita debug , kita pecah reducers menjadi kecil2. Seperti 1 untuk jualan suplement dan 1 untuk jualan makanan sehat.

1.  Memecah State

    ```js
    const initialCreatineState = {
      stokCreatine: 10,
    };
    const initialDadaAyamState = {
      stokDadaAyam: 20,
    };
    ```

2.  Memecah Reducer

    ```js
    const creatineReducer = (state = initialCreatineState, action) => {
      switch (action.type) {
        case CREATINE_ORDERED:
          return {
            ...state,
            stokCreatine: state.stokCreatine - action.payload,
          };
        case CREATINE_RESTOCKED:
          return {
            ...state,
            stokCreatine: state.stokCreatine + action.payload,
          };
        // Default kita menreturn kembali state
        default:
          return state;
      }
    };
    const dadaAyamReducer = (state = initialDadaAyamState, action) => {
      switch (action.type) {
        case DADA_AYAM_ORDERED:
          return {
            ...state,
            stokDadaAyam: state.stokDadaAyam - action.payload,
          };
        case DADA_AYAM_RESTOCKED:
          return {
            ...state,
            stokDadaAyam: state.stokDadaAyam + action.payload,
          };
        // Default kita menreturn kembali state
        default:
          return state;
      }
    };
    ```

```

3. Combine Reducer menggunakan `combineReducer` function dari Redux
   Function ini menerima object dgn key dan valuenya merupakan reducers kita.
```

    ```js
    const rootReducer = combineReducers({
    creatine: creatineReducer,
    dadaAyam: dadaAyamReducer,
    });
    ```

## Immer

Libary yang memudahkan untuk mengupdate nested-state. Contoh kita sedang mau mengupdate state ini :

```js
const initialState = {
  name: "Filbert",
  address: {
    street: "BSD Raya Boulevard",
    city: "Tangerang",
    state: "Banten",
  },
};
```

Biasanya di dalam Reducer kita, kita akan menulis kode seperti ini :

```js
case UPDATE_STREET :
    return {
        ...state,
        address: {
            ...state.address,
            street : action.payload
        }
    }
```

Agar memudahkan , kita menggunakan immer!

- Install Immer
  `npm i immer`

- Require/Import produce dari immer

```js
const produce = require("immer").produce;
```

- Kode tadi dapat direplace dengan :

```js
case UPDATE_STREET :
    return produce(state,(draft)=> {
        draft.address.street = action.payload
        })
```

function produce menerima 2 param. state dan callback. callback memberikan kita akses untuk copy dari state.

## Middleware

- Untuk mengextend Redux dengan custom functionality.
- Memprovide third-party extension point diantaran mendispatch sebuah action dan ketika mencapai reducer
- Penggunaan middleware untuk loggin, crash reporting , performing async task dll

Demo kita gunakan redux-logger
`npm i redux-logger`
Fungsinya untuk log semua info dari aplikasi redux kita.

```js
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLoger();
```

Cara menginclude middleware ini menggunakan function redux `applyMiddleware` menjadi param `createStore`

```js
const store = createStore(rootReducer, applyMiddleware(logger));
```

## API call using redux

Melakukan API Call

- axios

  Middleware untuk define async action creators

- redux-thunk
  `npm i axios redux-thunk`

```js
const redux = require("redux");
const { applyMiddleware } = redux;
const thunkMiddleware = require("redux-thunk").default;
const { userReducer } = require("./reducer");

const store = redux.createStore(userReducer, applyMiddleware(thunkMiddleware));
```

Penggunaan redux thunk seperti yang di katakan dapat membuat async ActionCreators. Juga bisa membuat ActionCreator mereturn function!

# Redux-Toolkit

Redux legacy banyak banget yang mau di install , banyak ulang2 code. RTK lebih ok banyak utilities yang memudahkan.
`npm i @reduxjs/toolkit`

## Buat Slice

Slice di RTK seperti kombinasi actionsCreator , actionType dan Reducer. Kita tidak perlu mendefine manual action type karena sdh otomatis di buat oleh RTK.
Untuk membuat Slice kita memerlukan function dari RTK `createSlice`. Function ini menerima sebuah object yang dimana didalamnya berisi name,state,dan reducers.

- name
  Nama slice

- state
  Initial State

- reducers
  Object yang menampung semua reducers. Kita mengakses reducer kita dari nama key nya. Di redux jadul kita harus return object untuk mengupdate state , untuk RTK kita dapat langsung mengupdate state dengan membuat perintahnya didalam props reducers.

```js
const proteinSlice = createSlice({
  name: "protein",
  initialState,
  reducers: {
    ordered: (state) => {
      state.stockEvolene--;
    },
    restocked: (state, action) => {
      state.stockEvolene += action.payload;
    },
  },
});
```

Note: props name akan menjadi informasi untuk typenya. Seperti ketika menjalankan reducer ordered, typenya jika di display akan menjadi "protein/ordered"

## Pembuatan Store

Untuk membuat store, di redux sebelumnya kita menggunakan `createStore` dan `combineReducer` untuk menggabungkan reducers kita. Di RTK kita cukup menggunakan `configureStore`. `configureStore` merupakan function yang menerima object. Didalam object tersebut menerima properti object bernama reducers yang berisi semua reducer kita.

```js
const store = configureStore({
  reducer: {
    protein: proteinSlice.reducer,
    creatine: creatineSlice.reducer,
  },
});
```

## Penggunaan reducer

```js
const store = require("./app/store");
const proteinSlice = require("./features/protein/proteinSlice");
const creatineSlice = require("./features/supplements/creatineSlice");
const { actions: proteinActions } = proteinSlice;
const { actions: creatineActions } = creatineSlice;

console.log("Initial State:", store.getState());
const unsubs = store.subscribe(() => console.log(store.getState()));

store.dispatch(proteinActions.ordered());
store.dispatch(proteinActions.ordered());
store.dispatch(proteinActions.ordered());

store.dispatch(creatineActions.ordered());
store.dispatch(creatineActions.ordered());
store.dispatch(creatineActions.ordered());
unsubs();
```

### extraReducer

Bayangkan skenario dimana jika customer membeli protein, kita memberikan free 1 creatine yang dimana reducernya terpisah di slice yang berbeda. Maka kita dapat menggunakan props `extraReducer` pada object slice.

```js
// creatineSlice.js
extraReducers : {
    ['protein/ordered'] : (state) => state.stockCreatine--
}
```

Penjelasannya: Jika ada type 'protein/ordered' jalankan perintah tersebut utk mengupdate state.
Bisa juga menggunakan syntax seperti ini :

```js
// creatineSlice.js
// import dulu proteinActions
extraReducers: (builder) => {
  builder.addCase(proteinActions.ordered, (state) => state.stockCreatine--);
};
```

## Middleware

Untuk menggunakan middleware, di function configureStore tambahkan props middleware yang dimana valuenya adalah function yang menerima parameter `getDefaultMiddleware`.

```js
const store = configureStore({
  reducer: {
    protein: proteinSlice.reducer,
    creatine: creatineSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
```

`getDefaultMiddleware` merupakan function bawaan configureStore yang dimana redux sdh menggunakan defaultMiddlewarenya sendiri jadi kita harus mengconcatnya seperti ditas.

## AsyncActions

Untuk redux sebelumnya cara menghandle asyncActions kita menggunakan redux-thunk dan axios. Di RTK kita hanya perlu menginstall axios karena RTK sdh memiliki function sendiri untuk menghandle async yaitu `createAsyncThunk`

1. createAsyncThunk
   Menerima action type utk argumen pertama dan function callback sebagai yg kedua. Callback function ini akan berisi async logic seperti menghandle API call

```js
const API = "https://jsonplaceholder.typicode.com/users";

// Generated pending , fullfiled or rejected action types
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get(API)
    .then((response) => response.data.map((user) => user.id));
});
```

Bisa dilihat , untuk argumen pertama kita isi dengan actionTypes yang dimana nantinya akan diakses oleh function builder di extraReducers. `createAsyncThunk` akan mengenerate 3 type, yaitu : pending , fullfiled dan rejected. Kalau sebelumnya kita handle manual dengan FETCH_USER_SUCCESS dll. Disini kita tinggal akses!
Note: function async ini akan mereturn action yaa.. dimana tinggal diakses type dan payloadnya.

Sekarang kita liat bagaimana caranya kita mengupdate state. Karena createSlice tidak dapat menampung action async didalam, maka kita tidak dapat memasukkan `fetchUser` kedalam property reducers. Jadi kita harus menggunakan yang namanya `extraReducers`

```js
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
```

Seperti yang kita ketahui sebelumnya, extraReducer memiliki value function dan argumen builder. Kita tinggal menambahkan case sesuai type yang diterima(1:actionType,2:function(state,action)).
