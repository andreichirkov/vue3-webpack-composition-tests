import moment from 'moment'

export interface Post {
    id: string,
    title: string,
    created: moment.Moment
}

export const today: Post = {
    id: '1',
    title: 'today1',
    created: moment()
}

export const thisWeek: Post = {
    id: '2',
    title: 'This week',
    created: moment().subtract(2, 'days')
}

export const thisMonth: Post = {
    id: '2',
    title: 'This month',
    created: moment().subtract(12, 'days')
}
