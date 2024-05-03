import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, clearToken } from '../helpers'
import moment from 'moment'

export const editTypes = createAsyncThunk(
    'async/editTypes',
    async function (param, options) {
        const response = await publicFetch('api/type', {
            method: "PATCH",
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
export const editDevices = createAsyncThunk(
    'async/editDevices',
    async function (param, options) {
        const formData = new FormData();

        param.id && formData.append('id', param.id);
        param.name && formData.append('name', param.name);
        param.price && formData.append('price', param.price);
        param.title && formData.append('title', param.title);

        param.typeId && formData.append('typeId', param.typeId);
        param.motoId && formData.append('motoId', param.motoId);
        param.modelId && formData.append('modelId', param.modelId);

        // let images = param.images && param.images.length && param.images.map(img => typeof img === 'string' ? img : img.file)
        // formData.append('images', images);

        console.log('param.images :>> ', param.images);

        // const allImages = [...existingImageNames, ...param.images?.map(img => img.file)].filter(Boolean);


        param.images?.forEach((img, index) => {

            return typeof img === 'string' ? formData.append('images', img) : formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/device', {
            method: "PATCH",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const editModels = createAsyncThunk(
    'async/editModels',
    async function (param, options) {
        const response = await publicFetch('api/model', {
            method: "PATCH",
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
export const editMotos = createAsyncThunk(
    'async/editMotos',
    async function (param, options) {
        const formData = new FormData();

        formData.append('id', param.id);
        formData.append('mark', param.mark);
        formData.append('image', param.image);

        const response = await publicFetch('api/moto', {
            method: "PATCH",
            body: formData
        }, true)

        const data = await response.json()

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const editeSlice = createSlice({
    name: 'edit',
    initialState: {
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //edit editMotos
        builder.addCase(editMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.motos = payload

            state.error = ''
        })
        builder.addCase(editMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit editModels
        builder.addCase(editModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.models = payload

            state.error = ''
        })
        builder.addCase(editModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit tyupes
        builder.addCase(editTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.types = payload

            state.error = ''
        })
        builder.addCase(editTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit devices
        builder.addCase(editDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.devices = payload

            state.error = ''
        })
        builder.addCase(editDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export default editeSlice.reducer;