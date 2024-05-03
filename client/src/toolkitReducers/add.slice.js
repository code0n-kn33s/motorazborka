import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, addToken, clearToken } from '../helpers'
import moment from 'moment'

export const addTypes = createAsyncThunk(
    'async/addTypes',
    async function (param, options) {
        const response = await publicFetch('api/type', {
            method: "POST",
            body: JSON.stringify({
                ...param
            })
        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addDevices = createAsyncThunk(
    'async/addDevices',
    async function (param, options) {

        const formData = new FormData();

        param.name && formData.append('name', param.name);
        param.price && formData.append('price', param.price);
        param.title && formData.append('title', param.title);

        param.typeId && formData.append('typeId', param.typeId);
        param.motoId && formData.append('motoId', param.motoId);
        param.modelId && formData.append('modelId', param.modelId);

        param.images?.forEach((img, index) => {
            formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/device/create', {
            method: "POST",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addModels = createAsyncThunk(
    'async/addModels',
    async function (param, options) {
        const response = await publicFetch('api/model', {
            method: "POST",
            body: JSON.stringify({
                ...param
            })
        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addMotos = createAsyncThunk(
    'async/addMotos',
    async function (param, options) {
        console.log('param :>> ', param);

        const formData = new FormData();
        formData.append('mark', param.mark);
        param.image && formData.append('image', param.image);

        const response = await publicFetch('api/moto/create', {
            method: "POST",
            body: formData
        }, true)

        const data = await response.json()

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const addedSlice = createSlice({
    name: 'add',
    initialState: {
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //add addMotos
        builder.addCase(addMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.motos = payload

            state.error = ''
        })
        builder.addCase(addMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add addModels
        builder.addCase(addModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.models = payload

            state.error = ''
        })
        builder.addCase(addModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add tyupes
        builder.addCase(addTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.types = payload

            state.error = ''
        })
        builder.addCase(addTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add devices
        builder.addCase(addDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.devices = payload

            state.error = ''
        })
        builder.addCase(addDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export default addedSlice.reducer;