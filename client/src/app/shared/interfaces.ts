import * as moment from "moment";
import _date = moment.unitOfTime._date;

export interface User {
    email: string,
    password: string
}

export interface Category {
    name: string
    imageSrc?: string
    user?: string
    _id?: string
}

export interface Message {
    message: string
}

export interface Position {
    name: string
    cost: number
    category: string
    user?: string
    _id?: string
    // виртуальное поле только для frontend
    quantity?: number
}

export interface Order {
    date?: Date
    order?: number
    user?: string
    list: OrderPosition[]
    _id?: string
}

export interface OrderPosition {
    name: string
    cost: number
    quantity: number
    _id?: string
}

export interface Filter {
    start?: Date
    end?: Date
    order?: number
}

export interface OverviewPage  {
    gain: OverviewPageItem
    orders: OverviewPageItem
}

export interface OverviewPageItem {
    percent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

export interface AnalyticsPage {
    average: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number
    order: number
    date: string
}