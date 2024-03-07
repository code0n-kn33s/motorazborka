import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, getToken, clearToken } from '../helpers'
import moment from 'moment'

export const getCurrencies = createAsyncThunk(
    'async/getCurrencies',
    async function (param, options) {
        const response = await privateFetch('get_crypto_prices/')

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

export const getGlobalProfit = createAsyncThunk(
    'async/getGlobalProfit',
    async function (param, options) {
        const response = await fetch(process.env.REACT_APP_API_URL + 'get_global_profit/')

        const data = await response.json();

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const actionsSlice = createSlice({
    name: 'state',
    initialState: {
        currencies: [
            { value: 'usdt', name: "USDT", index: 0 },
            { value: 'btc', name: "Bitcoin", index: 1 },
            { value: 'eth', name: "Ethereum", index: 2 },
        ],
        currenciesFetch: null,
        kissFields: null,
        isTooltip: false,
        error: ''
    },
    reducers: {
        textTooltipClear: (state, action) => {
            state.tooltipText = ''
        },
        closeTooltip: (state, action) => {
            state.isTooltip = false
        },
        openTooltip: (state, action) => {
            state.isTooltip = true
        }
    },
    extraReducers: (builder) => {
        //get getGlobalProfit
        builder.addCase(getGlobalProfit.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getGlobalProfit.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            state.globalProfit = action.payload
            state.error = ''
        })
        builder.addCase(getGlobalProfit.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })

        //get currencies
        builder.addCase(getCurrencies.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getCurrencies.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            const joinCurrencies = {
                usdt: {
                    name: "USDT",
                    rate: payload.USDT
                },
                btc: {
                    name: "BTC",
                    rate: payload.BTC
                },
                eth: {
                    name: "ETH",
                    rate: payload.ETH
                },
            }

            state.currenciesFetch = joinCurrencies

            state.error = ''
        })
        builder.addCase(getCurrencies.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export const {
    textTooltipClear,
    closeTooltip,
    openTooltip
} = actionsSlice.actions

export default actionsSlice.reducer;