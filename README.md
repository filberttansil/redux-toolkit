# Redux

# List Konten

    - [`Prinsip Redux`](#prinsip-redux)
         - [`State`](#mengubah-state-hanya-dapat-dilakukan-dengan-men---dispatch-sebuah-action)

### 3 Konsep Utama Redux

1. `store` tempat menampung semua state dari aplikasi.
2. `action` deskripsi tentang apa yang terjadi di dalam aplikasi.
3. `reducer` yang menangani action dan yang memutuskan cara untuk mengupdate store

### Analogi

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
`npm i redux`
